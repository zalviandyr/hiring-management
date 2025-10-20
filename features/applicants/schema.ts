import z from "zod";
import { requiredDate } from "@/lib/validation/date";
import { FormRequirement } from "../jobs/types";

const makeOptional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema.optional());

const fieldSchemaMap = {
  full_name: () => z.string().min(1, "Full name is required"),
  photo_profile: () => z.string().min(1, "Photo profile is required"),
  date_of_birth: () => requiredDate("Date of birth is required"),
  gender: () => z.string().min(1, "Gender is required"),
  domicile: () => z.string().min(1, "Domicile is required"),
  phone_number: () => z.string().min(1, "Phone number is required"),
  email: () => z.email().min(1, "Phone number is required"),
  linkedin_link: () => z.url().min(1, "Phone number is required"),
} as const satisfies Record<string, () => z.ZodTypeAny>;

const formSchema = z.object({
  full_name: fieldSchemaMap.full_name(),
  photo_profile: fieldSchemaMap.photo_profile(),
  date_of_birth: fieldSchemaMap.date_of_birth(),
  gender: fieldSchemaMap.gender(),
  domicile: fieldSchemaMap.domicile(),
  phone_number: fieldSchemaMap.phone_number(),
  email: fieldSchemaMap.email(),
  linkedin_link: fieldSchemaMap.linkedin_link(),
});

type ApplicantFieldKey = keyof typeof fieldSchemaMap;
type ApplicantScheme = typeof formSchema;

export type ApplicantFormData = z.output<typeof formSchema>;

export const buildApplicantFormSchema = (requirements: FormRequirement[]): ApplicantScheme => {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const key of Object.keys(fieldSchemaMap) as ApplicantFieldKey[]) {
    const factory = fieldSchemaMap[key];
    const status = requirements.find((f) => f.key === key)?.value ?? "off";

    if (status === "mandatory") shape[key] = factory();
    if (status === "optional") shape[key] = makeOptional(factory());
  }

  return z.object(shape) as ApplicantScheme;
};
