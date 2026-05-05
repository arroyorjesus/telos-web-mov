export const SERVICES = [
  {
    id: 'agua',
    label: 'Agua',
    title: 'Agua',
    subtitle: 'Eficiencia hídrica integral',
    color: 'blue',
    colorHex: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.15)',
    icon: 'Droplets',
    description:
      'Captación pluvial, tratamiento, recirculación, ósmosis inversa y eficiencia hídrica para reducir consumo y dependencia del suministro municipal.',
    longDescription:
      'Diseñamos sistemas hídricos integrales que eliminan la dependencia del suministro municipal, reducen el consumo y garantizan continuidad operativa. Cada solución es diagnóstica, no de catálogo.',
    tags: ['Captación pluvial', 'Tratamiento', 'Ósmosis inversa', 'Reuso', 'Filtración'],
    outcomes: [
      'Eliminación de paros por desabasto',
      'Reducción de pipas de agua',
      'Tratamiento y reuso in-situ',
      'Cumplimiento normativo ambiental',
    ],
    slug: '/ustedes#agua',
  },
  {
    id: 'gas',
    label: 'Gas térmico',
    title: 'Gas térmico',
    subtitle: 'Optimización de procesos térmicos',
    color: 'orange',
    colorHex: '#f97316',
    glowColor: 'rgba(249,115,22,0.15)',
    icon: 'Flame',
    description:
      'Calderas eficientes, condensación, cogeneración, heat pumps, ACS solar y optimización de procesos térmicos.',
    longDescription:
      'Reducimos el consumo de gas con tecnología de condensación, recuperación de calor y sistemas ACS de alto rendimiento. Ahorro de hasta 99% en algunos casos.',
    tags: ['Calderas', 'ACS', 'Heat pumps', 'Intercambiadores', 'Cogeneración'],
    outcomes: [
      '30–99% reducción en factura de gas',
      'Reducción masiva de emisiones CO₂',
      'Mayor vida útil de equipos',
      'Continuidad operativa térmica',
    ],
    slug: '/ustedes#gas',
  },
  {
    id: 'electricidad',
    label: 'Electricidad',
    title: 'Electricidad',
    subtitle: 'Generación y optimización eléctrica',
    color: 'green',
    colorHex: '#22c55e',
    glowColor: 'rgba(34,197,94,0.15)',
    icon: 'Zap',
    description:
      'Sistemas fotovoltaicos, BESS, optimización de demanda, monitoreo y eliminación de bajo factor de potencia.',
    longDescription:
      'Diseñamos e instalamos sistemas fotovoltaicos industriales con BESS y optimización de demanda para maximizar el ahorro en la factura CFE.',
    tags: ['Fotovoltaico', 'BESS', 'Demanda', 'CFE', 'Monitoreo'],
    outcomes: [
      'Hasta 100% independencia de CFE',
      'Eliminación de cargos por demanda',
      'Monitoreo en tiempo real',
      'ROI ≤ 36 meses garantizado',
    ],
    slug: '/ustedes#electricidad',
  },
]

export const FOR_WHOM = [
  {
    id: 'hoteles',
    title: 'Hoteles y hospitalidad',
    description:
      'Climatización, agua caliente, electricidad y operación 24/7 con ahorro medible desde el primer mes.',
    icon: 'Building2',
    tags: ['Agua caliente', 'Climatización', 'Fotovoltaico'],
  },
  {
    id: 'industria',
    title: 'Industria y manufactura',
    description:
      'Procesos térmicos, vapor, electricidad, agua y reducción de OPEX a escala.',
    icon: 'Factory',
    tags: ['Procesos térmicos', 'Vapor', 'Electricidad industrial'],
  },
  {
    id: 'corporativo',
    title: 'Corporativos y oficinas',
    description:
      'Soluciones integrales para edificios de oficinas con múltiples consumos y alta demanda eléctrica.',
    icon: 'Building',
    tags: ['Fotovoltaico', 'Demanda CFE', 'Eficiencia'],
  },
  {
    id: 'desarrollos',
    title: 'Desarrollos y parques',
    description:
      'Soluciones integrales para inmuebles con múltiples usuarios, medidores y consumos.',
    icon: 'MapPin',
    tags: ['Multi-usuario', 'Agua', 'Gas', 'Electricidad'],
  },
]

export const PROBLEMS = [
  {
    title: 'Tarifas que no paran de subir',
    description:
      'Gas, luz y agua aumentan por encima de la inflación. Sin estrategia, tus costos solo crecen.',
    icon: 'TrendingUp',
    color: 'orange',
  },
  {
    title: 'Infraestructura obsoleta e ineficiente',
    description:
      'Equipos fuera de su punto óptimo generan desperdicio invisible que aparece en tu factura.',
    icon: 'AlertTriangle',
    color: 'red',
  },
  {
    title: 'Tres sistemas, cero integración',
    description:
      'Agua, gas y luz se gestionan por separado. Sin visión integral, la optimización es parcial.',
    icon: 'Layers',
    color: 'blue',
  },
]

export const HOW_WE_WORK = [
  {
    step: '01',
    title: 'Diagnóstico real, no estimaciones',
    description:
      'Medimos tu consumo actual en electricidad, gas y agua. Identificamos exactamente dónde se va el dinero que no deberías estar pagando.',
    badge: 'Lo que no se mide, no se mejora.',
    color: 'green',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Diseño e implementación llave en mano',
    description:
      'Diseñamos la solución a la medida de tu operación e instalamos la tecnología correcta. Sin improvisación. Sin humo. Literalmente: nuestro objetivo es reducirlo.',
    badge: '30%–99% de ahorro posible, según proyecto.',
    color: 'blue',
    icon: 'Settings',
  },
  {
    step: '03',
    title: 'Optimización y garantía de resultados',
    description:
      'Damos seguimiento al desempeño de los sistemas instalados para garantizar que el ahorro sea real, sostenido y medible.',
    badge: 'ROI garantizado ≤ 36 meses.',
    color: 'orange',
    icon: 'BarChart3',
  },
]
