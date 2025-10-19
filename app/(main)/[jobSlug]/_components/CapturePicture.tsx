"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CameraIcon, ChevronRight, CircleXIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver, NormalizedLandmark } from "@mediapipe/tasks-vision";
import { cn } from "@/lib/utils";
import { PoseOverlayBox, PoseOverlayBoxHandle } from "./PoseOverlayBox";
import { PoseInstructionIndicator } from "./PoseInstructionIndicator";
import { Button } from "@/components/ui/button";
import { CaptureOverlay } from "./CaptureOverlay";

type ICameraState = "allow" | "denied" | "requested" | "captured" | "capturing";
type CapturePictureProps = {
  onCapture?: (value: string) => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CapturePicture = ({
  children,
  onCapture,
}: React.PropsWithChildren & CapturePictureProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="!max-w-[700px] gap-4">
        <CapturePictureContent onCapture={onCapture} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

const CapturePictureContent = ({ onCapture, setOpen }: CapturePictureProps) => {
  const REQUIRED_FINGERS_BY_STEP: Record<number, number> = { 1: 1, 2: 2, 3: 3 };
  const POSE_HOLD_DURATION_MS = 3000;
  const CAPTURE_DURATION_MS = 3000;

  const visionTaskUrl = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
  const modelAssetPath =
    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

  const [poseStep, setPoseStep] = useState(1);
  const [poseHeldTime, setPoseHeldTime] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<ICameraState>("requested");

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayBoxRef = useRef<PoseOverlayBoxHandle | null>(null);
  const poseHoldStartRef = useRef<number | null>(null);
  const poseStepRef = useRef(poseStep);

  useEffect(() => {
    poseStepRef.current = poseStep;
  }, [poseStep]);

  const updatePoseStep = (nextStep: number) => {
    poseStepRef.current = nextStep;
    setPoseStep(nextStep);
  };

  useEffect(() => {
    let handLandmarker: HandLandmarker | null = null;
    let animationFrameId = 0;
    let activeStream: MediaStream | null = null;
    let isMounted = true;

    const startDetection = () => {
      const process = () => {
        if (!handLandmarker || !videoRef.current) {
          animationFrameId = requestAnimationFrame(process);
          return;
        }

        const nowInMs = Date.now();
        const results = handLandmarker.detectForVideo(videoRef.current, nowInMs);

        if (results.landmarks && results.landmarks[0]) {
          const landmarks = results.landmarks[0];
          const { fingers, palmFacing } = countFingersWithPalm(landmarks);

          if (palmFacing) {
            overlayBoxRef.current?.updateHandOverlay(landmarks);
            overlayBoxRef.current?.setCurrentPose(fingers);

            const currentStep = poseStepRef.current;
            const expectedFingers = REQUIRED_FINGERS_BY_STEP[currentStep];
            const isCorrectPose = fingers === expectedFingers;

            // update to next step if the post is correct
            if (isCorrectPose) {
              const now = Date.now();
              if (!poseHoldStartRef.current) {
                poseHoldStartRef.current = now;
              }

              const heldFor = now - poseHoldStartRef.current;
              setPoseHeldTime(heldFor);
              if (heldFor >= POSE_HOLD_DURATION_MS) {
                if (currentStep === 3) {
                  startCapture();
                  updatePoseStep(1);
                } else {
                  updatePoseStep(currentStep + 1);
                }

                reset();
              }
            } else {
              reset();
            }
          } else {
            reset();
          }
        } else {
          reset();
        }

        animationFrameId = requestAnimationFrame(process);
      };

      const reset = () => {
        setPoseHeldTime(0);
        poseHoldStartRef.current = null;
        overlayBoxRef.current?.clearHandOverlay();
      };

      process();
    };

    const init = async () => {
      if (!videoRef.current) {
        setCameraState("requested");
        return;
      }

      setCameraState("requested");

      try {
        const vision = await FilesetResolver.forVisionTasks(visionTaskUrl);

        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath },
          runningMode: "VIDEO",
          numHands: 1,
        });

        if (!isMounted || !videoRef.current) {
          setCameraState("requested");
          return;
        }

        activeStream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (!isMounted || !videoRef.current) {
          activeStream.getTracks().forEach((track) => track.stop());
          setCameraState("denied");
          return;
        }

        videoRef.current.srcObject = activeStream;
        videoRef.current.onloadedmetadata = () => {
          if (!videoRef.current) return;

          videoRef.current
            .play()
            .then(() => {
              if (!isMounted) return;
              setCameraState("allow");
              startDetection();
            })
            .catch(() => {
              setCameraState("denied");
            });
        };
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to initialize camera", error);
        setCameraState("denied");
      }
    };

    init();

    return () => {
      isMounted = false;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
      activeStream?.getTracks().forEach((track) => track.stop());
      handLandmarker?.close();
    };
  }, []);

  const startCapture = () => {
    setCameraState("capturing");
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // set canvas size
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    setCameraState("captured");
    setCapturedImage(image);
  };

  const retakePhotoHandle = () => {
    setCameraState("allow");
    setCapturedImage(null);
  };

  const submitHandle = () => {
    if (capturedImage) {
      onCapture?.(capturedImage);
      setOpen?.(false);
    }
  };

  const countFingersWithPalm = (landmarks: NormalizedLandmark[]) => {
    const fingerTips = [8, 12, 16, 20];
    const fingerPips = [6, 10, 14, 18];
    let count = 0;

    // --- Detect the general hand orientation ---
    const wrist = landmarks[0];
    const thumbCmc = landmarks[1];
    const indexMcp = landmarks[5];
    const pinkyMcp = landmarks[17];

    // --- Construct two vectors along the palm surface (from wrist to index and pinky) ---
    const v1 = {
      x: indexMcp.x - wrist.x,
      y: indexMcp.y - wrist.y,
      z: indexMcp.z - wrist.z,
    };
    const v2 = {
      x: pinkyMcp.x - wrist.x,
      y: pinkyMcp.y - wrist.y,
      z: pinkyMcp.z - wrist.z,
    };

    // --- Compute the cross product of the two vectors to determine the palm’s normal direction ---
    const normal = {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };

    // --- Check if the palm is facing the camera (normal.z < 0 means facing forward) ---
    const isPalmFacingCamera = normal.z < -0.005;

    if (!isPalmFacingCamera) {
      // If the palm is not facing the camera, ignore finger counting
      return { fingers: 0, palmFacing: false };
    }

    // --- Step 1: Determine if the detected hand is right or left (used for thumb logic) ---
    const thumbTip = landmarks[4];
    const thumbMcp = landmarks[2];
    const isRightHand = thumbTip.x < wrist.x;

    // --- Step 2: Detect thumb extension (based on horizontal position) ---
    if (isRightHand) {
      if (thumbTip.x < thumbMcp.x - 0.03) count++;
    } else {
      if (thumbTip.x > thumbMcp.x + 0.03) count++;
    }

    // --- Step 3: Detect raised fingers (index → pinky) based on vertical position ---
    for (let i = 0; i < 4; i++) {
      const tipY = landmarks[fingerTips[i]].y;
      const pipY = landmarks[fingerPips[i]].y;

      // Finger considered "up" if the tip is significantly higher than the PIP joint
      if (pipY - tipY > 0.03) count++;
    }

    return { fingers: count, palmFacing: true };
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex flex-col">
          <span className="text-lg font-bold text-neutral-100">Raise Your Hand to Capture</span>
          <span className="text-xs">We’ll take the photo once your hand pose is detected.</span>
        </DialogTitle>
      </DialogHeader>

      {cameraState === "requested" && (
        <div className="flex flex-col items-center my-4 gap-4 text-center">
          <CameraIcon className="text-neutral-40 w-12 h-12" />
          <span className="text-sm">Request camera permission.</span>
        </div>
      )}

      {cameraState === "denied" && (
        <div className="flex flex-col items-center my-4 gap-4 text-center">
          <CircleXIcon className="text-danger-main w-12 h-12" />
          <span className="text-sm">
            Please allow camera access so we can capture your picture automatically.
          </span>
        </div>
      )}

      <div
        className={cn(
          "w-full my-4 h-[500px] relative flex items-center justify-center overflow-hidden",
          cameraState === "allow" || cameraState === "capturing" ? "block" : "hidden"
        )}
      >
        <video ref={videoRef} autoPlay playsInline className="object-cover w-full h-full" />

        {cameraState === "allow" && (
          <>
            <PoseOverlayBox ref={overlayBoxRef} />

            <PoseInstructionIndicator
              poseStep={poseStep}
              maxHeldDuration={POSE_HOLD_DURATION_MS}
              currentHeldDuration={poseHeldTime}
            />
          </>
        )}

        {cameraState === "capturing" && (
          <CaptureOverlay maxCaptureDuration={CAPTURE_DURATION_MS} onCapture={capturePhoto} />
        )}
      </div>

      {cameraState === "captured" && (
        <img src={capturedImage!} alt="Captured" className="w-full h-[500px] object-cover" />
      )}

      {cameraState === "allow" && (
        <DialogFooter>
          <div className="flex flex-col gap-4">
            <span className="text-xs text-neutral-100">
              To take a picture, follow the hand poses in the order shown below. The system will
              automatically capture the image once the final pose is detected.
            </span>

            <div className="flex flex-row items-center gap-2 justify-center">
              {[1].includes(poseStep) && (
                <>
                  <div className="relative bg-[#F6F1EB] h-20 w-20">
                    <Image src={"/icons/pose-1.svg"} alt="Pose 3" fill className="p-2" />
                  </div>

                  <ChevronRight />
                </>
              )}

              {[1, 2].includes(poseStep) && (
                <>
                  <div className="relative bg-[#F6F1EB] h-20 w-20">
                    <Image src={"/icons/pose-2.svg"} alt="Pose 3" fill className="p-2" />
                  </div>

                  <ChevronRight />
                </>
              )}

              {[1, 2, 3].includes(poseStep) && (
                <div className="relative bg-[#F6F1EB] h-20 w-20">
                  <Image src={"/icons/pose-3.svg"} alt="Pose 3" fill className="p-2" />
                </div>
              )}
            </div>
          </div>
        </DialogFooter>
      )}

      {cameraState === "captured" && (
        <DialogFooter className="flex flex-row gap-4 justify-center">
          <Button type="button" onClick={retakePhotoHandle}>
            Retake Photo
          </Button>

          <Button variant={"primary"} type="button" onClick={submitHandle}>
            Submit
          </Button>
        </DialogFooter>
      )}
    </>
  );
};
