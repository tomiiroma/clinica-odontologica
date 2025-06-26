// back_end/modules/especialidad/especialidad.controller.js
import {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
} from './especialidad.service.js'

export const getAll = async (req, res) => {
  try {
    const items = await obtenerTodos()
    return res.json(items)
  } catch (error) {
    console.error('Error en getAll Especialidad:', error)
    return res.status(500).json({ mensaje: 'Error al obtener especialidades' })
  }
}

export const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const item = await obtenerPorId(id)
    if (!item) {
      return res.status(404).json({ mensaje: 'Especialidad no encontrada' })
    }
    return res.json(item)
  } catch (error) {
    console.error('Error en getById Especialidad:', error)
    return res.status(500).json({ mensaje: 'Error al obtener la especialidad' })
  }
}

export const create = async (req, res) => {
  try {
    const { nombre } = req.body
    if (!nombre) {
      return res.status(400).json({ mensaje: 'El nombre de la especialidad es requerido' })
    }
    const nuevo = await crear({ nombre })
    return res.status(201).json(nuevo)
  } catch (error) {
    console.error('Error en create Especialidad:', error)
    return res.status(500).json({ mensaje: 'Error al crear la especialidad' })
  }
}

export const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { nombre } = req.body
    if (!nombre) {
      return res.status(400).json({ mensaje: 'El nombre de la especialidad es requerido' })
    }
    const actualizado = await actualizar(id, { nombre })
    return res.json(actualizado)
  } catch (error) {
    console.error('Error en update Especialidad:', error)
    return res.status(500).json({ mensaje: 'Error al actualizar la especialidad' })
  }
}

export const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await eliminar(id)
    return res.json({ mensaje: 'Especialidad eliminada correctamente' })
  } catch (error) {
    console.error('Error en remove Especialidad:', error)
    return res.status(500).json({ mensaje: 'Error al eliminar la especialidad' })
  }
}
