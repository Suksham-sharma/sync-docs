import prismaClient from "@repo/prisma/client";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { ErrorResponse, signJwtToken, SuccessResponse } from "../lib/helpers";
import { signInData, signUpData } from "@repo/zod";

const userRouter = Router();

userRouter.get("/me", (req: Request, res: Response) => {
  try {
  } catch (error: any) {}
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const signupPayload = signUpData.safeParse(req.body);

    if (!signupPayload.success) throw new Error("400 , Bad Request");

    const { username, password } = signupPayload.data;
    const findUser = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (findUser) throw new Error("409 , User already exists");

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = signJwtToken({ id: user.id, username: user.username });

    SuccessResponse(res, 201, {
      token,
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof Error) ErrorResponse(res, error.message);
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const signInPayload = signInData.safeParse(req.body);

    if (!signInPayload.success) throw new Error("400 , Bad Request");

    const findUser = await prismaClient.user.findUnique({
      where: {
        username: signInPayload.data.username,
      },
    });

    if (!findUser) throw new Error("404 , User not found");

    const isAuthenticated = bcrypt.compare(
      signInPayload.data.password,
      findUser?.password
    );

    if (!isAuthenticated) throw new Error("401 , Unauthorized");

    const token = signJwtToken({
      id: findUser.id,
      username: findUser.username,
    });

    SuccessResponse(res, 200, {
      token,
      userId: findUser.id,
    });
  } catch (error: any) {
    ErrorResponse(res, error.message);
  }
});
