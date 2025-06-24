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
