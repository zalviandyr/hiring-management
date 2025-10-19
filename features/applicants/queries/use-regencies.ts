import { useQuery } from "@tanstack/react-query";

export const useRegenciesKey = ["regencies"];

export const useRegencies = () =>
  useQuery<string[]>({
    queryKey: useRegenciesKey,
    queryFn: () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await fetch("/api/regencies");
          if (!res.ok) {
            return reject(new Error("Failed to load regencies"));
          }

          const data = await res.json();
          return resolve(data);
        } catch (error) {
          return reject(error);
        }
      }),
  });
