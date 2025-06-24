// dashboardAdmin.controller.js
import { obtenerEstadisticas } from './dashboardAdmin.service.js'
import { obtenerUltimosTurnos } from './dashboardAdmin.service.js'


export const getUltimosTurnos = async (req, res) => {
  try {
    const turnos = await obtenerUltimosTurnos()
    res.json(turnos)
  } catch (error) {
    console.error("Error al obtener turnos recientes:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await obtenerEstadisticas()
    res.json(stats)
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
