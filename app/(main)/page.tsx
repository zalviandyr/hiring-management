import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { JobCard } from "./_components/JobCard";

const Home = () => {
  return (
    <div className="relative">
      <div className="bg-white flex flex-row px-32 h-12 py-3 items-center shadow">
        <div className="w-full bg-red-500"></div>

        <div className="flex flex-row items-center gap-4 w-full h-full justify-end">
          <Separator orientation="vertical" />

          <div className="relative h-7 w-7 rounded-full border border-ring/40">
            <Image
              src={"/images/profile.png"}
              alt="Profile Image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-5 px-24">
        {/* Job List */}
        <div className="flex flex-col px-5 gap-3 w-1/2">
          {/* Job Card */}
          <JobCard />
          <JobCard />
          <JobCard />
        </div>

        {/* Job Detail */}
        <div className="flex flex-col border border-border rounded-lg p-6">
          <div className="flex flex-row border-b border-border h-24">
            <div className="flex flex-row gap-6 grow w-full">
              <div className="relative h-12 w-12 border border-border rounded">
                <Image src={"/images/rakamin.png"} alt="Job Logo" fill className="object-contain" />
              </div>

              <div className="flex flex-col">
                <span className="mb-2 font-bold text-xs text-white bg-success-main py-1 px-2 w-fit rounded text-center">
                  Full Time
                </span>

                <span className="font-bold text-lg">UX Designer</span>
                <span className="text-sm">Rakamin</span>
              </div>
            </div>

            <Button type="button" size={"sm"} variant={"secondary"}>
              Apply
            </Button>
          </div>

          <span className="mt-6 text-sm text-neutral-90">
            Commodo velit labore amet magna deserunt ex ut commodo officia. Voluptate ullamco
            laboris proident reprehenderit sunt culpa officia laboris occaecat labore Lorem
            exercitation consequat. Enim ad consectetur ipsum pariatur eu deserunt ad labore
            pariatur consectetur cupidatat. Deserunt ut aliquip aute veniam irure aute magna dolor
            pariatur officia.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
