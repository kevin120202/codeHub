import Course from "../models/CourseModel.js"
import ErrorResponse from "../utils/errorResponse.js"
import { asyncHandler } from "../middleware/async.js"

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
    let query

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find()
    }

    const courses = await query

    res.status(200).json({ success: true, count: courses.length, data: courses })
})
