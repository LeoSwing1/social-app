import express from "express";
import { toggleFollow, searchUsers } from "../controllers/userController.js";

const router = express.Router();

// 🔥 FOLLOW / UNFOLLOW USER
router.post("/follow", toggleFollow);

// 🔥 SEARCH USERS
router.get("/search", searchUsers);

export default router;