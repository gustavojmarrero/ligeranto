import { type NextRequest, NextResponse } from "next/server"

// Esta es una ruta API de respaldo que proporciona análisis básico cuando la API principal falla
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "Se requiere el parámetro URL" }, { status: 400 })
  }

  try {
    // Verificación simple para comprobar si el sitio es accesible
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos de tiempo de espera

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SpeedOptimizeBot/1.0)",
      },
    })

    clearTimeout(timeoutId)

    // Análisis básico basado en la respuesta
    const startTime = Date.now()
    const html = await response.text()
    const loadTime = Date.now() - startTime

    // Análisis muy básico
    const hasLargeImages = html.includes("<img") && html.length > 100000
    const hasRenderBlockingJS = html.includes("<script") && !html.includes("defer") && !html.includes("async")
    const hasRenderBlockingCSS = html.includes('<link rel="stylesheet"') && html.length > 50000
    const hasFonts = html.includes("@font-face") || html.includes("fonts.googleapis.com")

    // Generar una captura de pantalla de marcador de posición
    // Esto es solo un marcador de posición, ya que no podemos generar una captura de pantalla real sin un navegador
    const placeholderScreenshot = generatePlaceholderScreenshot(url)

    // Calcular puntuaciones basadas en el análisis básico
    const performanceScore = calculatePerformanceScore(
      loadTime,
      hasRenderBlockingJS,
      hasRenderBlockingCSS,
      hasLargeImages,
    )
    const accessibilityScore = 70 // Valor predeterminado para accesibilidad
    const bestPracticesScore = 65 // Valor predeterminado para mejores prácticas
    const seoScore = calculateSeoScore(html) // Calcular puntuación SEO basada en el HTML

    // Generar un informe básico
    const result = {
      performance: performanceScore,
      accessibility: accessibilityScore,
      bestPractices: bestPracticesScore,
      seo: seoScore,
      metrics: {
        firstContentfulPaint: loadTime * 1.2,
        largestContentfulPaint: loadTime * 2,
        totalBlockingTime: hasRenderBlockingJS ? 300 : 100,
        cumulativeLayoutShift: 0.15,
        speedIndex: loadTime * 1.5,
        timeToInteractive: loadTime * 2.5,
      },
      issues: [
        {
          id: "response-time",
          category: "Rendimiento",
          title: "Mejorar el tiempo de respuesta del servidor",
          description:
            "El servidor respondió en " + loadTime + "ms. Apunte a menos de 200ms para un rendimiento óptimo.",
          impact: loadTime > 500 ? "high" : "medium",
        },
      ],
      screenshot: placeholderScreenshot,
      // Añadir datos simulados de experiencia de carga
      loadingExperience: generateSimulatedLoadingExperience(loadTime),
      timestamp: new Date().toISOString(),
    }

    // Añadir problemas comunes basados en el análisis HTML
    if (hasLargeImages) {
      result.issues.push({
        id: "optimize-images",
        category: "Rendimiento",
        title: "Optimizar imágenes",
        description:
          "Se detectaron imágenes grandes. Comprima y redimensione las imágenes para mejorar el tiempo de carga.",
        impact: "high",
      })
    }

    if (hasRenderBlockingJS) {
      result.issues.push({
        id: "fallback-render-blocking-resources",
        category: "Rendimiento",
        title: "Eliminar recursos que bloquean el renderizado",
        description:
          "Los archivos JavaScript están bloqueando la primera pintura de su página. Considere usar los atributos defer o async.",
        impact: "high",
      })
    }

    if (hasRenderBlockingCSS) {
      result.issues.push({
        id: "render-blocking-css",
        category: "Rendimiento",
        title: "Optimizar la entrega de CSS",
        description:
          "Los archivos CSS grandes pueden estar bloqueando el renderizado. Considere incluir CSS crítico en línea y diferir estilos no críticos.",
        impact: "medium",
      })
    }

    if (hasFonts) {
      result.issues.push({
        id: "font-display",
        category: "Rendimiento",
        title: "Asegurar que el texto permanezca visible durante la carga de fuentes",
        description:
          "Use font-display: swap para asegurar que el texto sea visible mientras se cargan las fuentes web.",
        impact: "medium",
      })
    }

    // Añadir problemas de SEO basados en el análisis HTML
    const seoIssues = analyzeSeoIssues(html)
    result.issues = [...result.issues, ...seoIssues]

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error en la API de auditoría de respaldo:", error)
    return NextResponse.json(
      {
        error: "Error al analizar el sitio web",
        message: error.message,
      },
      { status: 500 },
    )
  }
}

// Función para generar una captura de pantalla de marcador de posición en base64
function generatePlaceholderScreenshot(url: string): string {
  // Esta función genera una imagen SVG simple como marcador de posición
  // y la convierte a base64 para simular una captura de pantalla
  try {
    let domain = "ejemplo.com"
    try {
      domain = new URL(url).hostname
    } catch (e) {
      console.error("Error al analizar la URL:", e)
      // Usar un dominio predeterminado si no se puede analizar la URL
    }

    // Crear un SVG simple con el dominio
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#f0f0f0"/>
      <rect x="0" y="0" width="800" height="60" fill="#e0e0e0"/>
      <text x="20" y="40" font-family="Arial" font-size="18" fill="#333">${domain}</text>
      <rect x="50" y="100" width="700" height="60" rx="5" fill="#d0d0d0"/>
      <rect x="50" y="180" width="500" height="40" rx="5" fill="#d0d0d0"/>
      <rect x="50" y="240" width="600" height="40" rx="5" fill="#d0d0d0"/>
      <rect x="50" y="300" width="700" height="200" rx="5" fill="#d0d0d0"/>
      <text x="400" y="400" font-family="Arial" font-size="24" fill="#666" text-anchor="middle">Vista previa no disponible</text>
      <text x="400" y="430" font-family="Arial" font-size="16" fill="#666" text-anchor="middle">Usando análisis de respaldo</text>
    </svg>
    `

    // Convertir SVG a base64
    // Asegurarse de que el SVG esté codificado correctamente
    const svgBase64 = Buffer.from(svg).toString("base64")

    // Verificar que la cadena base64 sea válida
    try {
      Buffer.from(svgBase64, "base64").toString()
      return svgBase64
    } catch (e) {
      console.error("Error al verificar la cadena base64:", e)
      return ""
    }
  } catch (error) {
    console.error("Error al generar captura de pantalla de marcador de posición:", error)
    return ""
  }
}

// Función para calcular la puntuación de rendimiento basada en el tiempo de carga y otros factores
function calculatePerformanceScore(
  loadTime: number,
  hasRenderBlockingJS: boolean,
  hasRenderBlockingCSS: boolean,
  hasLargeImages: boolean,
): number {
  let score = 100

  // Penalizar por tiempo de carga
  if (loadTime > 1000) {
    score -= Math.min(50, Math.floor(loadTime / 100))
  }

  // Penalizar por recursos que bloquean el renderizado
  if (hasRenderBlockingJS) {
    score -= 15
  }

  if (hasRenderBlockingCSS) {
    score -= 10
  }

  // Penalizar por imágenes grandes
  if (hasLargeImages) {
    score -= 15
  }

  // Asegurar que la puntuación esté entre 0 y 100
  return Math.max(0, Math.min(100, score))
}

// Función para calcular la puntuación SEO basada en el HTML
function calculateSeoScore(html: string): number {
  let score = 75 // Puntuación base

  // Verificar si tiene título
  if (html.includes("<title>") && html.includes("</title>")) {
    score += 5
  } else {
    score -= 10
  }

  // Verificar si tiene meta description
  if (html.includes('name="description"') || html.includes('name="Description"')) {
    score += 5
  } else {
    score -= 5
  }

  // Verificar si tiene encabezados H1
  if (html.includes("<h1") && html.includes("</h1>")) {
    score += 5
  } else {
    score -= 5
  }

  // Verificar si tiene atributos alt en imágenes
  const imgTags = html.match(/<img[^>]*>/g) || []
  const imgWithAlt = imgTags.filter((tag) => tag.includes("alt=")).length
  if (imgTags.length > 0 && imgWithAlt / imgTags.length > 0.7) {
    score += 5
  } else if (imgTags.length > 0) {
    score -= 5
  }

  // Verificar si tiene enlaces internos
  if (html.includes('href="') && !html.includes('href="http')) {
    score += 5
  }

  // Asegurar que la puntuación esté entre 0 y 100
  return Math.max(0, Math.min(100, score))
}

// Función para analizar problemas de SEO basados en el HTML
function analyzeSeoIssues(html: string): any[] {
  const issues = []

  // Verificar si falta el título
  if (!html.includes("<title>") || !html.includes("</title>")) {
    issues.push({
      id: "missing-title",
      category: "SEO",
      title: "Falta el título de la página",
      description: "Cada página debe tener un título único y descriptivo para mejorar el SEO.",
      impact: "high",
    })
  }

  // Verificar si falta la meta description
  if (!html.includes('name="description"') && !html.includes('name="Description"')) {
    issues.push({
      id: "missing-meta-description",
      category: "SEO",
      title: "Falta la meta descripción",
      description: "Añade una meta descripción para mejorar la visibilidad en los resultados de búsqueda.",
      impact: "medium",
    })
  }

  // Verificar si falta el encabezado H1
  if (!html.includes("<h1") || !html.includes("</h1>")) {
    issues.push({
      id: "missing-h1",
      category: "SEO",
      title: "Falta el encabezado H1",
      description: "Cada página debe tener un encabezado H1 que describa el contenido principal.",
      impact: "medium",
    })
  }

  // Verificar si faltan atributos alt en imágenes
  const imgTags = html.match(/<img[^>]*>/g) || []
  const imgWithoutAlt = imgTags.filter((tag) => !tag.includes("alt=")).length
  if (imgTags.length > 0 && imgWithoutAlt > 0) {
    issues.push({
      id: "images-missing-alt",
      category: "SEO",
      title: "Imágenes sin atributo alt",
      description: `${imgWithoutAlt} de ${imgTags.length} imágenes no tienen atributo alt. Añade descripciones alt para mejorar la accesibilidad y el SEO.`,
      impact: imgWithoutAlt / imgTags.length > 0.5 ? "high" : "medium",
    })
  }

  return issues
}

// Función para generar datos simulados de experiencia de carga
function generateSimulatedLoadingExperience(loadTime: number) {
  // Determinar categorías basadas en el tiempo de carga
  const lcpCategory = loadTime < 1500 ? "RÁPIDO" : loadTime < 3000 ? "PROMEDIO" : "LENTO"
  const fidCategory = loadTime < 1000 ? "RÁPIDO" : loadTime < 2500 ? "PROMEDIO" : "LENTO"
  const clsCategory = "PROMEDIO" // Valor predeterminado para CLS

  return {
    overall_category: lcpCategory,
    metrics: {
      LARGEST_CONTENTFUL_PAINT_MS: {
        category: lcpCategory,
        percentile: loadTime * 2,
      },
      FIRST_INPUT_DELAY_MS: {
        category: fidCategory,
        percentile: loadTime < 1000 ? 50 : loadTime < 2500 ? 100 : 200,
      },
      CUMULATIVE_LAYOUT_SHIFT_SCORE: {
        category: clsCategory,
        percentile: 0.15,
      },
    },
  }
}

