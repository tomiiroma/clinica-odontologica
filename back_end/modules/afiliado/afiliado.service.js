import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const crearAfiliado = (data) => {
  return prisma.afiliado.create({ data })
}

export const listarAfiliados = () => {
  return prisma.afiliado.findMany()
}

export const buscarAfiliadoPorId = (id) => {
  return prisma.afiliado.findUnique({ where: { id_afiliado: id } })
}

export const buscarAfiliadoPorEmail = (email) => {
  return prisma.afiliado.findUnique({ where: { email } })
}
