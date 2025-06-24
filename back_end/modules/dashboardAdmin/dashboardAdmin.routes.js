// dashboardAdmin.routes.js
import express from 'express'
import { getDashboardStats } from './dashboardAdmin.controller.js'

const router = express.Router()

router.get('/stats', getDashboardStats)

export default router
