import { StatusCodes } from "http-status-codes"
import Bootcamp from "../models/BootcampModel.js"
import ErrorResponse from "../utils/errorResponse.js"
import { asyncHandler } from "../middleware/async.js"
import geocoder from "../utils/geocoder.js"

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
export const getBootcamps = asyncHandler(async (req, res) => {
    let query;

    // Copy re.query
    const reqQuery = { ...req.query }

    // Field to exclude
    const removeFields = ['select', 'sort', "page", "limit"]

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(reqQuery)

    // Create operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // Finding resourse
    query = Bootcamp.find(JSON.parse(queryStr)).populate("courses")

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(" ")
        query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(" ")
        query = query.sort(sortBy)
    } else {
        query = query.sort("-createdAt")
    }

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Bootcamp.countDocuments()
    query = query.skip(startIndex).limit(limit)

    // Executing query
    const bootcamps = await query

    const pagination = {}
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.status(StatusCodes.OK).json({ success: true, count: bootcamps.length, pagination, data: bootcamps })
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
    const removedBootcamp = await Bootcamp.findById(id)
    if (!removedBootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    await removedBootcamp.deleteOne()
    res.status(StatusCodes.OK).json({ success: true, data: removedBootcamp })
})

// @desc    Get bootcamp within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})
