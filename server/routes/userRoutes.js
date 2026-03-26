import express from "express";
import { toggleFollow, searchUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/follow", toggleFollow);
router.get("/search", searchUsers);

export default router;