import { email, object, string } from "zod";

export const signInSchema = object({
   email: email().min(1, "Email is required"),
   password: string().min(1, "Password is required").min(6, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
})