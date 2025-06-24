// especialidad service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.especialidad.findMany()

export const obtenerPorId = (id) => prisma.especialidad.findUnique({ where: { id_especialidad: id } })

export const crear = (data) => prisma.especialidad.create({ data })

export const actualizar = (id, data) =>
  prisma.especialidad.update({
    where: { id_especialidad: id },
    data
  })

export const eliminar = (id) => prisma.especialidad.delete({ where: { id_especialidad: id } })
