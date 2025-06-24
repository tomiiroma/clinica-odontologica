// tratamiento service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.tratamiento.findMany()

export const obtenerPorId = (id) => prisma.tratamiento.findUnique({ where: { id_tratamiento: id } })

export const crear = (data) => prisma.tratamiento.create({ data })

export const actualizar = (id, data) =>
  prisma.tratamiento.update({
    where: { id_tratamiento: id },
    data
  })

export const eliminar = (id) => prisma.tratamiento.delete({ where: { id_tratamiento: id } })
