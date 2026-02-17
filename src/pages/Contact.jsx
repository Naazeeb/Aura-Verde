import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "Usá al menos 2 caracteres")
    .max(40, "Usá hasta 40 caracteres")
    .required("Decinos tu nombre"),
  apellido: Yup.string()
    .min(2, "Usá al menos 2 caracteres")
    .max(40, "Usá hasta 40 caracteres")
    .required("Decinos tu apellido"),
  email: Yup.string()
    .email("Revisá el formato del email")
    .max(120, "Usá hasta 120 caracteres")
    .required("Dejanos un email"),
  asunto: Yup.string()
    .min(10, "Contanos un poquito más")
    .max(500, "Usá hasta 500 caracteres")
    .required("Escribinos tu mensaje"),
});

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Contacto</div>

        <h1 className="h1" style={{ fontSize: "clamp(36px, 4.6vw, 54px)" }}>
          Hablemos de tu espacio
        </h1>

        <p className="p" style={{ maxWidth: 860 }}>
          Si querés que te orientemos, contanos qué estás buscando y te respondemos
          con una recomendación concreta (especies, tamaño y cuidados).
        </p>

        <p className="p" style={{ maxWidth: 860, marginTop: 10 }}>
          Tip rápido: sumá si tenés luz directa o indirecta, dónde la vas a poner,
          cuánto tiempo querés dedicarle y si convivís con mascotas.
        </p>

        <div className="card" style={{ padding: 18, marginTop: 14 }}>
          <Formik
            initialValues={{ nombre: "", apellido: "", email: "", asunto: "" }}
            validationSchema={Schema}
            onSubmit={(values, helpers) => {
              helpers.setSubmitting(false);
              setSent(true);
              setTimeout(() => setSent(false), 6000);
              helpers.resetForm();
              console.log("Formulario (demo):", values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form className="form" onSubmit={handleSubmit}>
                <div className="formGrid">
                  <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tu nombre"
                    />
                    {touched.nombre && errors.nombre ? <div className="error">{errors.nombre}</div> : null}
                  </div>

                  <div className="field">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                      id="apellido"
                      name="apellido"
                      value={values.apellido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tu apellido"
                    />
                    {touched.apellido && errors.apellido ? <div className="error">{errors.apellido}</div> : null}
                  </div>

                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="tu@email.com"
                    />
                    {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}
                  </div>

                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="asunto">Mensaje</label>
                    <textarea
                      id="asunto"
                      name="asunto"
                      value={values.asunto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ej: tengo luz indirecta, es para un living chico y quiero algo fácil de mantener..."
                    />
                    {touched.asunto && errors.asunto ? <div className="error">{errors.asunto}</div> : null}
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                    Enviar
                  </button>
                </div>

                {sent && (
                  <div className="success">
                    ¡Gracias! Ya recibimos tu mensaje. Te respondemos con una recomendación bien a medida.
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
