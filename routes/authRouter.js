import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { hashPassword } from "../middleware/password.js";
const router = Router()

router.post("/register", hashPassword, register)

router.post("/login", login)

router.get('/logout', logout)

export default router