import {
  crearAfiliado,
  listarAfiliados,
  buscarAfiliadoPorId,
  buscarAfiliadoPorEmail
} from './afiliado.service.js'

import bcrypt from 'bcryptjs'

export const registrarAfiliado = async (req, res) => {
  const { email, contraseña, ...resto } = req.body

  try {
    const existente = await buscarAfiliadoPorEmail(email)
    if (existente) {
      return res.status(400).json({ mensaje: 'Email ya registrado' })
    }

    const hash = await bcrypt.hash(contraseña, 10)

    const nuevo = await crearAfiliado({
      email,
      contraseña: hash,
      ...resto
    })

    res.status(201).json({ id: nuevo.id_afiliado, email: nuevo.email })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const obtenerAfiliados = async (req, res) => {
  const lista = await listarAfiliados()
  res.json(lista)
}

export const obtenerAfiliadoPorId = async (req, res) => {
  const afiliado = await buscarAfiliadoPorId(parseInt(req.params.id))
  if (!afiliado) return res.status(404).json({ mensaje: 'Afiliado no encontrado' })
  res.json(afiliado)
}
