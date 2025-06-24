// src/components/Footer.jsx
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Seguinos</h4>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Email@gmail.com</p>
          <p>0800 - 777 - 3243</p>
          <p>11 2543-3253</p>
          <p><a href="#">Trabajá en consultorio odontológico</a></p>
        </div>
        <div className="footer-col">
          <h4>Menú</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Quiénes somos</a></li>
            <li><a href="/tratamientos">Tratamientos</a></li>
            <li><a href="/sedes">Sedes</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Tratamientos</h4>
          <ul>
            <li>Implantes dentales</li>
            <li>Blanqueamiento</li>
            <li>Ortodoncia</li>
            <li>Odontopediatría</li>
            <li>Ortodoncia invisible</li>
            <li>Carillas</li>
            <li>Coronas dentales</li>
            <li>Extracciones</li>
            <li>Estética y restauradora</li>
            <li>Tratamiento de conducto</li>
            <li>Prótesis dental</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Consultorio Odontológico</p>
      </div>
    </footer>
  )
}
