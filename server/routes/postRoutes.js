import express from "express";
import {
  createPost,
  getPosts,
  toggleLike,
  addComment
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.post("/like", toggleLike);
router.post("/comment", addComment);

export default router;