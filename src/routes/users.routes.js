import { Router } from 'express'
import { createUser } from "../controllers/users.controllers.js"

const router = Router()

//INSERT An User
router.post("/create", createUser)

export default router