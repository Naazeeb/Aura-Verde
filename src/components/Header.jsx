import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/store.js";
import { useAuth } from "../context/auth.js";
import logo from "../assets/logo.png";

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10
           0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.17
           14h9.66c.75 0 1.4-.41 1.74-1.03L21 6H6.21L5.27 4H2v2h2l3.6
           7.59-1.35 2.44C5.52 17.37 6.48 19 7.97 19H19v-2H7.97l1.1-2z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}

export default function Header() {
  const { ui, toggleMenu, closeMenu, toggleCart, cart } = useStore();
  const { user, openAuth, logout } = useAuth();
  const navigate = useNavigate();
  const count = cart.reduce((acc, i) => acc + i.qty, 0);

  const linkClass = ({ isActive }) => (isActive ? "chip chip--on" : "");

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div
            className="brand"
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
            role="button"
            tabIndex={0}
          >
            <div className="brand__logo">
              <img src={logo} alt="Aura Verde" />
            </div>
          </div>

          <nav className="nav" aria-label="Navegación principal">
            <NavLink to="/" className={linkClass}>Inicio</NavLink>
            <NavLink to="/about" className={linkClass}>Nosotros</NavLink>
            <NavLink to="/products" className={linkClass}>Productos</NavLink>
            <NavLink to="/contact" className={linkClass}>Contacto</NavLink>
          </nav>

          <div className="header__actions">
            {!user ? (
              <>
                <button
                  className="btnSmall btnSmall--primary authBtn"
                  onClick={() => {
                    closeMenu();
                    openAuth("login");
                  }}
                  type="button"
                >
                  Ingresar
                </button>
                <button
                  className="btnSmall authBtn"
                  onClick={() => {
                    closeMenu();
                    openAuth("register");
                  }}
                  type="button"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <>
                <span className="small authUser">Hola, {user.name}</span>
                <button className="btnSmall authBtn" onClick={logout} type="button">
                  Salir
                </button>
              </>
            )}

            <button className="iconBtn burger" onClick={toggleMenu} aria-label="Abrir menú" type="button">
              <MenuIcon />
            </button>

            <button className="iconBtn" onClick={toggleCart} aria-label="Abrir carrito" type="button">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CartIcon />
                <span className="badge" aria-label={`${count} items`}>{count}</span>
              </span>
            </button>
          </div>
        </div>

        {ui.menuOpen && (
          <div className="mobileMenu" aria-label="Menú móvil">
            <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
            <NavLink to="/about" onClick={closeMenu}>Nosotros</NavLink>
            <NavLink to="/products" onClick={closeMenu}>Productos</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contacto</NavLink>
            {!user ? (
              <>
                <button
                  className="chip mobileAuthBtn"
                  onClick={() => {
                    closeMenu();
                    openAuth("login");
                  }}
                  type="button"
                >
                  Ingresar
                </button>
                <button
                  className="chip chip--on mobileAuthBtn"
                  onClick={() => {
                    closeMenu();
                    openAuth("register");
                  }}
                  type="button"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <button
                className="chip mobileAuthBtn"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                type="button"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
