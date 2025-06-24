import './Home.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Home() {
  const serviciosDestacados = [
    {
      titulo: "Blanqueamiento",
      descripcion: "Recuperá el brillo natural de tu sonrisa eliminando manchas",
      imagen: "/images/servicio-blanqueamiento.png",
    },
    {
      titulo: "Limpieza dental",
      descripcion: "Eliminá placa y sarro para proteger tus dientes y encías sanas.",
      imagen: "/images/servicio-limpieza.png",
    },
    {
      titulo: "Ortodoncia",
      descripcion: "Corregí la posición de tus dientes para tener una sonrisa alineada",
      imagen: "/images/servicio-ortodoncia.png",
    },
  ]

  const equipoMedico = [
    {
      nombre: "Dra. Laura Gómez",
      especialidad: "Odontóloga",
      imagen: "/images/doctora-laura-nueva.png",
    },
    {
      nombre: "Dr. Martín Pérez",
      especialidad: "Ortodontista",
      imagen: "/images/doctor-martin-nuevo.png",
    },
    {
      nombre: "Dra. Ana Sánchez",
      especialidad: "Implantóloga",
      imagen: "/images/doctora-ana-nueva.png",
    },
  ]

  return (
    <div className="home">
      {/* Hero */}
      <NavBar />
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>¡Tu sonrisa es <br /> nuestra prioridad!</h1>
          <p>Brindamos atención odontológica de calidad con tecnología de vanguardia y un equipo de profesionales especializados.</p>
          <button onClick={() => window.location.href = '/turnos'}>Reservar Turno</button>
        </div>
      </section>

      {/* Servicios */}
      <section className="servicios">
        <h2>Servicios Destacados</h2>
        <div className="servicios-grid">
          {serviciosDestacados.map((servicio, i) => (
            <div key={i} className="servicio-card">
              <img src={servicio.imagen} alt={servicio.titulo} />
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
              <button>Ver más</button>
            </div>
          ))}
        </div>
      </section>

      {/* Sedes */}
      <section className="sedes">
        <div className="sede-card">
          <img src="/images/sede-belgrano.png" alt="Sede principal" />
          <div className="sede-texto">
            <h2>Nuestras sedes</h2>
            <p>Contamos con varias sedes para brindarte atención odontológica cerca de tu hogar.</p>
            <button onClick={() => window.location.href = '/sedes'}>Ver todas las sedes</button>
          </div>
        </div>
      </section>

      {/* Equipo médico */}
      <section className="equipo">
        <h2>Equipo médico</h2>
        <div className="equipo-grid">
          {equipoMedico.map((doc, i) => (
            <div key={i} className="doctor-card">
              <img src={doc.imagen} alt={doc.nombre} />
              <h3>{doc.nombre}</h3>
              <p>{doc.especialidad}</p>
            </div>
          ))}
        </div>
      </section>
     <Footer />
    </div>
    
  )
}
