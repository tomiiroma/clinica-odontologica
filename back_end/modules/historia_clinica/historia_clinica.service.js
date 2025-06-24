// historia_clinica service
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const obtenerTodos = () => prisma.historia_clinica.findMany()

export const obtenerPorId = (id) => prisma.historia_clinica.findUnique({ where: { id_historia_clinica: id } })

export const crear = (data) => prisma.historia_clinica.create({ data })

export const actualizar = (id, data) =>
  prisma.historia_clinica.update({
    where: { id_historia_clinica: id },
    data
  })

export const eliminar = (id) => prisma.historia_clinica.delete({ where: { id_historia_clinica: id } })
