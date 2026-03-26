import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

// 🔥 CORS FIX (IMPORTANT FOR MOBILE + VERCEL)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://social-app-beta-three.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// 🔥 BODY LIMIT (FOR IMAGE BASE64)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// 🔥 STATIC FILES
app.use("/uploads", express.static("uploads"));

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// 🔥 DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔥 PORT FIX (RENDER COMPATIBLE)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});