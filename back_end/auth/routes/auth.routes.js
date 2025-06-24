import express from 'express'
import {
  loginAfiliado,
  loginOdontologo,
  obtenerPerfil
} from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'
import { loginAdmin } from '../../modules/administrador/administrador.controller.js'

const router = express.Router()

router.post('/login/afiliado', loginAfiliado)
router.post('/login/odontologo', loginOdontologo)
router.post('/login/admin', loginAdmin)

router.get('/perfil', verifyToken, obtenerPerfil)


export default router
