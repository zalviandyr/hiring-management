"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";

export const AdminHeader = () => {
  const pathname = usePathname();
  const params = useParams<{ jobSlug?: string }>();

  const breadcrumbs = [
    {
      label: "Job List",
      href: "/admin",
      isActive: pathname === "/admin",
    },
  ];

  if (params?.jobSlug) {
    breadcrumbs.push({
      label: "Manage Candidate",
      href: `/admin/${params.jobSlug}`,
      isActive: true,
    });
  }

  return (
    <div className="bg-neutral-10 flex flex-row 2xl:px-32 px-10 h-12 py-3 items-center shadow-lg">
      <div className="w-full flex flex-row items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.label}>
            {crumb.isActive ? (
              <Button type="button" size="sm" disabled>
                {crumb.label}
              </Button>
            ) : (
              <Link href={crumb.href}>
                <Button type="button" size="sm">
                  {crumb.label}
                </Button>
              </Link>
            )}

            {index < breadcrumbs.length - 1 && <ChevronRight />}
          </Fragment>
        ))}
      </div>

      <div className="flex flex-row items-center gap-4 w-full h-full justify-end">
        <Link href={"/"}>
          <Button type="button" size="sm">
            Home
          </Button>
        </Link>

        <Separator orientation="vertical" />

        <div className="relative h-7 w-7 rounded-full border border-neutral-40">
          <Image src={"/images/profile.png"} alt="Profile Image" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};
