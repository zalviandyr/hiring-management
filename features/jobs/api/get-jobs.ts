import { createClient } from "@/lib/supabase/server";
import { Job } from "../types";

export const getJobs = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug,
      title,
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
    .overrideTypes<Job[]>();

  if (error) throw error;
  return data ?? [];
};
