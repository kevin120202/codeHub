import { Router } from "express";
import { createBootcamp, deleteBootcamp, getAllBootcamps, getBootcamp, updateBootcamp } from "../controllers/bootcampControllers.js";
const router = Router()

router.get("/", getAllBootcamps)

router.get("/:id", getBootcamp)

router.post("/", createBootcamp)

router.put("/:id", updateBootcamp)

router.delete("/:id", deleteBootcamp)

export default router