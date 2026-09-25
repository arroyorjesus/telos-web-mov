import { NextResponse } from 'next/server'
import { getAuditoria, saveCotizacion, updateAuditoria } from '@/lib/db'

// Estimado simple: kWh mensual = gasto reportado / tarifa promedio.
// El resultado es un borrador editable dentro de /cotizador, no una cifra final.
const PRECIO_KWH_DEFAULT = 4.14

const SECTOR_SEGMENTO = {
  'Industrial y manufactura': 'industrial',
}
function segmentoFor(tipoPropiedad) {
  return SECTOR_SEGMENTO[tipoPropiedad] || 'comercial'
}

export async function POST(request, { params }) {
  const { data: auditoria, error } = await getAuditoria(params.id)
  if (error || !auditoria) {
    return NextResponse.json({ error: 'Auditoría no encontrada' }, { status: 404 })
  }

  const r = auditoria.respuestas || {}
  const gastoLuz = Number(r.gasto_luz) || 0
  const kwhMensual = gastoLuz > 0 ? Math.round(gastoLuz / PRECIO_KWH_DEFAULT) : 0
  const consumo = new Array(12).fill(kwhMensual)

  const payload = {
    segmento: segmentoFor(auditoria.tipo_propiedad),
    periodo: 'mensual',
    consumo,
    precioKwh: PRECIO_KWH_DEFAULT,
    ciudadIdx: 11,
    panelW: 715,
    cantidad: 0,
    cantManual: false,
    usdWp: 0.9,
    tc: 17.5,
    modo: 'rapido',
    componentes: [],
    panelModelo: 'POLI-MONO BIFACIAL',
    panelMarca: 'JA Solar / Yingli',
    invModelo: '20 / 60 / 80 kW',
    invMarca: 'Huawei / Solis',
    invCant: '1 a 4',
    cotProyecto: `Diagnóstico — ${auditoria.empresa || ''}`.trim(),
    cotCliente: auditoria.empresa || '',
    cotAtencion: auditoria.contacto || '',
    cotFecha: '',
    cotVigencia: '15',
    cotMan: { modo: 'rapido', desc: '', precioRapido: 0, iva: true, moneda: 'USD', tc: 17.5, rows: [] },
  }

  const row = {
    cliente: auditoria.empresa || null,
    proyecto: payload.cotProyecto,
    atencion: auditoria.contacto || null,
    segmento: payload.segmento,
    ciudad: null,
    estado: 'borrador',
    payload,
  }

  const { data, error: saveError } = await saveCotizacion(row)
  if (saveError) {
    return NextResponse.json({ error: saveError.message || 'Error al crear la proyección' }, { status: 500 })
  }

  await updateAuditoria(params.id, { cotizacion_id: data.id, estado: 'proyeccion_lista' })

  return NextResponse.json({ ok: true, id: data.id })
}
