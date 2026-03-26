import express from "express";
import {
  toggleFollow,
  searchUsers,
  getUserProfile
} from "../controllers/userController.js";

const router = express.Router();

// 🔥 FOLLOW / UNFOLLOW USER
router.post("/follow", toggleFollow);

// 🔥 SEARCH USERS
router.get("/search", searchUsers);

// 🔥 GET USER PROFILE (VERY IMPORTANT)
router.get("/:id", getUserProfile);

export default router;