import React, { useState, useEffect } from "react";
import "./TratamientoForm.css";

export default function TratamientoForm({ modo, tratamiento, onClose }) {
  const [odontologos, setOdontologos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: tratamiento?.nombre || "",
    descripcion: tratamiento?.descripcion || "",
    costo: tratamiento?.costo || "",
    cantidadSesiones: tratamiento?.cantidadSesiones || "",
    id_odontologo: tratamiento?.id_odontologo || ""
  });
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/odontologos")
      .then(res => res.json())
      .then(data => setOdontologos(data))
      .catch(err => console.error("Error al cargar odontólogos:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = modo === "crear" ? "POST" : "PUT";
    const url = modo === "crear"
      ? "http://localhost:3000/api/tratamientos"
      : `http://localhost:3000/api/tratamientos/${tratamiento.id_tratamiento}`;

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (imagenFile) form.append("imagen", imagenFile);

    fetch(url, {
      method,
      body: form
    })
      .then(() => onClose())
      .catch(err => console.error("Error al guardar tratamiento:", err));
  };

  return (
    <form className="tratamiento-form" onSubmit={handleSubmit}>
      <h3>{modo === "crear" ? "Nuevo Tratamiento" : "Editar Tratamiento"}</h3>
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input type="number" name="costo" value={formData.costo} onChange={handleChange} placeholder="Costo" required />
      <input type="number" name="cantidadSesiones" value={formData.cantidadSesiones} onChange={handleChange} placeholder="Cantidad de sesiones" required />

      <select name="id_odontologo" value={formData.id_odontologo} onChange={handleChange} required>
        <option value="">Seleccionar odontólogo</option>
        {odontologos.map((o) => (
          <option key={o.id_odontologo} value={o.id_odontologo}>
            {o.nombre} {o.apellido}
          </option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
}
