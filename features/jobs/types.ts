export type JobStatus = "active" | "inactive" | "draft";

export type Job = {
  id: string;
  slug: string;
  title: string;
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
