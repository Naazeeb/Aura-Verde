import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products as allProducts } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Quiz from "../components/Quiz.jsx";

const filterDefs = {
  light: ["baja-media", "media", "media-alta", "alta"],
  level: ["principiante", "intermedio"],
  size: ["S", "M", "L"],
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const filters = useMemo(() => ({
    category: params.get("category") || "",
    light: params.get("light") || "",
    watering: params.get("watering") || "",
    level: params.get("level") || "",
    size: params.get("size") || "",
    petFriendly: params.get("petFriendly") === "true",
  }), [params]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.light && p.light !== filters.light) return false;
      if (filters.watering && p.watering !== filters.watering) return false;
      if (filters.level && p.level !== filters.level) return false;
      if (filters.size && p.size !== filters.size) return false;
      if (params.get("petFriendly") === "true" && !p.petFriendly) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, filters, params]);

  function toggleParam(key, value) {
    const next = new URLSearchParams(params);
    const current = next.get(key);
    if (current === value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  function toggleBool(key) {
    const next = new URLSearchParams(params);
    const on = next.get(key) === "true";
    if (on) next.delete(key);
    else next.set(key, "true");
    setParams(next, { replace: true });
  }

  function clearFilters() {
    setParams(new URLSearchParams(), { replace: true });
  }

  function applyFromQuiz(preset) {
    const next = new URLSearchParams(params);
    Object.entries(preset).forEach(([k, v]) => next.set(k, String(v)));
    setParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="section">
      <div className="container">
        <div className="productsTop">
          <div>
            <div className="kicker">Productos</div>
            <h1 className="h1" style={{ fontSize: "clamp(36px, 4.6vw, 54px)" }}>Catálogo</h1>
            <p className="p" style={{ maxWidth: 860, marginBottom: 0 }}>
              Explorá por luz, riego, tamaño y convivencia. Una entrada serena al verde en interiores.
            </p>
          </div>

          <input
            className="search"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        <div className="productsLayout" style={{ marginTop: 18 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker">Filtros</div>

            <div className="filters">
              <button className={filters.category === "plantas" ? "chip chip--on" : "chip"} onClick={() => toggleParam("category","plantas")} type="button">
                Plantas
              </button>
              <button className={filters.category === "terrarios" ? "chip chip--on" : "chip"} onClick={() => toggleParam("category","terrarios")} type="button">
                Terrarios
              </button>
              <button className={params.get("petFriendly") === "true" ? "chip chip--on" : "chip"} onClick={() => toggleBool("petFriendly")} type="button">
                Pet-friendly
              </button>
            </div>

            <div className="filters" style={{ marginTop: 10 }}>
              <span className="kicker" style={{ marginRight: 8 }}>Luz</span>
              {filterDefs.light.map((v) => (
                <button key={v} className={filters.light === v ? "chip chip--on" : "chip"} onClick={() => toggleParam("light", v)} type="button">
                  {labelLight(v)}
                </button>
              ))}
            </div>

            <div className="filters" style={{ marginTop: 10 }}>
              <span className="kicker" style={{ marginRight: 8 }}>Riego</span>
              {["muy-bajo","bajo","medio","alto"].map((v) => (
                <button key={v} className={filters.watering === v ? "chip chip--on" : "chip"} onClick={() => toggleParam("watering", v)} type="button">
                  {labelWater(v)}
                </button>
              ))}
            </div>

            <div className="filters" style={{ marginTop: 10 }}>
              <span className="kicker" style={{ marginRight: 8 }}>Tamaño</span>
              {filterDefs.size.map((v) => (
                <button key={v} className={filters.size === v ? "chip chip--on" : "chip"} onClick={() => toggleParam("size", v)} type="button">
                  {v}
                </button>
              ))}
            </div>

            <div className="filters" style={{ marginTop: 10 }}>
              <span className="kicker" style={{ marginRight: 8 }}>Nivel</span>
              {filterDefs.level.map((v) => (
                <button key={v} className={filters.level === v ? "chip chip--on" : "chip"} onClick={() => toggleParam("level", v)} type="button">
                  {labelLevel(v)}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              <button className="btnSmall" onClick={clearFilters} type="button">Limpiar filtros</button>
              <span className="small" style={{ margin: 0 }}>Resultados: <b>{filtered.length}</b></span>
            </div>
          </div>

          <Quiz onApply={applyFromQuiz} />
        </div>

        <div className="gridProducts">
          {filtered.map((p) => <ProductCard key={p.id} product={p} onView={() => {}} />)}
        </div>

        {filtered.length === 0 && (
          <div className="card" style={{ padding: 18, marginTop: 14 }}>
            <p className="p" style={{ margin: 0 }}>
              No encontramos resultados con esos filtros. Probá limpiar filtros o ajustar la búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
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
  if (v === "medio") return "Medio";
  if (v === "alto") return "Alto";
  return v;
}
function labelLevel(v){
  if (v === "principiante") return "Fácil";
  if (v === "intermedio") return "Intermedio";
  return v;
}

