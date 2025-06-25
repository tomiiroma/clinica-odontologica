import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.turno.findMany()

export const obtenerPorId = (id) =>
  prisma.turno.findUnique({ where: { id_turno: id } })

export const crear = (data) =>
  prisma.turno.create({
    data: {
      fecha: new Date(data.fecha), // ✅ conversión necesaria
      id_afiliado: parseInt(data.id_afiliado),
      id_odontologo: parseInt(data.id_odontologo),
      id_consultorio: parseInt(data.id_consultorio),
      estado: data.estado || "confirmado"
    }
  })

export const actualizar = (id, data) =>
  prisma.turno.update({
    where: { id_turno: id },
    data: {
      fecha: new Date(data.fecha), // ✅ necesario también acá
      id_afiliado: parseInt(data.id_afiliado),
      id_odontologo: parseInt(data.id_odontologo),
      id_consultorio: parseInt(data.id_consultorio),
      estado: data.estado || "confirmado"
    }
  })

export const eliminar = (id) =>
  prisma.turno.delete({ where: { id_turno: id } })
