import { Router } from 'express'
import { login, logout, profile } from "../controllers/auth.controllers.js"
import { auth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/login", login)

router.post("/logout", logout)

router.get("/profile", auth, profile)

export default router