import { useState } from "react";
import "./PlanAfiliacionForm.css"

export default function PlanAfiliacionForm({modo, plan, onClose}){
      const [formData, setFormData] = useState({
        tipo_plan: plan?.tipo_plan || "",
        nombre_convenio: plan?.nombre_convenio || "",
        porcentaje_desc: plan?.porcentaje_desc || "",
      });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
        };
      
    const handleSubmit = (e) => {
  e.preventDefault();

  const method = modo === "crear" ? "POST" : "PUT";
  const url = modo === "crear"
    ? "http://localhost:3000/api/planes"
    : `http://localhost:3000/api/planes/${plan.id_plan}`;

  // Enviar JSON en lugar de FormData
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tipo_plan: formData.tipo_plan,
      nombre_convenio: formData.nombre_convenio,
      porcentaje_desc: parseFloat(formData.porcentaje_desc) // Asegura que sea número
    })
  })
    .then(() => onClose())
    .catch(err => console.error("Error al guardar plan:", err));
};
        return (
          <form className="planAfiliacion-form" onSubmit={handleSubmit}>
            <h3>{modo === "crear" ? "Nuevo Plan" : "Editar Plan"}</h3>
    <input
  name="tipo_plan"
  value={formData.tipo_plan}
  onChange={handleChange}
  placeholder="Tipo Plan"
  required
/>
<input
  name="nombre_convenio"
  value={formData.nombre_convenio}
  onChange={handleChange}
  placeholder="Nombre Convenio"
  required
/>
<input
  type="number"
  name="porcentaje_desc"
  value={formData.porcentaje_desc}
  onChange={handleChange}
  placeholder="Porcentaje de Descuento"
  required
/>
            <div className="form-actions">
              <button type="submit">Guardar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        );
}