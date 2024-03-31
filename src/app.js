import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/users.routes.js"

const app = express()

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

export default app;