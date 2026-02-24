import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const generateToken = (did: string): string => {
  return jwt.sign(
    {
      sub: did,
      scope: "wallet_access",
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );
};
