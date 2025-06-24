// dashboardAdmin.routes.js
import express from 'express'
import { getDashboardStats } from './dashboardAdmin.controller.js'
import { getUltimosTurnos } from './dashboardAdmin.controller.js'



const router = express.Router()

router.get('/stats', getDashboardStats)
router.get('/ultimos-turnos', getUltimosTurnos)



export default router
