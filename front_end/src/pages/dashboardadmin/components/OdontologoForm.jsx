import React, { useState, useEffect } from "react"
import "./OdontologoForm.css"

export default function OdontologoForm({ modo, odontologo, onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contraseña: ""
  })

  useEffect(() => {
    if (modo === "editar" && odontologo) {
      setForm({ ...odontologo, contraseña: "" })
    }
  }, [modo, odontologo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  const method = modo === "editar" ? "PUT" : "POST"
  const url = modo === "editar"
    ? `http://localhost:3000/api/odontologos/${odontologo.id_odontologo}`
    : "http://localhost:3000/api/odontologos"

 
  const cleanForm = {
    nombre: form.nombre,
    apellido: form.apellido,
    email: form.email,
    telefono: form.telefono,
    contraseña: form.contraseña
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanForm)
  })

  if (res.ok) {
    alert("Guardado correctamente")
    onClose()
  } else {
    alert("Error al guardar")
  }
}


  return (
    <form className="odontologo-form" onSubmit={handleSubmit}>
      <h3>{modo === "crear" ? "Nuevo odontólogo" : "Editar odontólogo"}</h3>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
      <input name="contraseña" value={form.contraseña} onChange={handleChange} placeholder="Contraseña" type="password" required={modo === "crear"} />
      <div className="form-actions">
        <button type="button" onClick={onClose}>Cancelar</button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  )
}
