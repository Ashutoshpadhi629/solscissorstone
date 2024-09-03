import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { addEmail } from "./db/waitlist";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "Healthy" });
});

app.post("/api/waitlist", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const newEntry = await addEmail(email);
    res
      .status(200)
      .json({ message: "Email added successfully", data: newEntry });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
