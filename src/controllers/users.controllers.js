import { pool } from "../db.js"
import { transformarDatosArray } from "../libs/mapingData.js";

export const createUser = async (req, res) => {
    try{
        const {collegeCode, name, grade, group, career, shift, cardUID} = req.body;
        const [rows] = await pool.query("INSERT INTO alumnos (codigo, UIDTarjeta, nombres, grado, grupo, carrera, turno) VALUES (?, ?, ?, ?, ?, ?, ?)", [collegeCode, cardUID, name, grade, group, career, shift]);
        await pool.query("INSERT INTO estadoAlumnos (UIDTarjeta, localizacionAlumno, estadoInstitucional) VALUES (?, ?, ?)", [cardUID, 1, 1]);

        res.status(201).json({message: "User created successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT a.codigo, a.nombres, a.carrera, e.localizacionAlumno FROM alumnos a JOIN estadoAlumnos e ON a.UIDTarjeta = e.UIDTarjeta;");

        const arrayTransformado = transformarDatosArray(rows);
        res.status(200).json(arrayTransformado);

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    //TODO: Implementar actualizacion de usuario
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
        const [rows] = await pool.query("SELECT a.nombres,  DATE_FORMAT(l.hora, '%H:%i') as hora, l.esEntrada FROM alumnos a JOIN logIngresosSalidas l ON a.UIDTarjeta = l.UIDTarjeta;");
        res.status(200).json(rows);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}