import { createClient } from "@/lib/supabase/client";
import { Job } from "../types";

export const getJob = async (slug: string): Promise<Job> => {
  const supabase = createClient();
  const { data } = await supabase
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
    .eq("slug", slug)
    .single()
    .overrideTypes<Job>()
    .throwOnError();

  return data;
};
