// turno service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.turno.findMany()

export const obtenerPorId = (id) => prisma.turno.findUnique({ where: { id_turno: id } })

export const crear = (data) => prisma.turno.create({ data })

export const actualizar = (id, data) =>
  prisma.turno.update({
    where: { id_turno: id },
    data
  })

export const eliminar = (id) => prisma.turno.delete({ where: { id_turno: id } })
