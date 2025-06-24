import express from 'express'
import { registrarOdontologo } from './odontologo.controller.js'
import { verifyToken } from '../../auth/middleware/auth.middleware.js'
import { soloAdmin } from '../../auth/middleware/rol.middleware.js'

const router = express.Router()

router.post('/', verifyToken, soloAdmin, registrarOdontologo)

export default router
