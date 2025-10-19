import { ApplicantFormData } from "@/features/applicants/schema";
import { Job } from "@/features/jobs/types";
import { createClient } from "@/lib/supabase/client";

export const getCandidates = async (jobSlug: string) => {
  const supabase = createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug
      `
    )
    .eq("slug", jobSlug)
    .single()
    .overrideTypes<Job>()
    .throwOnError();

  if (job) {
    const { data: applications } = await supabase
      .from("applicants")
      .select()
      .eq("job_id", job.id)
      .overrideTypes<ApplicantFormData[]>()
      .throwOnError();

    return applications;
  }

  return [];
};
