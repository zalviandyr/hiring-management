import { useMemo } from "react";

type PoseInstructionIndicatorProps = { poseStep: number };

export const PoseInstructionIndicator = ({ poseStep }: PoseInstructionIndicatorProps) => {
  const currentPoseLabel = useMemo(() => {
    if (poseStep === 1) return "one-finger pose";
    else if (poseStep === 2) return "two-finger pose";
    else if (poseStep === 3) return "three-finger pose";

    return "";
  }, [poseStep]);

  return (
    <div className="absolute bg-emerald-400 rounded top-2 mx-[30%] h-7 left-0 right-0 flex justify-center items-center">
      <span className="text-sm text-neutral-10">
        Please make a <span className="font-bold">{currentPoseLabel}</span>
      </span>
    </div>
  );
};
