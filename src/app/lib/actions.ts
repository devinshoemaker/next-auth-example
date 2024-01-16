"use server";

import { signIn, signUp } from "@/auth";
import { AuthError } from "next-auth";

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {  
    await signUp(formData);
  } catch (e) {
    console.log(e)
    return "Something went wrong.";
  }
  // catch and throw?

  await authenticate(undefined, formData);
  // catch and throw?
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
