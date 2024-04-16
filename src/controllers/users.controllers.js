import { pool } from "../db.js"
import { transformarDatosArray } from "../libs/mapingData.js";
let tarjetaUID = '';

export const createUser = async (req, res) => {
    try {
        const {collegeCode, name, grade, group, career, shift, cardUID} = req.body;
        const [rows] = await pool.query("INSERT INTO alumnos (codigo, UIDTarjeta, nombres, grado, grupo, carrera, turno) VALUES (?, ?, ?, ?, ?, ?, ?)", [collegeCode, cardUID, name, grade, group, career, shift]);
        await pool.query("INSERT INTO estadoAlumnos (UIDTarjeta, localizacionAlumno, estadoInstitucional) VALUES (?, ?, ?)", [cardUID, 1, 1]);

        res.status(201).json({message: "User created successfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT a.codigo, a.nombres, a.carrera, a.UIDTarjeta, e.localizacionAlumno FROM alumnos a JOIN estadoAlumnos e ON a.UIDTarjeta = e.UIDTarjeta;");
        const arrayTransformado = transformarDatosArray(rows);
        res.status(200).json(arrayTransformado);

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getAnUser = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, a.UIDTarjeta, e.localizacionAlumno, e.estadoInstitucional FROM alumnos a JOIN estadoAlumnos e ON a.UIDTarjeta = e.UIDTarjeta WHERE a.UIDTarjeta = ?;", [req.params.id]);
        
        if(rows.length <= 0){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(rows[0])
        tarjetaUID = rows[0].UIDTarjeta
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const {collegeCode, name, grade, group, career, shift, cardUID} = req.body;
        const {location, status} = req.body;

        await pool.query("UPDATE alumnos SET codigo = ?, UIDTarjeta = ?, nombres = ?, grado = ?, grupo = ?, turno = ?, carrera = ? WHERE UIDTarjeta = ?", [collegeCode, cardUID, name, grade, group, shift, career, tarjetaUID]);
        await pool.query("UPDATE estadoAlumnos SET localizacionAlumno = ?, estadoInstitucional = ? WHERE UIDTarjeta = ?", [location, status, cardUID]);

        res.status(200).json({message: "User updated successfully"});
        tarjetaUID = ''

    } catch(error) {
        console.log(error);
        tarjetaUID = ''
        return res.status(500).json({message: "Internal server error"});
    }	

}

export const deleteUser = async (req, res) => {
    try{
        const [result] = await pool.query("DELETE FROM alumnos WHERE codigo = ?", [req.params.id]);

        if(result.affectedRows <= 0){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({message: "Alumno con codigo: " + req.params.id + " eliminado correctamente"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getLogs = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT a.nombres, a.codigo, a.grado, a.grupo, a.carrera, a.turno, DATE_FORMAT(l.hora, '%H:%i') as hora, DATE_FORMAT(l.fecha, '%d-%m-%y') as fecha, esEntrada FROM alumnos a JOIN logIngresosSalidas l ON a.UIDTarjeta = l.UIDTarjeta;");
        res.status(200).json(rows);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}