import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import Bootcamp from "../models/BootcampModel.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
export const getBootcamps = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.find({})
        res.status(StatusCodes.OK).json({ success: true, count: bootcamps.length, data: bootcamps })
    } catch (err) {
        next(err)
    }
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = async (req, res, next) => {
    try {
        const { id } = req.params
        const bootcamp = await Bootcamp.findById(id)
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
        res.status(StatusCodes.OK).json({ success: true, data: bootcamp })
    } catch (err) {
        next(err)
    }
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(StatusCodes.CREATED).json({ success: true, data: bootcamp })
    } catch (err) {
        next(err)
    }
}

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedBootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!updateBootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(StatusCodes.OK).json({ success: true, data: updatedBootcamp })
    } catch (err) {
        next(err)
    }
}

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = async (req, res, next) => {
    try {
        const { id } = req.params
        const removedBootcamp = await Bootcamp.findByIdAndDelete(id)
        if (!removedBootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(StatusCodes.OK).json({ success: true, data: removedBootcamp })
    } catch (err) {
        next(err)
    }
}

