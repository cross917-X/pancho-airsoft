import { Link, useParams } from 'react-router-dom'

const contenido = {
  1: {
    title: 'Guía básica de mantenimiento para réplicas AEG',
    body: (
      <>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
          Un buen mantenimiento es clave para que tu réplica eléctrica funcione
          de forma confiable durante mucho tiempo. Aquí te dejamos los pasos
          esenciales que todo jugador debería conocer.
        </p>
        <h2 style={{ margin: '24px 0 12px' }}>Limpieza del cañón interno</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Después de cada partida es recomendable pasar una baqueta con un paño
          limpio por el cañón interno. Esto elimina residuos de bolitas y mejora
          la precisión.
        </p>
        <h2 style={{ margin: '24px 0 12px' }}>Lubricación del gearbox</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Cada cierto número de partidas conviene revisar y aplicar grasa
          específica para engranajes de Airsoft. No uses lubricantes domésticos,
          ya que pueden dañar los componentes.
        </p>
        <h2 style={{ margin: '24px 0 12px' }}>
          Revisión de batería y conectores
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Verifica que los conectores estén limpios y que la batería no presente
          hinchazón. Usa siempre cargadores compatibles con el tipo de batería
          (LiPo o NiMH).
        </p>
      </>
    ),
  },
  2: {
    title: 'Cómo elegir tu primera réplica Airsoft',
    body: (
      <>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
          Empezar en el Airsoft puede ser abrumador por la cantidad de opciones.
          Esta guía te ayuda a tomar una buena decisión según tu presupuesto y
          estilo de juego.
        </p>
        <h2 style={{ margin: '24px 0 12px' }}>Tipos de propulsión</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
          <strong>AEG (eléctricas):</strong> Las más recomendadas para
          principiantes. Autonomía alta y buen rendimiento general.
          <br />
          <strong>GBB (gas):</strong> Retroceso realista, ideales como
          secundaria o para quienes buscan realismo.
          <br />
          <strong>Spring (resorte):</strong> Simple y económica, perfectas para
          snipers de entrada.
        </p>
        <h2 style={{ margin: '24px 0 12px' }}>Presupuesto recomendado</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Para una primera réplica de calidad media-alta, un rango entre
          $150.000 y $250.000 CLP suele ser un buen punto de partida. Incluye
          también presupuesto para protección facial, bolitas y batería.
        </p>
        <h2 style={{ margin: '24px 0 12px' }}>Consejo final</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Prioriza la ergonomía y la facilidad de mantenimiento. Una réplica
          cómoda y confiable te permitirá disfrutar más del juego desde el
          primer día.
        </p>
      </>
    ),
  },
}

export default function BlogDetalle() {
  const { id } = useParams()
  const post = contenido[id]

  if (!post) {
    return (
      <p>
        Entrada no encontrada. <Link to="/blogs">Volver al blog</Link>
      </p>
    )
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <Link to="/blogs" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
        ← Volver al blog
      </Link>
      <h1 style={{ margin: '20px 0' }}>{post.title}</h1>
      {post.body}
      <p style={{ marginTop: 30 }}>
        <Link to="/blogs" className="btn btn-outline">
          Volver al blog
        </Link>
      </p>
    </div>
  )
}
