import app from "./app"
import {Server as websocketServer} from "socket.io"
import http from "http"
import { pool } from "./db"

app.get("/ping", async (req, res) => {
    const [rows] = await pool.query("select * from alumnos")
    console.log(rows)
    res.json(rows)
})

app.listen(4000)
console.log("Express escuchando en el puerto 4000")


const server = http.createServer(app)
const httpServer = server.listen(3000)
const io = new websocketServer(httpServer)


console.log("Server is running on port: 3000")