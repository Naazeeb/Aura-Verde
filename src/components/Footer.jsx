import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerGrid">
          <div>
            <h4>Aura Verde</h4>
            <p className="small">
              Curaduría botánica para interiores, pensada para habitarse: con equilibrio, presencia y cuidado.
            </p>
          </div>

          <div>
            <h4>Explorar</h4>
            <p className="small">
              <Link to="/">Inicio</Link><br/>
              <Link to="/about">Nosotros</Link><br/>
              <Link to="/products">Productos</Link><br/>
              <Link to="/contact">Contacto</Link>
            </p>
          </div>

          <div>
            <h4>Notas botánicas</h4>
            <p className="small">Una vez al mes. Breve, sereno, útil.</p>
            <div className="newsletter">
              <input type="email" placeholder="Tu email" aria-label="Email" />
              <button className="btnSmall btnSmall--primary">Suscribirme</button>
            </div>
            <p className="small" style={{ marginTop: 10 }}>
              Envíos · Preguntas frecuentes · Devoluciones
            </p>
          </div>
        </div>

        <hr className="hr" style={{ marginTop: 18 }} />
        <p className="small" style={{ margin: "14px 0 0" }}>
          © {new Date().getFullYear()} Aura Verde · Proyecto demo.
        </p>
      </div>
    </footer>
  );
}

