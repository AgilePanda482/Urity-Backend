import {pool} from "./db"
import { characterData } from "./api";

export default (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id);
    console.log("JWT token test: ",socket.handshake.headers);
      
    socket.on('event_name', async (data) => {
      console.log('saludando desde ESP32: ' + data.UID);
      const [result] = await pool.query("select * from alumnos where UID = ?", [data.UID]);
          
      if(result.length == 0){
        return io.emit("UID", {UID: "USUARIO NO ENCONTRADO"});
      }
      io.emit("UID", result[0]);       
    });

    const intervalId = setInterval(async () => {
      const data = await characterData();
      io.emit('UID', data);
      //console.log(data);
    }, 10000);

    socket.on('verify', async (data) => {
      //{veryify: true}
      console.log(data);
      if (data.verify) {
        // Simular una respuesta correcta o incorrecta de la base de datos
        const simulateDBResponse = Math.random() < 0.5; // 50% de probabilidad
        
        setTimeout(async () => {
          if (simulateDBResponse) {
            // Simular una consulta correcta a la base de datos
            const [result] = await pool.query('SELECT * FROM alumnos WHERE UID = "043E3B0F1D5480"');
            io.emit('verifyUIDFromArduino', result[0]);
          } else {
            // Simular una consulta incorrecta a la base de datos
            io.emit('verifyUIDFromArduino', { error: 'USUARIO NO ENCONTRADO' });
          }
        }
        , 2000)};
    });
    
    /*socket.on("verifyUIDFromArduino", async (data) => {
      try {
        // Realizar la consulta de forma asíncrona
        const [result] = await pool.query("SELECT * FROM alumno WHERE UID = ?", [data.UID]);
        if (result.length === 0) {
          return socket.emit("UIDFromArduino", { UID: "USUARIO NO ENCONTRADO" });
        }

        socket.emit("UIDFromArduino", result[0]);
      } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error(error);
        socket.emit("UIDFromArduino", { error: "Error al realizar la consulta" });
      }
    });*/
    

    socket.on('disconnect', () => {
      console.log('desconectado');
      clearInterval(intervalId);  // Detiene el intervalo cuando el socket se desconecta
    });
  });
}