import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {
  crearOdontologo,
  listarOdontologos
} from './odontologo.service.js'

import bcrypt from 'bcryptjs'

export const registrarOdontologo = async (req, res) => {
  const { nombre, apellido, email, telefono, contraseña } = req.body

  try {
    // Verificar si ya existe un odontólogo con ese email
    const existente = await prisma.odontologo.findUnique({ where: { email } })
    if (existente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' })
    }

    const hash = await bcrypt.hash(contraseña, 10)

    const nuevo = await crearOdontologo({
      nombre,
      apellido,
      email,
      telefono,
      contraseña: hash
    })

    res.status(201).json({ id: nuevo.id_odontologo, email: nuevo.email })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const obtenerOdontologos = async (req, res) => {
  const lista = await listarOdontologos()
  res.json(lista)
}
