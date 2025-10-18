import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="bg-white flex flex-row px-32 h-12 py-3 items-center shadow-md">
      <div className="w-full bg-red-500"></div>

      <div className="flex flex-row items-center gap-4 w-full h-full justify-end">
        <Separator orientation="vertical" />

        <div className="relative h-7 w-7 rounded-full border border-neutral-40">
          <Image src={"/images/profile.png"} alt="Profile Image" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};
