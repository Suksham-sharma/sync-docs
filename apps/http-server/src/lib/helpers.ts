import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function ErrorResponse(res: Response, message: string) {
  const [status, response] = message.split(",");
  res.status(+status).json({ data: message });
}

export function SuccessResponse(
  res: Response,
  status: number,
  message: object | string
) {
  if (typeof message === "string") {
    res.status(status).json({ message });
    return;
  }
  res.status(status).json(message);
}

export function signJwtToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET);
}
