import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const generarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export const loginAfiliado = async (req, res) => {
  const { email, contraseña } = req.body
  const afiliado = await prisma.afiliado.findUnique({ where: { email } })
  if (!afiliado) return res.status(404).json({ mensaje: 'Afiliado no encontrado' })

  const valido = await bcrypt.compare(contraseña, afiliado.contraseña)
  if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' })

  const token = generarToken({ id: afiliado.id_afiliado, email, rol: 'afiliado' })
  res.json({ token })
}



export const loginOdontologo = async (req, res) => {
  const { email, contraseña } = req.body
  const odontologo = await prisma.odontologo.findUnique({ where: { email } })
  if (!odontologo) return res.status(404).json({ mensaje: 'Odontólogo no encontrado' })

  const valido = await bcrypt.compare(contraseña, odontologo.contraseña)
  if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' })

  const token = generarToken({ id: odontologo.id_odontologo, email, rol: 'odontologo' })
  res.json({ token })
}

export const obtenerPerfil = async (req, res) => {
  const { id, email, rol } = req.user
  res.json({ id, email, rol })
}
