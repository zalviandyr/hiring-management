import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
};

export const Chip = ({ label, disabled, isSelected, onClick }: ChipProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled) {
          onClick?.();
        }
      }}
      className={cn(
        "py-1 px-3 text-sm border rounded-2xl cursor-pointer capitalize",
        isSelected ? "text-primary-main border-primary-main" : "text-neutral-90 border-neutral-40",
        disabled && "text-neutral-60 border-neutral-40 bg-neutral-30"
      )}
    >
      {label}
    </button>
  );
};
