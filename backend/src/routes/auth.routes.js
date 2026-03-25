import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser
} from "../controllers/auth.controller.js";

const router = express.Router();
// register route
router.post("/register", registerUser);
// login route
router.post("/login", loginUser);
// google login route
router.post("/google", googleLogin);
// logout route
router.post("/logout", logoutUser);

export default router;