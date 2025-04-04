import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, Calendar, ArrowRight } from "lucide-react"

export default function BlogPage() {
  // Datos de ejemplo para los posts del blog
  const blogPosts = [
    {
      id: "velocidad-carga-afecta-ventas",
      title: "Velocidad de carga: Impacto en ventas de Shopify y WordPress",
      excerpt:
        "Descubre cómo cada segundo de retraso en la carga de tu sitio puede reducir tus conversiones y cómo optimizar tu tienda online para maximizar ventas.",
      date: "15 de marzo de 2025",
      readTime: "8 min de lectura",
      image: "/images/velocidad.webp",
      category: "Optimización Web",
    },
    {
      id: "core-web-vitals-guia",
      title: "Guía Completa de Core Web Vitals para Principiantes",
      excerpt: "Todo lo que necesitas saber sobre las métricas de Core Web Vitals y cómo mejorarlas en tu sitio web.",
      date: "28 de febrero de 2025",
      readTime: "10 min de lectura",
      image: "/images/core_web.webp",
      category: "SEO Técnico",
    },
    {
      id: "optimizacion-imagenes",
      title: "Técnicas Avanzadas de Optimización de Imágenes para Web",
      excerpt:
        "Aprende a optimizar tus imágenes sin perder calidad y mejora drásticamente el tiempo de carga de tu sitio.",
      date: "10 de febrero de 2025",
      readTime: "9 min de lectura",
      image: "/images/imagenes.webp",
      category: "Rendimiento Web",
    },
  ]

  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog de Ligeranto</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Recursos, consejos y mejores prácticas para optimizar la velocidad de tu sitio web
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <div className="relative">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                {post.category}
              </div>
            </div>
            <CardContent className="flex-1 pt-6">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{post.date}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 line-clamp-2">
                <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" asChild className="ml-auto">
                <Link href={`/blog/${post.id}`}>
                  Leer más <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          Cargar más artículos
        </Button>
      </div>
    </div>
  )
}

