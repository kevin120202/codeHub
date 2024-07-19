import { Router } from "express";
import { createBootcamp, deleteBootcamp, getBootcamps, getBootcamp, updateBootcamp, getBootcampsInRadius, bootcampPhotoUpload } from "../controllers/bootcampControllers.js";
import courseRouter from "./courseRouter.js"
import { advancedResults } from "../middleware/advancedResults.js";
import Bootcamp from "../models/BootcampModel.js";
import { protect } from "../middleware/auth.js";
const router = Router()

// Include other resource routers
router.use("/:bootcampId/courses", courseRouter)

router.get("/radius/:zipcode/:distance", getBootcampsInRadius)

router.get("/", advancedResults(Bootcamp, "courses"), getBootcamps)

router.get("/:id", getBootcamp)

router.post("/", protect, createBootcamp)

router.put("/:id", protect, updateBootcamp)

router.delete("/:id", protect, deleteBootcamp)

router.put("/:id/photo", protect, bootcampPhotoUpload)

export default router