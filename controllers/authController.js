import { asyncHandler } from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import User from "../models/UserModel.js"

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {

    res.status(201).json({ msg: "user created" })
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {

    res.status(201).json({ msg: "user logged in" })
})

/// @desc   Logout user
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {

    res.status(201).json({ msg: "user logged out" })
}) 