import { Job } from "@/features/jobs/types";
import { createClient } from "@/lib/supabase/client";

export const getActiveJobs = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug,
      title,
      type,
      description,
      status,
      created,
      salary_range:job_salaries (
        id,
        min,
        max,
        currency
      )
    `
    )
    .eq("status", "active")
    .overrideTypes<Job[]>();

  if (error) throw error;
  return data ?? [];
};
