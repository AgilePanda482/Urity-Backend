import { pool } from "../db.js"
import { datoAcademico } from "../libs/dateUser.js";

export const createUser = async (req, res) => {
    try{
        const {collegeCode, name, grade, group, career, shift, cardUID} = req.body;
        const dateUser = datoAcademico(grade, group, career, shift);
        const [rows] = await pool.query("INSERT INTO alumnos (Codigo, UID, Nombre, DatoAcademico) VALUES (?, ?, ?, ?)", [collegeCode, cardUID, name, dateUser]);

        res.status(201).json({message: "User created successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}