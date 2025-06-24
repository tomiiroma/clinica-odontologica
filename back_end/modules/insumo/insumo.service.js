// insumo service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.insumo.findMany()

export const obtenerPorId = (id) => prisma.insumo.findUnique({ where: { id_insumo: id } })

export const crear = (data) => prisma.insumo.create({ data })

export const actualizar = (id, data) =>
  prisma.insumo.update({
    where: { id_insumo: id },
    data
  })

export const eliminar = (id) => prisma.insumo.delete({ where: { id_insumo: id } })
