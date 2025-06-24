import { obtenerTodos, obtenerPorId, crear, actualizar, eliminar } from './sede.service.js';

export const getAll = async (req, res) => {
  const items = await obtenerTodos();
  res.json(items);
};

export const getById = async (req, res) => {
  const item = await obtenerPorId(parseInt(req.params.id));
  if (!item) return res.status(404).json({ mensaje: 'Sede no encontrada' });
  res.json(item);
};

export const create = async (req, res) => {
  const imagen_url = req.file ? `/uploads/sedes/${req.file.filename}` : null;
  const nueva = await crear({ ...req.body, imagen_url });
  res.status(201).json(nueva);
};

export const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const imagen_url = req.file ? `/uploads/sedes/${req.file.filename}` : req.body.imagen_url;
  const actualizado = await actualizar(id, { ...req.body, imagen_url });
  res.json(actualizado);
};

export const remove = async (req, res) => {
  await eliminar(parseInt(req.params.id));
  res.json({ mensaje: 'Sede eliminada correctamente' });
};