// Esquema del cuestionario de diagnóstico energético/hídrico/gas.
// Portado desde el prototipo telos-diagnostico, con branching por tipo de
// propiedad (ver docs/plans del prototipo original para el razonamiento).

function isYes(values, key) {
  return values[key] === 'Sí'
}

function hasEnergetico(values, name) {
  const value = values.energeticos
  return Array.isArray(value) && value.includes(name)
}

function isSector(values, name) {
  return values.tipo_propiedad === name
}

export const SECTOR_OPTIONS = [
  'Corporativo y edificios de oficinas',
  'Industrial y manufactura',
  'Hotelería, hospitales y clubes deportivos',
  'Desarrollos residenciales y comerciales',
]

export const EMPLEADOS_OPTIONS = ['1 - 30', '31 - 100', '101 - 500', '501 - 1,000', 'Más de 1,000']

export const OCUPACION_OPTIONS = ['0% - 30%', '31% - 40%', '41% - 60%', '61% - 70%', '71% - 80%', '81% - 100%']

export const SECTIONS = [
  {
    id: 'general',
    title: 'Datos generales',
    subtitle: 'Lo básico para identificar tu propiedad.',
    questions: [
      { key: 'empresa', label: 'Nombre de la empresa', type: 'text', required: true, placeholder: 'Hotel / empresa' },
      { key: 'contacto', label: 'Nombre de contacto', type: 'text', required: true },
      { key: 'correo', label: 'Correo corporativo', type: 'email', required: true },
      { key: 'telefono', label: 'Teléfono de contacto', type: 'tel', required: true },
      { key: 'ubicacion', label: 'Ubicación del inmueble', type: 'text', required: true, placeholder: 'Dirección completa' },
      { key: 'area_construccion', label: 'Área de construcción (m²)', type: 'number' },
      { key: 'colaboradores', label: 'Cantidad de colaboradores', type: 'select', options: EMPLEADOS_OPTIONS },
      { key: 'tipo_propiedad', label: '¿Qué tipo de propiedad es?', type: 'chips-single', options: SECTOR_OPTIONS, required: true },

      // Hotelería, hospitales y clubes deportivos
      {
        key: 'habitaciones',
        label: '¿Cuántas habitaciones/camas opera?',
        type: 'number',
        required: true,
        showIf: (v) => isSector(v, 'Hotelería, hospitales y clubes deportivos'),
      },
      {
        key: 'ocupacion',
        label: 'Ocupación promedio anual',
        type: 'select',
        options: OCUPACION_OPTIONS,
        showIf: (v) => isSector(v, 'Hotelería, hospitales y clubes deportivos'),
      },

      // Corporativo y edificios de oficinas
      {
        key: 'pisos_edificio',
        label: '¿Cuántos pisos tiene el edificio?',
        type: 'number',
        showIf: (v) => isSector(v, 'Corporativo y edificios de oficinas'),
      },
      {
        key: 'personas_edificio',
        label: '¿Cuántas personas ocupan el edificio en promedio (empleados + visitantes)?',
        type: 'number',
        required: true,
        showIf: (v) => isSector(v, 'Corporativo y edificios de oficinas'),
      },
      {
        key: 'horario_operacion',
        label: 'Horario de operación',
        type: 'chips-single',
        options: ['Horario de oficina', '24-7', 'Mixto'],
        showIf: (v) => isSector(v, 'Corporativo y edificios de oficinas'),
      },

      // Industrial y manufactura
      {
        key: 'turnos_operacion',
        label: '¿En cuántos turnos operan?',
        type: 'chips-single',
        options: ['1 turno', '2 turnos', '3 turnos (24/7)'],
        required: true,
        showIf: (v) => isSector(v, 'Industrial y manufactura'),
      },
      {
        key: 'procesos_calor',
        label: '¿Cuentan con líneas de producción continua o procesos que usan calor/vapor?',
        type: 'yesno',
        showIf: (v) => isSector(v, 'Industrial y manufactura'),
      },

      // Desarrollos residenciales y comerciales (edificio de departamentos)
      {
        key: 'unidades_edificio',
        label: '¿Cuántas unidades tiene el edificio (departamentos/locales)?',
        type: 'number',
        required: true,
        showIf: (v) => isSector(v, 'Desarrollos residenciales y comerciales'),
      },
      {
        key: 'ocupacion_venta',
        label: '¿Qué porcentaje está ocupado o vendido?',
        type: 'select',
        options: OCUPACION_OPTIONS,
        showIf: (v) => isSector(v, 'Desarrollos residenciales y comerciales'),
      },
      {
        key: 'areas_comunes',
        label: '¿Cuenta con áreas comunes?',
        type: 'chips-multi',
        options: ['Alberca común', 'Gimnasio', 'Salón de eventos', 'Estacionamiento techado', 'Ninguna'],
        showIf: (v) => isSector(v, 'Desarrollos residenciales y comerciales'),
      },
    ],
  },
  {
    id: 'consumos',
    title: 'Consumos',
    subtitle: '¿Qué energéticos usan y cuánto gastan al mes?',
    questions: [
      { key: 'energeticos', label: '¿Qué energéticos utilizas para tu operación?', type: 'chips-multi', options: ['Agua', 'Energía Eléctrica', 'Gas'], required: true },
      { key: 'gasto_agua', label: 'Gasto promedio mensual de agua ($)', type: 'number', showIf: (v) => hasEnergetico(v, 'Agua') },
      { key: 'gasto_luz', label: 'Gasto promedio mensual de electricidad ($)', type: 'number', showIf: (v) => hasEnergetico(v, 'Energía Eléctrica') },
      { key: 'gasto_gas', label: 'Gasto promedio mensual de gas ($)', type: 'number', showIf: (v) => hasEnergetico(v, 'Gas') },
      { key: 'consumo_por_areas', label: '¿Cuentan con el consumo dividido por áreas?', type: 'yesno' },
      { key: 'usa_pipas_agua', label: '¿Adquieren pipas de agua?', type: 'yesno', showIf: (v) => hasEnergetico(v, 'Agua') },
      { key: 'gasto_pipas', label: 'Gasto promedio en pipas de agua ($)', type: 'number', showIf: (v) => isYes(v, 'usa_pipas_agua') },
    ],
  },
  {
    id: 'electrica',
    title: 'Infraestructura eléctrica',
    showIf: (v) => hasEnergetico(v, 'Energía Eléctrica'),
    questions: [
      { key: 'diagrama_unifilar', label: '¿Cuentas con diagrama unifilar?', type: 'yesno' },
      { key: 'voltaje', label: '¿Cuál es el voltaje principal de la instalación?', type: 'chips-single', options: ['127/220 V', '220/440 V', '440/254 V', 'Otro'] },
      { key: 'tableros_electricos', label: '¿Cuántos tableros eléctricos hay en la instalación?', type: 'select', options: ['1 - 5', '6 - 15', '16 - 49', '50+'] },
      { key: 'bancos_capacitores', label: '¿Tienen instalados bancos de capacitores?', type: 'yesno' },
      { key: 'respaldo_energetico', label: '¿Utilizan sistemas de respaldo energético?', type: 'yesno' },
      { key: 'tipo_respaldo', label: '¿Qué tipo de sistema de respaldo utilizan?', type: 'chips-multi', options: ['Planta de Diesel', 'UPS', 'Otro'], showIf: (v) => isYes(v, 'respaldo_energetico') },
      { key: 'fallas_electricas', label: '¿Han experimentado fallas frecuentes en equipos por problemas eléctricos?', type: 'yesno' },
    ],
  },
  {
    id: 'hidraulica',
    title: 'Infraestructura hidráulica',
    showIf: (v) => hasEnergetico(v, 'Agua'),
    questions: [
      { key: 'fuente_agua', label: '¿Cuál es la fuente principal de suministro de agua?', type: 'chips-single', options: ['Red Municipal', 'Pozo Propio', 'Pipas', 'Otro'] },
      { key: 'fuente_secundaria', label: '¿Tienen una fuente secundaria de suministro de agua?', type: 'yesno' },
      { key: 'tipo_fuente_secundaria', label: '¿Cuál sería la fuente secundaria?', type: 'chips-single', options: ['Pozo Propio', 'Pipas', 'Red Municipal', 'Otro'], showIf: (v) => isYes(v, 'fuente_secundaria') },
      { key: 'cantidad_cisternas', label: '¿Cuántas cisternas para agua potable existen en el inmueble?', type: 'number' },
      { key: 'capacidad_agua_m3', label: 'Capacidad TOTAL de almacenamiento de agua (m³)', type: 'number' },
      { key: 'tratamiento_aguas_residuales', label: '¿Cuentan con sistema de tratamiento de aguas residuales (PTAR)?', type: 'yesno' },
      { key: 'reutiliza_agua', label: '¿Se reutiliza el agua en alguna parte del proceso?', type: 'yesno' },
      { key: 'bombas_presurizadas', label: '¿Cuentan con bombas presurizadas instaladas?', type: 'yesno' },
    ],
  },
  {
    id: 'gas',
    title: 'Infraestructura de gas',
    showIf: (v) => hasEnergetico(v, 'Gas'),
    questions: [
      { key: 'tipo_gas', label: '¿Cuál es el tipo de gas utilizado en la instalación?', type: 'chips-single', options: ['Gas Natural', 'Gas LP'] },
      { key: 'fuente_gas', label: '¿Cuál es la fuente principal de suministro de gas?', type: 'chips-single', options: ['Red Externa (gas natural)', 'Pipas (tanques estacionarios)'] },
      { key: 'tanques_gas', label: '¿Cuántos tanques de almacenamiento existen en el inmueble?', type: 'number' },
      { key: 'reguladores_presion', label: '¿El sistema cuenta con reguladores de presión?', type: 'yesno' },
      { key: 'seguridad_gas', label: '¿La red de gas cuenta con sistemas de seguridad?', type: 'chips-multi', options: ['Alarmas de gas', 'Detectores de fuga', 'Corte manual por zonas', 'Ninguno'] },
    ],
  },
  {
    id: 'clima_amenidades',
    title: 'Clima y amenidades',
    questions: [
      { key: 'iluminacion', label: '¿Qué tipo de iluminación tiene el inmueble?', type: 'chips-multi', options: ['LED', 'Fluorescente', 'Otro'] },
      { key: 'climatizacion', label: '¿Cuentan con sistema de calefacción o enfriamiento?', type: 'yesno' },
      { key: 'tipo_climatizacion', label: '¿Qué sistemas se tienen instalados?', type: 'chips-multi', options: ['Aire Acondicionado Central (HVAC)', 'MiniSplit', 'Chiller', 'Bomba de calor', 'Otro'], showIf: (v) => isYes(v, 'climatizacion') },
      { key: 'tiene_alberca', label: '¿Cuentan con albercas?', type: 'yesno' },
      { key: 'cantidad_albercas', label: '¿Cuántas albercas?', type: 'number', showIf: (v) => isYes(v, 'tiene_alberca') },
      { key: 'calienta_alberca', label: '¿Calientan la(s) alberca(s)?', type: 'yesno', showIf: (v) => isYes(v, 'tiene_alberca') },
      { key: 'amenidades_extra', label: '¿Cuentan con alguna de estas amenidades?', type: 'chips-multi', options: ['Jacuzzi', 'SPA', 'Sauna', 'Canchas deportivas', 'Ninguna'] },
      { key: 'tiene_calderas', label: '¿Cuentan con calderas o calentadores de agua?', type: 'yesno' },
      { key: 'cantidad_calderas', label: '¿Con cuántas calderas/calentadores operan actualmente?', type: 'number', showIf: (v) => isYes(v, 'tiene_calderas') },
    ],
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    questions: [
      { key: 'politicas_sostenibilidad', label: '¿Cuentan con políticas de sostenibilidad?', type: 'yesno' },
      { key: 'metas_reduccion', label: '¿Cuentan con metas de reducción de consumo energético?', type: 'yesno' },
      { key: 'mide_huella_carbono', label: '¿Miden su huella de carbono?', type: 'yesno' },
      { key: 'interes_certificaciones', label: '¿Les interesa obtener alguna certificación?', type: 'chips-multi', options: ['LEED', 'EDGE', 'BOMA BEST', 'ISO 50001', 'Ninguna'] },
      { key: 'interes_mejorar_eficiencia', label: '¿Te interesa mejorar tu eficiencia energética y reducir costos?', type: 'yesno' },
    ],
  },
]

export const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.questions)

export const DOCUMENT_CATEGORIES = [
  {
    key: 'factura_cfe',
    label: 'Facturas de electricidad (CFE)',
    helper: 'Si las tienes a la mano, en PDF (idealmente de los últimos 6 a 12 meses).',
    accept: '.pdf',
  },
  {
    key: 'factura_agua',
    label: 'Factura(s) de agua',
    helper: 'En PDF, si las tienes disponibles.',
    accept: '.pdf',
  },
  {
    key: 'factura_gas',
    label: 'Factura(s) de gas',
    helper: 'En PDF, si las tienes disponibles.',
    accept: '.pdf',
  },
  {
    key: 'excel_consumos',
    label: 'Histórico de consumos (Excel)',
    helper: 'Si llevas un registro propio de consumos, súbelo aquí (Excel o CSV).',
    accept: '.xlsx,.xls,.csv',
  },
  {
    key: 'fotos_instalaciones',
    label: 'Fotos de instalaciones',
    helper: 'Tablero eléctrico, calderas/calentadores (placa de datos), cisternas, medidor de gas, alberca — opcional pero nos ayuda a verificar.',
    accept: 'image/*',
  },
]
