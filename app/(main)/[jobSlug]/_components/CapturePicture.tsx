import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export const CapturePicture = ({ children }: React.PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="!max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col">
            <span className="text-lg font-bold text-neutral-100">Raise Your Hand to Capture</span>
            <span className="text-xs">We’ll take the photo once your hand pose is detected.</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[500px] my-4">
          <Image src={"/images/avatar.png"} alt="Capture Image" fill className="object-contain" />
        </div>

        <DialogFooter>
          <div className="flex flex-col gap-4">
            <span className="text-xs text-neutral-100">
              To take a picture, follow the hand poses in the order shown below. The system will
              automatically capture the image once the final pose is detected.
            </span>

            <div className="flex flex-row items-center gap-2 justify-center">
              <div className="relative bg-[#F6F1EB] h-14 w-14">
                <Image src={"/icons/pose-3.svg"} alt="Pose 3" fill className="p-2" />
              </div>

              <ChevronRight />

              <div className="relative bg-[#F6F1EB] h-14 w-14">
                <Image src={"/icons/pose-2.svg"} alt="Pose 3" fill className="p-2" />
              </div>

              <ChevronRight />

              <div className="relative bg-[#F6F1EB] h-14 w-14">
                <Image src={"/icons/pose-1.svg"} alt="Pose 3" fill className="p-2" />
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
