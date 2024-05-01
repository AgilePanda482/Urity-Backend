import { Server as websocketServer } from "socket.io";
import http from "http";

import app from "./app.js";
import sockets from "./sockets.js";
import { PORT } from "./config.js";

// Crea el servidor HTTP a partir de la instancia de Express
const server = http.createServer(app);

// Inicializa Socket.IO pasando el servidor HTTP
// y activa la compatibilidad con la versión 3 de Engine.IO
const io = new websocketServer(server, {
    cors: {
        origin: "*",
    },
    allowEIO3: true // Activa la compatibilidad con Engine.IO v3
});

// Aquí puedes inicializar tus sockets
sockets(io);

// Escucha en el puerto definido en tu configuración
server.listen(PORT, () => {
    console.log("Express y Socket.IO están corriendo en el puerto:", PORT);
});
