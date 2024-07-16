import { Router } from "express";
import { createBootcamp, deleteBootcamp, getBootcamps, getBootcamp, updateBootcamp, getBootcampsInRadius } from "../controllers/bootcampControllers.js";
import courseRouter from "./courseRouter.js"
const router = Router()

// Include other resource routers
router.use("/:bootcampId/courses", courseRouter)

router.get("/radius/:zipcode/:distance", getBootcampsInRadius)

router.get("/", getBootcamps)

router.get("/:id", getBootcamp)

router.post("/", createBootcamp)

router.put("/:id", updateBootcamp)

router.delete("/:id", deleteBootcamp)

export default router