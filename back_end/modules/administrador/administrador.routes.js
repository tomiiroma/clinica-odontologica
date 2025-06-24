import express from 'express'
import {
  registrarAdmin,
  loginAdmin,
  obtenerPerfil
} from './administrador.controller.js'
import { verifyToken } from '../../auth/middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', registrarAdmin)
router.post('/login', loginAdmin)
router.get('/perfil', verifyToken, obtenerPerfil)

export default router
