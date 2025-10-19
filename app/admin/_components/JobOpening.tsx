import { ComboboxInput } from "@/components/input/combobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const JobOpening = ({ children }: React.PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="!max-w-[700px]">
        <JobOpeningContent />
      </DialogContent>
    </Dialog>
  );
};

const JobOpeningContent = () => {
  return (
    <>
      <DialogHeader className="border-b border-neutral-40 pb-4 px-6 -mx-6">
        <DialogTitle className="font-bold text-lg">Job Opening</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Ex. Front End Engineer" />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Job Type</FieldLabel>
              <ComboboxInput placeholder="Select job type" />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Job Description</FieldLabel>
              <Textarea placeholder="Ex." />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Number of Candidate Needed*</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Ex. Front End Engineer" />
            </Field>

            <Separator variant="dashed" />

            <FieldLabel>Job Salary</FieldLabel>

            <div className="flex flex-row gap-4 items-center justify-center">
              <Field>
                <FieldLabel htmlFor="name">Minimum Estimated Salary</FieldLabel>
                <Input id="name" autoComplete="off" placeholder="Ex. Front End Engineer" />
              </Field>

              <Separator className="!w-6 mt-6" />

              <Field>
                <FieldLabel htmlFor="name">Maximum Estimated Salary</FieldLabel>
                <Input id="name" autoComplete="off" placeholder="Ex. Front End Engineer" />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
      </div>
    </>
  );
};
