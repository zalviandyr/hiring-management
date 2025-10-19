import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import Image from "next/image";
import { JobOpening } from "./_components/JobOpening";

const AdminPage = () => {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col w-full">
        <InputGroup>
          <InputGroupInput placeholder="Search by job details" />

          <InputGroupAddon align={"inline-end"}>
            <div className="relative w-6 h-6">
              <Image src={"/icons/search.svg"} alt="Search Icon" fill />
            </div>
          </InputGroupAddon>
        </InputGroup>

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
