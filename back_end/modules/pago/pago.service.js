// pago service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.pago.findMany()

export const obtenerPorId = (id) => prisma.pago.findUnique({ where: { id_pago: id } })

export const crear = (data) => prisma.pago.create({ data })

export const actualizar = (id, data) =>
  prisma.pago.update({
    where: { id_pago: id },
    data
  })

export const eliminar = (id) => prisma.pago.delete({ where: { id_pago: id } })
