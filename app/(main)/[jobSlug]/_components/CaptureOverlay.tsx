import { useEffect, useRef, useState } from "react";

type CaptureOverlayProps = {
  maxCaptureDuration: number;
  onCapture: () => void;
};

export const CaptureOverlay = ({ maxCaptureDuration, onCapture }: CaptureOverlayProps) => {
  const [captureHeldTime, setCaptureHeldTime] = useState(0);

  const captureStartRef = useRef<number | null>(null);
  const captureTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const remainingSeconds = Math.ceil(Math.max(maxCaptureDuration - captureHeldTime, 0) / 1000);

  useEffect(() => {
    startCountdown();

    return () => {
      if (captureTimerRef.current) {
        clearInterval(captureTimerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    captureStartRef.current = Date.now();
    setCaptureHeldTime(0);

    captureTimerRef.current = setInterval(() => {
      if (!captureStartRef.current) return;

      const elapsed = Date.now() - captureStartRef.current;
      if (elapsed >= maxCaptureDuration) {
        clearInterval(captureTimerRef.current!);
        captureTimerRef.current = null;
        captureStartRef.current = null;
        setCaptureHeldTime(maxCaptureDuration);
        onCapture();
        return;
      }

      setCaptureHeldTime(elapsed);
    }, 100);
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/30">
      <div className="flex flex-col w-full h-full justify-center items-center text-neutral-10 font-bold">
        <span className="text-sm">Please down your hands</span>
        <span className="text-sm">Capturing photo in</span>
        <span className="text-5xl">{remainingSeconds}</span>
      </div>
    </div>
  );
};
