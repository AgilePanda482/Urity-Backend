import jwt from "jsonwebtoken";

import { JWT_TOKEN } from "../config.js";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

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

        // Añadir atributos a la cookie
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: 'none' // Puedes cambiar a 'lax' o 'none' según tus necesidades
        });

        res.header("Authorization", `Bearer ${token}`);
        
        res.status(200).send({message: "Login successful"});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const profile = async (req, res) => {
    console.log(req.user.Codigo);
    const userFound = await pool.query("SELECT * FROM alumnos WHERE codigo = ?", [req.user.Codigo]);

    if(!userFound.length > 0) {
        return res.status(404).json({message: "User not found"});
    }

    return res.json(userFound[0]);
}

export const verifyTokenRequest = async (req, res) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({message: "Unauthorized denied"});
    }

    jwt.verify(token, JWT_TOKEN, async (error, user) => {
        if(error) return res.sendStatus(401).json({message: "Unauthorized denied"});

        const userFound = await pool.query("SELECT * FROM Users WHERE Codigo = ?", [user.Codigo]);
        if(!userFound.length > 0) {
            return res.status(404).json({message: "Unauthorized denied"});
        }

        return res.json(userFound[0]);
    })
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logout successful"});
}