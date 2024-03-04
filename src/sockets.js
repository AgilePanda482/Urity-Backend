import {pool} from "./db"
import { characterData } from "./api";

export default (io) => {
    io.on('connection', (socket) => {
        console.log('ESP32 conectado');
        console.log(socket.id);
        console.log("JWT token test: ",socket.handshake.headers)
      
        socket.on('event_name', async (data) => {
          console.log('saludando desde ESP32: ' + data.UID);
          const [result] = await pool.query("select * from alumnos where UID = ?", [data.UID])
          
          if(result.length == 0){
            return io.emit("UID", {UID: "USUARIO NO ENCONTRADO"})
          }
          io.emit("UID", result[0])
          
        })

        setInterval(async () => {
          const data = await characterData();
          socket.emit('UID', data);
        }, 30000);

        socket.on('disconnect', () => {
      
          console.log('desconectado');
      
        })
      
      })
}