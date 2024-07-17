import { Router } from "express";
import { createBootcamp, deleteBootcamp, getBootcamps, getBootcamp, updateBootcamp, getBootcampsInRadius, bootcampPhotoUpload } from "../controllers/bootcampControllers.js";
import courseRouter from "./courseRouter.js"
import { advancedResults } from "../middleware/advancedResults.js";
import Bootcamp from "../models/BootcampModel.js";
const router = Router()

// Include other resource routers
router.use("/:bootcampId/courses", courseRouter)

router.get("/radius/:zipcode/:distance", getBootcampsInRadius)

router.get("/", advancedResults(Bootcamp, "courses"), getBootcamps)

router.get("/:id", getBootcamp)

router.post("/", createBootcamp)

router.put("/:id", updateBootcamp)

router.delete("/:id", deleteBootcamp)

router.put("/:id/photo", bootcampPhotoUpload)

export default router