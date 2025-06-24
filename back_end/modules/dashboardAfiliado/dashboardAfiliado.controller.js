import {
  obtenerResumenDashboardAfiliado,
  obtenerProximosTurnosAfiliado,
  obtenerActividadRecienteAfiliado
} from './dashboardAfiliado.service.js'

export const getResumenDashboardAfiliado = async (req, res) => {
  try {
    const data = await obtenerResumenDashboardAfiliado(req)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProximosTurnosAfiliado = async (req, res) => {
  try {
    const data = await obtenerProximosTurnosAfiliado(req)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getActividadRecienteAfiliado = async (req, res) => {
  try {
    const data = await obtenerActividadRecienteAfiliado(req)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
