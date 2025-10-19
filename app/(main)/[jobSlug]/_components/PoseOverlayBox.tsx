import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";

type OverlayBox = { left: number; top: number; width: number; height: number };

export type PoseOverlayBoxHandle = {
  setCurrentPose: (pose: number) => void;
  updateHandOverlay: (landmarks: NormalizedLandmark[]) => void;
  clearHandOverlay: () => void;
};

export const PoseOverlayBox = forwardRef<PoseOverlayBoxHandle>((_, ref) => {
  const overlayBoxRef = useRef<OverlayBox | null>(null);
  const [currentPose, setCurrentPose] = useState(0);
  const [handOverlay, setHandOverlay] = useState<OverlayBox | null>(null);

  useImperativeHandle(ref, () => ({
    updateHandOverlay,
    clearHandOverlay,
    setCurrentPose,
  }));

  const updateHandOverlay = useCallback((landmarks: NormalizedLandmark[]) => {
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
  }, []);

  const clearHandOverlay = useCallback(() => {
    if (overlayBoxRef.current) {
      overlayBoxRef.current = null;
      setHandOverlay(null);
    }
  }, []);

  return (
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
  );
});
