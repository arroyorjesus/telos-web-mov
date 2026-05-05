// Media registry — replace src paths when real assets are available
export const MEDIA = {
  hero: {
    video: null,
    poster: '/images/hero-bg.jpg',
    fallback: '/images/hero-fallback.jpg',
    alt: 'Infraestructura energética industrial',
  },
  nosotros: {
    video: null,
    poster: '/images/nosotros-hero.jpg',
    alt: 'Equipo TELOS trabajando en campo',
  },
  solutions: {
    agua: {
      image: '/images/solution-agua.jpg',
      video: null,
      alt: 'Sistema de tratamiento de agua industrial',
    },
    gas: {
      image: '/images/solution-gas.jpg',
      video: null,
      alt: 'Calderas de condensación de alta eficiencia',
    },
    electricidad: {
      image: '/images/solution-electricidad.jpg',
      video: null,
      alt: 'Sistema fotovoltaico industrial en azotea',
    },
  },
  cases: {
    agua: '/images/case-agua.jpg',
    gas: '/images/case-gas.jpg',
    electricidad: '/images/case-electricidad.jpg',
  },
  // Placeholder images from Unsplash (conceptual references)
  placeholders: {
    solar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    industrial: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80',
    hotel: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    energy: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    water: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    boiler: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    engineer: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
}
