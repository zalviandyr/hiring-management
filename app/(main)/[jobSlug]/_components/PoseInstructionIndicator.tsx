import { useMemo } from "react";

type PoseInstructionIndicatorProps = {
  poseStep: number;
  maxHeldDuration: number;
  currentHeldDuration: number;
};

export const PoseInstructionIndicator = ({
  poseStep,
  maxHeldDuration,
  currentHeldDuration,
}: PoseInstructionIndicatorProps) => {
  const isDetected = currentHeldDuration > 0;
  const elapse = useMemo(() => {
    const result = (maxHeldDuration - currentHeldDuration) * 0.001;
    return result.toFixed(0);
  }, [maxHeldDuration, currentHeldDuration]);

  const currentPoseLabel = useMemo(() => {
    if (poseStep === 1) return "one-finger pose";
    else if (poseStep === 2) return "two-finger pose";
    else if (poseStep === 3) return "three-finger pose";

    return "";
  }, [poseStep]);

  return (
    <div className="absolute bg-emerald-400 rounded top-2 mx-[30%] h-7 left-0 right-0 flex justify-center items-center">
      {isDetected ? (
        <span className="text-sm text-neutral-10">
          Hold your position for <span className="font-bold">{elapse} second</span>
        </span>
      ) : (
        <span className="text-sm text-neutral-10">
          Please make a <span className="font-bold">{currentPoseLabel}</span>
        </span>
      )}
    </div>
  );
};
