import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {
  crearOdontologo,
  listarOdontologos,
  buscarOdontologoPorId,
  actualizarOdontologo,
  eliminarOdontologo
} from './odontologo.service.js'

import bcrypt from 'bcryptjs'

export const registrarOdontologo = async (req, res) => {
  const { nombre, apellido, email, telefono, contraseña, id_especialidad } = req.body

  try {
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
      contraseña: hash,
      id_especialidad
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

export const obtenerOdontologoPorId = async (req, res) => {
  const { id } = req.params
  try {
    const odontologo = await buscarOdontologoPorId(Number(id))
    if (!odontologo) return res.status(404).json({ mensaje: 'No encontrado' })
    res.json(odontologo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const actualizarOdontologoController = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    if (data.contraseña) {
      data.contraseña = await bcrypt.hash(data.contraseña, 10)
    }
    const actualizado = await actualizarOdontologo(Number(id), data)
    res.json(actualizado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const eliminarOdontologoController = async (req, res) => {
  const { id } = req.params
  try {
    await eliminarOdontologo(Number(id))
    res.json({ mensaje: 'Odontólogo eliminado' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
