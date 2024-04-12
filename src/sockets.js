import {pool} from "./db"
import { characterData } from "./api";
import { transformarDatosArray } from "./libs/mapingData";

export default (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id);
    console.log("JWT token test: ",socket.handshake.headers);

    socket.on('readUID', async (data) => {
      console.log('Tarjeta leida desde ESP32: ' + data.UID);
      const [result] = await pool.query("select * from estadoAlumnos where UIDTarjeta = ?", [data.UID]);
          
      if(result.length == 0){
        return socket.emit("sendDatafromUID", {UID: 0});
      }
      socket.emit("sendDatafromUID", result[0]);
    })

    socket.on('changeStatus', async (data) => {
      await pool.query("UPDATE estadoAlumnos SET localizacionAlumno = ? WHERE UIDTarjeta = ?", [data.localizacionAlumno, data.UID]);
      await pool.query("INSERT INTO logIngresosSalidas (UIDTarjeta, fecha, hora, esEntrada) VALUES (?, CURDATE(), CURTIME(), ?)", [data.UID, data.localizacionAlumno]);
      
      const [ result ] = await pool.query("SELECT a.codigo, a.nombres, a.carrera, e.localizacionAlumno FROM alumnos a JOIN estadoAlumnos e ON a.UIDTarjeta = e.UIDTarjeta;");
      const arrayTransformado = transformarDatosArray(result);
      
      io.emit("changeStatusFront" , arrayTransformado);
      
      const [rows] = await pool.query("SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, DATE_FORMAT(l.hora, '%H:%i') as hora, l.esEntrada FROM alumnos a JOIN logIngresosSalidas l ON a.UIDTarjeta = l.UIDTarjeta");
      io.emit("UID", rows);
    })

    socket.on('verify', async (data) => {
      //{veryify: true}
      console.log(data);
      if (data.verify) {
        // Simular una respuesta correcta o incorrecta de la base de datos
        const simulateDBResponse = Math.random() < 0.5; // 50% de probabilidad
        
        setTimeout(async () => {
          if (simulateDBResponse) {
            // Simular una consulta correcta a la base de datos
            const [result] = await pool.query('SELECT * FROM alumnos WHERE UIDTarjeta = "043E3B0F1D5480"');
            io.emit('verifyUIDFromArduino', result[0]);
          } else {
            // Simular una consulta incorrecta a la base de datos
            io.emit('verifyUIDFromArduino', { error: 'USUARIO NO ENCONTRADO' });
          }
        }
        , 2000)};
    });
    
    //TODO: Implementar verificacion de UID por medio de consulta a la base de datos
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
      //clearInterval(intervalId);  // Detiene el intervalo cuando el socket se desconecta
    });
  });
}