import { Router } from 'express'
import { login, logout, profile, verifyTokenRequest } from "../controllers/auth.controllers.js"
import { auth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/login", login)

router.post("/logout", logout)

router.get("/profile", auth, profile)

router.get("/verify", verifyTokenRequest)

export default router