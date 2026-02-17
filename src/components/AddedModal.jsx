import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useStore } from "../context/store.js";

export default function AddedModal({ open, name, onClose, onUndo }) {
  const { openCart } = useStore();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!open || hovered) return;
    const t = setTimeout(() => onClose?.(), 1400);
    return () => clearTimeout(t);
  }, [open, hovered, onClose]);

  if (!open) return null;

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    <div
      className="modalBackdrop isOpen"
      role="dialog"
      aria-modal="true"
      aria-label="Agregado al carrito"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h4>Agregado al carrito ✓</h4>
        <p>“{name}” ya está en tu carrito.</p>

        <div className="modalActions" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <button className="btnSmall" onClick={onUndo}>Deshacer</button>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btnSmall" onClick={onClose}>Seguir</button>
            <button
              className="btnSmall btnSmall--primary"
              onClick={() => {
                openCart();
                onClose?.();
              }}
            >
              Ver carrito
            </button>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}

