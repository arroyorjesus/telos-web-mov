export const SITE = {
  name: 'TELOS',
  tagline: 'Eficiencia energética integral para empresas en México',
  description:
    'Diseñamos e implementamos proyectos de eficiencia energética en electricidad, gas térmico y agua para hoteles, industrias y empresas con alto consumo. Diagnóstico técnico, ejecución llave en mano y resultados medibles.',
  url: 'https://www.telos.com.mx',
  email: 'contacto@telos.com.mx',
  emailAlt: 'contacto@telos.com.mx',
  phone: '+52 (55) 4451 7101',
  phoneRaw: '+525544517101',
  whatsapp: '525544517101',
  whatsappMessage:
    'Hola, quiero solicitar un diagnóstico energético para mi empresa. Me interesa evaluar ahorro en electricidad, gas o agua.',
  address: 'Pedregal 44, PH. Lomas de Chapultepec, CDMX, 11000',
  city: 'Ciudad de México, México',
  founded: 2017,
  schedule: {
    weekdays: 'Lunes a viernes: 9:00 - 18:00',
    saturday: 'Sábado: 10:00 - 14:00',
    sunday: 'Domingo: emergencias por WhatsApp',
  },
  social: {
    linkedin: 'https://linkedin.com/company/telos-energia',
    instagram: 'https://instagram.com/telos.energia',
  },
  metrics: {
    projects: '150+',
    years: '9 años',
    roi: '≤ 36 meses',
    revenue: '+$50M MXN',
    crews: '8',
    savings: '$23.5M MXN / año',
    co2: '-2,195t CO₂',
    crewSize: 6,
  },
}

export const getWhatsAppUrl = (message) => {
  const text = encodeURIComponent(message || SITE.whatsappMessage)
  return `https://wa.me/${SITE.whatsapp}?text=${text}`
}
