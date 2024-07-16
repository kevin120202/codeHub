import mongoose from "mongoose";

const CourseScheme = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    weeks: {
        type: String,
        required: [true, "Please add number of weeks"]
    },
    tuition: {
        type: Number,
        required: [true, "Please adda tuition cose"]
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skill"],
        enum: ["beginner", "intermediate", "advanced"]
    },
    scholarshipsAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true
    }
})

export default mongoose.model("Course", CourseScheme)