import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ BODY PARSER
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ STATIC
app.use("/uploads", express.static("uploads"));

// ✅ TEST
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);   // 🔥 login/signup
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes); // 🔥 follow/search

// ✅ DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("DB:", mongoose.connection.name); // should be socialapp
  })
  .catch((err) => console.log(err));

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});