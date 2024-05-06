import { transformarDatosArray } from "../libs/mapingData.js";
import { pool } from "../db.js";

export function verifyCard(data){
    if(data.verify){
        return data
    }
}

export async function changeStatus(data) {
    try {
        //Querys
        await pool.query(
            "UPDATE estadoAlumnos SET localizacionAlumno = ? WHERE UIDTarjeta = ?",
            [data.localizacionAlumno, data.UID]
        );
        await pool.query(
            "INSERT INTO logIngresosSalidas (UIDTarjeta, fecha, hora, esEntrada) VALUES (?, CURDATE(), CURTIME(), ?)",
            [data.UID, data.localizacionAlumno]
        );
        
        //Constant of querys
        const [result] = await pool.query(
            "SELECT a.codigo, a.nombres, a.carrera, e.localizacionAlumno FROM alumnos a JOIN estadoAlumnos e ON a.UIDTarjeta = e.UIDTarjeta;"
        );
       
        const arrayTransformado = transformarDatosArray(result);

        const [rows] = await pool.query(
            "SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, DATE_FORMAT(DATE_ADD(l.hora, INTERVAL -6 HOUR), '%H:%i') as hora, DATE_FORMAT(l.fecha, '%d-%m-%y') as fecha, esEntrada FROM alumnos a JOIN logIngresosSalidas l ON a.UIDTarjeta = l.UIDTarjeta;"
        )
        return {arrayTransformado, rows};
    }catch (error) {
        console.log(error);
    }
}

export async function searchUser(data) {
    try {
        const [rows] = await pool.query('SELECT * FROM alumnos WHERE nombres LIKE ?', [data + '%']);

        if (rows.length == 0) {
            const arrayTransformado = {error: "Ninguna concidencia encontrada"}
            return { arrayTransformado };
        }
        const arrayTransformado = transformarDatosArray(rows);
        return { arrayTransformado };

    } catch (error) {
        console.log(error);
    }
}