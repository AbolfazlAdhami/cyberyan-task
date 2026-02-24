import { Request, Response } from "express";
import { generateDID } from "../services/did.service";
import { generateVC } from "../services/vc.service";
import { generateToken } from "../services/jwt.service";
import { registerSchema } from "../validators/register.schema";
import { AppError } from "../utils/AppError";

export const registerController = async (req: Request, res: Response) => {
  const parsed = registerSchema.parse(req.body);

  const { name, email } = parsed;

  const did = generateDID();
  const vc = generateVC(did, name, email);
  const token = generateToken(did);

  return res.status(201).json({
    did,
    vc,
    token,
  });
};
