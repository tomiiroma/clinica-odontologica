import {
  obtenerResumenDashboard,
  obtenerProximosTurnos,
  obtenerActividadReciente
} from './dashboard.service.js'

export const getResumenDashboard = async (req, res) => {
  try {
    const data = await obtenerResumenDashboard(req)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProximosTurnos = async (req, res) => {
  try {
    const data = await obtenerProximosTurnos(req)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getActividadReciente = async (req, res) => {
  try {
    const data = await obtenerActividadReciente(req)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
