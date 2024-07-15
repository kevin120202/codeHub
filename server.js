import express from "express"
const app = express()
import morgan from "morgan"
import mongoose from "mongoose"

// Route files
import bootcampRouter from "./routes/bootcampRouter.js"

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// Mount routers 
app.use("/api/v1/bootcamps", bootcampRouter)

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
