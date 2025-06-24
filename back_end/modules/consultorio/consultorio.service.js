// consultorio service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.consultorio.findMany()

export const obtenerPorId = (id) => prisma.consultorio.findUnique({ where: { id_consultorio: id } })

export const crear = (data) => prisma.consultorio.create({ data })

export const actualizar = (id, data) =>
  prisma.consultorio.update({
    where: { id_consultorio: id },
    data
  })

export const eliminar = (id) => prisma.consultorio.delete({ where: { id_consultorio: id } })
