import { Link } from 'react-router-dom'

const posts = [
  {
    id: 1,
    title: 'Guía básica de mantenimiento para réplicas AEG',
    excerpt:
      'Aprende a limpiar y lubricar tu gearbox para prolongar la vida útil de tu réplica eléctrica y mantener una buena precisión.',
    img: '/img/scar.jpg',
  },
  {
    id: 2,
    title: 'Cómo elegir tu primera réplica Airsoft',
    excerpt:
      'Te orientamos sobre los tipos de propulsión (AEG, GBB, spring), presupuestos recomendados y qué buscar según el estilo de juego.',
    img: '/img/kriss-vector.jpg',
  },
]

export default function Blogs() {
  return (
    <>
      <h1 className="mb-20">Noticias y consejos</h1>
      <div className="blog-grid">
        {posts.map((p) => (
          <article className="blog-card" key={p.id}>
            <div className="img-wrap">
              <img
                src={p.img}
                alt={p.title}
                onError={(e) => {
                  e.target.src =
                    'https://placehold.co/600x340/1a1d24/3d8b5f?text=Blog'
                }}
              />
            </div>
            <div className="content">
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <Link to={`/blogs/${p.id}`} className="btn btn-outline btn-sm">
                Leer más
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
