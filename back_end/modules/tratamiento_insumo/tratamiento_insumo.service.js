// tratamiento_insumo service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.tratamiento_insumo.findMany()

export const obtenerPorId = (id) => prisma.tratamiento_insumo.findUnique({ where: { id_tratamiento_insumo: id } })

export const crear = (data) => prisma.tratamiento_insumo.create({ data })

export const actualizar = (id, data) =>
  prisma.tratamiento_insumo.update({
    where: { id_tratamiento_insumo: id },
    data
  })

export const eliminar = (id) => prisma.tratamiento_insumo.delete({ where: { id_tratamiento_insumo: id } })
