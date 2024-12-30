import { Router } from "express";
import PrismaClient from "@repo/prisma/client";

const apiRouter = Router();

apiRouter.use("/users");
apiRouter.use("/sheets");
