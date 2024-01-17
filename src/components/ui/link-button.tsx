import { type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
}

const LinkButton = (props: LinkButtonProps) => {
  const { variant, size, className } = props;
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    />
  );
};
LinkButton.displayName = "LinkButton";

export { LinkButton, buttonVariants };
