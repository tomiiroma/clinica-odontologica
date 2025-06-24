import { useEffect, useState } from "react";
import "./GestorPlanAfiliacion.css";
import PlanAfiliacionForm from "./PlanAfiliacionForm"
export default function GestorPlanAfiliacion() {
    
    const [modo, setModo] = useState(null);    
      const [planSeleccionado, setPlanSeleccionado] = useState(null);
      const [planes, setPlanes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

      
  const fetchPlanes = () => {
    fetch("http://localhost:3000/api/planes")
      .then(res => res.json())
      .then(data => setPlanes(data))
      .catch(err => console.error("Error al cargar planes:", err));
  };

  useEffect(() => {
    fetchPlanes();
  }, []);


    const abrirFormularioCrear = () => {
    setModo("crear");
  };
  const cerrarFormulario = () => {
    setModo(null);
    setPlanSeleccionado(null);
  };

   const abrirFormularioEditar = (plan) => {
    setModo("editar");
    setPlanSeleccionado(plan);
  };

  const eliminarPlan = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este plan?")) {
      fetch(`http://localhost:3000/api/planes/${id}`, { method: "DELETE" })
        .then(() => fetchPlanes())
        .catch(err => console.error("Error al eliminar plan:", err));
    }
  };

    const filtrados = planes.filter((p) =>
    p.tipo_plan?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.nombre_convenio?.toLowerCase().includes(busqueda.toLowerCase())
  );


  return (
    <div className="gestor-planAfiliacion">
      <div className="gestor-header">
        <div>
          <h2>Gestor de Planes de Afiliación</h2>
          <p>Administra los planes de afiliación del consultorio</p>
        </div>
        <button className="btn-nuevo" onClick={abrirFormularioCrear}>
          + Nuevo Plan de Afiliación
        </button>
      </div>

      {modo ? (
        <PlanAfiliacionForm
          modo={modo}
          plan={planSeleccionado}
          onClose={cerrarFormulario}
        />
      ) : (
        <>
          <div className="gestor-busqueda">
            <input
              type="text"
              placeholder="Buscar por tipo o convenio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          {filtrados.length === 0 ? (
            <p className="sin-planes">No hay planes disponibles.</p>
          ) : (
            <div className="plan-grid">
              {filtrados.map((plan) => (
             <div className="plan-card" key={plan.id_plan}>
  <div className="plan-info">
    <h4>{plan.tipo_plan}</h4>
    <p>{plan.nombre_convenio}</p>
    <p>{plan.porcentaje_desc}% de descuento</p>
  </div>
  <div className="plan-footer">
    <button onClick={() => abrirFormularioEditar(plan)} >Modificar</button>
    <button onClick={() => eliminarPlan(plan.id_plan)} className="btn-eliminar">Eliminar</button>
  </div>
</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}