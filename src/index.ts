import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";
import MyBlogRoutes from "./routes/MyBlogRoutes";
import PublicBlogRoutes from "./routes/PublicBlogRoutes";
import { v2 as cloudinary } from "cloudinary";

const app = express();

const port = process.env.PORT || 3001;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://blog-app-frontend-two-topaz.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Success ok" });
});

app.get("/healthz", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Health is ok" });
});
app.use("/api/my/user", UserRoutes);
app.use("/api/my/blogs", MyBlogRoutes);
app.use("/api/public/blogs", PublicBlogRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
