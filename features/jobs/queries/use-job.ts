import { useQuery } from "@tanstack/react-query";
import { getJob } from "../api/get-job";
import { Job } from "../types";

export const useJobKey = ["job"];

export const useJob = (slug?: string) =>
  useQuery<Job | undefined>({
    queryKey: useJobKey,
    queryFn: async () => {
      if (slug) {
        return await getJob(slug);
      }
    },
    enabled: Boolean(slug),
  });
