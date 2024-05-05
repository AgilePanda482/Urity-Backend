import { readUID, verifyUIDFromArduino } from "./sockets/arduino.sockets.js";
import { changeStatus, verifyCard, searchUser } from "./sockets/front.sockets.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    console.log("JWT token test: ", socket.handshake.headers);

    socket.on("readUID", async (data) => {
      console.log(data);
      const result = await readUID(data.UID);
      io.emit("sendDatafromUID", result);
    });

    socket.on("changeStatus", async (data) => {
      const { arrayTransformado, rows } = await changeStatus(data);
      
      // Sockets emits
      io.emit("changeStatusFront", arrayTransformado);
      io.emit("UID", rows);
    });

    socket.on("verifyCard", (data) => {
      const IsTrue = verifyCard(data);
      io.emit("verifyUID", IsTrue);
    });

    socket.on("verifyUIDFromArduino", async (data) => {
      const { status, arrayTransformado } = await verifyUIDFromArduino(data);
      console.log("Valor de status: ", status.verify);
      io.emit("verifyUID", status.verify);
      io.emit("UIDFromArduino", arrayTransformado[0]);
    });

    socket.on("searchUserBack", async (data) => {
      const { arrayTransformado } = await searchUser(data);

      io.emit("searchUserFront", arrayTransformado);
    })

    socket.on("disconnect", () => {
      console.log("desconectado");
    });
  });
};
