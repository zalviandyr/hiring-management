import { ComboboxInput } from "@/components/input/combobox";
import { DatePickerInput } from "@/components/input/date-picker";
import { PhoneNumberInput } from "@/components/input/phone-number";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftIcon, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CapturePicture } from "./_components/CapturePicture";

type JobPageProps = {
  params: Promise<{ jobSlug: string }>;
};

const JobPage = async ({ params }: JobPageProps) => {
  const { jobSlug } = await params;

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

            <span className="font-bold text-lg text-neutral-100">Apply {jobSlug}</span>
          </div>

          <span className="text-sm">ℹ️ This field required to fill</span>
        </div>

        <div className="flex flex-col px-16">
          <span className="text-danger-main text-xs font-bold">* Required</span>

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

              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input id="name" autoComplete="off" placeholder="Enter you full name" />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Date of birth</FieldLabel>
                <DatePickerInput />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Pronoun (gender)*</FieldLabel>
                <RadioGroup className="flex flex-row gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">She/her (Female)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">He/him (Male)</Label>
                  </div>
                </RadioGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Domicile*</FieldLabel>
                <ComboboxInput placeholder="Choose your domicile" />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Phone number*</FieldLabel>
                <PhoneNumberInput />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Email*</FieldLabel>
                <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Link Linkedin*</FieldLabel>
                <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </div>

      <Button type="button" className="my-6 mx-10" variant="primary">
        Submit
      </Button>
    </div>
  );
};

export default JobPage;
