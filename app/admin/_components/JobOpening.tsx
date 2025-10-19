"use client";

import { ComboboxInput } from "@/components/input/combobox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateJob } from "@/features/jobs/queries/use-create-job";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, JobFormData, JobFormInput } from "@/features/jobs/schema";

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
  const types = [
    {
      value: "Full-time",
      label: "Full-time",
    },
    {
      value: "Contract",
      label: "Contract",
    },
    {
      value: "Part-time",
      label: "Part-time",
    },
    {
      value: "Internship",
      label: "Internship",
    },
    {
      value: "Freelance",
      label: "Freelance",
    },
  ];

  const form = useForm<JobFormInput, undefined, JobFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
    },
  });

  const { mutate, isPending } = useCreateJob();
  const onSubmit = (values: JobFormData) => mutate(values);

  return (
    <>
      <DialogHeader className="border-b border-neutral-40 pb-4 px-6 -mx-6">
        <DialogTitle className="font-bold text-lg">Job Opening</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-4 max-h-[600px] overflow-scroll py-4">
        <Form {...form}>
          <FieldSet>
            <FieldGroup>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel required>Job Name</FormLabel>

                      <FormControl>
                        <Input {...field} placeholder="Ex. Front End Engineer" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel required>Job Type</FormLabel>

                      <FormControl>
                        <ComboboxInput
                          placeholder="Select job type"
                          options={types}
                          onChange={(e) => field.onChange(e)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel required>Job Description</FormLabel>

                      <FormControl>
                        <Textarea placeholder="Ex." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="max_candidate"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FieldLabel required>Number of Candidate Needed</FieldLabel>

                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ex. 2"
                          {...form.register(field.name, { valueAsNumber: true })}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Separator variant="dashed" />

              <FieldLabel>Job Salary</FieldLabel>

              <div className="flex flex-row gap-4 items-center justify-center">
                <FormField
                  control={form.control}
                  name="salary_range.min"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel required>Minimum Estimated Salary</FormLabel>

                        <FormControl>
                          <InputGroup>
                            <InputGroupAddon className="text-sm font-bold">Rp.</InputGroupAddon>

                            <InputGroupInput
                              autoComplete="off"
                              type="number"
                              placeholder="5.000.000"
                              {...form.register(field.name, { valueAsNumber: true })}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Separator className="!w-6 mt-6" />

                <FormField
                  control={form.control}
                  name="salary_range.max"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FieldLabel required>Maximum Estimated Salary</FieldLabel>

                        <FormControl>
                          <InputGroup>
                            <InputGroupAddon className="text-sm font-bold">Rp.</InputGroupAddon>

                            <InputGroupInput
                              autoComplete="off"
                              type="number"
                              placeholder="7.000.000"
                              {...form.register(field.name, { valueAsNumber: true })}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </FieldGroup>
          </FieldSet>
        </Form>

        <div className="border border-neutral-30 rounded-lg flex flex-col p-4 gap-4">
          <span className="text-sm font-bold">Minimum Profile Information Required</span>

          <div className="flex flex-col">
            {properties.map((e, idx) => (
              <div
                key={e}
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
        <Button
          type="button"
          variant="primary"
          className="w-fit"
          onClick={form.handleSubmit(onSubmit)}
        >
          Publish job
        </Button>
      </DialogFooter>
    </>
  );
};
