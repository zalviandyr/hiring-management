"use client";

import { Button } from "@/components/ui/button";
import { JobCard } from "./_components/JobCard";
import Image from "next/image";
import Link from "next/link";
import { useJobs } from "@/features/jobs/queries/use-jobs";
import { JobEmpty } from "./_components/JobEmpty";
import { useState } from "react";
import { Job } from "@/features/jobs/types";
import { JobUnselected } from "./_components/JobUnselected";

const HomePage = () => {
  const { data } = useJobs();
  const jobs = data ?? [];

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return jobs.length === 0 ? (
    <JobEmpty />
  ) : (
    <div className="flex flex-row">
      {/* Job List */}
      <div className="flex flex-col px-5 gap-5 w-[25%] h-[90vh] overflow-scroll">
        {jobs.map((e) => (
          <div key={e.id} className="h-full">
            <JobCard data={e} onClick={(job) => setSelectedJob(job)} />
          </div>
        ))}
      </div>

      {/* Job Detail */}
      <div className="flex-1">
        {selectedJob ? (
          <div className="flex flex-col border border-neutral-40 rounded-lg p-6 h-fit">
            <div className="flex flex-row border-b border-neutral-40 h-24">
              <div className="flex flex-row gap-6 grow w-full">
                <div className="relative h-12 w-12 border border-neutral-40 rounded">
                  <Image
                    src={"/images/rakamin.png"}
                    alt="Job Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="mb-2 font-bold text-xs text-white bg-success-main py-1 px-2 w-fit rounded text-center">
                    {selectedJob.type}
                  </span>

                  <span className="font-bold text-lg">{selectedJob.title}</span>
                  <span className="text-sm text-neutral-70">Rakamin</span>
                </div>
              </div>

              <Link href={`/${selectedJob.slug}`}>
                <Button type="button" size={"sm"} variant={"secondary"}>
                  Apply
                </Button>
              </Link>
            </div>

            <span className="mt-6 text-sm text-neutral-90">{selectedJob.description}</span>
          </div>
        ) : (
          <JobUnselected />
        )}
      </div>
    </div>
  );
};

export default HomePage;
