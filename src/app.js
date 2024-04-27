import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import indexRoutes from "./routes/index.routes.js"
import {handle404, errorHandler} from "./middlewares/error.middleware.js"
import { LINKFRONT } from "./config.js"

const app = express()

app.use(cors({origin: LINKFRONT, credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", indexRoutes)
app.use(handle404);
app.use(errorHandler);

export default app;