import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/get-jobs";

export const useJobsKey = ["jobs"];

export const useJobs = () =>
  useQuery({
    queryKey: useJobsKey,
    queryFn: getJobs,
  });
