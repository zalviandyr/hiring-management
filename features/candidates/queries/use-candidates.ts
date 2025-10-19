import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../api/get-candidates";
import { ApplicantFormData } from "@/features/applicants/schema";

export const useCandidatesKey = ["candidates"];

export const useCandidates = (jobSlug?: string) =>
  useQuery<ApplicantFormData[]>({
    queryKey: useCandidatesKey,
    queryFn: async () => {
      if (jobSlug) {
        return await getCandidates(jobSlug);
      }

      return [];
    },
    enabled: Boolean(jobSlug),
  });
