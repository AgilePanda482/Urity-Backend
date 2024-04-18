import { Router } from 'express'
import { controllers } from '../controllers/index.controllers.js'
import { verifyAuth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/login", controllers.auth.login)

router.post("/logout", controllers.auth.logout)

router.get("/profile", verifyAuth, controllers.auth.profile)

router.get("/verify", verifyAuth, controllers.auth.verifyTokenRequest)

export default router