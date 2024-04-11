import { Router } from 'express'

import { controllers } from '../controllers/index.controllers.js'
import { auth, verifyAuth } from "../middlewares/auth.middleware.js"

const router = Router()

//INSERT An User
router.post("/create", verifyAuth, controllers.users.createUser)

//GET All Users
router.get("/getAll", verifyAuth, controllers.users.getAllUsers)

//DELETE An User
router.delete("/delete/:id", verifyAuth, controllers.users.deleteUser)

//UPDATE An User
router.put("/update/:id", verifyAuth, controllers.users.updateUser)

//See logs
router.get("/logs", verifyAuth, controllers.users.getLogs)

export default router