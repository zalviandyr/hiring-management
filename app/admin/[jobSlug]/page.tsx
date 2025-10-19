"use client";

import { useParams } from "next/navigation";
import { CandidateEmpty } from "./_components/CandidateEmpty";
import { useCandidates } from "@/features/candidates/queries/use-candidates";
import { ApplicantTable } from "./_components/ApplicantTable";
import { Loader2 } from "lucide-react";

const AdminManageJobPage = () => {
  const { jobSlug } = useParams<{ jobSlug?: string }>();
  const { data, isPending } = useCandidates(jobSlug);

  return (
    <div className="flex flex-col gap-6">
      <span className="text-lg font-bold">{jobSlug}</span>

      <div className="border border-neutral-40 rounded-lg p-6">
        {isPending ? (
          <div className="flex justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        ) : data?.length ?? 0 > 0 ? (
          <ApplicantTable data={data ?? []} />
        ) : (
          <CandidateEmpty />
        )}
      </div>
    </div>
  );
};

export default AdminManageJobPage;
