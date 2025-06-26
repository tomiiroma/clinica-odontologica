// front_end/src/pages/dashboardadmin/gestorEspecialidades/EspecialidadForm.jsx
import React, { useState, useEffect } from 'react'
import './EspecialidadForm.css'

export default function EspecialidadForm({ item, onClose }) {
  const [nombre, setNombre] = useState(item?.nombre || '')

  useEffect(() => {
    if (item) setNombre(item.nombre)
  }, [item])

  const handleSubmit = (e) => {
    e.preventDefault()
    const method = item ? 'PUT' : 'POST'
    const url = item 
      ? `${import.meta.env.VITE_API_URL}/api/especialidades/${item.id_especialidad}`
      : `${import.meta.env.VITE_API_URL}/api/especialidades`
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    })
      .then(() => onClose())
      .catch(err => console.error('Error al guardar:', err))
  }

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>{item ? 'Editar Especialidad' : 'Nueva Especialidad'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              type="text" 
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">{item ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
)
}
