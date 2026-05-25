export const MARKET_PLAYERS = [
  {
    id: 'solo-solar',
    title: 'Solo solar',
    description:
      'Paneles fotovoltaicos y BESS. Algunos con financiamiento PPA o arrendamiento. Resuelven la factura de CFE y nada más.',
    strengths: ['Escala y volumen', 'Financiamiento PPA/arrendamiento'],
    limitations: ['Sin agua ni gas térmico', 'Un solo problema resuelto'],
    telos: false,
  },
  {
    id: 'proveedor-equipo',
    title: 'Proveedor de equipo',
    description:
      'Venden e instalan calderas, intercambiadores y sistemas de agua caliente. Son distribuidores, no despachos integrales.',
    strengths: ['Catálogo técnico amplio', 'Stock disponible'],
    limitations: ['No hablan de ROI ni ahorro', 'Sin visión integral'],
    telos: false,
  },
  {
    id: 'telos',
    title: 'TELOS',
    description:
      'Agua + gas + electricidad bajo una sola estrategia. Cuadrillas propias. Sin vender equipo por vender. Sin cobrar software. Solo resultados.',
    strengths: ['Las 3 verticales · 12+ años · 150+ proyectos'],
    limitations: [],
    telos: true,
    claim: 'El único despacho integral del mercado.',
  },
]

export const COMPARISON_CRITERIA = [
  {
    label: 'Agua + gas + electricidad integrados',
    telos: true,
    solar: false,
    equipo: false,
    tooltip: 'Diagnóstico y solución de las 3 verticales en un solo proyecto',
  },
  {
    label: 'Cuadrillas propias certificadas',
    telos: true,
    solar: 'partial',
    equipo: false,
    tooltip: 'TELOS tiene 8 cuadrillas de 6 personas certificadas ANCE y STPS',
  },
  {
    label: 'Implementación llave en mano',
    telos: true,
    solar: 'partial',
    equipo: false,
    tooltip: 'Diseño, ingeniería, instalación y puesta en marcha sin terceros',
  },
  {
    label: 'Ingeniería de valor propia',
    telos: true,
    solar: false,
    equipo: false,
    tooltip: 'Diagnóstico técnico real, no propuesta de catálogo',
  },
  {
    label: 'Mantenimiento postventa',
    telos: true,
    solar: 'partial',
    equipo: false,
    tooltip: 'El proyecto no termina en la entrega de la llave',
  },
  {
    label: 'Diagnóstico multi-energético',
    telos: true,
    solar: false,
    equipo: false,
    tooltip: 'Un solo diagnóstico cubre electricidad, gas y agua',
  },
  {
    label: 'ROI garantizado ≤ 36 meses',
    telos: true,
    solar: 'partial',
    equipo: false,
    tooltip: 'Garantía de retorno de inversión documentada',
  },
  {
    label: 'Tecnología internacional',
    telos: true,
    solar: true,
    equipo: 'partial',
    tooltip: 'Italia, España, China, EE.UU. — sin ataduras de marca',
  },
  {
    label: '+12 años trayectoria',
    telos: true,
    solar: 'partial',
    equipo: 'partial',
    tooltip: 'Desde 2013 en proyectos de eficiencia energética',
  },
  {
    label: 'Sin suscripción de software',
    telos: true,
    solar: true,
    equipo: true,
    tooltip: 'El ahorro es tuyo, no de una plataforma mensual',
  },
  {
    label: 'Normas MX e internacionales',
    telos: true,
    solar: 'partial',
    equipo: 'partial',
    tooltip: 'ANCE, STPS, NOM y normas de fabricante internacional',
  },
]

export const TELOS_BENEFITS = [
  'Un solo diagnóstico cubre electricidad, gas y agua. Sin contratar tres empresas distintas.',
  'Ingeniería de valor diseñada a la medida de tu operación, no catálogos estándar.',
  'Cuadrillas propias certificadas ANCE y STPS. Tú no coordinas a nadie más.',
  'Tecnología de punta de Italia, España, China y EE.UU., elegida según el caso.',
  'Mantenimiento y ajustes post-instalación. El proyecto no termina al entregar la llave.',
  'Sin compromisos de plataforma. El ahorro es tuyo, no de una suscripción.',
]

export const MARKET_LIMITATIONS = [
  'Resuelven electricidad o gas o agua. Nunca los tres con visión integrada.',
  'Hablan de productos y equipos. Rara vez de ahorro garantizado en pesos.',
  'Subcontratan instalación o dependen de terceros.',
  'Tecnología de una sola marca o proveedor.',
  'Postventa limitada o inexistente.',
  'Algunos ofrecen monitoreo digital con suscripción mensual.',
]

export const SCENARIOS = [
  {
    problem: 'Mi factura de gas subió 40% este año.',
    telosAnswer:
      'Diagnóstico del sistema térmico, propuesta de calderas de condensación y ACS, con ahorro proyectado en pesos y ROI en meses.',
    othersAnswer:
      'No te pueden ayudar porque no es su vertical. Te ofrecen una caldera — tú calculas si vale la pena.',
    icon: 'Flame',
    color: 'orange',
  },
  {
    problem: 'Tenemos paros constantes por falta de agua.',
    telosAnswer:
      'Diagnóstico hídrico, planta de tratamiento o captación pluvial a la medida. Operación continua garantizada.',
    othersAnswer:
      'No aplica. Solución técnica para normativa ambiental, no para continuidad operativa.',
    icon: 'Droplets',
    color: 'blue',
  },
  {
    problem: 'Quiero reducir mis 3 facturas energéticas a la vez.',
    telosAnswer:
      'Un solo diagnóstico integral. Una propuesta. Un equipo. Un ROI consolidado.',
    othersAnswer:
      'Necesitas contratar 2 o 3 empresas distintas, coordinar cronogramas y reconciliar propuestas incompatibles.',
    icon: 'Zap',
    color: 'green',
  },
  {
    problem: 'El sistema que instalaron ya no rinde igual.',
    telosAnswer:
      'Mantenimiento preventivo y correctivo, ajustes de configuración, mejoras de tecnología. El proyecto no termina en la entrega.',
    othersAnswer:
      'Postventa limitada. En muchos casos, vuelta a cotizar desde cero.',
    icon: 'Settings',
    color: 'white',
  },
]

export const TECHNOLOGY_ORIGINS = [
  {
    country: 'Italia',
    flag: '🇮🇹',
    specialty: 'Calderas de condensación, ACS, intercambiadores de alto rendimiento',
    vertical: 'gas',
    color: 'orange',
  },
  {
    country: 'España',
    flag: '🇪🇸',
    specialty: 'Sistemas solares térmicos, bombas de calor, integración energética',
    vertical: 'gas',
    color: 'orange',
  },
  {
    country: 'China',
    flag: '🇨🇳',
    specialty: 'Módulos fotovoltaicos, inversores de alta eficiencia, BESS',
    vertical: 'electricidad',
    color: 'green',
  },
  {
    country: 'EE.UU.',
    flag: '🇺🇸',
    specialty: 'Sistemas de agua, filtración avanzada, automatización y control',
    vertical: 'agua',
    color: 'blue',
  },
]
