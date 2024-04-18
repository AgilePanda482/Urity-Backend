import {Server as websocketServer} from "socket.io"
import http from "http"

import app from "./app.js"
import sockets from "./sockets.js"
import { PORT, PORTSOCKET } from "./config.js"

app.listen(PORT)
console.log("Server is running on port:", PORT)

const server = http.createServer(app)
const httpServer = server.listen(PORTSOCKET)
const io = new websocketServer(httpServer, {
    cors: {
        origin: "*",
    },
})
console.log("Socket is running on port:", PORTSOCKET)
sockets(io)