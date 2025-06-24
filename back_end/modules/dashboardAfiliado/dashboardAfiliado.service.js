import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerResumenDashboardAfiliado = async (req) => {
  const idAfiliado = req.user?.id
  return {
    turnosPendientes: 0,
    tratamientosActivos: 0,
    pagosRealizados: 0
  }
}

export const obtenerProximosTurnosAfiliado = async (req) => {
  const idAfiliado = req.user?.id
  return []
}

export const obtenerActividadRecienteAfiliado = async (req) => {
  const idAfiliado = req.user?.id
  return []
}
