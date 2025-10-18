"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, CircleXIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type ICameraState = "allow" | "denied" | "request";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<ICameraState>("request");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        setCameraState("allow");
      } catch (err) {
        setCameraState("denied");

        console.error("cant access camera:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      setStream(null);
      videoRef.current = null;
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // sesuaikan ukuran canvas dengan video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // ambil frame dari video
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // convert ke base64 image
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex flex-col">
          <span className="text-lg font-bold text-neutral-100">Raise Your Hand to Capture</span>
          <span className="text-xs">We’ll take the photo once your hand pose is detected.</span>
        </DialogTitle>
      </DialogHeader>

      {cameraState === "denied" && (
        <div className="flex flex-col items-center my-4 gap-4">
          <CircleXIcon className="text-danger-main w-52 h-52" />

          <span className="text-sm">Please allow camera to capture the picture</span>
        </div>
      )}

      {cameraState === "allow" && (
        <>
          <div className="w-full h-[500px] my-4">
            <video ref={videoRef} autoPlay playsInline className="object-cover" />
          </div>

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
        </>
      )}
    </>
  );
};
