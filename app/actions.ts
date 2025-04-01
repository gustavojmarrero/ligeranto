"use server"

import { analyzeSite, type LighthouseResult } from "@/lib/lighthouse"

export async function runAudit(url: string): Promise<LighthouseResult> {
  try {
    // Validar URL
    let formattedUrl = url
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = "https://" + url
    }

    // Validar formato de URL
    try {
      new URL(formattedUrl)
    } catch (e) {
      throw new Error("Formato de URL inválido")
    }

    console.log(`Ejecutando auditoría para: ${formattedUrl} en idioma: español`)

    // Ejecutar la auditoría real
    const result = await analyzeSite(formattedUrl)

    // Verificar que los resultados estén en español
    if (result.rawData && result.rawData.lighthouseResult && result.rawData.lighthouseResult.configSettings) {
      const locale = result.rawData.lighthouseResult.configSettings.locale || "unknown"
      console.log(`Idioma de los resultados: ${locale}`)
    }

    return result
  } catch (error) {
    console.error("Error al ejecutar la auditoría:", error)
    throw new Error(`Error al analizar el sitio web: ${error.message}`)
  }
}

