import { requiredDate } from "@/lib/validation/date";
import z from "zod";

export const formSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  photo_profile: z.string().min(1, "Photo profile is required"),
  date_of_birth: requiredDate("Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  domicile: z.string().min(1, "Domicile is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  email: z.email().min(1, "Phone number is required"),
  linkedin_link: z.url().min(1, "Phone number is required"),
});

export type ApplicantFormInput = z.input<typeof formSchema>;
export type ApplicantFormData = z.output<typeof formSchema>;
