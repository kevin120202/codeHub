import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Load models
import Bootcamp from './models/BootcampModel.js'
import Course from './models/CourseModel.js';

// Connect to DB
mongoose.connect(process.env.MONGO_URI)

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON files
const bootcamps = JSON.parse(readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

// Import to DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        console.log("Data imported");
        process.exit()
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        console.log("Data destroyed");
        process.exit()
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}