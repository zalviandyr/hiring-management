import { Button } from "@/components/ui/button";
import { JobCard } from "./_components/JobCard";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-row">
      {/* Job List */}
      <div className="flex flex-col px-5 gap-5 w-1/2">
        {/* Job Card */}
        <JobCard />
        <JobCard />
        <JobCard />
      </div>

      {/* Job Detail */}
      <div className="flex flex-col border border-neutral-40 rounded-lg p-6">
        <div className="flex flex-row border-b border-neutral-40 h-24">
          <div className="flex flex-row gap-6 grow w-full">
            <div className="relative h-12 w-12 border border-neutral-40 rounded">
              <Image src={"/images/rakamin.png"} alt="Job Logo" fill className="object-contain" />
            </div>

            <div className="flex flex-col">
              <span className="mb-2 font-bold text-xs text-white bg-success-main py-1 px-2 w-fit rounded text-center">
                Full Time
              </span>

              <span className="font-bold text-lg">UX Designer</span>
              <span className="text-sm text-neutral-70">Rakamin</span>
            </div>
          </div>

          <Link href={"/ux-designer-908"}>
            <Button type="button" size={"sm"} variant={"secondary"}>
              Apply
            </Button>
          </Link>
        </div>

        <span className="mt-6 text-sm text-neutral-90">
          Commodo velit labore amet magna deserunt ex ut commodo officia. Voluptate ullamco laboris
          proident reprehenderit sunt culpa officia laboris occaecat labore Lorem exercitation
          consequat. Enim ad consectetur ipsum pariatur eu deserunt ad labore pariatur consectetur
          cupidatat. Deserunt ut aliquip aute veniam irure aute magna dolor pariatur officia.
        </span>
      </div>
    </div>
  );
};

export default HomePage;
