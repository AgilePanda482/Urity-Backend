import jwt from "jsonwebtoken"
import { variables } from "../config.js";

export const verifyAuth = (req, res, next) => {
    try{    
        const { token } = req.cookies
        
        if(!token) {
            return res.status(401).json({message: "Unauthorized denied"})
        }
        jwt.verify(token, variables.JWT_TOKEN, (error, user) => {
            if(error){
                return res.status(401).json({message: "Token invalid"})
            }
            req.user = user
            next()
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}