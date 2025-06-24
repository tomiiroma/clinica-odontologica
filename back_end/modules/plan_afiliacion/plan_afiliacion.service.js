// plan_afiliacion service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.plan_afiliacion.findMany()

export const obtenerPorId = (id) => prisma.plan_afiliacion.findUnique({ where: { id_plan_afiliacion: id } })

export const crear = (data) => prisma.plan_afiliacion.create({ data })

export const actualizar = (id, data) =>
  prisma.plan_afiliacion.update({
    where: { id_plan_afiliacion: id },
    data
  })

export const eliminar = (id) => prisma.plan_afiliacion.delete({ where: { id_plan_afiliacion: id } })
