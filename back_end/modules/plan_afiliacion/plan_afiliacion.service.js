import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.planAfiliacion.findMany()

export const obtenerPorId = (id) =>
  prisma.planAfiliacion.findUnique({
    where: { id_plan: id }
  })

export const crear = (data) =>
  prisma.planAfiliacion.create({
    data
  })

export const actualizar = (id, data) =>
  prisma.planAfiliacion.update({
    where: { id_plan: id },
    data
  })

export const eliminar = (id) =>
  prisma.planAfiliacion.delete({
    where: { id_plan: id }
  })
