import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, ShoppingBag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styles from "./styles.module.css"

export default function PlanesPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Planes de Optimización</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Soluciones específicas para mejorar la velocidad de tu sitio WordPress o Shopify
        </p>
      </div>

      <Tabs defaultValue="wordpress" className={`w-full mb-12 ${styles.tabsContainer}`}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="wordpress" className="text-lg py-3 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              <span>WordPress</span>
            </TabsTrigger>
            <TabsTrigger value="shopify" className="text-lg py-3 flex items-center justify-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopify</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* WordPress Plans Section */}
        <TabsContent value="wordpress">
          <div
            className={`rounded-lg border border-primary/10 bg-primary/5 p-6 mb-8 ${styles.planSection} ${styles.wordpressSection}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Planes para WordPress</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Nuestros planes de optimización para WordPress están diseñados para mejorar significativamente el
              rendimiento de tu sitio, aumentar las conversiones y mejorar el posicionamiento en buscadores. Cada plan
              incluye optimizaciones específicas adaptadas a las necesidades de tu sitio WordPress.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Plan 1 */}
              <Card className="flex flex-col border-2 border-muted hover:border-primary/20 transition-colors">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Básico</CardTitle>
                  <div className="mt-1 text-3xl font-bold">MXN 1,199</div>
                  <CardDescription className="mt-2">
                    Mejora básica para sitios WordPress con problemas de velocidad
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Google PageSpeed: 50+ móvil, 70+ escritorio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Tiempo de carga: 2-6 segundos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>1 mes de soporte técnico</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Entrega en 4 días</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Incluye:</p>
                    <ul className="space-y-1">
                      <li className="text-sm text-muted-foreground">✓ Optimización de velocidad</li>
                      <li className="text-sm text-muted-foreground">✓ Almacenamiento en caché del navegador</li>
                      <li className="text-sm text-muted-foreground">✓ Redimensionar fotos</li>
                      <li className="text-sm text-muted-foreground">✓ Minificación</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contacto">Contratar</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Plan 2 */}
              <Card className="flex flex-col relative border-2 border-primary/20 shadow-md hover:shadow-lg transition-all">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Popular
                </div>
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Estándar</CardTitle>
                  <div className="mt-1 text-3xl font-bold">MXN 2,199</div>
                  <CardDescription className="mt-2">
                    Optimización avanzada para sitios WordPress con tráfico medio
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Google PageSpeed: 70+ móvil, 90+ escritorio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Tiempo de carga: 1-4 segundos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>3 meses de soporte técnico</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Entrega en 4 días</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Incluye:</p>
                    <ul className="space-y-1">
                      <li className="text-sm text-muted-foreground">✓ Optimización de velocidad</li>
                      <li className="text-sm text-muted-foreground">✓ Almacenamiento en caché del navegador</li>
                      <li className="text-sm text-muted-foreground">✓ Redimensionar fotos</li>
                      <li className="text-sm text-muted-foreground">✓ Minificación</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contacto">Contratar</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Plan 3 */}
              <Card className="flex flex-col border-2 border-muted hover:border-primary/20 transition-colors">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Premium</CardTitle>
                  <div className="mt-1 text-3xl font-bold">MXN 2,599</div>
                  <CardDescription className="mt-2">
                    Optimización profesional para sitios WordPress de alto tráfico
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Google PageSpeed: 80+ móvil, 90+ escritorio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Tiempo de carga: 0-2 segundos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>6 meses de soporte técnico</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Entrega en 4 días</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Incluye:</p>
                    <ul className="space-y-1">
                      <li className="text-sm text-muted-foreground">✓ Optimización de velocidad</li>
                      <li className="text-sm text-muted-foreground">✓ Almacenamiento en caché del navegador</li>
                      <li className="text-sm text-muted-foreground">✓ Redimensionar fotos</li>
                      <li className="text-sm text-muted-foreground">✓ Minificación</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contacto">Contratar</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Shopify Plans Section */}
        <TabsContent value="shopify">
          <div
            className={`rounded-lg border border-primary/10 bg-blue-50/50 dark:bg-blue-950/10 p-6 mb-8 ${styles.planSection} ${styles.shopifySection}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Planes para Shopify</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Nuestros planes de optimización para Shopify están diseñados específicamente para tiendas online,
              enfocados en mejorar la velocidad de carga, la experiencia de compra y las tasas de conversión. Cada plan
              incluye optimizaciones adaptadas a las particularidades de la plataforma Shopify.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Plan Básico */}
              <Card className="flex flex-col border-2 border-muted hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Básico</CardTitle>
                  <div className="mt-1 text-3xl font-bold">MXN 1,199</div>
                  <CardDescription className="mt-2">Mejora esencial para tiendas Shopify</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Google PageSpeed: 60+ móvil, 80+ escritorio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>GTmetrix: Grado B o superior</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>15 días de soporte técnico</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Entrega en 3 días</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Incluye:</p>
                    <ul className="space-y-1">
                      <li className="text-sm text-muted-foreground">✓ Optimización de velocidad</li>
                      <li className="text-sm text-muted-foreground">✓ Almacenamiento en caché del navegador</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contacto">Contratar</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Plan Estándar */}
              <Card className="flex flex-col border-2 border-muted hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Estándar</CardTitle>
                  <div className="mt-1 text-3xl font-bold">MXN 1,599</div>
                  <CardDescription className="mt-2">
                    Optimización avanzada para tiendas Shopify con tráfico medio
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Google PageSpeed: 70+ móvil, 90+ escritorio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>GTmetrix: Grado A o superior</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>1 mes de soporte técnico</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Entrega en 3 días</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Incluye:</p>
                    <ul className="space-y-1">
                      <li className="text-sm text-muted-foreground">✓ Optimización de velocidad</li>
                      <li className="text-sm text-muted-foreground">✓ Almacenamiento en caché del navegador</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contacto">Contratar</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Plan Premium */}
              <Card className="flex flex-col relative border-2 border-blue-200 dark:border-blue-800/50 shadow-md hover:shadow-lg transition-all">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Recomendado
                </div>
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Premium</CardTitle>
                  <div className="mt-1 text-3xl font-bold">MXN 2,399</div>
                  <CardDescription className="mt-2">
                    Optimización profesional para tiendas Shopify de alto tráfico
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Google PageSpeed: 80+ móvil, 90+ escritorio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>GTmetrix: Grado A o superior</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Tiempo de carga: 1-2 segundos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Soporte futuro gratuito</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Entrega en 5 días</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Incluye:</p>
                    <ul className="space-y-1">
                      <li className="text-sm text-muted-foreground">✓ Optimización de velocidad</li>
                      <li className="text-sm text-muted-foreground">✓ Almacenamiento en caché del navegador</li>
                      <li className="text-sm text-muted-foreground">✓ Redimensionar fotos</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contacto">Contratar</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-8 rounded-lg mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir nuestros planes de optimización?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Nuestros planes están diseñados específicamente para WordPress y Shopify, enfocados en resultados medibles y
            mejoras reales de rendimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">1</span>
            </div>
            <h3 className="font-bold mb-2">Resultados Garantizados</h3>
            <p className="text-muted-foreground">
              Garantizamos las puntuaciones de PageSpeed y tiempos de carga especificados en cada plan
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">2</span>
            </div>
            <h3 className="font-bold mb-2">Entrega Rápida</h3>
            <p className="text-muted-foreground">
              Implementamos las optimizaciones en 3-5 días, minimizando el impacto en tu negocio
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">3</span>
            </div>
            <h3 className="font-bold mb-2">Soporte Incluido</h3>
            <p className="text-muted-foreground">
              Todos nuestros planes incluyen soporte técnico para resolver cualquier problema posterior
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/contacto">Solicitar Consulta Personalizada</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

