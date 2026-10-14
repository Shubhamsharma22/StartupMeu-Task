import express from "express"
import cors from "cors"
import authRouter from "./Routes/auth.Routes.js"
import taskRouter from "./Routes/task.Router.js"


const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/auth",authRouter)
app.use("/api/task",taskRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        errors: err.errors || []
    })
})

export default app