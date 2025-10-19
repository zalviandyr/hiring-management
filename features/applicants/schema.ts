import { requiredDate } from "@/lib/validation/date";
import z from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: requiredDate("Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  domicile: z.string().min(1, "Domicile is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.email().min(1, "Phone number is required"),
  linkedinLink: z.url().min(1, "Phone number is required"),
});

export type ApplicantFormInput = z.input<typeof formSchema>;
export type ApplicantFormData = z.output<typeof formSchema>;
