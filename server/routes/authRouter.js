import express from "express";
import { registerUser, loginUser } from "../controllers/authContoller.js";
import { protectedMiddleware, getCurrentUser, logoutUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", protectedMiddleware, logoutUser);

router.get('/getUser', protectedMiddleware, getCurrentUser);

export default router;
