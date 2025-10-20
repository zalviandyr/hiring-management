export type JobStatus = "active" | "inactive" | "draft";

export type FieldStatus = "mandatory" | "optional" | "off";

export type Job = {
  id: string;
  slug: string;
  department: string;
  type: string;
  title: string;
  description: string;
  status: JobStatus;
  created: Date;
  salary_range: JobSalary;
};

export type JobSalary = {
  id: string;
  min: number;
  max: number;
  currency: string;
};

export type JobApplicationForm = {
  id: string;
  job_id: string;
  fields: FormRequirement[];
};

export type FormRequirement = {
  key: string;
  label: string;
  value: FieldStatus;
  status: { key: FormRequirement["value"]; disabled: boolean }[];
};
