import { Job, JobApplicationForm } from "../jobs/types";

export type Applicant = {
  job: Job;
  regencies: string[];
  form: JobApplicationForm;
};
