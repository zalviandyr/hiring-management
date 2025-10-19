import { createClient } from "@/lib/supabase/client";
import { buildIncrementalId } from "@/lib/utils";
import { ApplicantFormData } from "../schema";
import { Job } from "@/features/jobs/types";

export const createApplicant = async (data: ApplicantFormData, job: Job) => {
  const supabase = createClient();

  const { data: application } = await supabase
    .from("applicants")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle()
    .overrideTypes<ApplicantFormData>()
    .throwOnError();

  const newApplicationId = buildIncrementalId({
    lastId: application?.id,
    prefix: "application",
  });

  await supabase
    .from("applicants")
    .insert({
      id: newApplicationId,
      job_id: job.id,
      ...data,
    })
    .throwOnError();
};
