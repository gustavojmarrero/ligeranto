export interface LighthouseResult {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  issues: {
    id: string
    category: string
    title: string
    description: string
    impact: "high" | "medium" | "low"
  }[]
  metrics: {
    [key: string]: number
  }
  screenshot?: string
  // Nuevos campos para datos adicionales de PageSpeed
  rawData?: any
  loadingExperience?: {
    overall_category: string
    metrics: {
      [key: string]: {
        category: string
        percentile: number
      }
    }
  }
  originLoadingExperience?: {
    overall_category: string
    metrics: {
      [key: string]: {
        category: string
        percentile: number
      }
    }
  }
  timestamp?: string
  errorDetails?: string
  aiRecommendations?: string // Nueva propiedad para recomendaciones de IA
}

// Interfaz para tipar las auditorías de Lighthouse
interface LighthouseAudit {
  id?: string
  title?: string
  description?: string
  score?: number
  details?: {
    type?: string
    items?: any[]
    data?: string
  }
  numericValue?: number
}

export async function analyzeSite(url: string): Promise<LighthouseResult> {
  try {
    // Usar la API de PageSpeed Insights (que utiliza Lighthouse internamente)
    const apiKey = process.env.PAGESPEED_API_KEY

    // Construir la URL de la API con la clave si está disponible
    let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&locale=es&utm_source=ligeranto&prettyPrint=false`

    if (apiKey) {
      apiUrl += `&key=${apiKey}`
    }

    console.log(`Analizando URL: ${url} con idioma: español (hl=es)`)

    // Aumentar el tiempo de espera para la solicitud
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120000) // 120 segundos de tiempo de espera

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
        // Aumentar el tiempo de espera para respuestas lentas de la API
        next: { revalidate: 0 },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Error de API (${response.status}): ${errorText}`)

        // Intentar extraer el mensaje de error específico
        let errorDetails = `La API devolvió ${response.status}: ${response.statusText}`
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.error && errorJson.error.message) {
            errorDetails = errorJson.error.message

            // Verificar si es un error de tiempo de espera o de carga de documento
            if (
              errorDetails.includes("FAILED_DOCUMENT_REQUEST") ||
              errorDetails.includes("ERR_TIMED_OUT") ||
              errorDetails.includes("TIMEOUT")
            ) {
              throw new Error(
                "TIMEOUT_ERROR: El sitio web tardó demasiado en responder. Por favor, verifica que la URL sea correcta y que el sitio esté en línea.",
              )
            }
          }
        } catch (parseError) {
          // Si no podemos analizar el JSON, usamos el texto de error completo
          console.error("Error al analizar el mensaje de error:", parseError)
        }

        throw new Error(errorDetails)
      }

      const data = await response.json()

      // Verificar si tenemos la estructura de datos esperada
      if (!data.lighthouseResult) {
        console.error("Estructura de respuesta de API inesperada:", JSON.stringify(data).slice(0, 200) + "...")
        throw new Error("Respuesta de API inválida: falta lighthouseResult")
      }

      // Verificar que la respuesta esté en español
      const locale = data.lighthouseResult.configSettings?.locale || "unknown"
      console.log(`Idioma de respuesta de la API: ${locale}`)

      // Extraer los datos relevantes de la respuesta de PageSpeed Insights
      const lighthouseResult = data.lighthouseResult
      const categories = lighthouseResult.categories
      const audits = lighthouseResult.audits as Record<string, LighthouseAudit>

      // Extraer puntuaciones (escala 0-1, multiplicar por 100 para porcentaje)
      const performance = Math.round((categories.performance?.score || 0) * 100)
      const accessibility = Math.round((categories.accessibility?.score || 0) * 100)
      const bestPractices = Math.round((categories["best-practices"]?.score || 0) * 100)
      const seo = Math.round((categories.seo?.score || 0) * 100)

      // Extraer métricas clave (con valores predeterminados para datos faltantes)
      const metrics = {
        firstContentfulPaint: audits["first-contentful-paint"]?.numericValue || 0,
        largestContentfulPaint: audits["largest-contentful-paint"]?.numericValue || 0,
        totalBlockingTime: audits["total-blocking-time"]?.numericValue || 0,
        cumulativeLayoutShift: audits["cumulative-layout-shift"]?.numericValue || 0,
        speedIndex: audits["speed-index"]?.numericValue || 0,
        timeToInteractive: audits["interactive"]?.numericValue || 0,
      }

      // Extraer problemas (oportunidades y diagnósticos)
      const issues = []

      // Traducción de categorías
      const categoryTranslations = {
        Performance: "Rendimiento",
        Accessibility: "Accesibilidad",
        "Best Practices": "Mejores Prácticas",
        SEO: "SEO",
      }

      // Traducción de títulos y descripciones comunes
      const translationMap = {
        // Títulos comunes
        "Eliminate render-blocking resources": "Eliminar recursos que bloquean el renderizado",
        "Properly size images": "Dimensionar correctamente las imágenes",
        "Efficiently encode images": "Codificar eficientemente las imágenes",
        "Enable text compression": "Habilitar compresión de texto",
        "Preconnect to required origins": "Preconectar a orígenes requeridos",
        "Reduce server response times": "Reducir tiempos de respuesta del servidor",
        "Avoid multiple page redirects": "Evitar múltiples redirecciones de página",
        "Preload key requests": "Precargar solicitudes clave",
        "Avoid enormous network payloads": "Evitar cargas de red enormes",
        "Serve static assets with an efficient cache policy":
          "Servir activos estáticos con una política de caché eficiente",
        "Avoid an excessive DOM size": "Evitar un tamaño excesivo del DOM",
        "Minimize main-thread work": "Minimizar el trabajo del hilo principal",
        "Ensure text remains visible during webfont load":
          "Asegurar que el texto permanezca visible durante la carga de fuentes web",
        "Keep request counts low and transfer sizes small":
          "Mantener bajo el número de solicitudes y pequeños los tamaños de transferencia",

        // Descripciones comunes
        "Resources are blocking the first paint of your page":
          "Los recursos están bloqueando la primera pintura de tu página",
        "Serve images that are appropriately-sized": "Sirve imágenes con dimensiones apropiadas",
        "Text-based resources should be served with compression":
          "Los recursos basados en texto deben servirse con compresión",
        "Consider adding preconnect or dns-prefetch resource hints":
          "Considera añadir sugerencias de recursos preconnect o dns-prefetch",
        "Reduce the time spent parsing, compiling and executing JS":
          "Reduce el tiempo dedicado a analizar, compilar y ejecutar JS",
        "Avoid chaining critical requests": "Evita encadenar solicitudes críticas",
        "Reduce JavaScript execution time": "Reduce el tiempo de ejecución de JavaScript",
        "Minimize critical request depth": "Minimiza la profundidad de solicitudes críticas",
        "Avoid large layout shifts": "Evita grandes cambios de diseño",
        "Avoid long main-thread tasks": "Evita tareas largas en el hilo principal",
        "Reduce the impact of third-party code": "Reduce el impacto del código de terceros",
        "Serve static assets with a long cache TTL": "Sirve activos estáticos con un TTL de caché largo",
      }

      // Función para traducir textos - ahora solo se usa como respaldo si la API no devuelve textos en español
      const translate = (text: string): string => {
        // Si la API devuelve el texto en español, usamos ese texto directamente
        // Solo usamos nuestras traducciones como respaldo
        return translationMap[text as keyof typeof translationMap] || text
      }

      // Añadir oportunidades (cosas que se pueden mejorar con un impacto claro)
      for (const [id, audit] of Object.entries(audits)) {
        if (audit?.details && audit.details.type === "opportunity" && typeof audit.score === 'number' && audit.score < 0.9) {
          const category = getCategoryForAudit(id, categories);
          const categoryTranslated = category ? (categoryTranslations[category as keyof typeof categoryTranslations] || category) : "Otro";
          
          issues.push({
            id,
            category: categoryTranslated,
            title: translate(audit.title || ""),
            description: translate(audit.description || ""),
            impact: getImpactLevel(audit.score),
          })
        }
      }

      // Añadir diagnósticos importantes
      const diagnosticAudits = [
        "render-blocking-resources",
        "uses-responsive-images",
        "efficient-animated-content",
        "uses-optimized-images",
        "uses-text-compression",
        "uses-rel-preconnect",
        "server-response-time",
        "redirects",
        "uses-rel-preload",
        "unminified-css",
        "unminified-javascript",
      ]

      // Crear un conjunto de IDs ya existentes para evitar duplicados
      const existingIds = new Set(issues.map(issue => issue.id));

      for (const id of diagnosticAudits) {
        // Solo añadir el diagnóstico si no existe ya en la lista de issues y tiene una puntuación baja
        if (!existingIds.has(id) && audits[id] && typeof audits[id]?.score === 'number' && audits[id]!.score! < 0.9) {
          const category = getCategoryForAudit(id, categories);
          const categoryTranslated = category ? (categoryTranslations[category as keyof typeof categoryTranslations] || category) : "Otro";
          
          issues.push({
            id,
            category: categoryTranslated,
            title: translate(audits[id]?.title || ""),
            description: translate(audits[id]?.description || ""),
            impact: getImpactLevel(audits[id]?.score),
          })
        }
      }

      // Obtener la captura de pantalla si está disponible
      let screenshot = null
      try {
        // Intentar obtener la captura de pantalla de diferentes ubicaciones en la respuesta
        if (
          audits["final-screenshot"] &&
          audits["final-screenshot"].details &&
          audits["final-screenshot"].details.data
        ) {
          screenshot = audits["final-screenshot"].details.data
          console.log("Captura de pantalla obtenida de final-screenshot")
        } else if (
          lighthouseResult.fullPageScreenshot &&
          lighthouseResult.fullPageScreenshot.screenshot &&
          lighthouseResult.fullPageScreenshot.screenshot.data
        ) {
          screenshot = lighthouseResult.fullPageScreenshot.screenshot.data
          console.log("Captura de pantalla obtenida de fullPageScreenshot")
        } else {
          // Buscar en otras posibles ubicaciones
          for (const [key, audit] of Object.entries(audits)) {
            if (audit && audit.details && audit.details.type === "screenshot" && audit.details.data) {
              screenshot = audit.details.data
              console.log(`Captura de pantalla obtenida de ${key}`)
              break
            }
          }
        }

        // Verificar si la captura de pantalla es válida
        if (screenshot) {
          // Asegurarse de que sea una cadena base64 válida
          // Eliminar cualquier prefijo de datos que pueda estar presente
          if (screenshot.startsWith("data:")) {
            const base64Match = screenshot.match(/;base64,(.+)/)
            if (base64Match && base64Match[1]) {
              screenshot = base64Match[1]
            }
          }

          // Verificar que sea una cadena base64 válida
          try {
            atob(screenshot)
          } catch (e) {
            console.error("La captura de pantalla no es una cadena base64 válida:", e)
            screenshot = null
          }
        } else {
          console.log("No se encontró captura de pantalla en la respuesta")
        }
      } catch (e) {
        console.error("Error al obtener la captura de pantalla:", e)
        screenshot = null
      }

      // Incluir datos adicionales de PageSpeed
      const loadingExperience = data.loadingExperience || null
      const originLoadingExperience = data.originLoadingExperience || null
      const timestamp = data.analysisUTCTimestamp || new Date().toISOString()

      // Crear el resultado base
      const result: LighthouseResult = {
        performance,
        accessibility,
        bestPractices,
        seo,
        issues: issues.slice(0, 10), // Limitar a los 10 problemas principales
        metrics,
        screenshot,
        // Incluir datos adicionales
        loadingExperience,
        originLoadingExperience,
        timestamp,
        rawData: data, // Incluir los datos completos para depuración
      }

      // Procesar con IA si es posible
      try {
        const aiRecommendations = await getAIRecommendations(result)
        if (aiRecommendations) {
          result.aiRecommendations = aiRecommendations
        }
      } catch (aiError) {
        console.error("Error al obtener recomendaciones de IA:", aiError)
        // No bloqueamos el flujo si falla la IA
      }

      return result
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)

      // Manejar errores específicos
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        throw new Error(
          "TIMEOUT_ERROR: La solicitud a la API de PageSpeed Insights ha excedido el tiempo de espera. Por favor, inténtalo de nuevo más tarde.",
        )
      }

      throw fetchError
    }
  } catch (error: unknown) {
    console.error("Error al analizar el sitio:", error)

    // Determinar si es un error de tiempo de espera
    const isTimeoutError = error instanceof Error &&
      (error.message.includes("TIMEOUT_ERROR") ||
      error.message.includes("ERR_TIMED_OUT") ||
      error.message.includes("FAILED_DOCUMENT_REQUEST") ||
      error.message.includes("net::ERR_TIMED_OUT"))

    // Crear un mensaje de error más amigable para el usuario
    let errorMessage = error instanceof Error ? error.message : "Error desconocido"
    
    if (isTimeoutError) {
      errorMessage = "El sitio web está tardando demasiado en responder. Esto puede deberse a:\n" +
        "1. El sitio está temporalmente lento o sobrecargado\n" +
        "2. El sitio tiene problemas de rendimiento significativos\n" +
        "3. Hay problemas de conectividad\n\n" +
        "Por favor:\n" +
        "- Intenta nuevamente en unos minutos\n" +
        "- Verifica que el sitio esté funcionando correctamente\n" +
        "- Si el problema persiste, considera usar la herramienta directamente en PageSpeed Insights"
    }

    throw new Error(`Error al analizar el sitio: ${errorMessage}`, { cause: error })
  }
}

// Función para obtener recomendaciones de IA usando Gemini
async function getAIRecommendations(result: LighthouseResult): Promise<string | undefined> {
  try {
    // Verificar si tenemos la clave API para Gemini
    const geminiApiKey = process.env.GEMINI_API_KEY
    if (!geminiApiKey) {
      console.log("No se encontró clave API para Gemini, omitiendo análisis de IA")
      return undefined
    }

    // Importar dinámicamente la biblioteca de Google AI
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    
    // Inicializar el cliente de Gemini
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    
    // Configurar el modelo
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    })
    
    // Configuración de generación
    const generationConfig = {
      temperature: 0.2,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 800,
      responseMimeType: "text/plain",
    }
    
    // Preparar los datos para enviar a Gemini
    const prompt = preparePromptForGemini(result)
    
    // Crear una sesión de chat con un histórico predefinido
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: `Analiza los siguientes datos de la auditoría de Ligeriza. Proporciona dos resúmenes claros y accionables:
            1.  **Resumen de Rendimiento:** Indica las mejoras clave para que la página cargue más rápido y los beneficios (experiencia de usuario, etc.).
            2.  **Resumen de SEO:** Indica las mejoras clave para optimizar el sitio para motores de búsqueda. Hazlo atractivo, explicando cómo estas mejoras aumentarán la visibilidad, atraerán más tráfico orgánico y ayudarán a alcanzar los objetivos del sitio.

            Evita el preámbulo, empieza directamente con los resúmenes. Usa un tono claro y motivador. No menciones "PageSpeed", di que son recomendaciones de la auditoría automática de Ligeriza.`},
          ],
        },
        {
          role: "model",
          parts: [
            {text: `Aquí tienes el análisis de la auditoría automática de Ligeriza:

**Resumen de Mejoras de Rendimiento:**

Tu página web podría ser significativamente más rápida implementando estas optimizaciones:

*   **Optimización de Imágenes:** Comprime imágenes y usa formatos modernos (WebP/AVIF). Beneficio: Carga más rápida, menor consumo de datos.
*   **Eliminar Recursos No Utilizados:** Retira CSS y JavaScript innecesarios. Beneficio: Menor tamaño de página, procesamiento más veloz.
*   **Reducir Tareas Principales:** Optimiza el JavaScript para que bloquee menos tiempo el navegador. Beneficio: La página se siente interactiva antes.

Implementar estos cambios mejorará drásticamente la experiencia de tus visitantes.

**Resumen de Mejoras de SEO:**

¡Impulsa tu visibilidad en buscadores con estas acciones clave!

*   **Meta Descripciones:** Asegúrate de que cada página tenga una meta descripción única y atractiva. Beneficio: Mejora el ratio de clics (CTR) desde los resultados de búsqueda, atrayendo tráfico más cualificado.
*   **Texto Alternativo en Imágenes (Alt Text):** Añade descripciones relevantes a tus imágenes. Beneficio: Ayuda a Google a entender el contenido visual y mejora tu ranking en búsqueda de imágenes.
*   **Enlaces Descriptivos:** Usa texto ancla claro en tus enlaces internos y externos. Beneficio: Mejora la navegación para usuarios y bots de búsqueda, distribuyendo la autoridad de página.
*   **Contenido Indexable:** Verifica que todo tu contenido importante pueda ser rastreado e indexado por Google. Beneficio: Asegura que tus páginas aparezcan en los resultados de búsqueda relevantes.

Optimizar tu SEO es fundamental para que más personas descubran tu sitio web de forma orgánica.`},
          ],
        },
      ],
    })
    
    // Enviar mensaje con los datos específicos de la auditoría
    const result2 = await chatSession.sendMessage(`Datos de la auditoría:\n${prompt}`)
    
    // Extraer el texto de la respuesta
    return result2.response.text()
    
  } catch (error) {
    console.error("Error al procesar con IA:", error)
    return undefined
  }
}

// Función para preparar el prompt para Gemini
function preparePromptForGemini(result: LighthouseResult): string {
  // Crear una versión simplificada de los resultados para el prompt
  const performanceScore = result.performance
  const seoScore = result.seo

  // Filtrar issues por categoría
  const performanceIssues = result.issues.filter(issue => issue.category === 'performance')
  const seoIssues = result.issues.filter(issue => issue.category === 'seo')

  const performanceIssuesText = performanceIssues.map(issue =>
    `- ${issue.title} (Impacto: ${issue.impact}): ${issue.description}`
  ).join('\n')

  const seoIssuesText = seoIssues.map(issue =>
    `- ${issue.title} (Impacto: ${issue.impact}): ${issue.description}`
  ).join('\n')

  // Incluir métricas relevantes
  const metrics = result.metrics
  const metricsText = `
  Métricas clave de rendimiento:
  - First Contentful Paint: ${Math.round(metrics.firstContentfulPaint / 10) / 100} s
  - Largest Contentful Paint: ${Math.round(metrics.largestContentfulPaint / 10) / 100} s
  - Total Blocking Time: ${Math.round(metrics.totalBlockingTime)} ms
  - Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(2)}
  - Speed Index: ${Math.round(metrics.speedIndex / 10) / 100} s
  - Time to Interactive: ${Math.round(metrics.timeToInteractive / 10) / 100} s
  `

  // Construir el prompt completo
  return `
  Puntuación de rendimiento: ${performanceScore}/100
  Puntuación de SEO: ${seoScore}/100

  ${metricsText}

  Problemas principales de rendimiento encontrados:
  ${performanceIssuesText || 'Ninguno notable.'}

  Problemas principales de SEO encontrados:
  ${seoIssuesText || 'Ninguno notable.'}
  `
}

// Función auxiliar para determinar a qué categoría pertenece una auditoría
function getCategoryForAudit(auditId: string, categories: any): string {
  for (const [categoryId, category] of Object.entries<any>(categories)) {
    if (category.auditRefs && category.auditRefs.some((ref: any) => ref.id === auditId)) {
      return categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
    }
  }
  return "Performance" // Predeterminado a rendimiento si no se encuentra
}

// Función auxiliar para determinar el nivel de impacto basado en la puntuación
function getImpactLevel(score: number | undefined): "high" | "medium" | "low" {
  if (!score || score < 0.5) return "high"
  if (score < 0.8) return "medium"
  return "low"
}

