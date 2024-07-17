import { Router } from "express";
import { createCourse, getCourse, getCourses } from "../controllers/coursesController.js";
const router = Router({ mergeParams: true })

router.route("/").get(getCourses).post(createCourse)

router.route("/:id").get(getCourse)

export default router