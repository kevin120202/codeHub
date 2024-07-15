import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import Bootcamp from "../models/BootcampModel.js"

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = async (req, res) => {
    const bootcamps = await Bootcamp.find({})
    res.status(StatusCodes.OK).json({ bootcamps })
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = async (req, res) => {
    const { id } = req.params
    const bootcamp = await Bootcamp.findById(id)
    res.status(StatusCodes.OK).json({ bootcamp })
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = async (req, res) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(StatusCodes.CREATED).json({ bootcamp })
}

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = async (req, res) => {
    const { id } = req.params
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(id, req.body)
    res.status(StatusCodes.OK).json({ msg: "bootcamp modified", bootcamp: updatedBootcamp })
}

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = async (req, res) => {
    const { id } = req.params
    const removedBootcamp = await Bootcamp.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({ bootcamp: removedBootcamp })
}

