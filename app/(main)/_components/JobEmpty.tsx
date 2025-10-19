import Image from "next/image";
import { Button } from "@/components/ui/button";

export const JobEmpty = () => {
  return (
    <div className="flex flex-col w-full justify-center mt-32 items-center gap-4">
      <div className="relative h-80 w-80">
        <Image src={"/images/empty.png"} alt="Empty" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-xl">No job openings available</span>
        <span>Please wait for the next batch of openings.</span>
      </div>
    </div>
  );
};
