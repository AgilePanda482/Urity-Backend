import { Server as websocketServer } from "socket.io";
import http from "http";

import app from "./app.js";
import sockets from "./sockets.js";
import { PORT } from "./config.js";

// Crea el servidor HTTP a partir de la instancia de Express
const server = http.createServer(app);
const io = new websocketServer(server, {
    cors: {
        origin: "*",
    },
});
sockets(io);

server.listen(PORT, () => {
    console.log("Express y Socket.IO están corriendo en el puerto:", PORT);
    console.log("Environment:", process.env.NODE_ENV);
});
