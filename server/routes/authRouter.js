import express from "express";
import { registerUser, loginUser } from "../controllers/authContoller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.send("logout");
});
router.get("/getUser", (req, res) => {
  res.send("getUser");
});

export default router;
