import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config.js";

export const verifyAuth = (req, res, next) => {
    try {
        // Intentar obtener el token del encabezado de autorización o de las cookies
        const token = req.headers["authorization"]
            ? req.headers["authorization"].split(" ")[1]
            : req.cookies["token"];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized denied" });
        }

        jwt.verify(token, JWT_TOKEN, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token invalid" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};