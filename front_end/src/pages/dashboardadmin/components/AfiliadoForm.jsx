import React, { useState, useEffect } from "react"
import "./AfiliadoForm.css"

export default function AfiliadoForm({ modo = "crear", afiliadoId = null, onClose }) {
  const [planes, setPlanes] = useState([])
  const [formData, setFormData] = useState({
    dni: "", nombre: "", apellido: "", direccion: "",
    telefono_fijo: "", telefono_movil: "", sexo: "", email: "",
    fecha_nacimiento: "", id_plan: "",  contraseña: "" 
  })

  useEffect(() => {
    fetch("http://localhost:3000/api/planes")
      .then(res => res.json())
      .then(data => setPlanes(data))
      .catch(err => console.error("Error al cargar planes:", err))

    if (modo === "editar" && afiliadoId) {
      fetch(`http://localhost:3000/api/afiliados/${afiliadoId}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error("Error al cargar afiliado:", err))
    }
  }, [modo, afiliadoId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const method = modo === "crear" ? "POST" : "PUT"
    const url = modo === "crear"
      ? "http://localhost:3000/api/afiliados"
      : `http://localhost:3000/api/afiliados/${afiliadoId}`

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert("Guardado correctamente")
        if (onClose) onClose()
        else window.location.href = "/dashboard-admin/afiliados"
      })
      .catch(err => console.error("Error al guardar:", err))
  }

  return (
    <div className="afiliado-wrapper">
      <form onSubmit={handleSubmit} className="afiliado-form">
        <h3>{modo === "crear" ? "Nuevo afiliado" : "Editar afiliado"}</h3>
        <input name="dni" value={formData.dni} onChange={handleChange} placeholder="DNI *" required />
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre *" required />
        <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido *" required />
        <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
        <input name="telefono_fijo" value={formData.telefono_fijo} onChange={handleChange} placeholder="Teléfono fijo" />
        <input name="telefono_movil" value={formData.telefono_movil} onChange={handleChange} placeholder="Teléfono móvil *" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email *" required />
         <input
          name="contraseña"
          type="password"
          placeholder="Contraseña *"
          value={formData.contraseña || ""}
          onChange={handleChange}
          required
        />
        <select name="sexo" value={formData.sexo} onChange={handleChange} required>
          <option value="">Seleccionar género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento.split("T")[0]} onChange={handleChange} required />
        <select name="id_plan" value={formData.id_plan} onChange={handleChange} required>
          <option value="">Seleccionar plan</option>
          {planes.map((plan) => (
            <option key={plan.id_plan} value={plan.id_plan}>{plan.tipo_plan}</option>
          ))}
        </select>
        <div className="form-actions">
          <button type="button" onClick={() => window.location.href = "/dashboard-admin/afiliados"}>Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  )
}