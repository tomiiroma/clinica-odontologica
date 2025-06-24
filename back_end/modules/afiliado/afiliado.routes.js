import express from 'express'
import { registrarAfiliado } from './afiliado.controller.js'
import { verifyToken } from '../../auth/middleware/auth.middleware.js'
import { soloAdmin } from '../../auth/middleware/rol.middleware.js'
import { obtenerAfiliados } from './afiliado.controller.js'



const router = express.Router()

router.post('/', verifyToken, soloAdmin, registrarAfiliado)

router.get('/', verifyToken, soloAdmin, obtenerAfiliados)

export default router
