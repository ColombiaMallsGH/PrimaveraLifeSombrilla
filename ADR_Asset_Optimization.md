# ADR: Optimización de Assets y Renderizado Next.js con Cloudinary

## Situación (El Problema Estructural)
La landing page de Primavera Life presentaba un efecto visual de "barrido" al cargar. Este retraso es un cuello de botella causado por la forma en la que Next.js procesa imágenes externas por defecto.

Aunque se pasaban URLs de Cloudinary ya optimizadas con sus parámetros intrínsecos de compresión inteligente (`q_auto`, `f_auto`), el componente `<Image>` de Next.js intentaba re-procesar (re-encode) las imágenes a través de su propia API de optimización. Esto resultaba en:
1. Una carga doble.
2. Un consumo innecesario de recursos del servidor (o límite de la cuota en Vercel).
3. Un delay perceptual de carga (el barrido).

## La Solución (Root Cause Analysis & Workaround)
La causa raíz era la redundancia de optimización de imágenes (Cloudinary Optimization vs Next.js Image Optimization).

Se decidió inyectar la directiva `unoptimized={true}` junto a `priority={true}` a los elementos críticos. 

### Por qué esta ruta técnica
- **Next.js Overhead:** Al delegar completamente la optimización a Cloudinary y evitar que Next.js "toque" la imagen, ganamos la inmediatez del CDN de Cloudinary.
- **Priority:** Le indicamos al navegador que esos assets deben cargarse de forma prioritaria en el flujo de LCP (Largest Contentful Paint).

## ADR: Migración a SVG Dinámico (Lucide React) vs Emojis/Unicode
Las viñetas tipo "✦" no escalaban a nivel de diseño corporativo premium y generaban inconsistencia visual.
- **Decisión:** Instalación de `lucide-react`.
- **Por qué:** Mantiene un DOM limpio con SVG dinámicos integrados nativamente en React, peso casi nulo y herencia automática de estilos/colores mediante `strokeWidth` y `size`. Permitió asociar íconos contextuales exactos por amenidad.
