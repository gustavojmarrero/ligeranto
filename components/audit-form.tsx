"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuditForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica de URL
    if (!url) {
      setError("Por favor, introduce una URL de sitio web")
      return
    }

    try {
      // Añadir http:// si falta
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

      // Comprobar problemas comunes de URL
      if (formattedUrl.includes("localhost") || formattedUrl.includes("127.0.0.1")) {
        throw new Error("No se pueden analizar URLs de localhost")
      }

      setIsLoading(true)

      // Redirigir a la página de resultados con la URL como parámetro
      router.push(`/auditoria-web?url=${encodeURIComponent(formattedUrl)}`)
    } catch (err: any) {
      setError(err.message || "Por favor, introduce una URL de sitio web válida")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Introduce la URL de tu sitio web (ej. ejemplo.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          aria-label="URL del sitio web"
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analizando...
            </>
          ) : (
            "Analizar Ahora"
          )}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}

