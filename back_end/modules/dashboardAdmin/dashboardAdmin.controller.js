// dashboardAdmin.controller.js

import {
  getResumenDashboard as getResumenDashboardService,
  getUltimosTurnos as getUltimosTurnosService
} from './dashboardAdmin.service.js'

export const getResumenDashboard = async (req, res) => {
  try {
    const datos = await getResumenDashboardService()
    return res.json({
      afiliadosActivos: datos.totalAfiliados,
      turnosHoy: datos.turnosHoy,
      totalSedes: datos.totalSedes,
      totalOdontologos: datos.totalOdontologos
    })
  } catch (error) {
    console.error('Error en getResumenDashboard:', error)
    return res.status(500).json({ message: 'Error al obtener el resumen del dashboard' })
  }
}

export const getUltimosTurnos = async (req, res) => {
  try {
    const turnos = await getUltimosTurnosService()
    return res.json(turnos)
  } catch (error) {
    console.error('Error en getUltimosTurnos:', error)
    return res.status(500).json({ message: 'Error al obtener los últimos turnos' })
  }
}
