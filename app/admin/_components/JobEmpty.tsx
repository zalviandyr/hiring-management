import Image from "next/image";
import { JobOpening } from "./JobOpening";
import { Button } from "@/components/ui/button";

export const JobEmpty = () => {
  return (
    <div className="flex flex-col w-full justify-center mt-32 items-center gap-4">
      <div className="relative h-80 w-80">
        <Image src={"/images/empty.png"} alt="Empty" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-xl">No job openings available</span>
        <span>Create a job opening now and start the candidate process.</span>
      </div>

      <JobOpening>
        <Button type="button" variant={"secondary"}>
          Create a new job
        </Button>
      </JobOpening>
    </div>
  );
};
