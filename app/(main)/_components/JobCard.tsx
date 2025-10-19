import { Separator } from "@/components/ui/separator";
import { Job } from "@/features/jobs/types";
import { cn, formatRupiah } from "@/lib/utils";
import Image from "next/image";

type JobCardProps = {
  data: Job;
  active?: boolean;
  onClick: (data: Job) => void;
};

export const JobCard = ({ data, active, onClick }: JobCardProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex flex-col border border-neutral-40 justify-center px-4 rounded-lg h-[140px] w-full",
        "cursor-pointer hover:border-primary-main hover:bg-neutral-10 hover:shadow",
        active && "border-primary-main"
      )}
      onClick={() => {
        onClick(data);
      }}
    >
      <div className="flex flex-row h-12 gap-4">
        <div className="relative h-12 w-12 border border-neutral-40 rounded">
          <Image src={"/images/rakamin.png"} alt="Job Logo" fill className="object-contain" />
        </div>

        <div className="flex flex-col h-full justify-between items-start">
          <span className="font-bold">{data.title}</span>
          <span className="text-sm">Rakamin</span>
        </div>
      </div>

      <Separator variant="dashed" className="my-3" />

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-1">
          <div className="relative h-4 w-4">
            <Image src={"/icons/location.svg"} alt="Job Location" fill />
          </div>

          <span className="text-xs text-muted-foreground">Jakarta</span>
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="relative h-4 w-4">
            <Image src={"/icons/money.svg"} alt="Job Salary" fill />
          </div>

          <span className="text-xs text-muted-foreground">
            {formatRupiah(data.salary_range.min)} - {formatRupiah(data.salary_range.max)}
          </span>
        </div>
      </div>
    </button>
  );
};
