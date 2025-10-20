import { createClient } from "@/lib/supabase/client";
import { FormRequirement, Job, JobApplicationForm, JobSalary } from "../types";
import { buildIncrementalId, buildSlug } from "@/lib/utils";
import { JobFormData } from "../schema";

export const createJob = async (data: JobFormData, formRequirements: FormRequirement[]) => {
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

  const { data: application } = await supabase
    .from("job_application_forms")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle()
    .overrideTypes<JobApplicationForm>()
    .throwOnError();

  const newSalaryId = buildIncrementalId({
    lastId: salary?.id,
    prefix: "salary",
  });
  const newJobId = buildIncrementalId({
    lastId: job?.id,
    prefix: "job",
  });
  const newApplicationId = buildIncrementalId({
    lastId: application?.id,
    prefix: "application",
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
    ...data,
    id: newJobId,
    slug: buildSlug(data.title, newJobId),
    status: "active",
    salary_range: newSalaryId,
  });

  await supabase.from("job_application_forms").insert({
    id: newApplicationId,
    job_id: newJobId,
    fields: formRequirements,
  });
};
