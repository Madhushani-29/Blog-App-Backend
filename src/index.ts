import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";
import MyRestaurantRoutes from "./routes/BlogRoutes";
import { v2 as cloudinary } from "cloudinary";
import RestaurantRoutes from "./routes/RestaurantRoutes";
import OrderRoutes from "./routes/OrderRoutes";

//create app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));


app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Health is ok" });
});
app.use("/api/my/user", UserRoutes);
app.use("/api/my/blogs", MyRestaurantRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
