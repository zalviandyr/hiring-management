import { ComboboxInput } from "@/components/input/combobox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const properties = ["Full name", "Photo Profile", "Gender"];

  return (
    <>
      <DialogHeader className="border-b border-neutral-40 pb-4 px-6 -mx-6">
        <DialogTitle className="font-bold text-lg">Job Opening</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-4 max-h-[600px] overflow-scroll py-4">
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

        <div className="border border-neutral-30 rounded-lg flex flex-col p-4 gap-4">
          <span className="text-sm font-bold">Minimum Profile Information Required</span>

          <div className="flex flex-col">
            {properties.map((e, idx) => (
              <div
                className={cn(
                  "flex flex-row text-sm py-4",
                  idx < properties.length - 1 && "border-b border-neutral-40",
                  idx === properties.length - 1 && "pb-0"
                )}
              >
                <span className="grow my-auto">{e}</span>

                <div className="flex flex-row gap-2">
                  <Chip label="Mandatory" isSelected />
                  <Chip label="Optional" isSelected={false} />
                  <Chip label="Off" isSelected={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter className="border-t border-neutral-40 px-6 -mx-6 pt-6 flex items-end">
        <Button type="button" variant="primary" className="w-fit">
          Publish job
        </Button>
      </DialogFooter>
    </>
  );
};
