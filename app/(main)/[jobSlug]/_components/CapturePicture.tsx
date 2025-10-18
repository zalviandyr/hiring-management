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
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { cn } from "@/lib/utils";

type ICameraState = "allow" | "denied" | "request";
type OverlayBox = { left: number; top: number; width: number; height: number };

export const CapturePicture = ({ children }: React.PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="!max-w-[700px]">
        <CapturePictureContent />
      </DialogContent>
    </Dialog>
  );
};

const CapturePictureContent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayBoxRef = useRef<OverlayBox | null>(null);
  const [currentPose, setCurrentPose] = useState(0);
  const [poseStep, setPoseStep] = useState(1);
  const [, setCapturedImage] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<ICameraState>("request");
  const [handOverlay, setHandOverlay] = useState<OverlayBox | null>(null);
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
            updateHandOverlay(landmarks);
            setCurrentPose(fingers);

            // urutan step pose
            let nextStep = poseStepRef.current;
            if (nextStep === 1 && fingers === 1) {
              nextStep = 2;
              updatePoseStep(2);
            } else if (nextStep === 2 && fingers === 2) {
              nextStep = 3;
              updatePoseStep(3);
            } else if (nextStep === 3 && fingers === 3) {
              capturePhoto();
              nextStep = 1;
              updatePoseStep(1);
            }
          } else {
            clearHandOverlay();
          }
        } else {
          clearHandOverlay();
        }

        animationFrameId = requestAnimationFrame(process);
      };

      process();
    };

    const init = async () => {
      if (!videoRef.current) {
        setCameraState("request");
        return;
      }

      setCameraState("request");

      try {
        const vision = await FilesetResolver.forVisionTasks(
          // CDN resmi (tanpa harus download model manual)
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });

        if (!isMounted || !videoRef.current) {
          setCameraState("request");
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

          const captureCanvas = captureCanvasRef.current ?? document.createElement("canvas");
          captureCanvas.width = videoRef.current.videoWidth || 640;
          captureCanvas.height = videoRef.current.videoHeight || 480;
          captureCanvasRef.current = captureCanvas;

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

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = captureCanvasRef.current ?? document.createElement("canvas");
    const video = videoRef.current;
    if (!canvas.width || !canvas.height) {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");
    setCapturedImage(image);
  };

  const updateHandOverlay = (landmarks: any[]) => {
    const xs = landmarks.map((point) => point.x);
    const ys = landmarks.map((point) => point.y);

    const padding = 0.08;
    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

    const minX = clamp(Math.min(...xs) - padding);
    const maxX = clamp(Math.max(...xs) + padding);
    const minY = clamp(Math.min(...ys) - padding);
    const maxY = clamp(Math.max(...ys) + padding);

    const nextOverlay: OverlayBox = {
      left: minX * 100,
      top: minY * 100,
      width: (maxX - minX) * 100,
      height: (maxY - minY) * 100,
    };

    const prev = overlayBoxRef.current;
    const threshold = 0.5;
    const hasChanged =
      !prev ||
      Math.abs(prev.left - nextOverlay.left) > threshold ||
      Math.abs(prev.top - nextOverlay.top) > threshold ||
      Math.abs(prev.width - nextOverlay.width) > threshold ||
      Math.abs(prev.height - nextOverlay.height) > threshold;

    if (hasChanged) {
      overlayBoxRef.current = nextOverlay;
      setHandOverlay(nextOverlay);
    }
  };

  const clearHandOverlay = () => {
    if (overlayBoxRef.current) {
      overlayBoxRef.current = null;
      setHandOverlay(null);
    }
  };

  const countFingersWithPalm = (landmarks: any[]) => {
    const fingerTips = [8, 12, 16, 20];
    const fingerPips = [6, 10, 14, 18];
    let count = 0;

    // Deteksi orientasi tangan
    const wrist = landmarks[0];
    const thumbCmc = landmarks[1];
    const indexMcp = landmarks[5];
    const pinkyMcp = landmarks[17];

    // Buat dua vektor bidang telapak tangan
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

    // Hitung cross product (arah normal telapak tangan)
    const normal = {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };

    // Jika normal.z < 0 → telapak menghadap kamera
    const isPalmFacingCamera = normal.z < -0.005;

    if (!isPalmFacingCamera) {
      // Jika tidak menghadap kamera → anggap 0 jari
      return { fingers: 0, palmFacing: false };
    }

    // 1️⃣ Deteksi tangan kanan / kiri (untuk logika jempol)
    const thumbTip = landmarks[4];
    const thumbMcp = landmarks[2];
    const isRightHand = thumbTip.x < wrist.x;

    // 2️⃣ Thumb detection
    if (isRightHand) {
      if (thumbTip.x < thumbMcp.x - 0.03) count++;
    } else {
      if (thumbTip.x > thumbMcp.x + 0.03) count++;
    }

    // 3️⃣ Finger detection (index - pinky)
    for (let i = 0; i < 4; i++) {
      const tipY = landmarks[fingerTips[i]].y;
      const pipY = landmarks[fingerPips[i]].y;
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

      {cameraState === "request" && (
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
          cameraState === "allow" ? "block" : "hidden"
        )}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`object-cover w-full h-full ${
            cameraState === "allow" ? "opacity-100" : "opacity-0"
          }`}
        />

        {cameraState === "allow" && (
          <div
            className="absolute border-2 border-emerald-400 rounded-md transition-all duration-150"
            style={
              handOverlay
                ? ({
                    left: `${handOverlay.left}%`,
                    top: `${handOverlay.top}%`,
                    width: `${handOverlay.width}%`,
                    height: `${handOverlay.height}%`,
                    display: "block",
                  } as React.CSSProperties)
                : ({ display: "none" } as React.CSSProperties)
            }
          >
            <span className="absolute -top-9 left-0 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Pose {currentPose}
            </span>
          </div>
        )}
      </div>

      {cameraState === "allow" && (
        <DialogFooter>
          <div className="flex flex-col gap-4">
            <span className="text-xs text-neutral-100">
              To take a picture, follow the hand poses in the order shown below. The system will
              automatically capture the image once the final pose is detected.
            </span>

            <div className="flex flex-row items-center gap-2 justify-center">
              <div className="relative bg-[#F6F1EB] h-20 w-20">
                <Image src={"/icons/pose-1.svg"} alt="Pose 3" fill className="p-2" />
              </div>

              <ChevronRight />

              <div className="relative bg-[#F6F1EB] h-20 w-20">
                <Image src={"/icons/pose-2.svg"} alt="Pose 3" fill className="p-2" />
              </div>

              <ChevronRight />

              <div className="relative bg-[#F6F1EB] h-20 w-20">
                <Image src={"/icons/pose-3.svg"} alt="Pose 3" fill className="p-2" />
              </div>
            </div>
          </div>
        </DialogFooter>
      )}
    </>
  );
};
