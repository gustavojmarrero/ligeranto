import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Image, Server, Database, Code, Shield } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Nuestros Servicios de Optimización de Velocidad</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Ofrecemos soluciones completas para hacer que tu sitio web sea ultrarrápido, mejorando la experiencia del
          usuario, las tasas de conversión y el posicionamiento en buscadores.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card id="core-web-vitals" className="flex flex-col scroll-mt-20">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Optimización de Core Web Vitals</CardTitle>
            <CardDescription>
              Mejora de métricas críticas que impactan la experiencia del usuario y el posicionamiento SEO
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización de Largest Contentful Paint (LCP)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Mejoras de First Input Delay (FID) e Interaction to Next Paint (INP)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Reducción de Cumulative Layout Shift (CLS)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización de Time to First Byte (TTFB)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/contacto">Comenzar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card id="asset-optimization" className="flex flex-col scroll-mt-20">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Optimización de Imágenes y Recursos</CardTitle>
            <CardDescription>
              Compresión y optimización de todos los recursos para tiempos de carga más rápidos
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Compresión de imágenes y optimización de formatos (WebP, AVIF)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Minificación y agrupación de CSS y JavaScript</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Implementación de carga diferida para imágenes y videos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización y mejoras en la entrega de fuentes</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/contacto">Comenzar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card id="server-optimization" className="flex flex-col scroll-mt-20">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Optimización de Servidor e Infraestructura</CardTitle>
            <CardDescription>
              Optimización de tiempos de respuesta del servidor y entrega global de contenido
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización del tiempo de respuesta del servidor</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Implementación de Red de Distribución de Contenido (CDN)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Configuración de caché de navegador y servidor</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Configuración de compresión GZIP/Brotli</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/contacto">Comenzar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card id="database-optimization" className="flex flex-col scroll-mt-20">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Optimización de Base de Datos</CardTitle>
            <CardDescription>
              Mejora del rendimiento de la base de datos para una recuperación de datos más rápida
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización de consultas de base de datos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Mejoras en la estrategia de indexación</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Implementación de caché de base de datos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Agrupación de conexiones y optimización</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/contacto">Comenzar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card id="code-optimization" className="flex flex-col scroll-mt-20">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Optimización de Código Frontend</CardTitle>
            <CardDescription>Optimización de tu código para máximo rendimiento</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización de rendimiento de JavaScript</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Extracción de ruta CSS crítica</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>División de código y tree shaking</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Optimización de scripts de terceros</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/contacto">Comenzar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card id="security-optimization" className="flex flex-col scroll-mt-20">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Seguridad y Rendimiento</CardTitle>
            <CardDescription>Mejora de la seguridad sin sacrificar la velocidad</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Implementación y optimización de HTTPS</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Configuración de cabeceras de seguridad</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Protección DDoS con mínimo impacto en el rendimiento</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Flujos de autenticación seguros y optimizados</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/contacto">Comenzar</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Nuestro Proceso</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Seguimos un enfoque sistemático para optimizar tu sitio web para máximo rendimiento
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">1</span>
            </div>
            <h3 className="font-bold mb-2">Auditoría y Análisis</h3>
            <p className="text-muted-foreground">
              Auditoría completa de rendimiento para identificar todos los problemas
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">2</span>
            </div>
            <h3 className="font-bold mb-2">Desarrollo de Estrategia</h3>
            <p className="text-muted-foreground">
              Plan de optimización personalizado basado en los hallazgos de la auditoría
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">3</span>
            </div>
            <h3 className="font-bold mb-2">Implementación</h3>
            <p className="text-muted-foreground">Ejecución experta de todas las estrategias de optimización</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">4</span>
            </div>
            <h3 className="font-bold mb-2">Pruebas y Monitoreo</h3>
            <p className="text-muted-foreground">Pruebas continuas de rendimiento y mejora continua</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/contacto">Programar una Consulta Gratuita</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

