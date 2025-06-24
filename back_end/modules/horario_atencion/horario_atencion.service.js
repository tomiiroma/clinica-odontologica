// horario_atencion service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.horario_atencion.findMany()

export const obtenerPorId = (id) => prisma.horario_atencion.findUnique({ where: { id_horario_atencion: id } })

export const crear = (data) => prisma.horario_atencion.create({ data })

export const actualizar = (id, data) =>
  prisma.horario_atencion.update({
    where: { id_horario_atencion: id },
    data
  })

export const eliminar = (id) => prisma.horario_atencion.delete({ where: { id_horario_atencion: id } })
