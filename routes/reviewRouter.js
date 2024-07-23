import { Router } from "express";
import Review from "../models/ReviewModel.js";
import { authorize, protect } from "../middleware/auth.js";
import { advancedResults } from "../middleware/advancedResults.js";
import { getReviews } from "../controllers/reviewController.js";

const router = Router({ mergeParams: true })

router.route("/").get(advancedResults(Review, {
    path: 'bootcamp',
    select: "name description"
}), getReviews)

export default router
