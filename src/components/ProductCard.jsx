import React, { useState } from "react";
import { useStore } from "../context/store.js";
import { formatARS } from "../data/products.js";
import AddedModal from "./AddedModal.jsx";
import ProductQuickViewModal from "./ProductQuickViewModal.jsx";

export default function ProductCard({ product, onView }) {
  const { addToCart, decQty } = useStore();
  const [addedOpen, setAddedOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  const openQuickView = () => {
    onView?.(product);
    setQuickOpen(true);
  };

  const handleAdd = () => {
    addToCart(product, 1);
    setAddedOpen(true);
  };

  const handleUndo = () => {
    // deshace 1 unidad (si era la única, lo quita)
    decQty(product.id);
    setAddedOpen(false);
  };

  return (
    <article className="productCard">
      <div
        className="thumb"
        onClick={openQuickView}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openQuickView();
          }
        }}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
      >
        {product.image ? <img className="thumb__img" src={product.image} alt={product.name} /> : null}
        <span>{product.category === "terrarios" ? "Terrario" : "Interior"}</span>
        <span>{product.size}</span>
      </div>

      <div>
        <div className="kicker">
          {product.category === "terrarios" ? "Terrarios" : "Plantas de interior"}
        </div>
        <h3 className="productTitle">{product.name}</h3>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
        <div className="price">{formatARS(product.price)}</div>
        <div className="small" style={{ margin: 0 }}>Ideal: {product.ideal}</div>
      </div>

      <div className="metaRow" aria-label="Cuidados">
        <span className="mini">Luz: {labelLight(product.light)}</span>
        <span className="mini">Riego: {labelWater(product.watering)}</span>
        <span className="mini">Nivel: {labelLevel(product.level)}</span>
        {product.petFriendly ? <span className="mini">Pet-friendly</span> : null}
      </div>

      <div className="cardActions">
        <button
          className="btnSmall"
          onClick={openQuickView}
          type="button"
        >
          Ver
        </button>
        <button className="btnSmall btnSmall--primary" onClick={handleAdd}>Agregar</button>
      </div>

      <AddedModal
        open={addedOpen}
        name={product.name}
        onClose={() => setAddedOpen(false)}
        onUndo={handleUndo}
        onViewCart={() => setQuickOpen(false)}
      />

      <ProductQuickViewModal
        open={quickOpen}
        product={product}
        onClose={() => setQuickOpen(false)}
        onAdd={handleAdd}
      />
    </article>
  );
}

function labelLight(v){
  if (v === "baja-media") return "Suave";
  if (v === "media") return "Media";
  if (v === "media-alta") return "Media/alta";
  if (v === "alta") return "Plena";
  return v;
}
function labelWater(v){
  if (v === "muy-bajo") return "Mínimo";
  if (v === "bajo") return "Bajo";
  if (v === "bajo-medio") return "Bajo/medio";
  if (v === "medio") return "Medio";
  if (v === "medio-alto") return "Medio/alto";
  if (v === "alto") return "Alto";
  return v;
}
function labelLevel(v){
  if (v === "principiante") return "Fácil";
  if (v === "intermedio") return "Intermedio";
  return v;
}

