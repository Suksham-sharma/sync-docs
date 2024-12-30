import express, { Request, Response } from "express";
import cors from "cors";
import { protectRoute } from "./middleware/middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", protectRoute, (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(4000, () => {
  console.log("Server Started at Port 4000");
});
