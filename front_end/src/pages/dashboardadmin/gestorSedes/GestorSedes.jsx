import React, { useEffect, useState } from "react";
import "./GestorSedes.css";
import SedeForm from "./SedeForm";

export default function GestorSedes() {
  const [sedes, setSedes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState(null);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

  const fetchSedes = () => {
    fetch("http://localhost:3000/api/sedes")
      .then(res => res.json())
      .then(data => setSedes(data))
      .catch(err => console.error("Error al cargar sedes:", err));
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  const filtradas = sedes.filter(
    (s) =>
      s.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.ciudad?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirFormularioCrear = () => {
    setModo("crear");
    setSedeSeleccionada(null);
  };

  const abrirFormularioEditar = (sede) => {
    setModo("editar");
    setSedeSeleccionada(sede);
  };

  const cerrarFormulario = () => {
    setModo(null);
    setSedeSeleccionada(null);
    fetchSedes();
  };

  const eliminarSede = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta sede?")) {
      fetch(`http://localhost:3000/api/sedes/${id}`, { method: "DELETE" })
        .then(() => fetchSedes())
        .catch(err => console.error("Error al eliminar sede:", err));
    }
  };

  return (
    <div className="gestor-sedes">
      <div className="gestor-header">
        <div>
          <h2>Gestor de Sedes</h2>
          <p>Administra las sedes del consultorio</p>
        </div>
        <button className="btn-nuevo" onClick={abrirFormularioCrear}>+ Nueva Sede</button>
      </div>

      {modo ? (
        <SedeForm modo={modo} sede={sedeSeleccionada} onClose={cerrarFormulario} />
      ) : (
        <>
          <div className="gestor-busqueda">
            <input
              type="text"
              placeholder="Buscar por nombre o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          {filtradas.length === 0 ? (
            <p className="sin-sedes">No hay sedes disponibles.</p>
          ) : (
            <div className="sede-grid">
              {filtradas.map((sede) => (
                <div className="sede-card" key={sede.id_sede}>
                <img src={`http://localhost:3000${sede.imagen_url}`} alt={sede.nombre} className="sede-img" />
                  <div className="sede-info">
                    <h4>{sede.nombre}</h4>
                    <p>{sede.ciudad}</p>
                    <p>{sede.calle} {sede.numero}</p>
                  </div>
                  <div className="sede-actions">
                    <button onClick={() => abrirFormularioEditar(sede)}>Modificar</button>
                    <button onClick={() => eliminarSede(sede.id_sede)} className="btn-eliminar">Eliminar</button>
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