import { Request, Response } from "express";
import { generateSHA256 } from "../utils/hash.util";

export const auditController = (req: Request, res: Response) => {
  const { id } = req.params;

  const hash = generateSHA256(`${id}${Date.now()}`);

  return res.json({
    vcId: id,
    hash,
    timestamp: new Date().toISOString(),
  });
};
