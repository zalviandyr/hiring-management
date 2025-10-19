"use client";

import { ComboboxInput } from "@/components/input/combobox";
import { DatePickerInput } from "@/components/input/date-picker";
import { PhoneNumberInput } from "@/components/input/phone-number";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftIcon, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CapturePicture } from "./_components/CapturePicture";
import { useParams } from "next/navigation";
import { useJob } from "@/features/jobs/queries/use-job";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicantFormData, ApplicantFormInput, formSchema } from "@/features/applicants/schema";

const JobPage = () => {
  const { jobSlug } = useParams<{ jobSlug?: string }>();
  const { data } = useJob(jobSlug);

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

  const form = useForm<ApplicantFormInput, undefined, ApplicantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      domicile: "",
      email: "",
      linkedinLink: "",
    },
  });

  const onSubmit = (values: ApplicantFormData) => {
    console.warn({ values });
  };

  return (
    <div className="flex flex-col w-1/2 mx-auto bg-neutral-10">
      <div className="flex flex-col gap-6 border border-neutral-40 py-10">
        <div className="flex flex-row justify-between px-10">
          <div className="flex flex-row items-center gap-4">
            <Link href={"/"}>
              <Button type="button" size="icon-sm">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>

            <span className="font-bold text-lg text-neutral-100">Apply {data?.title}</span>
          </div>

          <span className="text-sm">ℹ️ This field required to fill</span>
        </div>

        <div className="flex flex-col px-16 gap-4">
          <span className="text-danger-main text-xs font-bold">* Required</span>

          <Form {...form}>
            <FieldSet>
              <FieldGroup>
                <div className="flex flex-col items-start gap-2">
                  <span className="font-bold text-xs">Photo Profile</span>
                  <div className="relative h-32 w-32">
                    <Image src={"/images/avatar.png"} alt="Avatar" fill />
                  </div>

                  <CapturePicture>
                    <Button>
                      <Upload className="h-4 w-4" />
                      Take a Picture
                    </Button>
                  </CapturePicture>
                </div>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel required>Full name</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter you full name" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel required>Date of birth</FormLabel>

                        <FormControl>
                          <DatePickerInput onChange={(e) => field.onChange(e)} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel required>Pronoun (gender)</FormLabel>

                        <FormControl>
                          <RadioGroup
                            className="flex flex-row gap-3"
                            value={field.value}
                            onValueChange={field.onChange}
                            onBlur={field.onBlur}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">She/her (Female)</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">He/him (Male)</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="domicile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel required>Domicile</FormLabel>

                        <FormControl>
                          <ComboboxInput
                            placeholder="Choose your domicile"
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
                  name="phoneNumber"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel required>Phone number*</FormLabel>

                        <FormControl>
                          <PhoneNumberInput onChange={(e) => field.onChange(e)} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel required>Email</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter your email address" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="linkedinLink"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FieldLabel required>Link Linkedin</FieldLabel>

                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/in/username" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FieldGroup>
            </FieldSet>
          </Form>
        </div>
      </div>

      <Button
        type="button"
        className="my-6 mx-10"
        variant="primary"
        // isLoading={isPending}
        onClick={form.handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </div>
  );
};

export default JobPage;
