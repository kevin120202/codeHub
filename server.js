import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.json({ msg: "hello" })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`running on port ${PORT}`))