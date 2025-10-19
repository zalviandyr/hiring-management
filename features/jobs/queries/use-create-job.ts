import { useMutation } from "@tanstack/react-query";
import { JobFormData } from "../schema";
import { createJob } from "../api/create-job";

export const useCreateJob = () =>
  useMutation({
    mutationFn: async (data: JobFormData) => {
      await createJob(data);
    },
  });
