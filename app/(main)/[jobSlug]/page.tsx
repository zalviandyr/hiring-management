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
import { CapturePicture } from "./_components/CapturePicture";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicantFormData, buildApplicantFormSchema } from "@/features/applicants/schema";
import { useApplicant, useCreateApplicant } from "@/features/applicants/queries/use-applicant";
import { toast } from "sonner";
import { Loading } from "@/components/ui/loading";
import { useMemo, useState } from "react";
import z from "zod";
import { ApplySuccess } from "../_components/ApplySuccess";

type State = "success" | "form";

const JobPage = () => {
  const router = useRouter();
  const [curState, setCurState] = useState<State>("form");

  const { jobSlug } = useParams<{ jobSlug?: string }>();
  const { data, isPending } = useApplicant(jobSlug);
  const { mutate, isPending: isCreateApplicationLoading } = useCreateApplicant();

  const schema = useMemo(
    () => buildApplicantFormSchema(data?.form.fields ?? []),
    [data?.form.fields]
  );
  type ApplicantFormInput = z.input<typeof schema>;
  const form = useForm<ApplicantFormInput, undefined, ApplicantFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      photo_profile: "",
      full_name: "",
      gender: "",
      domicile: "",
      email: "",
      phone_number: "",
      linkedin_link: "",
    },
  });

  const onSubmit = (values: ApplicantFormData) => {
    if (data) {
      mutate(
        { data: values, job: data.job },
        {
          onSuccess: () => {
            toast.success("Your application has been submitted successfully.");

            setCurState("success");
          },
          onError: () => {
            toast.error(`Failed to apply ${data.job.title} Job`);
          },
        }
      );
    }
  };

  const onDone = () => {
    router.back();
  };

  const getIsFieldVisible = (key: string): boolean => {
    const field = data?.form.fields?.find((e) => e.key === key);
    return field?.value === "mandatory" || field?.value === "optional";
  };

  const getIsFieldRequired = (key: string): boolean => {
    const field = data?.form.fields?.find((e) => e.key === key);
    return field?.value === "mandatory";
  };

  if (isPending) {
    return (
      <div className="flex flex-col w-1/2 mx-auto bg-neutral-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-1/2 mx-auto bg-neutral-10">
      <div className="flex flex-col gap-6 border border-neutral-40 py-10">
        <div className="flex flex-row justify-between px-10">
          <div className="flex flex-row items-center gap-4">
            <Button type="button" size="icon-sm" onClick={() => router.back()}>
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>

            <span className="font-bold text-lg text-neutral-100">Apply {data?.job.title}</span>
          </div>

          {curState === "form" && <span className="text-sm">ℹ️ This field required to fill</span>}
        </div>

        {curState === "success" && <ApplySuccess />}

        {curState === "form" && (
          <div className="flex flex-col px-16 gap-4">
            <span className="text-danger-main text-xs font-bold">* Required</span>

            <Form {...form}>
              <FieldSet>
                <FieldGroup>
                  {getIsFieldVisible("photo_profile") && (
                    <FormField
                      control={form.control}
                      name="photo_profile"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel required={getIsFieldRequired(field.name)}>
                              Photo Profile
                            </FormLabel>

                            {Boolean(field.value) ? (
                              <img
                                className="h-32 w-32 rounded-md object-cover"
                                src={field.value}
                              />
                            ) : (
                              <div className="relative h-32 w-32">
                                <Image src={"/images/avatar.png"} alt="Avatar" fill />
                              </div>
                            )}

                            <CapturePicture onCapture={field.onChange}>
                              <Button>
                                <Upload className="h-4 w-4" />
                                Take a Picture
                              </Button>
                            </CapturePicture>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => {
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>Full name</FormLabel>

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
                    name="date_of_birth"
                    render={({ field }) => {
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>
                            Date of birth
                          </FormLabel>

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
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>
                            Pronoun (gender)
                          </FormLabel>

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
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>Domicile</FormLabel>

                          <FormControl>
                            <ComboboxInput
                              placeholder="Choose your domicile"
                              options={data?.regencies.map((e) => ({
                                value: e,
                                label: e,
                              }))}
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
                    name="phone_number"
                    render={({ field }) => {
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>
                            Phone number
                          </FormLabel>

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
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>Email</FormLabel>

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
                    name="linkedin_link"
                    render={({ field }) => {
                      if (!getIsFieldVisible(field.name)) {
                        return <></>;
                      }

                      return (
                        <FormItem>
                          <FormLabel required={getIsFieldRequired(field.name)}>
                            Link Linkedin
                          </FormLabel>

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
        )}
      </div>

      <Button
        type="button"
        className="my-6 mx-10"
        variant="primary"
        isLoading={isCreateApplicationLoading}
        onClick={() => {
          if (curState === "form") form.handleSubmit(onSubmit)();
          if (curState === "success") onDone();
        }}
      >
        {curState === "form" && "Submit"}
        {curState === "success" && "Done"}
      </Button>
    </div>
  );
};

export default JobPage;
