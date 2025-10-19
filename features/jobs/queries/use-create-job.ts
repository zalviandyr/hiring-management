import { useMutation } from "@tanstack/react-query";

export const useCrateJob = () =>
  useMutation({
    mutationFn: async () => {},
  });
