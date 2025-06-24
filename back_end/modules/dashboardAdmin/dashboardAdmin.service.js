import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerEstadisticas = async () => {
  const hoy = new Date()
  const hoyISO = new Date(hoy.toISOString().split("T")[0]) // convierte a medianoche del día

  const afiliadosActivos = await prisma.afiliado.count()
  const turnosHoy = await prisma.turno.count({
    where: {
      fecha: {
        equals: hoyISO
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


export const obtenerUltimosTurnos = async () => {
  const turnos = await prisma.turno.findMany({
    orderBy: { fecha: 'desc' },
    take: 4,
    include: {
      afiliado: true,
      odontologo: true,
    }
  })

  return turnos.map((t) => ({
    hora: t.hora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    afiliado: `${t.afiliado.nombre} ${t.afiliado.apellido}`,
    odontologo: `Dr. ${t.odontologo.apellido}`,
    tratamiento: "Consulta",
    estado: t.estado || "pendiente", // asegurate de tener este campo
  }))
}

