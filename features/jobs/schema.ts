import { z } from "zod";
import { requiredNumber } from "@/lib/validation/number";

export const formSchema = z.object({
  title: z.string().min(1, "Job name is required"),
  type: z.string().min(1, "Job type is required"),
  description: z.string().min(1, "Job description is required"),
  max_candidate: requiredNumber("Number of candidates is required"),
  salary_range: z.object({
    min: requiredNumber("Minimum estimated salary is required"),
    max: requiredNumber("Maximum estimated salary is required"),
  }),
});

export type JobFormInput = z.input<typeof formSchema>;
export type JobFormData = z.output<typeof formSchema>;
