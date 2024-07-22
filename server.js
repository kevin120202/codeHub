import express from "express"
const app = express()
import morgan from "morgan"
import mongoose from "mongoose"
import { errorHandler } from "./middleware/error.js"
import { fileURLToPath } from 'url';
import path from 'path'
import cookieParser from "cookie-parser"

// Route files
import bootcampRouter from "./routes/bootcampRouter.js"
import courseRouter from "./routes/courseRouter.js"
import fileUpload from "express-fileupload"
import authRouter from "./routes/authRouter.js"
import usersRouter from "./routes/usersRouter.js"

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// File uploading
app.use(fileUpload())

// Set static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers 
app.use("/api/v1/bootcamps", bootcampRouter)
app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", usersRouter)

app.use(errorHandler)

// Connect to database and start server
const PORT = process.env.PORT || 8000
try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server running on PORT ${PORT}`);
    })
} catch (error) {
    console.log(error.message);
    process.exit(1)
}
