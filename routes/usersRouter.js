import { Router } from "express";
import User from "../models/UserModel.js";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usersController.js";
import { advancedResults } from "../middleware/advancedResults.js";
import { authorize, protect } from "../middleware/auth.js";
const router = Router()

router.use(protect)
router.use(authorize("admin"))

router.route("/").get(advancedResults(User), getAllUsers).post(createUser)

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser)

export default router