import React, { useMemo, useState } from "react";
import { useStore } from "../context/store.js";
import ConfirmModal from "./ConfirmModal.jsx";
import { formatARS, products } from "../data/products.js";

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-6.89 6.3-1.42-1.41L10.59 12 3.69 5.71 5.1 4.29 12 10.59l6.89-6.3z"
      />
    </svg>
  );
}

export default function CartDrawer() {
  const { ui, cart, closeCart, incQty, decQty, removeItem, clearCart } =
    useStore();

  const [confirm, setConfirm] = useState({
    open: false,
    kind: null,
    payload: null,
  });

  const total = useMemo(
    () => cart.reduce((acc, i) => acc + i.price * i.qty, 0),
    [cart]
  );

  const count = useMemo(() => cart.reduce((acc, i) => acc + i.qty, 0), [cart]);

  const openRemove = (item) =>
    setConfirm({ open: true, kind: "remove", payload: item });
  const openClear = () =>
    setConfirm({ open: true, kind: "clear", payload: null });
  const openBuy = () => setConfirm({ open: true, kind: "buy", payload: null });
  const openInc = (item) =>
    setConfirm({ open: true, kind: "inc", payload: item });
  const openDec = (item) =>
    setConfirm({ open: true, kind: "dec", payload: item });

  const title =
    confirm.kind === "remove"
      ? "Quitar producto"
      : confirm.kind === "clear"
      ? "Vaciar carrito"
      : confirm.kind === "buy"
      ? "Realizar compra"
      : confirm.kind === "inc"
      ? "Aumentar cantidad"
      : confirm.kind === "dec"
      ? "Reducir cantidad"
      : "Confirmar";

  const description = (() => {
    const item = confirm.payload;
    if (confirm.kind === "remove")
      return `¿Querés quitar “${item?.name}” del carrito?`;
    if (confirm.kind === "clear")
      return "¿Querés vaciar el carrito? Esta acción no se puede deshacer.";
    if (confirm.kind === "buy")
      return "¿Confirmás la compra? (Demo: no se envía pago real).";
    if (confirm.kind === "inc")
      return `¿Querés aumentar la cantidad de “${item?.name}”?`;
    if (confirm.kind === "dec") {
      if (item?.qty === 1)
        return `Esto va a quitar “${item?.name}” del carrito. ¿Confirmás?`;
      return `¿Querés reducir la cantidad de “${item?.name}”?`;
    }
    return "¿Querés continuar?";
  })();

  const handleConfirm = () => {
    const item = confirm.payload;

    if (confirm.kind === "remove" && item) removeItem(item.id);
    if (confirm.kind === "clear") clearCart();
    if (confirm.kind === "inc" && item) incQty(item.id);
    if (confirm.kind === "dec" && item) decQty(item.id);

    if (confirm.kind === "buy") {
      clearCart();
      closeCart();
      alert("Compra realizada. Gracias por elegir Aura Verde.");
    }

    setConfirm({ open: false, kind: null, payload: null });
  };

  return (
    <>
      <div
        className={ui.cartOpen ? "drawerBackdrop isOpen" : "drawerBackdrop"}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={ui.cartOpen ? "drawer isOpen" : "drawer"}
        aria-label="Carrito"
      >
        <div className="drawer__head">
          <div className="drawer__title">
            <h3>Tu carrito</h3>
            <span className="drawer__pill">
              {count} ítem{count === 1 ? "" : "s"}
            </span>
          </div>

          <button
            className="iconBtn"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            type="button"
          >
            <XIcon />
          </button>
        </div>

        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="cartEmpty">
              <p className="p" style={{ margin: 0 }}>
                Tu carrito está vacío. Elegí una planta y armemos un rincón con
                calma.
              </p>

              <div className="cartEmpty__actions">
                <a
                  className="btnSmall btnSmall--primary"
                  href="/products"
                  onClick={closeCart}
                >
                  Ver catálogo
                </a>
              </div>
            </div>
          ) : (
            cart.map((item) => {
              const fallbackImage = products.find((p) => p.id === item.id)?.image;
              const imageSrc = item.image || fallbackImage;

              return (
                <article className="cartItem" key={item.id}>
                  <div className="cartItem__row">
                    <div className="cartItem__thumb">
                      {imageSrc ? (
                        <img src={imageSrc} alt={item.name} loading="lazy" />
                      ) : (
                        <div
                          className="cartItem__thumbFallback"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="cartItem__body">
                      <div className="cartItem__top">
                        <div className="cartItem__name">{item.name}</div>

                        <button
                          className="cartItem__removeIcon"
                          onClick={() => openRemove(item)}
                          aria-label={`Quitar ${item.name}`}
                          type="button"
                          title="Quitar"
                        >
                          <XIcon />
                        </button>
                      </div>

                      <div className="cartItem__meta">
                        <span>{formatARS(item.price)} c/u</span>
                        <strong>{formatARS(item.price * item.qty)}</strong>
                      </div>

                      <div className="cartItem__bottom">
                        <div className="qty">
                          <button
                            onClick={() => openDec(item)}
                            aria-label="Disminuir cantidad"
                            type="button"
                          >
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => openInc(item)}
                            aria-label="Aumentar cantidad"
                            type="button"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btnSmall btnSmall--ghost"
                          onClick={() => openRemove(item)}
                          type="button"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="drawer__foot">
          <div className="totalRow">
            <span>Total</span>
            <span>{formatARS(total)}</span>
          </div>

          <div className="drawerBtns">
            <button
              className="btnSmall"
              onClick={openClear}
              disabled={cart.length === 0}
              type="button"
            >
              Vaciar
            </button>
            <button
              className="btnSmall btnSmall--primary"
              onClick={openBuy}
              disabled={cart.length === 0}
              type="button"
            >
              Comprar
            </button>
          </div>
        </div>
      </aside>

      <ConfirmModal
        open={confirm.open}
        title={title}
        description={description}
        confirmText={confirm.kind === "buy" ? "Confirmar compra" : "Confirmar"}
        cancelText="Cancelar"
        onCancel={() => setConfirm({ open: false, kind: null, payload: null })}
        onConfirm={handleConfirm}
      />
    </>
  );
}
