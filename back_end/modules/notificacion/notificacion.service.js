// notificacion service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.notificacion.findMany()

export const obtenerPorId = (id) => prisma.notificacion.findUnique({ where: { id_notificacion: id } })

export const crear = (data) => prisma.notificacion.create({ data })

export const actualizar = (id, data) =>
  prisma.notificacion.update({
    where: { id_notificacion: id },
    data
  })

export const eliminar = (id) => prisma.notificacion.delete({ where: { id_notificacion: id } })
