import ErrorResponse from "../utils/errorResponse.js"
import { asyncHandler } from "../middleware/async.js"
import Review from "../models/ReviewModel.js"
import Bootcamp from "../models/BootcampModel.js"

// @desc    Get reviews
// @route   Get /api/v1/bootcamps/:bootcampId/reviews
// @access  Public
export const getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId })

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    } else {
        res.status(200).json(res.advancedResults)
    }
})

// @desc    Get single reviews
// @route   Get /api/v1/reviews/:id
// @access  Public
export const getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: "name description"
    })
    if (!review) {
        return next(new ErrorResponse(`Review not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: review })
})

// @desc    Create review
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.bootcampId}`, 404))
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a review to bootcamp ${req.params.bootcampId}`, 401))
    }

    const review = await Review.create(req.body)
    res.status(201).json({ success: true, data: review })
})
