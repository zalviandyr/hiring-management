"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group z-[999999]"
      icons={{
        success: <CircleCheckIcon className="size-4 text-success-main" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4 text-secondary-main" />,
        error: <OctagonXIcon className="size-4 text-danger-main" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
