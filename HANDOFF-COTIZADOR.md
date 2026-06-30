# 🌞 TELOS — Cotizador Solar + CRM · Handoff para continuar en tu MacBook

Este documento te permite retomar el proyecto en tu MacBook con **Claude Code**.
Todo lo de abajo ya está **construido y verificado en local**. Falta solo conectar
3 servicios externos (Supabase, Resend, Vercel) y hacer el deploy.

---

## ✅ Qué ya está hecho (en este proyecto `telos-web-mov`)

| Pieza | Archivo |
|---|---|
| Calculadora montada en `/cotizador` (iframe pantalla completa) | `app/cotizador/page.js` + `public/cotizador/app.html` |
| Login con contraseña única (middleware) | `middleware.js` · `lib/cotizadorAuth.js` · `app/cotizador/login/page.js` |
| Botón "💾 Guardar cotización" + reabrir por `?id=` | inyectado en `public/cotizador/app.html` |
| API de cotizaciones (guardar/listar/leer) | `app/api/cotizaciones/route.js` · `app/api/cotizaciones/[id]/route.js` |
| API de auth | `app/api/cotizador-auth/route.js` |
| Capa de datos (Supabase + fallback mock JSON local) | `lib/db.js` |
| CRM filtrable `/cotizaciones` con botón Reabrir | `app/cotizaciones/page.js` + `app/cotizaciones/CotizacionesClient.jsx` |
| SQL de las 2 tablas | `supabase/setup.sql` |

**Decisión técnica:** la calculadora NO se portó a React; se sirve el HTML existente
(`calculadora-solar.html`) tal cual dentro de un iframe. Cero riesgo de romper los cálculos.

---

## ▶️ Cómo correrlo en tu MacBook (5 min)

```bash
cd telos-web-mov
npm install
```

Agrega esta línea a tu archivo `.env.local` (créalo si no existe):

```bash
COTIZADOR_PASSWORD=telos-solar-2026
```

Arranca el servidor:

```bash
npm run dev
```

Abre en el navegador:

- **Calculadora:**  http://localhost:3000/cotizador
- **CRM:**          http://localhost:3000/cotizaciones
- **Contraseña:**   `telos-solar-2026`

> Sin Supabase configurado, las cotizaciones se guardan en un archivo local
> `.cotizaciones-mock.json` (ya ignorado por git). Sirve para probar TODO el flujo
> sin base de datos. Al conectar Supabase, deja de usar el mock automáticamente.

---

## ⏳ Lo que falta para producción

### 1. Supabase (base de datos — UN proyecto, DOS tablas)
1. Crea 1 proyecto en https://supabase.com (nombre: `telos`, región US East).
2. SQL Editor → pega TODO `supabase/setup.sql` → Run. Crea tablas `leads` y `cotizaciones`.
3. Settings → API → copia **Project URL** y **service_role key** (la secreta `eyJ...`).

### 2. Resend (correos del formulario de contacto — hoy en modo mock, NO envía)
1. Crea cuenta en https://resend.com
2. Verifica el dominio `telos.com.mx` (Resend te da registros DNS para agregar en
   tu proveedor de dominio / Vercel DNS).
3. API Keys → crea una → copia el `re_...`.

### 3. Vercel (variables de entorno + deploy)
Agrega estas variables en el proyecto `telos-web-mov` (Vercel → Settings → Environment Variables):

```
SUPABASE_URL=<el Project URL de Supabase>
SUPABASE_SERVICE_ROLE_KEY=<la service_role key>
COTIZADOR_PASSWORD=<una contraseña real, no la de dev>
EMAIL_PROVIDER=resend
RESEND_API_KEY=<el re_... de Resend>
EMAIL_TO=contacto@telos.com.mx
EMAIL_FROM=TELOS <noreply@telos.com.mx>
```

Luego: commit + push (rama actual: `v2`) → Vercel hace deploy automático.

---

## 🤖 PROMPT PARA PEGAR EN CLAUDE CODE (en tu MacBook)

Copia y pega esto en Claude Code dentro de la carpeta del proyecto:

> Retoma el proyecto Cotizador Solar de TELOS. Lee primero `HANDOFF-COTIZADOR.md`
> en la raíz de `telos-web-mov` — ahí está todo el contexto de lo ya construido y lo
> pendiente.
>
> 1. Arranca el dev server (`npm run dev`) y ábreme la calculadora en
>    http://localhost:3000/cotizador (contraseña `telos-solar-2026`). Verifica que
>    login, guardar cotización y el CRM en /cotizaciones funcionen.
> 2. Ya tengo (o estoy por crear) las llaves de Supabase y Resend. Cuando te las pase,
>    mételas a `.env.local` para local y guíame para ponerlas en Vercel.
> 3. Cuando todo funcione con Supabase real, ayúdame con commit + push (rama `v2`) y
>    el deploy en Vercel.
>
> Pendientes externos: crear proyecto Supabase (correr `supabase/setup.sql`), crear
> cuenta Resend + verificar dominio telos.com.mx, y cargar las env vars en Vercel.

---

## 📌 Notas

- El TC (tipo de cambio USD/MXN) en la calc usa frankfurter.app como referencia.
  Para el TC oficial DOF/Banxico exacto, conectar al publicar.
- Repo: `arroyorjesus/telos-web-mov` · Proyecto Vercel: `telos-web-mov` · Rama: `v2`.
- El sitio principal telos.com.mx ya está live; esto agrega `/cotizador` y `/cotizaciones`
  protegidos por contraseña (no indexados, `robots: noindex`).
