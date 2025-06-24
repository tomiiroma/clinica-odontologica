// dashboardAdmin.service.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerEstadisticas = async () => {
  const afiliadosActivos = await prisma.afiliado.count()
  const turnosHoy = await prisma.turno.count({
    where: {
      fecha: {
        equals: new Date().toISOString().split('T')[0]
      }
    }
  })
  const totalSedes = await prisma.sede.count()
  const totalOdontologos = await prisma.odontologo.count()

  return {
    afiliadosActivos,
    turnosHoy,
    totalSedes,
    totalOdontologos
  }
}
