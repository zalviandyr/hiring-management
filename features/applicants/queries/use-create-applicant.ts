import { useMutation } from "@tanstack/react-query";
import { ApplicantFormData } from "../schema";
import { createApplicant } from "../api/create-applicant";
import { Job } from "@/features/jobs/types";

export const useCreateApplicant = () =>
  useMutation({
    mutationFn: async ({ data, job }: { data: ApplicantFormData; job: Job }) => {
      await createApplicant(data, job);
    },
  });
