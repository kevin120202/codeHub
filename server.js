import express from "express"
const app = express()
import bootcampRouter from "./routes/bootcampRouter.js"

app.use("/api/v1/bootcamps", bootcampRouter)

app.get("/api/v1/courses", (req, res) => {
    res.json({ msg: "show all courses" })
})

app.get("/api/v1/reviews", (req, res) => {
    res.json({ msg: "show all reviews" })
})

app.post("/api/v1/courses", (req, res) => {
    res.json({ msg: "add new course" })
})

app.post("/api/v1/reviews", (req, res) => {
    res.json({ msg: "add new post" })
})

app.patch("/api/v1/courses/:id", (req, res) => {
    res.json({ msg: "edit course" })
})

app.patch("/api/v1/reviews/:id", (req, res) => {
    res.json({ msg: "edit review" })
})

app.delete("/api/v1/courses/:id", (req, res) => {
    res.json({ msg: "delete course" })
})

app.delete("/api/v1/reviews/:id", (req, res) => {
    res.json({ msg: "delete review" })
})

app.post("/api/v1/auth/register", (req, res) => {
    res.json({ msg: "register user" })
})

app.post("/api/v1/auth/login", (req, res) => {
    res.json({ msg: "login user" })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`running on port ${PORT}`))