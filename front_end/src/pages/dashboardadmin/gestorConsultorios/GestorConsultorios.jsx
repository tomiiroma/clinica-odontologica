
import React, { useState, useEffect } from "react";
import "./GestorConsultorios.css";
import ConsultorioForm from "./ConsultorioForm";

const API = import.meta.env.VITE_API_URL;

export default function GestorConsultorios() {
  const [consultorios, setConsultorios] = useState([]);
  const [consultorioEditar, setConsultorioEditar] = useState(null);
  const [modo, setModo] = useState("crear");

  useEffect(() => {
    obtenerConsultorios();
  }, []);

  const obtenerConsultorios = () => {
    fetch(`${API}/api/consultorios`)
      .then(res => res.json())
      .then(data => setConsultorios(data))
      .catch(err => console.error("Error al obtener consultorios:", err));
  };

  const eliminarConsultorio = (id) => {
    if (!window.confirm("¿Eliminar consultorio?")) return;

    fetch(`${API}/api/consultorios/${id}`, {
      method: "DELETE"
    })
      .then(() => obtenerConsultorios())
      .catch(err => console.error("Error al eliminar consultorio:", err));
  };

  const abrirEdicion = (c) => {
    if (!c?.id_consultorio) {
      alert("Consultorio sin ID válido");
      return;
    }
    setConsultorioEditar(c);
    setModo("editar");
  };

  const cerrarFormulario = () => {
    setConsultorioEditar(null);
    setModo("crear");
    obtenerConsultorios();
  };

  return (
    <div className="">
      <h2>Gestión de Consultorios</h2>
      <ConsultorioForm
        modo={modo}
        consultorio={consultorioEditar}
        onClose={cerrarFormulario}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>ID Sede</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consultorios.map(c => (
            <tr key={c.id_consultorio}>
              <td>{c.id_consultorio}</td>
              <td>{c.numero}</td>
              <td>{c.id_sede}</td>
              <td>
                <button onClick={() => abrirEdicion(c)}>Editar</button>
                <button onClick={() => eliminarConsultorio(c.id_consultorio)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
