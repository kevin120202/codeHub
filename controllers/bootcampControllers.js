// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = (req, res) => {
    res.json({ msg: "show all bootcamps" })
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = (req, res) => {
    res.json({ msg: "show bootcamp" })
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = (req, res) => {
    res.json({ msg: "create new bootcamp" })
}

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = (req, res) => {
    res.json({ msg: "update bootcamp" })
}

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = (req, res) => {
    res.json({ msg: "delete bootcamp" })
}