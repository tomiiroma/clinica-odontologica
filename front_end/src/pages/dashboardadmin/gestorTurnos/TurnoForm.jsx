
import React, { useState, useEffect } from "react";
import "./TurnoForm.css";

const API = import.meta.env.VITE_API_URL;

export default function TurnoForm({ modo, turno, onClose }) {
  const [formData, setFormData] = useState({
    fecha: turno?.fecha?.slice(0, 16) || "",
    id_afiliado: turno?.id_afiliado || "",
    id_odontologo: turno?.id_odontologo || "",
    id_consultorio: turno?.id_consultorio || "",
  });

  const [afiliados, setAfiliados] = useState([]);
  const [odontologos, setOdontologos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/afiliados`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setAfiliados);
    fetch(`${API}/api/odontologos`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setOdontologos);
    fetch(`${API}/api/consultorios`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setConsultorios);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = modo === "crear" ? "POST" : "PUT";
    const url = modo === "crear"
      ? `${API}/api/turnos`
      : `${API}/api/turnos/${turno.id_turno}`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...formData, estado: "confirmado" })
    })
      .then(() => onClose())
      .catch(err => console.error("Error al guardar turno:", err));
  };

  return (
    <form className="turno-form" onSubmit={handleSubmit}>
      <h3>{modo === "crear" ? "Nuevo Turno" : "Editar Turno"}</h3>
      <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange} required />
      <select name="id_afiliado" value={formData.id_afiliado} onChange={handleChange} required>
        <option value="">Seleccionar afiliado</option>
        {afiliados.map(a => (
          <option key={a.id_afiliado} value={a.id_afiliado}>{a.nombre} {a.apellido}</option>
        ))}
      </select>
      <select name="id_odontologo" value={formData.id_odontologo} onChange={handleChange} required>
        <option value="">Seleccionar odontólogo</option>
        {odontologos.map(o => (
          <option key={o.id_odontologo} value={o.id_odontologo}>{o.nombre} {o.apellido}</option>
        ))}
      </select>
      <select name="id_consultorio" value={formData.id_consultorio} onChange={handleChange} required>
        <option value="">Seleccionar consultorio</option>
        {consultorios.map(c => (
          <option key={c.id_consultorio} value={c.id_consultorio}>Consultorio #{c.numero}</option>
        ))}
      </select>
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
}
