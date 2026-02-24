import { Request, Response } from "express";
import { authSchema } from "../validators/auth.schema";
import { generateToken } from "../services/jwt.service";

export const authController = (req: Request, res: Response) => {
  const parsed = authSchema.parse(req.body);

  const token = generateToken(parsed.did);

  return res.json({
    token,
    expiresIn: "1h",
  });
};
