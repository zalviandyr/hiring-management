import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const JobCard = () => {
  return (
    <div className="flex flex-col border border-neutral-40 justify-center px-4 rounded-lg h-[140px] w-full">
      <div className="flex flex-row h-12 gap-4">
        <div className="relative h-12 w-12 border border-neutral-40 rounded">
          <Image src={"/images/rakamin.png"} alt="Job Logo" fill className="object-contain" />
        </div>

        <div className="flex flex-col h-full justify-between">
          <span className="font-bold">UX Designer</span>
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

          <span className="text-xs text-muted-foreground">Rp. 7.000.000 - Rp. 10.000.000</span>
        </div>
      </div>
    </div>
  );
};
