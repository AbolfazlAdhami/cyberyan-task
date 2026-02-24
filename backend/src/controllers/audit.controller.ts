import { Request, Response } from "express";
import { generateSHA256 } from "../utils/hash.util";
import { AppError } from "../utils/AppError";

export const auditController = (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    throw new AppError("VC ID is required", 400);
  }

  const hash = generateSHA256(`${id}${Date.now()}`);

  return res.json({
    vcId: id,
    hash,
    timestamp: new Date().toISOString(),
  });
};
