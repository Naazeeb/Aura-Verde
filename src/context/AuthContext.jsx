import React, { useState } from "react";
import { AuthContext } from "./auth-context.js";

const USERS_KEY = "auraverde_users_v1";
const SESSION_KEY = "auraverde_session_v1";


function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadUsers() {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(USERS_KEY), []);
}

function saveUsers(users) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  if (typeof window === "undefined") return null;
  return safeParse(window.localStorage.getItem(SESSION_KEY), null);
}

function saveSession(user) {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [user, setUser] = useState(() => loadSession());
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  function openAuth(mode = "login") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function closeAuth() {
    setAuthOpen(false);
  }

  function register(payload) {
    const email = payload.email.trim().toLowerCase();
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return { ok: false, message: "Ese email ya está registrado." };
    }

    const nextUser = {
      id: crypto.randomUUID(),
      name: payload.name.trim(),
      email,
      password: payload.password,
    };
    const nextUsers = [...users, nextUser];
    setUsers(nextUsers);
    saveUsers(nextUsers);

    const session = { id: nextUser.id, name: nextUser.name, email: nextUser.email };
    setUser(session);
    saveSession(session);
    setAuthOpen(false);
    return { ok: true };
  }

  function login(payload) {
    const email = payload.email.trim().toLowerCase();
    const found = users.find((u) => u.email === email);
    if (!found || found.password !== payload.password) {
      return { ok: false, message: "Email o contraseña incorrectos." };
    }

    const session = { id: found.id, name: found.name, email: found.email };
    setUser(session);
    saveSession(session);
    setAuthOpen(false);
    return { ok: true };
  }

  function logout() {
    setUser(null);
    saveSession(null);
  }

  const value = {
    user,
    authOpen,
    authMode,
    setAuthMode,
    openAuth,
    closeAuth,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
