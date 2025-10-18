import { DatePicker } from "@/components/input/date-picker";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "next/link";

type JobPageProps = {
  params: Promise<{ jobSlug: string }>;
};

const JobPage = async ({ params }: JobPageProps) => {
  const { jobSlug } = await params;

  return (
    <div className="flex flex-col w-1/2 gap-6 border py-10 mx-auto border-neutral-40 bg-neutral-10">
      <div className="flex flex-row justify-between px-10">
        <div className="flex flex-row items-center gap-4">
          <Link href={"/"}>
            <Button type="button" size="icon-sm">
              <div className="relative h-5 w-5">
                <Image src={"/icons/back.svg"} alt="Upload" fill />
              </div>
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
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xs">Photo Profile</span>
              <div className="relative h-32 w-32">
                <Image src={"/images/avatar.png"} alt="Avatar" fill />
              </div>

              <Button type="button" className="w-fit">
                <div className="relative h-4 w-4">
                  <Image src={"/icons/upload.svg"} alt="Upload" fill />
                </div>
                Take a Picture
              </Button>
            </div>

            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Enter you full name" />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Date of birth</FieldLabel>
              <DatePicker />
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
              <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Phone number*</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
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
  );
};

export default JobPage;
