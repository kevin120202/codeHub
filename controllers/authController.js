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

    sendTokenResponse(user, 200, res)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === "production") {
        options.secure = true
    }
    res.status(statusCode).cookie("token", token, options).json({ success: true, token })
}

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

    sendTokenResponse(user, 200, res)
})

/// @desc   Logout user
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {

    res.status(201).json({ msg: "user logged out" })
}) 