import { Router } from "express";
import { createBootcamp, deleteBootcamp, getBootcamps, getBootcamp, updateBootcamp, getBootcampsInRadius, bootcampPhotoUpload } from "../controllers/bootcampControllers.js";
import courseRouter from "./courseRouter.js"
import reviewRouter from "./reviewRouter.js"
import { advancedResults } from "../middleware/advancedResults.js";
import Bootcamp from "../models/BootcampModel.js";
import { authorize, protect } from "../middleware/auth.js";
const router = Router()

// Include other resource routers
router.use("/:bootcampId/courses", courseRouter)
router.use("/:bootcampId/reviews", reviewRouter)


router.get("/radius/:zipcode/:distance", getBootcampsInRadius)

router.get("/", advancedResults(Bootcamp, "courses"), getBootcamps)

router.get("/:id", getBootcamp)

router.post("/", protect, authorize("publisher", "admin"), createBootcamp)

router.put("/:id", protect, authorize("publisher", "admin"), updateBootcamp)

router.delete("/:id", protect, authorize("publisher", "admin"), deleteBootcamp)

router.put("/:id/photo", protect, authorize("publisher", "admin"), bootcampPhotoUpload)

export default router