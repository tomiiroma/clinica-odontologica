import React from "react"
import "./TablaDatos.css"

export default function TablaDatos({ data, columnas, tipo, onEditar }) {
  return (
    <div className="tabla-datos">
      <table>
        <thead>
          <tr>
            {columnas.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr key={i} className={i % 2 === 0 ? "par" : "impar"}>
              <td>{fila.nombre}</td>
              <td>{fila.apellido}</td>
              <td>{fila.dni}</td>
              <td>{fila.telefono_movil || "-"}</td>
              <td>{fila.direccion || "-"}</td>
              <td>{fila.plan?.tipo_plan || "-"}</td>
              <td>
                <div className="acciones">
                  <button className="btn azul">Historia clínica</button>
                  <button className="btn amarillo" onClick={() => onEditar(fila)}>Modificar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
