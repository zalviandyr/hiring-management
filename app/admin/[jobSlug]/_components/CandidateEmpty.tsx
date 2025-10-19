import Image from "next/image";
import { Button } from "@/components/ui/button";

export const CandidateEmpty = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="relative h-80 w-80">
        <Image src={"/images/empty-candidate.png"} alt="Empty" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="font-bold">No candidates found</span>
        <span className="text-sm text-neutral-70">
          Share your job vacancies so that more candidates will apply.
        </span>
      </div>
    </div>
  );
};
