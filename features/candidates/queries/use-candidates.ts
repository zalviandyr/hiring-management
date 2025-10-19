import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../api/get-candidates";
import { ApplicantFormData } from "@/features/applicants/schema";

export const useCandidatesKey = (jobSlug: string | undefined) => ["candidates", jobSlug] as const;

export const useCandidates = (jobSlug?: string) =>
  useQuery<ApplicantFormData[]>({
    queryKey: useCandidatesKey(jobSlug),
    queryFn: () => {
      if (!jobSlug) return [];
      return getCandidates(jobSlug);
    },
    enabled: Boolean(jobSlug),
  });
