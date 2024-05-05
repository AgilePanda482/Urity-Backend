import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import indexRoutes from "./routes/index.routes.js"
import {handle404, errorHandler} from "./middlewares/error.middleware.js"
import { LINKFRONT } from "./config.js"

const app = express()

app.use(cors({
    credentials: true,
    origin: LINKFRONT
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api", indexRoutes)
app.use(handle404);
app.use(errorHandler);


if (process.env.NODE_ENV === "production") {
    const path = await import("path");
    app.use(express.static("client/dist"))

    app.get("*", (req, res) => {
        console.log(path.resolve("client", "dist", "index.html"))
        res.sendFile(path.resolve("client", "dist", "index.html"))
    })
}

export default app;