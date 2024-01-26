"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkButton } from "@/components/ui/link-button";
import { register } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(register, undefined);
  const { pending } = useFormStatus();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full space-y-4">
        <div id="header" className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
        </div>

        <div id="login-form" className={cn("grid gap-6")}>
          <form action={dispatch}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={pending}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={pending}
                />
              </div>

              <Button disabled={pending}>
                {pending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up with Email
              </Button>
              <LinkButton href="/login">Sign In</LinkButton>
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            </div>
          </form>
        </div>

        <p id="tos" className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
