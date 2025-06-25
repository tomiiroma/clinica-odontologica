import React, { useState, useEffect } from "react";
import "./ConsultorioForm.css";

const API = import.meta.env.VITE_API_URL;

export default function ConsultorioForm({ modo, consultorio, onClose }) {
  const [formData, setFormData] = useState({
    numero: consultorio?.numero || "",
    id_sede: consultorio?.id_sede || "",
  });
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/sedes`)
      .then(res => res.json())
      .then(data => setSedes(data))
      .catch(err => console.error("Error al cargar sedes:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.numero || !formData.id_sede) {
      alert("Faltan campos");
      return;
    }

    if (modo === 'editar' && !consultorio?.id_consultorio) {
      alert('No se puede editar: consultorio no válido.');
      return;
    }

    const method = modo === "crear" ? "POST" : "PUT";
    const url = modo === "crear"
      ? `${API}/api/consultorios`
      : `${API}/api/consultorios/${consultorio?.id_consultorio}`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numero: parseInt(formData.numero),
        id_sede: parseInt(formData.id_sede)
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar consultorio");
        return res.json();
      })
      .then(() => onClose())
      .catch(err => console.error("Error al guardar consultorio:", err));
  };

  return (
    <form className="formulario-consultorio" onSubmit={handleSubmit}>
      <h3>{modo === "crear" ? "Nuevo Consultorio" : "Editar Consultorio"}</h3>
      <input
        name="numero"
        type="number"
        value={formData.numero}
        onChange={handleChange}
        placeholder="Número de Consultorio"
        required
      />
      <select name="id_sede" value={formData.id_sede} onChange={handleChange} required>
        <option value="">Seleccionar Sede</option>
        {sedes.map(sede => (
          <option key={sede.id_sede} value={sede.id_sede}>
            {sede.nombre} - {sede.ciudad}
          </option>
        ))}
      </select>
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
}
