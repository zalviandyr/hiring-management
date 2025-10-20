import { createClient } from "@/lib/supabase/client";
import { Job } from "../types";

export const getJobs = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      salary_range:job_salaries (*)
    `
    )
    .order("created", { ascending: false })
    .overrideTypes<Job[]>();

  if (error) throw error;
  return data ?? [];
};
