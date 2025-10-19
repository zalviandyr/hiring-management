import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-neutral-10 flex flex-row px-32 h-12 py-3 items-center shadow-lg">
      <div className="flex flex-row items-center gap-4 w-full h-full justify-end">
        <Link href={"/admin"}>
          <Button type="button" size="sm">
            Admin
          </Button>
        </Link>

        <Separator orientation="vertical" />

        <div className="relative h-7 w-7 rounded-full border border-neutral-40">
          <Image src={"/images/profile.png"} alt="Profile Image" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};
