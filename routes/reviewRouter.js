import { Router } from "express";
import Review from "../models/ReviewModel.js";
import { authorize, protect } from "../middleware/auth.js";
import { advancedResults } from "../middleware/advancedResults.js";
import { createReview, getReview, getReviews } from "../controllers/reviewController.js";

const router = Router({ mergeParams: true })

router.route("/").get(advancedResults(Review, {
    path: 'bootcamp',
    select: "name description"
}), getReviews).post(protect, authorize("user", "admin"), createReview)

router.route("/:id").get(getReview)

export default router
