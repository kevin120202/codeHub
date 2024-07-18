import { asyncHandler } from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import User from "../models/UserModel.js"

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    // Create user
    const user = await User.create({ name, email, password, role })

    // Create token
    const token = user.getSignedJwtToken()

    res.status(200).json({ success: true, token })
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    // Compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    const token = user.getSignedJwtToken()

    res.status(200).json({ success: true, token })
})

/// @desc   Logout user
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {

    res.status(201).json({ msg: "user logged out" })
}) 