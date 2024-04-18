import {Server as websocketServer} from "socket.io"
import http from "http"

import app from "./app.js"
import sockets from "./sockets.js"
import { PORTEXPRESS, PORTSOCKET } from "./config.js"

app.listen(PORTEXPRESS)
console.log("Server is running on port:", PORTEXPRESS)

const server = http.createServer(app)
const httpServer = server.listen(PORTSOCKET)
const io = new websocketServer(httpServer, {
    cors: {
        origin: "*",
    },
})
sockets(io)