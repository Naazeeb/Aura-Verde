import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collections, products } from "../data/products.js";
import { useStore } from "../context/store.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductQuickViewModal from "../components/ProductQuickViewModal.jsx";
import rinconCasa from "../assets/rincon_casa.jpg";
import escritorio from "../assets/escritorio.jpg";
import banoNatural from "../assets/baño_natural.jpg";
import luzMatinal from "../assets/luz_matinal.jpg";

export default function Home() {
  const nav = useNavigate();
  const { addToCart } = useStore();
  const featured = products.slice(0, 6);
  const scenes = [
    { title: "Rincón sereno", image: rinconCasa, alt: "Rincón sereno con plantas" },
    { title: "En el escritorio", image: escritorio, alt: "Escritorio con plantas" },
    { title: "Baño natural", image: banoNatural, alt: "Baño con plantas y luz suave" },
    { title: "Luz matinal", image: luzMatinal, alt: "Luz matinal con vegetación" },
  ];
  const heroItems = useMemo(() => pickRandom(products, 5), []);
  const [heroIndex, setHeroIndex] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [heroQuickOpen, setHeroQuickOpen] = useState(false);
  const [sceneViewerIndex, setSceneViewerIndex] = useState(-1);

  useEffect(() => {
    if (heroItems.length <= 1) return undefined;
    const t = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setHeroIndex((prev) => (prev + 1) % heroItems.length);
    }, 3600);
    return () => clearInterval(t);
  }, [heroItems, pausedUntil]);

  const pauseAuto = () => setPausedUntil(Date.now() + 6000);

  const goPrevHero = () => {
    if (heroItems.length === 0) return;
    setHeroIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
    pauseAuto();
  };

  const goNextHero = () => {
    if (heroItems.length === 0) return;
    setHeroIndex((prev) => (prev + 1) % heroItems.length);
    pauseAuto();
  };

  const openHeroQuickView = () => {
    if (!heroItems.length) return;
    setHeroQuickOpen(true);
    pauseAuto();
  };

  const closeHeroQuickView = () => setHeroQuickOpen(false);
  const isSceneViewerOpen = sceneViewerIndex >= 0;
  const currentScene = isSceneViewerOpen ? scenes[sceneViewerIndex] : null;

  const openSceneViewer = (index) => {
    setSceneViewerIndex(index);
  };

  const closeSceneViewer = () => {
    setSceneViewerIndex(-1);
  };

  const goPrevScene = () => {
    if (!scenes.length) return;
    setSceneViewerIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const goNextScene = () => {
    if (!scenes.length) return;
    setSceneViewerIndex((prev) => (prev + 1) % scenes.length);
  };

  const handleHeroAdd = () => {
    const current = heroItems[heroIndex];
    if (!current) return;
    addToCart(current, 1);
  };

  useEffect(() => {
    if (!isSceneViewerOpen) return undefined;

    document.body.classList.add("noScroll");

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSceneViewerIndex(-1);
      }
      if (e.key === "ArrowLeft") {
        setSceneViewerIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
      }
      if (e.key === "ArrowRight") {
        setSceneViewerIndex((prev) => (prev + 1) % scenes.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("noScroll");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSceneViewerOpen, scenes.length]);

  const goProductsWithPreset = (preset) => {
    const params = new URLSearchParams();
    Object.entries(preset).forEach(([k, v]) => params.set(k, String(v)));
    nav(`/products?${params.toString()}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="heroGrid">
            <div className="heroCard">
              <div className="heroCard__inner">
                <div className="kicker">Aura Verde</div>
                <h1 className="h1">Calma viva para tus espacios.</h1>
                <p className="p" style={{ maxWidth: 540 }}>
                  Elegí según tu luz, tu tiempo y tu energía. Curaduría botánica
                  para interiores: con equilibrio, presencia y cuidado.
                </p>

                <div className="heroActions">
                  <button
                    className="btn btn--primary"
                    onClick={() => nav("/products")}
                  >
                    Ver productos
                  </button>

                  <button
                    className="btn"
                    onClick={() => {
                      document
                        .getElementById("collections")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Elegir por sensación
                  </button>
                </div>
              </div>
            </div>

            <div className="heroCard">
              <div
                className="heroMedia"
                role="img"
                aria-label="Rincón interior con luz suave y plantas"
              >
                <div className="heroMedia__label">Luz suave · cerámica · calma</div>

                {heroItems.length > 0 && heroItems[heroIndex].image ? (
                  <img
                    className="heroMedia__img"
                    src={heroItems[heroIndex].image}
                    alt=""
                    key={heroItems[heroIndex].id}
                  />
                ) : null}

                {heroItems.length > 1 && (
                  <>
                    <button
                      className="heroCarousel__arrow heroCarousel__arrow--left"
                      onClick={goPrevHero}
                      type="button"
                      aria-label="Producto anterior"
                    >
                      {"<"}
                    </button>

                    <button
                      className="heroCarousel__arrow heroCarousel__arrow--right"
                      onClick={goNextHero}
                      type="button"
                      aria-label="Producto siguiente"
                    >
                      {">"}
                    </button>
                  </>
                )}

                {heroItems.length > 0 && (
                  <div className="heroCarousel" aria-live="polite">
                    <div className="heroCarousel__kicker">Sugerencias</div>

                    <div
                      className="heroCarousel__card"
                      key={heroItems[heroIndex].id}
                    >
                      <div className="heroCarousel__title">
                        {heroItems[heroIndex].name}
                      </div>

                      <button
                        className="btnSmall btnSmall--primary"
                        onClick={openHeroQuickView}
                        type="button"
                      >
                        Ver producto
                      </button>
                    </div>

                    <div className="heroCarousel__dots" aria-hidden="true">
                      {heroItems.map((item, i) => (
                        <span
                          key={item.id}
                          className={i === heroIndex ? "dot dot--on" : "dot"}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hr" />

      <section className="section section--tight">
        <div className="container">
          <div className="card ritual">
            <div className="ritual__grid">
              {/* IZQUIERDA */}
              <div className="ritual__content">
                <div className="kicker">Ritual</div>

                <h2 className="h2 ritual__title">Una curaduría botánica</h2>

                <p className="p ritual__lead">
                  Seleccionamos piezas botánicas para interiores, pensadas para
                  habitarse: con equilibrio, presencia y cuidado.
                </p>

                <div className="ritual__actions">
                  <button className="btn btn--primary" onClick={() => nav("/about")}>
                    Conocer Aura Verde
                  </button>
                  <button className="btn" onClick={() => nav("/contact")}>
                    Contacto
                  </button>
                </div>

                <div className="trustbar">
                  <span className="trustbar__item">Curaduría</span>
                  <span className="trustbar__item">Envíos</span>
                  <span className="trustbar__item">Cuotas</span>
                  <span className="trustbar__item">Asesoría</span>
                </div>

                <div className="chipRow">
                  <button className="chip" onClick={() => nav("/products?size=S")}>Pequeña</button>
                  <button className="chip" onClick={() => nav("/products?size=M")}>Mediana</button>
                  <button className="chip" onClick={() => nav("/products?size=L")}>Grande</button>
                </div>

                <div className="pillars">
                  <div className="pillar">
                    <b>Luz</b>
                    <span>Entender tu espacio.</span>
                  </div>
                  <div className="pillar">
                    <b>Ritmo</b>
                    <span>Acompañar tu rutina.</span>
                  </div>
                  <div className="pillar">
                    <b>Cuidado</b>
                    <span>Sostener lo vivo.</span>
                  </div>
                </div>
              </div>

              {/* DERECHA */}
              <div className="ritual__media">
                
                <div className="ritual__stack">
                  <button className="stackCard" onClick={() => nav("/products?tag=terrarios")}>
                    <p className="stackCard__tag">DESTACADO</p>
                    <p className="stackCard__title">Terrarios</p>
                    <p className="stackCard__meta">Verde profundo · Ritual húmedo</p>
                  </button>

                  <button className="stackCard" onClick={() => nav("/products?tag=faciles")}>
                    <p className="stackCard__tag">FÁCIL</p>
                    <p className="stackCard__title">Plantas resistentes</p>
                    <p className="stackCard__meta">Baja luz · Poco riego</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="collections">
        <div className="container">
          <div className="productsTop">
            <div>
              <div className="kicker">Colecciones</div>
              <h2 className="h2" style={{ marginTop: 6 }}>
                Elegir por estado
              </h2>
              <p className="p" style={{ maxWidth: 740, marginBottom: 0 }}>
                Una entrada serena al catálogo: comenzá por lo que tu espacio
                necesita hoy.
              </p>
            </div>
          </div>

          <div className="grid5" style={{ marginTop: 18 }}>
            {collections.map((c) => (
              <button
                key={c.id}
                className="collection"
                onClick={() => goProductsWithPreset(c.preset)}
                type="button"
              >
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
                <div className="kicker" style={{ marginTop: 16 }}>
                  Ver selección
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr" />

      <section className="section section--tight">
        <div className="container">
          <div className="productsTop">
            <div>
              <div className="kicker">Espacios reales</div>
              <h2 className="h2" style={{ marginTop: 6 }}>
                Escenas para habitar
              </h2>
              <p className="p" style={{ maxWidth: 720, marginBottom: 0 }}>
                Pequeños rincones que cambian el aire de la casa, para que uses de inspiración o para que te animes a crear el tuyo.
              </p>
            </div>
          </div>

          <div className="grid4" style={{ marginTop: 18 }}>
            {scenes.map((scene, index) => (
              <button
                className="tile tile--button"
                key={scene.title}
                onClick={() => openSceneViewer(index)}
                type="button"
              >
                <div className="tile__media">
                  <img src={scene.image} alt={scene.alt} />
                </div>
                <div className="tile__cap">{scene.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr" />

      <section className="section">
        <div className="container">
          <div className="productsTop">
            <div>
              <div className="kicker">Calma destacada</div>
              <h2 className="h2" style={{ marginTop: 6 }}>
                Piezas seleccionadas
              </h2>
              <p className="p" style={{ maxWidth: 740, marginBottom: 0 }}>
                Una selección breve para comenzar: fáciles de acompañar, con
                presencia y equilibrio en interiores.
              </p>
            </div>

            <button className="btn btn--primary" onClick={() => nav("/products")}>
              Ver catálogo
            </button>
          </div>

          <div className="gridProducts">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <hr className="hr" />

      <section className="section section--tight">
        <div className="container">
          <div className="card" style={{ padding: 22 }}>
            <div className="kicker">Ritual del mes</div>
            <h2 className="h2" style={{ marginTop: 6, fontSize: 34 }}>
              Respirar en temporada
            </h2>
            <p className="p" style={{ maxWidth: 780 }}>
              En invierno, el ritmo baja: menos riego, más luz amable y hojas
              limpias para que la planta respire. Un gesto simple puede sostener
              lo vivo con serenidad.
            </p>
            <button className="btn btn--primary" onClick={() => nav("/about#una-nota-simple")}>
              Leer guía breve
            </button>
          </div>
        </div>
      </section>

      <ProductQuickViewModal
        open={heroQuickOpen}
        product={heroItems[heroIndex]}
        onClose={closeHeroQuickView}
        onAdd={handleHeroAdd}
      />

      {isSceneViewerOpen && currentScene ? (
        <div
          className="modalBackdrop modalBackdrop--scene isOpen"
          onClick={closeSceneViewer}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de escenas"
        >
          <div
            className="modal modal--scene"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="iconBtn modal__close"
              onClick={closeSceneViewer}
              type="button"
              aria-label="Cerrar visor"
            >
              ×
            </button>

            <button
              className="sceneNav sceneNav--left"
              onClick={goPrevScene}
              type="button"
              aria-label="Escena anterior"
            >
              {"<"}
            </button>

            <div className="sceneViewer__media">
              <img src={currentScene.image} alt={currentScene.alt} />
            </div>

            <button
              className="sceneNav sceneNav--right"
              onClick={goNextScene}
              type="button"
              aria-label="Escena siguiente"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function pickRandom(list, count) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}



