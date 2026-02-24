import crypto from "crypto";

export const generateSHA256 = (payload: string) => {
  return crypto.createHash("sha256").update(payload).digest("hex");
};
