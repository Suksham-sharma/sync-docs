import { Router, Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../lib/helpers";
import { createSheetData } from "@repo/zod";
import prismaClient from "@repo/prisma/client";

const sheetRouter = Router();

sheetRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) throw new Error("403 , Unauthorized");

    const createSheetPayload = createSheetData.safeParse(req.body);
    createSheetPayload.data;

    if (!createSheetPayload.success) throw new Error("400 , Bad Request");

    const sheet = await prismaClient.sheet.create({
      data: {
        ...createSheetPayload.data,
        userId,
      },
    });

    SuccessResponse(res, 201, sheet);
  } catch (error: any) {
    ErrorResponse(res, error.message);
  }
});

sheetRouter.delete("/delete/:slug", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) throw new Error("403 , Unauthorized");

    const { slug } = req.params;

    const sheet = await prismaClient.sheet.findFirst({
      where: {
        slug,
        userId,
      },
    });

    if (!sheet) throw new Error("404 , Sheet not found");

    await prismaClient.sheet.delete({
      where: {
        id: sheet.id,
      },
    });

    SuccessResponse(res, 200, {
      message: "Sheet deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) ErrorResponse(res, error.message);
  }
});
