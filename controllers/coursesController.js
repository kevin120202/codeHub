import Course from "../models/CourseModel.js"
import ErrorResponse from "../utils/errorResponse.js"
import { asyncHandler } from "../middleware/async.js"
import Bootcamp from "../models/BootcampModel.js"
import { advancedResults } from "../middleware/advancedResults.js"

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId })
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
    } else {
        res.status(200).json(res.advancedResults)
    }
})

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
export const getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description"
    })
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: course })
})

// @desc    Create a course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
export const createCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.bootcampId}`, 404))
    }
    const course = await Course.create(req.body)
    res.status(201).json({ success: true, data: course })
})

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private
export const updateCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updatedCourse) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: updatedCourse })
})

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private
export const deleteCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const removedCourse = await Course.findById(id)
    if (!removedCourse) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
    }
    await removedCourse.deleteOne()
    res.status(200).json({ success: true, data: removedCourse })
})