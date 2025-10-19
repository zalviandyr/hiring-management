import { createClient } from "@/lib/supabase/client";
import { Job, JobSalary } from "../types";
import { buildIncrementalId, buildSlug } from "@/lib/utils";
import { JobFormData } from "../schema";

export const createJob = async (data: JobFormData) => {
  const supabase = createClient();

  const { data: salary } = await supabase
    .from("job_salaries")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle()
    .overrideTypes<JobSalary>()
    .throwOnError();

  const { data: job } = await supabase
    .from("jobs")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle()
    .overrideTypes<Job>()
    .throwOnError();

  const newSalaryId = buildIncrementalId({
    lastId: salary?.id,
    prefix: "salary",
  });
  const newJobId = buildIncrementalId({
    lastId: job?.id,
    prefix: "job",
  });

  await supabase
    .from("job_salaries")
    .insert({
      id: newSalaryId,
      min: data.salary_range.min,
      max: data.salary_range.max,
      currency: "IDR",
    })
    .throwOnError();

  await supabase.from("jobs").insert({
    id: newJobId,
    title: data.title,
    description: data.description,
    max_candidate: data.max_candidate,
    type: data.type,
    slug: buildSlug(data.title, newJobId),
    status: "active",
    salary_range: newSalaryId,
  });
};
