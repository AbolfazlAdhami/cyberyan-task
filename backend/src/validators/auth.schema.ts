import { z } from "zod";

export const authSchema = z.object({
  did: z.string().min(5),
});
