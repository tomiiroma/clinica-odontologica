import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const crearOdontologo = (data) => {
  return prisma.odontologo.create({ data })
}

export const listarOdontologos = () => {
  return prisma.odontologo.findMany()
}

export const buscarOdontologoPorEmail = (email) => {
  return prisma.odontologo.findUnique({ where: { email } })
}

export const buscarOdontologoPorId = (id) => {
  return prisma.odontologo.findUnique({ where: { id_odontologo: id } })
}

export const actualizarOdontologo = (id, data) => {
  return prisma.odontologo.update({ where: { id_odontologo: id }, data })
}

export const eliminarOdontologo = (id) => {
  return prisma.odontologo.delete({ where: { id_odontologo: id } })
}
