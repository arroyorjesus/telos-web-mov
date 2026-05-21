/**
 * JsonLd — inyecta un bloque de datos estructurados (schema.org).
 * Server Component: se renderiza en el HTML inicial, indexable por Google.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
