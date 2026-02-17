import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { formatARS } from "../data/products.js";

const descriptionsById = {
  "av-001": "Una lanza verde que custodia el hogar: firme, silenciosa y siempre elegante.",
  "av-002": "Brilla como si guardara luz propia; una presencia serena que nunca se rinde.",
  "av-003": "Enredadera de sol: cae en cascada y deja destellos dorados a su paso.",
  "av-004": "Hoja grande y tropical para dar protagonismo al ambiente.",
  "av-005": "Hojas enormes como velas tropicales: convierte cualquier rincon en escenario.",
  "av-006": "Un susurro de selva: circulos y vetas que parecen pintados a mano.",
  "av-007": "Paz en forma de planta: verde profundo y flores blancas como un respiro.",
  "av-008": "Una nube de frondas: liviano, frondoso, como lluvia suave en interior.",
  "av-009": "Pequena joya de hojas carnosas: discreta, pulida, encantadora.",
  "av-010": "Monedas verdes que celebran la luz: simple, moderna y magnetica.",
  "av-011": "Una roseta perfecta: geometria viva, belleza quieta y eterna.",
  "av-012": "Hilos de corazones que cuelgan como un hechizo: delicada, romantica, infinita.",
  "av-013": "Un bosque secreto atrapado en vidrio: humedad suave y calma verde, como una mañana eterna entre bruma.",
  "av-014": "Un pequeño desierto elegante: formas vivas y resistentes que capturan la luz como una escultura natural.",
  "av-015": "Piedra, musgo y silencio: un paisaje sereno en miniatura para bajar el ritmo con solo mirarlo.",
  "av-016": "Un árbol diminuto que parece de cuento: raíces, tierra y verde en equilibrio, como un bosque que decidió quedarse.",
};

function formatLevel(level) {
  if (level === "principiante") return "Fácil";
  if (level === "intermedio") return "Intermedio";
  return level;
}

function formatLight(light) {
  if (light === "baja-media") return "Suave";
  if (light === "media-alta") return "Media/alta";
  if (light === "media") return "Media";
  if (light === "alta") return "Alta";
  return light;
}

function formatWater(watering) {
  if (watering === "muy-bajo") return "Mínimo";
  if (watering === "bajo-medio") return "Bajo/medio";
  if (watering === "medio-alto") return "Medio/alto";
  if (watering === "bajo") return "Bajo";
  if (watering === "medio") return "Medio";
  if (watering === "alto") return "Alto";
  return watering;
}

export default function ProductQuickViewModal({ open, product, onClose, onAdd }) {
  const closeBtnRef = useRef(null);
  const lastActiveRef = useRef(null);

  const description = useMemo(() => {
    if (!product) return "";
    return (
      product.description ||
      descriptionsById[product.id] ||
      `Planta ideal para ${product.ideal?.toLowerCase() || "interiores"}. Nivel: ${formatLevel(product.level)}.`
    );
  }, [product]);

  useEffect(() => {
    if (!open) return undefined;
    lastActiveRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    document.body.classList.add("noScroll");
    return () => {
      document.body.classList.remove("noScroll");
      if (lastActiveRef.current && lastActiveRef.current.focus) {
        lastActiveRef.current.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !product) return null;
  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    <div
      className="modalBackdrop isOpen"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${product.name}`}
      onClick={onClose}
    >
      <div className="modal modal--quick" onClick={(e) => e.stopPropagation()}>
        <button
          className="iconBtn modal__close"
          onClick={onClose}
          aria-label="Cerrar"
          ref={closeBtnRef}
          type="button"
        >
          ×
        </button>

        <div className="quickView">
          <div className="quickView__media">
            {product.image ? <img src={product.image} alt={product.name} /> : null}
          </div>

          <div className="quickView__content">
            <div className="kicker">{product.category === "terrarios" ? "Terrario" : "Planta"}</div>
            <h3 className="h2" style={{ marginTop: 6 }}>{product.name}</h3>
            <div className="price" style={{ fontSize: 20 }}>{formatARS(product.price)}</div>
            <p className="p">{description}</p>

            <div className="quickView__details" aria-label="Detalles y cuidados">
              <span className="mini">Luz: {formatLight(product.light)}</span>
              <span className="mini">Riego: {formatWater(product.watering)}</span>
              <span className="mini">Nivel: {formatLevel(product.level)}</span>
              <span className="mini">Tamaño: {product.size}</span>
              {product.petFriendly ? <span className="mini">Pet-friendly</span> : null}
              {product.ideal ? <span className="mini">Ideal: {product.ideal}</span> : null}
            </div>

            {product.tags?.length ? (
              <div className="quickView__tags">
                {product.tags.map((tag) => (
                  <span className="chip" key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}

            <div className="quickView__actions">
              <button className="btnSmall btnSmall--primary" onClick={onAdd} type="button">
                Agregar al carrito
              </button>
              <button className="btnSmall" onClick={onClose} type="button">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}

