import { pool } from "./db";
import { transformarDatosArray } from "./libs/mapingData";

export default (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    console.log("JWT token test: ", socket.handshake.headers);

    socket.on("readUID", async (data) => {
      console.log("Tarjeta leida desde ESP32: " + data.UID);
      try {
        const [result] = await pool.query(
          "select * from estadoAlumnos where UIDTarjeta = ?",
          [data.UID]
        );

        if (result.length == 0) {
          return socket.emit("sendDatafromUID", { UID: 0 });
        }
        socket.emit("sendDatafromUID", result[0])
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("changeStatus", async (data) => {
      await pool.query(
        "UPDATE estadoAlumnos SET localizacionAlumno = ? WHERE UIDTarjeta = ?",
        [data.localizacionAlumno, data.UID]
      );
      await pool.query(
        "INSERT INTO logIngresosSalidas (UIDTarjeta, fecha, hora, esEntrada) VALUES (?, CURDATE(), CURTIME(), ?)",
        [data.UID, data.localizacionAlumno]
      );

      const [result] = await pool.query(
        "SELECT a.codigo, a.nombres, a.carrera, e.localizacionAlumno FROM alumnos a JOIN estadoAlumnos e ON a.UIDTarjeta = e.UIDTarjeta;"
      );
      const arrayTransformado = transformarDatosArray(result);

      io.emit("changeStatusFront", arrayTransformado);

      const [rows] = await pool.query(
        "SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, DATE_FORMAT(l.hora, '%H:%i') as hora, DATE_FORMAT(l.fecha, '%d-%m-%y') as fecha, esEntrada FROM alumnos a JOIN logIngresosSalidas l ON a.UIDTarjeta = l.UIDTarjeta;"
      );
      io.emit("UID", rows);
    });

    socket.on("verifyCard", async (data) => {
      const verify = data.verify
      if(verify){
        console.log(data);
        return io.emit("verifyUID", data);
      }
    })

    socket.on("verifyUIDFromArduino", async (data) => {
      try {
        const verify = { verify: "false" }
        const [result] = await pool.query(
          "SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, e.localizacionAlumno FROM alumnos AS a JOIN estadoAlumnos AS e ON a.UIDTarjeta = e.UIDTarjeta WHERE a.UIDTarjeta = ?;",
          [data.UID]
        );

        if (result.length == 0) {
          io.emit("verifyUID", verify.verify);
          return io.emit("UIDFromArduino", {
            error: "USUARIO NO ENCONTRADO",
          });
        }
        const arrayTransformado = transformarDatosArray(result);
        io.emit("verifyUID", verify.verify);
        io.emit("UIDFromArduino", arrayTransformado[0]);	
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("desconectado");
    });
  });
};
