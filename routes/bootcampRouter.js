import { Router } from "express";
import { createBootcamp, deleteBootcamp, getBootcamps, getBootcamp, updateBootcamp } from "../controllers/bootcampControllers.js";
const router = Router()

router.get("/", getBootcamps)

router.get("/:id", getBootcamp)

router.post("/", createBootcamp)

router.put("/:id", updateBootcamp)

router.delete("/:id", deleteBootcamp)

export default router