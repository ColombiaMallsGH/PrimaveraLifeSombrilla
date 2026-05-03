# Meta-Análisis: Primavera Life UI/UX Session (2026-05-02)

## Evaluación de Rendimiento

**Fallo/Lentitud:**
No previ la limitación del DOM respecto al uso del carácter genérico "✦" para viñetas, requiriendo un requerimiento expreso del usuario para hacer el cambio a una solución moderna (Lucide). Fui lento en deducir que un proyecto "premium" demanda inmediatamente iconografía SVG estandarizada en lugar de caracteres Unicode de texto.

**Éxito:**
La inyección de los parámetros de Next.js (`unoptimized`) y la arquitectura de Cloudinary (`q_auto/f_auto`) se diagnosticó de inmediato basándose en el comportamiento de "barrido". La corrección de CSS Layout para `HousesSection` (grid y scrollbars) fue rápida.

## Propuesta de Mejora Estructural

**Nueva Regla (AI Context):**
Crear una "Skill" llamada `cmalls-premium-ui-constraints` que obligue a Antigravity a seguir estos pasos al construir UIs de CMalls:
1. **NO usar emojis ni caracteres Unicode especiales (✦, ⭐, etc.) como iconografía principal de UI.**
2. Instalar y usar `lucide-react` (o equivalente definido en el proyecto) con propiedades controladas (`strokeWidth: 1.5`, tamaño consistente) como regla predeterminada.
3. Evaluar de inmediato el ciclo de vida de la imagen. Si hay URL pre-optimizadas, forzar `unoptimized={true}` proactivamente, no esperar a que el usuario reporte latencia de renderizado.
