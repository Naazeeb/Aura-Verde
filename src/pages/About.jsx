import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);
  const steps = [
    {
      title: "Leemos tu luz",
      text:
        "Miramos dónde cae el sol, dónde descansa la sombra y cómo se mueve tu día. La planta correcta empieza por el ambiente, no por la foto.",
    },
    {
      title: "Elegimos con calma",
      text:
        "Curamos por presencia y por vida real: especies nobles, que acompañan, que no piden una vida perfecta para existir.",
    },
    {
      title: "Componemos el verde",
      text:
        "Alturas, texturas y ritmo. Que se vea bien hoy… y que, con el tiempo, se sienta cada vez más parte de tu casa.",
    },
    {
      title: "Te dejamos una guía simple",
      text:
        "Luz, riego y señales. Nada de complicarte: lo justo para que el cuidado se vuelva un ritual chiquito y posible.",
    },
  ];

  const values = [
    {
      title: "Menos ruido",
      text:
        "Buscamos belleza que respira: verde que ordena, que baja el pulso, que vuelve el espacio más habitable.",
    },
    {
      title: "Honestidad botánica",
      text:
        "Recomendaciones sinceras. Si una planta no encaja con tu rutina, no la forzamos: buscamos otra.",
    },
    {
      title: "Selección a medida",
      text:
        "No es juntar especies: es encontrar la pieza viva que combine con tu luz, tus tiempos y tu estilo.",
    },
    {
      title: "Cuidar el proceso",
      text:
        "Elegir bien es cuidar desde el inicio. Lo responsable también se nota en cómo crece lo que te llevás.",
    },
  ];

  return (
    <section className="section aboutPage">
      <div className="container">
        {/* HERO */}
        <header className="aboutHero">
          <div className="kicker">Nosotros</div>

          <h1 className="h1 aboutTitle">
            Aura Verde: cuando lo vivo entra, el espacio cambia.
          </h1>

          <p className="p aboutLead">
            Hay casas que se sienten lindas… y casas que se sienten en calma.
            Aura Verde nace ahí, en esa diferencia sutil: sumar verde no para
            “decorar”, sino para habitar mejor.
          </p>

          <div className="aboutChips" aria-label="Valores de marca">
            {["Calma", "Luz", "Presencia", "Armonía"].map((t) => (
              <span className="aboutChip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* HISTORIA */}
        <div className="aboutSplit">
          <div className="aboutBlock">
            <div className="kicker">Nuestra historia</div>
            <p className="p">
              Empezamos como empiezan las cosas reales: probando, aprendiendo,
              equivocándonos con cariño. Con el tiempo entendimos lo más
              importante: la planta perfecta no es la más rara, es la que se
              lleva bien con tu vida.
            </p>
            <p className="p" style={{ marginTop: 10 }}>
              Nos gusta pensar cada planta como una presencia: algunas son serenas
              y constantes; otras exuberantes y tropicales; otras parecen frágiles,
              pero sorprenden. Nuestra tarea es simple: encontrarte esa pieza viva
              que tenga esa conección con tu casa — y que se sostenga en el tiempo.
            </p>
          </div>

          <aside className="aboutQuote">
            <p className="aboutQuote__text">
              “Un rincón con verde no es un adorno: es una pausa.”
            </p>

            <p className="aboutQuote__sub">
              Elegimos para que lo vivo dure, crezca y acompañe.
            </p>

            <div className="aboutQuote__rule" />

            <ul className="aboutQuote__list">
              <li><strong>Luz:</strong> la que tenés, no la ideal.</li>
              <li><strong>Riego:</strong> menos apuro, más señales.</li>
              <li><strong>Cuidado:</strong> simple, real, sostenible.</li>
            </ul>

            <p className="aboutQuote__sig">— Aura Verde</p>
          </aside>
        </div>

        <div className="aboutDivider" aria-hidden="true" />

        {/* QUE HACEMOS */}
        <h2 className="h2 aboutH2">Qué hacemos</h2>
        <div className="grid4 aboutGrid">
          {[
            {
              title: "Plantas de interior",
              text:
                "Selección para vivir adentro: estética, adaptación y cuidado posible. Verde que acompaña.",
            },
            {
              title: "Terrarios y composiciones",
              text:
                "Pequeños mundos: humedad, textura y encanto. Un pedacito de naturaleza en vidrio.",
            },
            {
              title: "Detalles vivos",
              text:
                "Piezas vivas que dicen algo. Un detalle que se queda, crece y se vuelve parte.",
            },
            {
              title: "Acompañamiento",
              text:
                "Una mano cerca: señales, tiempos y calma para que lo vivo se sostenga sin esfuerzo.",
            },
          ].map((b) => (
            <div className="card aboutCard" key={b.title}>
              <div className="kicker">{b.title}</div>
              <p className="p" style={{ margin: "10px 0 0" }}>
                {b.text}
              </p>
            </div>
          ))}
        </div>

        {/* CÓMO TRABAJAMOS */}
        <h2 className="h2 aboutH2">Cómo trabajamos</h2>
        <div className="grid4 aboutGrid">
          {steps.map((s) => (
            <div className="card aboutCard aboutStep" key={s.title}>
              <div className="kicker">{s.title}</div>
              <p className="p" style={{ margin: "10px 0 0" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        {/* LO QUE DEFENDEMOS */}
        <h2 className="h2 aboutH2">Lo que defendemos</h2>
        <div className="grid4 aboutGrid">
          {values.map((v) => (
            <div className="card aboutCard" key={v.title}>
              <div className="kicker">{v.title}</div>
              <p className="p" style={{ margin: "10px 0 0" }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>

        {/* NOTA */}
        <div className="card aboutNote" id="una-nota-simple">
          <div className="kicker">Una nota simple</div>
          <p className="p" style={{ margin: "10px 0 0", maxWidth: 980 }}>
            Si tenés poca luz, hay verdes que la abrazan. Si te olvidás de regar,
            mejor: muchas plantas prefieren la paciencia antes que el exceso.
            Y si convivís con mascotas, buscamos opciones más seguras
            o te ayudamos a ubicar la planta donde esté bien (y tranquila).
          </p>

          <div className="aboutActions">
            <a className="btn btn--primary" href="/contact">
              Quiero una recomendación
            </a>
            <a className="btn btn--ghost" href="/products">
              Ver el catálogo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

