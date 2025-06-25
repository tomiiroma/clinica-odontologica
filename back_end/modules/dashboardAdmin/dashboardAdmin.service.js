// dashboardAdmin.service.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getResumenDashboard() {
  // 1) Totales generales
  const totalAfiliados   = await prisma.afiliado.count()
  const totalSedes       = await prisma.sede.count()
  const totalOdontologos = await prisma.odontologo.count()

  // 2) Rango de hoy
  const now        = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const endOfDay   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)

  // 3) Cuenta sólo los turnos cuya fecha esté entre startOfDay y endOfDay
  const turnosHoy = await prisma.turno.count({
    where: {
      fecha: {
        gte: startOfDay,
        lte: endOfDay
      }
    }
  })

  return {
    totalAfiliados,
    turnosHoy,
    totalSedes,
    totalOdontologos
  }
}

export async function getUltimosTurnos() {
  const turnos = await prisma.turno.findMany({
    orderBy: { fecha: 'desc' },
    take: 5,
    include: {
      afiliado: { select: { nombre: true, apellido: true } },
      odontologo: { select: { nombre: true, apellido: true } },
      consultorio: { select: { numero: true } }
    }
  })

  return turnos.map(t => {
    const fecha = t.fecha
    const hours = fecha.getHours().toString().padStart(2, '0')
    const minutes = fecha.getMinutes().toString().padStart(2, '0')
    return {
      hora: `${hours}:${minutes}`,
      afiliado: `${t.afiliado.nombre} ${t.afiliado.apellido}`,
      odontologo: `${t.odontologo.nombre} ${t.odontologo.apellido}`,
      consultorio: `${t.consultorio.numero}`,
      estado: t.estado || "Sin estado"
    }
  })
}
