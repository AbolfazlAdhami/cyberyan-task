import { Request, Response } from "express";
import { registerSchema } from "../validators/register.schema";
import { generateDID } from "../services/did.service";
import { generateVC } from "../services/vc.service";
import { generateToken } from "../services/jwt.service";

export const registerController = (req: Request, res: Response) => {
  const parsed = registerSchema.parse(req.body);

  const did = generateDID();
  const vc = generateVC(did, parsed.name, parsed.email);
  const token = generateToken(did);

  return res.status(201).json({
    did,
    vc,
    token,
  });
};
