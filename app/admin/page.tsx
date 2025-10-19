import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import Image from "next/image";
import { JobOpening } from "./_components/JobOpening";
import { JobEmpty } from "./_components/JobEmpty";
import { JobItem } from "./_components/JobItem";

const AdminPage = () => {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col w-full gap-4">
        <InputGroup>
          <InputGroupInput placeholder="Search by job details" />

          <InputGroupAddon align={"inline-end"}>
            <div className="relative w-6 h-6">
              <Image src={"/icons/search.svg"} alt="Search Icon" fill />
            </div>
          </InputGroupAddon>
        </InputGroup>

        {/* <JobEmpty /> */}

        <div className="flex flex-col gap-4">
          <JobItem />
          <JobItem />
          <JobItem />
        </div>
      </div>

      <div className="relative w-[370px] h-40">
        <div className="absolute w-full h-full">
          <Image
            src={"/images/recruit.png"}
            alt="Recruit Background"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="absolute w-full h-full bg-black/70 rounded-2xl" />

        <div className="absolute flex flex-col items-center justify-center h-full w-full gap-6 p-6">
          <div className="flex flex-col text-neutral-40 font-bold">
            <span className="text-lg">Recruit the best candidates</span>
            <span className="text-sm">Create jobs, invite, and hire with ease</span>
          </div>

          <Button type="button" variant={"primary"} className="w-full">
            Create a new job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
