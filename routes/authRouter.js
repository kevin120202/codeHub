import { Router } from "express";
import { forgotPassword, getCurrentUser, login, logout, register, resetPassword } from "../controllers/authController.js";
// import { hashPassword } from "../middleware/password.js";
import { protect } from "../middleware/auth.js";
const router = Router()

router.post("/register", register)

router.post("/login", login)

router.get('/logout', logout)

router.get("/me", protect, getCurrentUser)

router.post("/forgotpassword", forgotPassword)

router.put("/resetpassword/:resettoken", resetPassword)

export default router