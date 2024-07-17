import { Router } from "express";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from "../controllers/coursesController.js";
const router = Router({ mergeParams: true })

router.route("/").get(getCourses).post(createCourse)

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse)

export default router