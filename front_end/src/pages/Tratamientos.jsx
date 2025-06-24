import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./Tratamientos.css"; // si querés usar CSS externo

const Tratamientos = () => {
  const tratamientos = [
    { titulo: "Implantes dentales", imagen: "/images/tratamiento-implantes.png" },
    { titulo: "Blanqueamiento dental", imagen: "/images/tratamiento-blanqueamiento.png" },
    { titulo: "Ortodoncia", imagen: "/images/tratamiento-ortodoncia.png" },
    { titulo: "Ortodoncia invisible", imagen: "/images/tratamiento-ortodoncia-invisible.png" },
    { titulo: "Carillas Dentales", imagen: "/images/tratamiento-carillas.png" },
    { titulo: "Coronas dentales", imagen: "/images/tratamiento-coronas.png" },
    { titulo: "Extracciones dentales", imagen: "/images/tratamiento-extracciones.png" },
    { titulo: "Estética y restauradora", imagen: "/images/tratamiento-estetica.png" },
    { titulo: "Prótesis dental", imagen: "/images/tratamiento-protesis.png" },
    { titulo: "Tratamiento de conducto", imagen: "/images/tratamiento-conducto.png" },
    { titulo: "Cirugía-maxilofacial", imagen: "/images/tratamiento-cirugia.png" },
  ];

  return (
    <div className="tratamientos-page">
      <NavBar />

      <main className="tratamientos-container">
        <h1 className="tratamientos-title">Tratamientos odontológicos</h1>

        <div className="tratamientos-grid">
          {tratamientos.map((t, index) => (
            <div key={index} className="tratamiento-card">
              <div className="tratamiento-img-container">
                <img src={t.imagen} alt={t.titulo} className="tratamiento-img" />
                <div className="tratamiento-icon">→</div>
              </div>
              <div className="tratamiento-content">
                <h3>{t.titulo}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tratamientos;
