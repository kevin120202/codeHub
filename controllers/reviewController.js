import ErrorResponse from "../utils/errorResponse.js"
import { asyncHandler } from "../middleware/async.js"
import Review from "../models/ReviewModel.js"

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