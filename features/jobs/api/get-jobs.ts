import { createClient } from "@/lib/supabase/client";
import { Job } from "../types";

export const getJobs = async () => {
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
    .order("created", { ascending: false })
    .overrideTypes<Job[]>();

  if (error) throw error;
  return data ?? [];
};
