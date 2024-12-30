import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(409).json({
        success: false,
        message: "Not authorized - No Token",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: number;
    };

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Not autorized - invalid token",
      });
      return;
    }

    req.userId = decoded.id;
    console.log("User found", decoded);

    next();
  } catch (error) {
    console.log("Error while getting user details");
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
      return;
    } else {
      res.status(500).json({
        success: false,
        message: "Error in server",
      });
      return;
    }
  }
};
