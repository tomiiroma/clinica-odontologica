// dashboardAdmin.routes.js
import express from 'express'
import {
  getResumenDashboard,
  getUltimosTurnos
} from './dashboardAdmin.controller.js'

const router = express.Router()

router.get('/stats', getResumenDashboard)
router.get('/ultimos-turnos', getUltimosTurnos)

export default router
