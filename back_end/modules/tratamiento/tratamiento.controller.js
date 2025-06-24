import {
  obtenerTodos as listar,
  obtenerPorId,
  crear,
  actualizarTratamiento,
  eliminar
} from './tratamiento.service.js';

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await listar();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener tratamientos:", error);
    res.status(500).json({ error: "Error interno al obtener tratamientos" });
  }
};

export const create = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      costo,
      cantidadSesiones,
      id_odontologo,
      id_historia
    } = req.body;

    const imagen_url = req.file
      ? `/uploads/tratamientos/${req.file.filename}`
      : null;

    const nuevo = await crear({
      nombre,
      descripcion,
      costo: parseFloat(costo),
      cantidadSesiones: parseInt(cantidadSesiones),
      id_odontologo: parseInt(id_odontologo),
      id_historia: id_historia ? parseInt(id_historia) : null,
      imagen_url
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear tratamiento:", error);
    res.status(500).json({ error: "Error interno al crear tratamiento" });
  }
};

export const actualizar = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      costo,
      cantidadSesiones,
      id_odontologo,
      id_historia
    } = req.body;

    const imagen_url = req.file
      ? `/uploads/tratamientos/${req.file.filename}`
      : undefined;

    const id = parseInt(req.params.id);

    const data = {
      nombre,
      descripcion,
      costo: parseFloat(costo),
      cantidadSesiones: parseInt(cantidadSesiones),
      id_odontologo: parseInt(id_odontologo)
    };

    if (id_historia) {
      data.id_historia = parseInt(id_historia);
    }

    if (imagen_url) {
      data.imagen_url = imagen_url;
    }

    const actualizado = await actualizarTratamiento(id, data);
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar tratamiento:", error);
    res.status(500).json({ error: "Error interno al actualizar tratamiento" });
  }
};