import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Award, Users, BarChart, HeartHandshake, MessageSquareText } from "lucide-react"
import { Logo } from "@/components/logo"

export default function NosotrosPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Sobre Nosotros</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Conoce al equipo detrás de Ligeranto y nuestra pasión por la velocidad web
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Quiénes Somos</h2>
          <p className="text-lg text-muted-foreground mb-6">
            En <span className="font-semibold text-foreground">Ligeranto</span>, somos un equipo especializado en
            optimizar la velocidad de carga de sitios web en WordPress y Shopify. Sabemos lo crucial que es para tu
            negocio tener un sitio rápido y eficiente, no solo para mejorar la experiencia de usuario, sino también para
            aumentar tus conversiones y mejorar tu posicionamiento en buscadores.
          </p>
          <p className="text-lg text-muted-foreground">
            Nuestro equipo está compuesto por expertos en desarrollo web, especialistas en optimización SEO y
            profesionales en experiencia de usuario (UX). Juntos trabajamos utilizando las últimas tecnologías y las
            mejores prácticas del sector para garantizar resultados sobresalientes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <Zap className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Desarrollo Web</h3>
            <p className="text-sm text-muted-foreground">Expertos en optimización de código y rendimiento</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <BarChart className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">SEO Técnico</h3>
            <p className="text-sm text-muted-foreground">Especialistas en posicionamiento y Core Web Vitals</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">UX/UI</h3>
            <p className="text-sm text-muted-foreground">Profesionales en experiencia de usuario</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <HeartHandshake className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Soporte</h3>
            <p className="text-sm text-muted-foreground">Atención personalizada y continua</p>
          </div>
        </div>
      </div>

      <Card className="bg-muted/50 border-none mb-16">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Nuestra misión es simple: hacer que tu sitio web sea increíblemente rápido y eficiente, asegurando que
              cada visitante tenga la mejor experiencia posible, lo que se traduce en clientes más satisfechos y mayores
              ingresos para tu negocio.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 bg-background">
            <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Experiencia Comprobada</h3>
            <p className="text-muted-foreground">
              Hemos optimizado exitosamente cientos de sitios web en múltiples sectores.
            </p>
          </div>
          <div className="border rounded-lg p-6 bg-background">
            <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Resultados Medibles</h3>
            <p className="text-muted-foreground">
              Te proporcionamos informes detallados antes y después de la optimización.
            </p>
          </div>
          <div className="border rounded-lg p-6 bg-background">
            <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Soporte Personalizado</h3>
            <p className="text-muted-foreground">
              Cada proyecto es único y recibe atención especializada y adaptada a tus necesidades específicas.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <p className="text-xl mb-6">
          En <span className="font-semibold">Ligeranto</span> no solo mejoramos la velocidad de tu sitio, mejoramos la
          rentabilidad de tu negocio online.
        </p>
      </div>

      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¡Hablemos y llevemos tu sitio web al siguiente nivel!</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Estamos listos para ayudarte a mejorar el rendimiento de tu sitio web y aumentar tus conversiones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">
              <MessageSquareText className="mr-2 h-5 w-5" />
              Contactar Ahora
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auditoria-web">Auditoría Gratuita</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

