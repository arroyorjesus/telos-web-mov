import DiagnosticoWizard from './DiagnosticoWizard'

export const metadata = {
  title: 'Diagnóstico energético gratuito',
  description:
    'Cuéntanos cómo opera tu propiedad y te preparamos una proyección de ahorro en electricidad, agua y gas. Toma ~5 minutos.',
  openGraph: {
    title: 'Diagnóstico energético gratuito | TELOS',
    description:
      'Cuéntanos cómo opera tu propiedad y te preparamos una proyección de ahorro en electricidad, agua y gas.',
    url: '/diagnostico',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico energético gratuito | TELOS',
    description:
      'Cuéntanos cómo opera tu propiedad y te preparamos una proyección de ahorro en electricidad, agua y gas.',
  },
}

export default function DiagnosticoPage() {
  return <DiagnosticoWizard />
}
