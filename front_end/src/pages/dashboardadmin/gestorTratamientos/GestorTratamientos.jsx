import React, { useEffect, useState } from "react";
import "./GestorTratamientos.css";
import TratamientoForm from "./TratamientoForm";

export default function GestorTratamientos() {
  const [tratamientos, setTratamientos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState(null);
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState(null);

  const fetchTratamientos = () => {
    fetch("http://localhost:3000/api/tratamientos")
      .then(res => res.json())
      .then(data => setTratamientos(data))
      .catch(err => console.error("Error al cargar tratamientos:", err));
  };

  useEffect(() => {
    fetchTratamientos();
  }, []);

  const filtrados = tratamientos.filter(
    (t) =>
      t.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirFormularioCrear = () => {
    setModo("crear");
    setTratamientoSeleccionado(null);
  };

  const abrirFormularioEditar = (tratamiento) => {
    setModo("editar");
    setTratamientoSeleccionado(tratamiento);
  };

  const cerrarFormulario = () => {
    setModo(null);
    setTratamientoSeleccionado(null);
    fetchTratamientos();
  };

  const eliminarTratamiento = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este tratamiento?")) {
      fetch(`http://localhost:3000/api/tratamientos/${id}`, { method: "DELETE" })
        .then(() => fetchTratamientos())
        .catch(err => console.error("Error al eliminar tratamiento:", err));
    }
  };

  return (
    <div className="gestor-tratamientos">
      <div className="gestor-header">
        <div>
          <h2>Gestor de Tratamientos</h2>
          <p>Administra los tratamientos del consultorio</p>
        </div>
        <button className="btn-nuevo" onClick={abrirFormularioCrear}>+ Nuevo Tratamiento</button>
      </div>

      {modo ? (
        <TratamientoForm modo={modo} tratamiento={tratamientoSeleccionado} onClose={cerrarFormulario} />
      ) : (
        <>
          <div className="gestor-busqueda">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="tratamiento-list">
            {filtrados.map((trat) => (
              <div className="tratamiento-card" key={trat.id_tratamiento}>
                <img src={`http://localhost:3000${trat.imagen_url}`} alt={trat.nombre} className="tratamiento-img" />
                <div className="tratamiento-content">
                  <div className="tratamiento-header">
                    <h4 className="tratamiento-nombre">{trat.nombre}</h4>
                    <span className="estado">{trat.finalizado ? "Finalizado" : "Activo"}</span>
                  </div>
                  <div className="tratamiento-detalle">
                  <span><strong>Sesiones:</strong> {trat.cantidadSesiones}</span>
                    <span><strong>Costo:</strong> ${trat.costo}</span>
                  </div>
                  <div className="tratamiento-footer">
                    <button onClick={() => abrirFormularioEditar(trat)}>Modificar</button>
                    <button onClick={() => eliminarTratamiento(trat.id_tratamiento)} className="btn-eliminar">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}