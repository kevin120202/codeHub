import { Router } from "express";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from "../controllers/coursesController.js";
import { advancedResults } from "../middleware/advancedResults.js";
import Course from "../models/CourseModel.js";
import { protect } from "../middleware/auth.js";
const router = Router({ mergeParams: true })

router.route("/").get(advancedResults(Course, {
    path: 'bootcamp',
    select: "name description"
}), getCourses).post(protect, createCourse)

router.route("/:id").get(getCourse).put(protect, updateCourse).delete(protect, deleteCourse)

export default router