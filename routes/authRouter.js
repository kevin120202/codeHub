import { Router } from "express";
import { forgotPassword, getCurrentUser, login, logout, register, resetPassword, updateDetails, updatePassword } from "../controllers/authController.js";
// import { hashPassword } from "../middleware/password.js";
import { protect } from "../middleware/auth.js";
const router = Router()

router.post("/register", register)

router.post("/login", login)

router.get('/logout', logout)

router.get("/me", protect, getCurrentUser)

router.put("/updatedetails", protect, updateDetails)

router.put("/updatepassword", protect, updatePassword)

router.post("/forgotpassword", forgotPassword)

router.put("/resetpassword/:resettoken", resetPassword)

export default router