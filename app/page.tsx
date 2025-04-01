import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Clock, Award } from "lucide-react"
import AuditForm from "@/components/audit-form"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Optimización de Velocidad Web con IA
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Mejora el Rendimiento y las Tasas de Conversión de tu Sitio Web
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                  Los sitios web lentos pierden clientes. Nuestra tecnología de inteligencia artificial analiza y optimiza tu sitio para ofrecer
                  experiencias ultrarrápidas que convierten mejor y posicionan más alto.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="#audit-tool">
                      Auditoría Gratuita <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/servicios">Nuestros Servicios</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Logo variant="icon" size="lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[85vw] sm:max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl">
                  Por Qué la Velocidad Importa
                </h2>
                <p className="max-w-[700px] text-muted-foreground text-base md:text-xl">
                  La velocidad del sitio web impacta directamente en la experiencia del usuario, las tasas de conversión
                  y el posicionamiento en buscadores.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <div className="p-3 rounded-full bg-primary/10">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Mayores Conversiones</h3>
                <p className="text-muted-foreground text-center">
                  Cada segundo de retraso reduce las conversiones hasta un 7%. Los sitios más rápidos venden más.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <div className="p-3 rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Mejor Posicionamiento SEO</h3>
                <p className="text-muted-foreground text-center">
                  Google utiliza la velocidad de página como factor de clasificación. Los sitios más rápidos se
                  posicionan mejor.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Mejor Experiencia de Usuario</h3>
                <p className="text-muted-foreground text-center">
                  Los usuarios esperan que los sitios carguen en 2 segundos o menos. Cumple con sus expectativas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[85vw] sm:max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl">
                  Nuestros Servicios de Optimización
                </h2>
                <p className="max-w-[700px] text-muted-foreground text-base md:text-xl">
                  Ofrecemos soluciones completas potenciadas por IA para hacer que tu sitio web sea ultrarrápido.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
              <div className="flex flex-col space-y-2 border rounded-lg p-6 bg-background">
                <h3 className="text-xl font-bold">Optimización de Core Web Vitals</h3>
                <p className="text-muted-foreground flex-1">
                  Mejora de LCP, FID, CLS y otras métricas críticas utilizando análisis avanzado de IA que impactan la experiencia del usuario y el SEO.
                </p>
                <Button variant="outline" asChild className="mt-4 w-full sm:w-auto">
                  <Link href="/servicios#core-web-vitals">Saber Más</Link>
                </Button>
              </div>
              <div className="flex flex-col space-y-2 border rounded-lg p-6 bg-background">
                <h3 className="text-xl font-bold">Optimización de Imágenes y Recursos</h3>
                <p className="text-muted-foreground flex-1">
                  Compresión y optimización de imágenes, CSS, JavaScript y otros recursos para una carga más rápida.
                </p>
                <Button variant="outline" asChild className="mt-4 w-full sm:w-auto">
                  <Link href="/servicios#asset-optimization">Saber Más</Link>
                </Button>
              </div>
              <div className="flex flex-col space-y-2 border rounded-lg p-6 bg-background">
                <h3 className="text-xl font-bold">Optimización de Servidor e Infraestructura</h3>
                <p className="text-muted-foreground flex-1">
                  Optimización de tiempos de respuesta del servidor, implementación de caché y uso de CDNs para
                  rendimiento global.
                </p>
                <Button variant="outline" asChild className="mt-4 w-full sm:w-auto">
                  <Link href="/servicios#server-optimization">Saber Más</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center mt-12 gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/servicios">Ver Todos los Servicios</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/planes">Ver Planes Específicos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
