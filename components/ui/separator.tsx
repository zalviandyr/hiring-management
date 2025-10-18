"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  variant?: "normal" | "dashed";
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "normal",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        variant === "normal" && "bg-neutral-40",
        variant === "dashed" && "border border-neutral-40 border-dashed",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
