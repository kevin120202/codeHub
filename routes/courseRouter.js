import { Router } from "express";
import { getCourses } from "../controllers/coursesController.js";
const router = Router({ mergeParams: true })

router.route("/").get(getCourses)

export default router