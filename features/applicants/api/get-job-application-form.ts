import { JobApplicationForm } from "@/features/jobs/types";
import { createClient } from "@/lib/supabase/client";

export const getJobApplicationForm = async (jobId: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("job_application_forms")
    .select()
    .eq("job_id", jobId)
    .single()
    .overrideTypes<JobApplicationForm>()
    .throwOnError();

  return data;
};
