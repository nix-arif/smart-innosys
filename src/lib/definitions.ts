import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(4, { message: "Must be at least 4 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(4, { message: "Must be at least 4 characters long." }),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload =
  | {
      userId: string;
      role: string;
      expiresAt: Date;
    }
  | undefined;
