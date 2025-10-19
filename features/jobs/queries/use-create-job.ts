import { useMutation } from "@tanstack/react-query";
import { JobFormData } from "../schema";
import { createJob } from "../api/create-job";
import { FormRequirement } from "../types";

export const useCreateJob = () =>
  useMutation({
    mutationFn: async ({
      data,
      formRequirements,
    }: {
      data: JobFormData;
      formRequirements: FormRequirement[];
    }) => {
      await createJob(data, formRequirements);
    },
  });
