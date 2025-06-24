// sede service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.sede.findMany()

export const obtenerPorId = (id) => prisma.sede.findUnique({ where: { id_sede: id } })

export const crear = (data) => prisma.sede.create({ data })

export const actualizar = (id, data) =>
  prisma.sede.update({
    where: { id_sede: id },
    data
  })

export const eliminar = (id) => prisma.sede.delete({ where: { id_sede: id } })
