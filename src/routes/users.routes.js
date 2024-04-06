import { Router } from 'express'
import { createUser, getAllUsers } from "../controllers/users.controllers.js"

const router = Router()

//INSERT An User
router.post("/create", createUser)

//GET All Users
router.get("/getAll", getAllUsers)
export default router