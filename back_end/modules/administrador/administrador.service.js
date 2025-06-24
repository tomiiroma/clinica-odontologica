import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const crearAdministrador = (data) => {
  return prisma.administrador.create({ data })
}

export const buscarAdministradorPorEmail = (email) => {
  return prisma.administrador.findUnique({ where: { email } })
}
