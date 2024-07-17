import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
const router = Router()

router.post("/register", register)

router.post("/login", login)

router.get('/logout', logout)

export default router