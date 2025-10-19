import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  isSelected: boolean;
};

export const Chip = ({ label, isSelected }: ChipProps) => {
  return (
    <button
      type="button"
      className={cn(
        "py-1 px-3 text-sm border rounded-2xl cursor-pointer",
        isSelected && "text-primary-main border-primary-main",
        !isSelected && "text-neutral-60 border-neutral-40 bg-neutral-30"
      )}
    >
      {label}
    </button>
  );
};
