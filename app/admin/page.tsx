"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { JobOpening } from "./_components/JobOpening";
import { JobEmpty } from "./_components/JobEmpty";
import { JobItem } from "./_components/JobItem";
import { useJobs } from "@/features/jobs/queries/use-jobs";
import { Loading } from "@/components/ui/loading";
import { Job, JobStatus } from "@/features/jobs/types";
import { useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

const AdminPage = () => {
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [value, setValue] = useState("");

  const { data, isPending } = useJobs();
  const filtered: Job[] = useMemo(() => {
    let result =
      data?.filter((e) => {
        return e.title.toLowerCase().includes(value.toLowerCase());
      }) ?? [];

    if (status) {
      result = result.filter((e) => e.status === status);
    }

    return result;
  }, [value, data, status]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col w-full gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Search by job details"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <InputGroupAddon align={"inline-end"}>
            <div className="relative w-6 h-6">
              <Image src={"/icons/search.svg"} alt="Search Icon" fill />
            </div>
          </InputGroupAddon>
        </InputGroup>

        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">Status</span>

          <ToggleGroup
            type="single"
            value={status as string}
            variant={"outline"}
            onValueChange={(e) => setStatus(e as JobStatus)}
          >
            <ToggleGroupItem value="active" className="text-xs">
              Active
            </ToggleGroupItem>
            <ToggleGroupItem value="inactive" className="text-xs">
              Inactive
            </ToggleGroupItem>
            <ToggleGroupItem value="draft" className="text-xs">
              Draft
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Separator />

        {filtered.length === 0 ? (
          <JobEmpty />
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((e) => {
              return <JobItem key={e.id} data={e} />;
            })}
          </div>
        )}
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

          <JobOpening>
            <Button type="button" variant={"primary"} className="w-full">
              Create a new job
            </Button>
          </JobOpening>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
