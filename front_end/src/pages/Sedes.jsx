import React from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/Sedes.css';

const Sedes = () => {
  const sedes = [
    {
      nombre: "Sede Centro",
      direccion: "Av. Corrientes 1234, CABA",
      telefono: "011-4567-8901",
      horarios: "Lun-Vie: 8:00-18:00",
      imagen: "/images/sede-centro.png",
    },
    {
      nombre: "Sede Palermo",
      direccion: "Av. Santa Fe 2567, Palermo",
      telefono: "011-4567-8902",
      horarios: "Lun-Sab: 9:00-19:00",
      imagen: "/images/sede-palermo.png",
    },
    {
      nombre: "Sede Belgrano",
      direccion: "Av. Cabildo 3456, Belgrano",
      telefono: "011-4567-8903",
      horarios: "Lun-Vie: 8:30-17:30",
      imagen: "/images/sede-belgrano.png",
    },
  ];

  return (
    <div className="sedes-page">
      <NavBar />

      <main className="sedes-container">
        <h1 className="sedes-title">Sedes</h1>

        <div className="sedes-mapa">
          <img src="/images/mapa-ubicaciones.png" alt="Mapa" />
        </div>

        <div className="sedes-lista">
          {sedes.map((sede, i) => (
            <div key={i} className="sede-card">
              <div className="sede-info">
                <h2>{sede.nombre}</h2>
                <p><span>Dirección:</span> {sede.direccion}</p>
                <p><span>Teléfono:</span> {sede.telefono}</p>
                <p><span>Horarios de atención:</span> {sede.horarios}</p>
              </div>
              <img src={sede.imagen} alt={sede.nombre} className="sede-imagen" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sedes;
