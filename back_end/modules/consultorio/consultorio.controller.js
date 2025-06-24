// consultorio controller
import { obtenerTodos, obtenerPorId, crear, actualizar, eliminar } from './consultorio.service.js'

export const getAll = async (req, res) => {
  const items = await obtenerTodos()
  res.json(items)
}

export const getById = async (req, res) => {
  const item = await obtenerPorId(parseInt(req.params.id))
  if (!item) return res.status(404).json({ mensaje: 'Consultorio no encontrado' })
  res.json(item)
}

export const create = async (req, res) => {
  const nuevo = await crear(req.body)
  res.status(201).json(nuevo)
}

export const update = async (req, res) => {
  const actualizado = await actualizar(parseInt(req.params.id), req.body)
  res.json(actualizado)
}

export const remove = async (req, res) => {
  await eliminar(parseInt(req.params.id))
  res.json({ mensaje: 'Consultorio eliminado correctamente' })
}
