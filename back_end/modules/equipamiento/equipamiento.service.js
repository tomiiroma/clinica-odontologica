// equipamiento service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.equipamiento.findMany()

export const obtenerPorId = (id) => prisma.equipamiento.findUnique({ where: { id_equipamiento: id } })

export const crear = (data) => prisma.equipamiento.create({ data })

export const actualizar = (id, data) =>
  prisma.equipamiento.update({
    where: { id_equipamiento: id },
    data
  })

export const eliminar = (id) => prisma.equipamiento.delete({ where: { id_equipamiento: id } })
