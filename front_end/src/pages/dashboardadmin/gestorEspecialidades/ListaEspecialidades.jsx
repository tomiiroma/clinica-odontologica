// front_end/src/pages/dashboardadmin/gestorEspecialidades/ListaEspecialidades.jsx
import React, { useEffect, useState } from 'react'
import './ListaEspecialidades.css'
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import EspecialidadForm from './EspecialidadForm'

export default function ListaEspecialidades() {
  const [especialidades, setEspecialidades] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/especialidades`)
      .then(res => res.json())
      .then(setEspecialidades)
      .catch(err => console.error('Error al cargar especialidades:', err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEdit = (item) => {
    setEditItem(item)
    setFormOpen(true)
  }

  const handleDelete = (id) => {
    if (!confirm('¿Confirma la eliminación?')) return
    fetch(`${import.meta.env.VITE_API_URL}/api/especialidades/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchData())
      .catch(err => console.error('Error al eliminar:', err))
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditItem(null)
    fetchData()
  }

  return (
    <div className="gestor-especialidades">
      <div className="header">
        <h2>Especialidades</h2>
        <button onClick={() => setFormOpen(true)} className="btn-add">
          <PlusCircle size={18} /> Nueva
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map(e => (
            <tr key={e.id_especialidad}>
              <td>{e.id_especialidad}</td>
              <td>{e.nombre}</td>
              <td>
                <Edit size={16} onClick={() => handleEdit(e)} className="action-icon"/>
                <Trash2 size={16} onClick={() => handleDelete(e.id_especialidad)} className="action-icon delete"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {formOpen && <EspecialidadForm item={editItem} onClose={handleFormClose}/>}
    </div>
)
}
