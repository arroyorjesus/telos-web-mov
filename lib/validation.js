import { z } from 'zod'

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, 'El nombre contiene caracteres inválidos'),

  email: z
    .string()
    .email('Ingresa un email válido')
    .max(254, 'El email es demasiado largo')
    .toLowerCase(),

  telefono: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(20, 'El teléfono es demasiado largo')
    .regex(/^[\d\s\+\-\(\)]+$/, 'El teléfono contiene caracteres inválidos'),

  empresa: z
    .string()
    .min(2, 'El nombre de la empresa es muy corto')
    .max(150, 'El nombre de la empresa es demasiado largo'),

  ciudad: z
    .string()
    .min(2, 'Ingresa tu ciudad o estado')
    .max(100, 'Ciudad demasiado larga')
    .optional()
    .or(z.literal('')),

  tipo_operacion: z
    .enum([
      'hotel',
      'industria',
      'corporativo',
      'desarrollo',
      'deportivo',
      'residencial',
      'otro',
      '',
    ])
    .optional(),

  principal_consumo: z
    .enum(['electricidad', 'gas', 'agua', 'todos', ''])
    .optional(),

  gasto_mensual: z
    .enum(['menos_50k', '50k_150k', '150k_500k', 'mas_500k', 'no_se', ''])
    .optional(),

  objetivo: z
    .enum(['reducir_factura', 'resolver_desabasto', 'modernizar', 'mejorar_roi', 'normatividad', 'otro', ''])
    .optional(),

  mensaje: z
    .string()
    .max(1000, 'El mensaje es demasiado largo')
    .optional()
    .or(z.literal('')),

  // Honeypot field — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
})

export const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JS injection
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000) // Hard cap
}

export const sanitizeContactData = (data) => ({
  nombre: sanitizeString(data.nombre),
  email: sanitizeString(data.email)?.toLowerCase(),
  telefono: sanitizeString(data.telefono),
  empresa: sanitizeString(data.empresa),
  ciudad: sanitizeString(data.ciudad),
  tipo_operacion: data.tipo_operacion || null,
  principal_consumo: data.principal_consumo || null,
  gasto_mensual: data.gasto_mensual || null,
  objetivo: data.objetivo || null,
  mensaje: sanitizeString(data.mensaje),
})
