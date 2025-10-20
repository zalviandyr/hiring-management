import { Job } from "@/features/jobs/types";
import { createClient } from "@/lib/supabase/client";

export const getActiveJobs = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      salary_range:job_salaries (*)
    `
    )
    .eq("status", "active")
    .order("created", { ascending: false })
    .overrideTypes<Job[]>();

  if (error) throw error;
  return data ?? [];
};
