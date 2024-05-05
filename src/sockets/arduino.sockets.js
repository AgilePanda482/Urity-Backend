import { transformarDatosArray } from "../libs/mapingData.js";
import { pool } from "../db.js";

export async function readUID(data) {
  console.log("Tarjeta leida desde ESP32: " + data.UID);
    try {
        const [result] = await pool.query(
        "select * from estadoAlumnos where UIDTarjeta = ?", [data.UID]);

        if (result.length == 0) {
            return {UID: 0};
        }
        return result[0];
    }catch (error) {
        console.log(error);
    }
}

export async function verifyUIDFromArduino(data){
    try {
        const status = {verify: "false"};
        const [result] = await pool.query(
          "SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, e.localizacionAlumno FROM alumnos AS a JOIN estadoAlumnos AS e ON a.UIDTarjeta = e.UIDTarjeta WHERE a.UIDTarjeta = ?;",
          [data.UID]
        );
        
        if (result.length === 0) {
            const arrayTransformado = [{error: "USUARIO NO ENCONTRADO"}];
            return {status, arrayTransformado};
        }     
        const arrayTransformado = transformarDatosArray(result);    
        console.log(arrayTransformado[0])  
        return {status, arrayTransformado}
    }catch (error) {
        console.log(error);
    }
}