import { Router } from 'express'

import { controllers } from '../controllers/index.controllers.js'
import { auth, verifyAuth } from "../middlewares/auth.middleware.js"

const router = Router()

//INSERT An User
router.post("/create", verifyAuth, controllers.users.createUser)

//GET All Users
router.get("/getAll", verifyAuth, controllers.users.getAllUsers)

export default router