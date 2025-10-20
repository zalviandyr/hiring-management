import { useMutation, useQuery } from "@tanstack/react-query";
import { ApplicantFormData } from "../schema";
import { createApplicant } from "../api/create-applicant";
import { Job } from "@/features/jobs/types";
import { Applicant } from "../types";
import { getJob } from "@/features/jobs/api/get-job";
import { getJobApplicationForm } from "../api/get-job-application-form";

export const useApplicantKey = (jobSlug: string | undefined) => ["applicant", jobSlug] as const;

export const useApplicant = (jobSlug?: string) =>
  useQuery<Applicant | undefined>({
    queryKey: useApplicantKey(jobSlug),
    queryFn: async () => {
      if (!jobSlug) return undefined;

      try {
        const res = await fetch("/api/regencies");
        if (!res.ok) {
          throw new Error("Failed to load regencies");
        }

        const job = await getJob(jobSlug);
        const applicationForm = await getJobApplicationForm(job.id);
        const regencies = await res.json();

        return {
          job,
          regencies,
          form: applicationForm,
        } as Applicant;
      } catch (error) {
        throw error;
      }
    },
    enabled: Boolean(jobSlug),
  });

export const useCreateApplicant = () =>
  useMutation({
    mutationFn: async ({ data, job }: { data: ApplicantFormData; job: Job }) => {
      await createApplicant(data, job);
    },
  });
