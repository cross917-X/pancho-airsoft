export default function Nosotros() {
  return (
    <section style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>Sobre Pancho Villa Táctico</h1>
      <p
        style={{
          color: 'var(--color-text-muted)',
          marginBottom: 20,
          fontSize: '1.05rem',
        }}
      >
        Somos una tienda especializada en réplicas Airsoft y equipamiento
        táctico para uso deportivo y recreativo. Nuestro objetivo es ofrecer
        productos de calidad, asesoría experta y un servicio cercano a la
        comunidad de jugadores.
      </p>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
        Trabajamos solo con réplicas de 6 mm, no letales, pensadas para campos
        de juego, entrenamientos y prácticas de tiro recreativo. Contamos con
        rifles AEG, pistolas GBB, snipers de resorte y una amplia gama de
        accesorios.
      </p>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
        El equipo está formado por jugadores activos que entienden las
        necesidades reales del deporte. Desde la elección de la primera réplica
        hasta la configuración avanzada, estamos para ayudarte.
      </p>

      <h2 style={{ margin: '32px 0 16px' }}>Nuestros valores</h2>
      <ul style={{ color: 'var(--color-text-muted)', paddingLeft: 20 }}>
        <li style={{ marginBottom: 8 }}>Calidad y seguridad en cada producto</li>
        <li style={{ marginBottom: 8 }}>
          Asesoría honesta y basada en experiencia
        </li>
        <li style={{ marginBottom: 8 }}>
          Compromiso con el uso responsable del Airsoft
        </li>
        <li style={{ marginBottom: 8 }}>
          Comunidad y respeto por las reglas de juego
        </li>
      </ul>
    </section>
  )
}
