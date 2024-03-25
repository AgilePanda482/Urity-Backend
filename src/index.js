import app from "./app.js"
import {Server as websocketServer} from "socket.io"
import http from "http"
//import { pool } from "./db"
import sockets from "./sockets.js"

app.listen(4000)
console.log("Server is running on port: 4000")

const server = http.createServer(app)
const httpServer = server.listen(3000)
const io = new websocketServer(httpServer, {
    cors: {
        origin: "*",
    },
})
sockets(io)