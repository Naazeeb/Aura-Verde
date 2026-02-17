import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/auth.js";

const initialLogin = { email: "", password: "" };
const initialRegister = { name: "", email: "", password: "", confirm: "" };

export default function AuthModal() {
  const { authOpen, authMode, setAuthMode, closeAuth, login, register } = useAuth();
  const [loginData, setLoginData] = useState(initialLogin);
  const [registerData, setRegisterData] = useState(initialRegister);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authOpen) return undefined;
    document.body.classList.add("noScroll");
    function onKey(e) {
      if (e.key === "Escape") closeAuth();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("noScroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [authOpen, closeAuth]);

  if (!authOpen) return null;
  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) return null;

  function submitLogin(e) {
    e.preventDefault();
    setError("");
    if (!loginData.email || !loginData.password) {
      setError("Completá email y contraseña.");
      return;
    }
    const result = login(loginData);
    if (!result.ok) setError(result.message);
    else setLoginData(initialLogin);
  }

  function submitRegister(e) {
    e.preventDefault();
    setError("");
    if (!registerData.name || !registerData.email || !registerData.password) {
      setError("Completá todos los campos.");
      return;
    }
    if (registerData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (registerData.password !== registerData.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const result = register(registerData);
    if (!result.ok) setError(result.message);
    else setRegisterData(initialRegister);
  }

  return createPortal(
    <div
      className="modalBackdrop isOpen"
      role="dialog"
      aria-modal="true"
      aria-label="Autenticación"
      onClick={closeAuth}
    >
      <div className="modal authModal" onClick={(e) => e.stopPropagation()}>
        <button className="iconBtn modal__close" onClick={closeAuth} type="button" aria-label="Cerrar">
          ×
        </button>

        <div className="authTabs">
          <button
            className={authMode === "login" ? "chip chip--on" : "chip"}
            onClick={() => { setError(""); setAuthMode("login"); }}
            type="button"
          >
            Ingresar
          </button>
          <button
            className={authMode === "register" ? "chip chip--on" : "chip"}
            onClick={() => { setError(""); setAuthMode("register"); }}
            type="button"
          >
            Registrarse
          </button>
        </div>

        {authMode === "login" ? (
          <form className="authForm" onSubmit={submitLogin}>
            <h4>Ingresá a tu cuenta</h4>
            <div className="field">
              <label htmlFor="auth_login_email">Email</label>
              <input
                id="auth_login_email"
                value={loginData.email}
                onChange={(e) => setLoginData((s) => ({ ...s, email: e.target.value }))}
                type="email"
                placeholder="tu@email.com"
              />
            </div>
            <div className="field">
              <label htmlFor="auth_login_password">Contraseña</label>
              <input
                id="auth_login_password"
                value={loginData.password}
                onChange={(e) => setLoginData((s) => ({ ...s, password: e.target.value }))}
                type="password"
                placeholder="••••••••"
              />
            </div>
            {error ? <div className="error">{error}</div> : null}
            <button className="btnSmall btnSmall--primary" type="submit">Ingresar</button>
          </form>
        ) : (
          <form className="authForm" onSubmit={submitRegister}>
            <h4>Registrarse</h4>
            <div className="field">
              <label htmlFor="auth_register_name">Nombre</label>
              <input
                id="auth_register_name"
                value={registerData.name}
                onChange={(e) => setRegisterData((s) => ({ ...s, name: e.target.value }))}
                type="text"
                placeholder="Tu nombre"
              />
            </div>
            <div className="field">
              <label htmlFor="auth_register_email">Email</label>
              <input
                id="auth_register_email"
                value={registerData.email}
                onChange={(e) => setRegisterData((s) => ({ ...s, email: e.target.value }))}
                type="email"
                placeholder="tu@email.com"
              />
            </div>
            <div className="field">
              <label htmlFor="auth_register_password">Contraseña</label>
              <input
                id="auth_register_password"
                value={registerData.password}
                onChange={(e) => setRegisterData((s) => ({ ...s, password: e.target.value }))}
                type="password"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div className="field">
              <label htmlFor="auth_register_confirm">Repetir contraseña</label>
              <input
                id="auth_register_confirm"
                value={registerData.confirm}
                onChange={(e) => setRegisterData((s) => ({ ...s, confirm: e.target.value }))}
                type="password"
                placeholder="Repetí tu contraseña"
              />
            </div>
            {error ? <div className="error">{error}</div> : null}
            <button className="btnSmall btnSmall--primary" type="submit">Registrarse</button>
          </form>
        )}
      </div>
    </div>,
    portalTarget
  );
}
