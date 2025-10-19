import { Button } from "@/components/ui/button";
import { Job, JobStatus } from "@/features/jobs/types";
import { cn, formatRupiah, formatShortDate } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

type JobItemProps = {
  data: Job;
};

export const JobItem = ({ data }: JobItemProps) => {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl shadow-lg">
      <div className="flex flex-row gap-4">
        <Badge state={data.status} />

        <div className="rounded-md py-1 px-4 border border-neutral-40">
          <span className="text-sm">started on {formatShortDate(data.created)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-neutral-100 font-bold text-lg">{data.title}</span>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-neutral-80 gap-1">
            <span>{formatRupiah(data.salary_range.min)}</span>
            <span>-</span>
            <span>{formatRupiah(data.salary_range.max)}</span>
          </div>

          <Link href={"/admin/frontend-192"}>
            <Button type="button" variant={"primary"} size={"xs"}>
              Manage Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ state }: { state: JobStatus }) => {
  const label = useMemo(() => {
    if (state === "active") return "Active";
    if (state === "inactive") return "Inactive";
    if (state === "draft") return "Draft";

    return "";
  }, [state]);

  const color = useMemo(() => {
    if (state === "active") return "success";
    if (state === "inactive") return "danger";
    if (state === "draft") return "secondary";

    return "";
  }, [state]);

  const { textColor, bgColor, borderColor } = useMemo(() => {
    let textColor = "text-neutral-100";
    let bgColor = "bg-neutral-100/10";
    let borderColor = "border-neutral-100/30";

    if (state === "active") {
      textColor = "text-success-main";
      bgColor = "bg-success-main/5";
      borderColor = "border-success-main/30";
    }
    if (state === "inactive") {
      textColor = "text-danger-main";
      bgColor = "bg-danger-main/5";
      borderColor = "border-danger-main/30";
    }
    if (state === "draft") {
      textColor = "text-secondary-main";
      bgColor = "bg-secondary-main/5";
      borderColor = "border-secondary-main/30";
    }

    return { textColor, bgColor, borderColor };
  }, [state]);

  return (
    <div className={cn("border rounded-lg py-1 px-4", bgColor, borderColor)}>
      <span className={cn("text-sm font-bold", textColor)}>{label}</span>
    </div>
  );
};
