import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({ message: "Email is required" }),
  passportImage: z.string().min(1, "Passport image required"),
  selfieImage: z.string().min(1, "Selfie image required"),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
