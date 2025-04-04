"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, ExternalLink, AlertCircle, ImageIcon, Clock, Info, RefreshCw } from "lucide-react"
import { runAudit } from "@/app/actions"
import type { LighthouseResult } from "@/lib/lighthouse"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AuditForm from "@/components/audit-form"

export default function AuditResults() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<LighthouseResult | null>(null)
  const [fallbackUsed, setFallbackUsed] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    async function performAudit() {
      if (!url) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        setFallbackUsed(false)
        setApiError(null)
        setIsRetrying(false)

        // Ejecutar la auditoría principal
        try {
          const auditResults = await runAudit(url)
          setResults(auditResults)
          console.log("Resultados de auditoría:", auditResults)

          // Verificar si se obtuvo la captura de pantalla
          if (!auditResults.screenshot) {
            console.log("No se obtuvo captura de pantalla de la API principal, intentando con la API de respaldo")
            // Si no hay captura de pantalla, intentar obtenerla de la API de respaldo
            try {
              const fallbackResponse = await fetch(`/api/fallback-audit?url=${encodeURIComponent(url)}`)
              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json()
                if (fallbackData.screenshot) {
                  // Actualizar solo la captura de pantalla manteniendo el resto de los resultados
                  setResults({
                    ...auditResults,
                    screenshot: fallbackData.screenshot,
                  })
                  console.log("Captura de pantalla obtenida de la API de respaldo")
                }
              }
            } catch (fallbackError) {
              console.error("Error al obtener captura de pantalla de respaldo:", fallbackError)
            }
          }
        } catch (mainError: unknown) {
          console.error("Error en la auditoría principal:", mainError)

          // Verificar si es un error de tiempo de espera
          const isTimeoutError =
            mainError instanceof Error &&
            (mainError.message.includes("TIMEOUT_ERROR") ||
              mainError.message.includes("ERR_TIMED_OUT") ||
              mainError.message.includes("FAILED_DOCUMENT_REQUEST"))

          // Guardar el mensaje de error para mostrarlo al usuario
          setApiError(
            isTimeoutError
              ? "El sitio web tardó demasiado en responder. Esto puede deberse a que el sitio es muy grande, está sobrecargado o no está disponible en este momento."
              : mainError instanceof Error
              ? `Error en la API principal: ${mainError.message}`
              : "Error desconocido en la API principal",
          )

          // Si la auditoría principal falla, intentar con la API de respaldo
          try {
            console.log("Intentando con la API de respaldo")
            const fallbackResponse = await fetch(`/api/fallback-audit?url=${encodeURIComponent(url)}`)
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json()
              setResults(fallbackData)
              setFallbackUsed(true)
              console.log("Usando resultados de la API de respaldo")
            } else {
              throw new Error("La API de respaldo también falló")
            }
          } catch (fallbackError: unknown) {
            console.error("Error en la API de respaldo:", fallbackError)
            // Si el error de respaldo es un Error, lanzar el error original, si no, lanzar un nuevo error genérico
            if (mainError instanceof Error) {
              throw mainError // Lanzar el error original si el respaldo también falla
            } else {
              throw new Error("Error en la auditoría principal y de respaldo.")
            }
          }
        }
      } catch (err: unknown) {
        console.error("Error de auditoría:", err)

        // Determinar si es un error de tiempo de espera
        const isTimeoutError =
          err instanceof Error &&
          (err.message.includes("TIMEOUT_ERROR") ||
            err.message.includes("ERR_TIMED_OUT") ||
            err.message.includes("FAILED_DOCUMENT_REQUEST"))

        // Crear un mensaje de error más amigable para el usuario
        let errorMessage = err instanceof Error ? err.message : "Ha ocurrido un error inesperado."
        if (isTimeoutError) {
          errorMessage =
            "El sitio web tardó demasiado en responder. Por favor, verifica que la URL sea correcta y que el sitio esté en línea."
        }

        setError(errorMessage)
      } finally {
        setLoading(false)
        setIsRetrying(false)
      }
    }

    performAudit()
  }, [url, retryCount])

  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getImpactBadge = (impact: "high" | "medium" | "low") => {
    const colors: { [key in typeof impact]: string } = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }

    const impactText: { [key in typeof impact]: string } = {
      high: "alto",
      medium: "medio",
      low: "bajo",
    }

    return <span className={`text-xs px-2 py-1 rounded-full ${colors[impact]}`}>{impactText[impact]}</span>
  }

  // Formatear la fecha de análisis
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Fecha no disponible"

    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }).format(date)
    } catch (e) {
      console.error("Error al formatear la fecha:", e)
      return "Fecha no disponible"
    }
  }

  // Función para reintentar la auditoría
  const handleRetry = () => {
    setIsRetrying(true)
    setRetryCount((prev) => prev + 1)
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-5xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Resultados del Análisis con IA</h1>
      </div>

      {url && (
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center p-4 bg-muted rounded-lg">
            <h2 className="text-lg font-medium mr-2">URL analizada:</h2>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center">
              {url}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Este análisis utiliza inteligencia artificial avanzada para evaluar y proporcionar recomendaciones precisas sobre el rendimiento, accesibilidad y SEO de tu sitio web.
            </p>
          </div>
        </div>
      )}

      {loading || isRetrying ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">
            {isRetrying ? "Reintentando análisis..." : "Analizando el rendimiento del sitio web..."}
          </p>
          <p className="text-muted-foreground">Esto puede tardar hasta un minuto</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Análisis Fallido</h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Esto podría deberse a:
              <ul className="list-disc pl-5 mt-2 text-left">
                <li>El sitio web bloquea herramientas de análisis externas</li>
                <li>El sitio web tarda demasiado en responder o está caído</li>
                <li>La URL proporcionada no es correcta o no es accesible</li>
                <li>Se han excedido los límites de la API</li>
                <li>Problemas de conectividad de red</li>
              </ul>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar Análisis
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Probar con otra URL</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : results ? (
        <>
          {fallbackUsed && (
            <Alert variant="destructive" className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertTitle className="text-yellow-900">Análisis de respaldo</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Se está utilizando un análisis de respaldo debido a problemas con la API principal. Los resultados
                pueden ser menos precisos que un análisis completo.
                {apiError && (
                  <p className="mt-2">
                    <strong>Detalles:</strong> {apiError}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Información de análisis */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-col">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-blue-800">
                <strong>Análisis realizado:</strong> {formatDate(results.timestamp)}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <Info className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-blue-800">
                <strong>Idioma del análisis:</strong> Español
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  Rendimiento
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Mide cómo de rápido se carga y responde tu sitio web</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.performance)}`}>{results.performance}</div>
                <Progress value={results.performance} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  Accesibilidad
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Evalúa si tu sitio es accesible para todos los usuarios</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.accessibility)}`}>
                  {results.accessibility}
                </div>
                <Progress value={results.accessibility} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  Mejores Prácticas
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Verifica si tu sitio sigue las mejores prácticas de desarrollo web</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.bestPractices)}`}>
                  {results.bestPractices}
                </div>
                <Progress value={results.bestPractices} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  SEO
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Evalúa si tu sitio está optimizado para motores de búsqueda</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.seo)}`}>{results.seo}</div>
                <Progress value={results.seo} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Experiencia de carga real (CrUX) */}
          {results.loadingExperience && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Experiencia de Carga Real</CardTitle>
                <CardDescription>
                  Datos reales de usuarios que han visitado este sitio (Chrome UX Report)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.loadingExperience.metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Mayor Pintura con Contenido (LCP)</span>
                            <span className="font-medium">
                              {(
                                results.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000
                              ).toFixed(2)}
                              s
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                results.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category === "FAST"
                                  ? "bg-green-100 text-green-800"
                                  : results.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category === "AVERAGE"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category === "FAST"
                                ? "Rápido"
                                : results.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category === "AVERAGE"
                                  ? "Promedio"
                                  : "Lento"}
                            </span>
                          </div>
                        </div>
                      )}

                      {results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Retraso de Primera Entrada (FID)</span>
                            <span className="font-medium">
                              {results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile}ms
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category === "FAST"
                                  ? "bg-green-100 text-green-800"
                                  : results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category === "AVERAGE"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category === "FAST"
                                ? "Rápido"
                                : results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category === "AVERAGE"
                                  ? "Promedio"
                                  : "Lento"}
                            </span>
                          </div>
                        </div>
                      )}

                      {results.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Cambio Acumulativo de Diseño (CLS)</span>
                            <span className="font-medium">
                              {results.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile.toFixed(3)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                results.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category === "FAST"
                                  ? "bg-green-100 text-green-800"
                                  : results.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category ===
                                      "AVERAGE"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category === "FAST"
                                ? "Bueno"
                                : results.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category === "AVERAGE"
                                  ? "Necesita Mejoras"
                                  : "Pobre"}
                            </span>
                          </div>
                        </div>
                      )}

                      {results.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Interacción a Siguiente Pintura (INP)</span>
                            <span className="font-medium">
                              {results.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.percentile}ms
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                results.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category === "FAST"
                                  ? "bg-green-100 text-green-800"
                                  : results.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category === "AVERAGE"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {results.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category === "FAST"
                                ? "Rápido"
                                : results.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category === "AVERAGE"
                                  ? "Promedio"
                                  : "Lento"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sección de captura de pantalla */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Captura de Pantalla</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {results.screenshot ? (
                <div className="max-w-md">
                  {/* Intentar primero como JPEG (formato común de PageSpeed Insights) */}
                  <img
                    src={`data:image/jpeg;base64,${results.screenshot}`}
                    alt="Captura de pantalla del sitio web"
                    className="rounded-md shadow-md"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      // Asegurar que trabajamos con un HTMLImageElement
                      const imgElement = e.currentTarget;
                      
                      // Si falla como JPEG, intentar como PNG
                      imgElement.onerror = () => { // Manejador para el fallo de PNG
                        // Si también falla como PNG, intentar como SVG
                        imgElement.onerror = () => { // Manejador para el fallo de SVG
                           // Si todos los formatos fallan, mostrar un mensaje de error
                          const parent = imgElement.parentElement;
                          if (parent) {
                            // Limpiar el contenedor
                            parent.innerHTML = "";

                            // Crear y añadir el elemento de error
                            const errorDiv = document.createElement("div");
                            errorDiv.className = "flex flex-col items-center justify-center p-8 bg-gray-100 rounded-md";
                            errorDiv.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-gray-400">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M12 8v8"></path>
                                <path d="M8 12h8"></path>
                              </svg>
                              <p class="mt-4 text-gray-500">No se pudo cargar la captura de pantalla</p>
                            `;
                            parent.appendChild(errorDiv);
                          }
                        };
                        imgElement.src = `data:image/svg+xml;base64,${results.screenshot}`;
                      };
                      imgElement.src = `data:image/png;base64,${results.screenshot}`;
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-md">
                  <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500">No hay captura de pantalla disponible para este sitio</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Métricas de Rendimiento</CardTitle>
              <CardDescription>Core Web Vitals y otras métricas clave de rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.metrics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Primera Carga Visual del Contenido</span>
                        <span className="font-medium">{(results.metrics.firstContentfulPaint / 1000).toFixed(2)}s</span>
                      </div>
                      <Progress
                        value={Math.min(100, 100 - results.metrics.firstContentfulPaint / 30)}
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Mayor Elemento Visual Cargado</span>
                        <span className="font-medium">
                          {(results.metrics.largestContentfulPaint / 1000).toFixed(2)}s
                        </span>
                      </div>
                      <Progress
                        value={Math.min(100, 100 - results.metrics.largestContentfulPaint / 40)}
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Tiempo Total de Bloqueo</span>
                        <span className="font-medium">{results.metrics.totalBlockingTime.toFixed(0)}ms</span>
                      </div>
                      <Progress value={Math.min(100, 100 - results.metrics.totalBlockingTime / 5)} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Índice de Estabilidad Visual</span>
                        <span className="font-medium">{results.metrics.cumulativeLayoutShift.toFixed(3)}</span>
                      </div>
                      <Progress
                        value={Math.min(100, 100 - results.metrics.cumulativeLayoutShift * 100)}
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Índice de Velocidad</span>
                        <span className="font-medium">{(results.metrics.speedIndex / 1000).toFixed(2)}s</span>
                      </div>
                      <Progress value={Math.min(100, 100 - results.metrics.speedIndex / 40)} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Tiempo hasta Interactividad</span>
                        <span className="font-medium">{(results.metrics.timeToInteractive / 1000).toFixed(2)}s</span>
                      </div>
                      <Progress value={Math.min(100, 100 - results.metrics.timeToInteractive / 40)} className="h-1" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Problemas Detectados</CardTitle>
              <CardDescription>
                Nuestra IA ha identificado {results.issues.length} problemas que están afectando el rendimiento de tu sitio web. Cada problema ha sido analizado y priorizado según su impacto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.issues.map((issue) => (
                  <div key={issue.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{issue.title}</h3>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">{issue.category}</span>
                        {getImpactBadge(issue.impact)}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{issue.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Próximos Pasos Recomendados por IA</h2>
            <p className="mb-6">
              Basándonos en el análisis de inteligencia artificial, nuestro equipo de expertos puede ayudarte a implementar soluciones optimizadas para mejorar significativamente el rendimiento de tu sitio web, aumentar las tasas de conversión y mejorar tu posicionamiento en buscadores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/servicios">Ver Nuestros Servicios</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contacto">Contactar</Link>
              </Button>
              <Button variant="secondary" onClick={handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Volver a Analizar
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">Auditoría Gratuita de Velocidad Web con IA</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mb-8">
              Obtén un análisis completo impulsado por inteligencia artificial del rendimiento de tu sitio web y recomendaciones personalizadas y accionables.
            </p>
          </div>
          <div className="w-full max-w-md">
            <AuditForm />
          </div>
        </div>
      )}
    </div>
  )
}

