import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser,
  getMe
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
// register route
router.post("/register", registerUser);
// login route
router.post("/login", loginUser);
// google login route
router.post("/google", googleLogin);
// logout route
router.post("/logout", logoutUser);
// get current user route
router.get("/me", authMiddleware, getMe);

export default router;