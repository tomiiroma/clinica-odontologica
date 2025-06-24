import express from 'express'
import {
  getResumenDashboard,
  getProximosTurnos,
  getActividadReciente
} from './dashboard.controller.js'

const router = express.Router()

router.get('/resumen', getResumenDashboard)
router.get('/proximos-turnos', getProximosTurnos)
router.get('/actividad-reciente', getActividadReciente)

export default router
