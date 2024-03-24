import { pool } from "../db";

export const login = async (req, res) => {
    try{
        const { codigo, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM Users WHERE codigoUdeG = ? AND password = ?", [codigo, password]);

        if(rows.length > 0) {
            return res.status(200).json({message: "Login successful"});
        } else {
            return res.status(401).json({message: "Invalid credentials"});
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}