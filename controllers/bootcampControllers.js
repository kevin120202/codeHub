import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import Bootcamp from "../models/BootcampModel.js"
import ErrorResponse from "../utils/errorResponse.js"
import { asyncHandler } from "../middleware/async.js"

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
export const getBootcamps = asyncHandler(async (req, res) => {
    const bootcamps = await Bootcamp.find({})
    res.status(StatusCodes.OK).json({ success: true, count: bootcamps.length, data: bootcamps })
})

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const bootcamp = await Bootcamp.findById(id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(StatusCodes.OK).json({ success: true, data: bootcamp })
})

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(StatusCodes.CREATED).json({ success: true, data: bootcamp })
})

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updateBootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(StatusCodes.OK).json({ success: true, data: updatedBootcamp })
})

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const removedBootcamp = await Bootcamp.findByIdAndDelete(id)
    if (!removedBootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(StatusCodes.OK).json({ success: true, data: removedBootcamp })
})

