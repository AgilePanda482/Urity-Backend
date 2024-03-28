import { pool } from "../db";
import { createAccessToken } from "../libs/jwt";

export const login = async (req, res) => {
    try{
        const {email, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM Users WHERE email = ? AND password = ?", [email, password]);

        if(!rows.length > 0) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = await createAccessToken({
            Codigo: rows[0].Codigo
        });

        res.cookie("token", token)

        res.json({message: "Login successful"});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const profile = async (req, res) => {
    console.log(req.user.Codigo);
    const userFound = await pool.query("SELECT * FROM alumnos WHERE Codigo = ?", [req.user.Codigo]);

    if(!userFound.length > 0) {
        return res.status(404).json({message: "User not found"});
    }

    return res.json(userFound[0]);
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logout successful"});
}