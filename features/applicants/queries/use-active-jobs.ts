import { useQuery } from "@tanstack/react-query";
import { getActiveJobs } from "../api/get-active-jobs";

export const useActiveJobsKey = ["active-jobs"];

export const useActiveJobs = () =>
  useQuery({
    queryKey: useActiveJobsKey,
    queryFn: getActiveJobs,
  });
