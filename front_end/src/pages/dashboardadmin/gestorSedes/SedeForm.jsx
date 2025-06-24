import React, { useState } from "react";
import "./SedeForm.css";

export default function SedeForm({ modo, sede, onClose }) {
  const [formData, setFormData] = useState({
    nombre: sede?.nombre || "",
    ciudad: sede?.ciudad || "",
    calle: sede?.calle || "",
    numero: sede?.numero || "",
  });
  const [imagenFile, setImagenFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = modo === "crear" ? "POST" : "PUT";
    const url = modo === "crear"
      ? "http://localhost:3000/api/sedes"
      : `http://localhost:3000/api/sedes/${sede.id_sede}`;

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (imagenFile) form.append("imagen", imagenFile);

    fetch(url, {
      method,
      body: form
    })
      .then(() => onClose())
      .catch(err => console.error("Error al guardar sede:", err));
  };

  return (
    <form className="sede-form" onSubmit={handleSubmit}>
      <h3>{modo === "crear" ? "Nueva Sede" : "Editar Sede"}</h3>
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Ciudad" required />
      <input name="calle" value={formData.calle} onChange={handleChange} placeholder="Calle" required />
      <input name="numero" value={formData.numero} onChange={handleChange} placeholder="Número" required />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
}