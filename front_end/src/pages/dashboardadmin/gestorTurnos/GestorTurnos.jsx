
import React, { useState, useEffect } from "react";
import "./GestorTurnos.css";
import TurnoForm from "./TurnoForm";

const API = import.meta.env.VITE_API_URL;

export default function GestorTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [turnoEditar, setTurnoEditar] = useState(null);
  const [modo, setModo] = useState("crear");

  const obtenerTurnos = () => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/turnos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setTurnos);
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const eliminarTurno = (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("¿Eliminar turno?")) return;

    fetch(`${API}/api/turnos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => obtenerTurnos());
  };

  const abrirEdicion = (t) => {
    setTurnoEditar(t);
    setModo("editar");
  };

  const cerrarFormulario = () => {
    setTurnoEditar(null);
    setModo("crear");
    obtenerTurnos();
  };

  return (
    <div className="gestor-turnos">
      <h2>Gestión de Turnos</h2>
      <TurnoForm modo={modo} turno={turnoEditar} onClose={cerrarFormulario} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Afiliado</th>
            <th>Odontólogo</th>
            <th>Consultorio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map(t => (
            <tr key={t.id_turno}>
              <td>{t.id_turno}</td>
              <td>{new Date(t.fecha).toLocaleString()}</td>
              <td>{t.id_afiliado}</td>
              <td>{t.id_odontologo}</td>
              <td>{t.id_consultorio}</td>
              <td>
                <button onClick={() => abrirEdicion(t)}>Editar</button>
                <button onClick={() => eliminarTurno(t.id_turno)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
