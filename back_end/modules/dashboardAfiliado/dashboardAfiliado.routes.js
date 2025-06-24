import express from 'express'
import {
  getResumenDashboardAfiliado,
  getProximosTurnosAfiliado,
  getActividadRecienteAfiliado
} from './dashboardAfiliado.controller.js'

const router = express.Router()

router.get('/resumen', getResumenDashboardAfiliado)
router.get('/proximos-turnos', getProximosTurnosAfiliado)
router.get('/actividad-reciente', getActividadRecienteAfiliado)

export default router
