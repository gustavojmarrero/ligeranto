import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/mobile-nav"
import { LogoLink } from "@/components/logo"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ligeranto - Servicios de Optimización de Velocidad Web",
  description:
    "Servicios profesionales de optimización de velocidad web para mejorar el rendimiento, la experiencia de usuario y el posicionamiento en buscadores.",
  metadataBase: new URL("https://ligeranto.com"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://ligeranto.com",
    siteName: "Ligeranto",
    title: "Ligeranto - Servicios de Optimización de Velocidad Web",
    description: "Servicios profesionales de optimización de velocidad web para mejorar el rendimiento, la experiencia de usuario y el posicionamiento en buscadores.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ligeranto - Optimización de Velocidad Web"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@Ligeranto",
    creator: "@Ligeranto",
    title: "Ligeranto - Servicios de Optimización de Velocidad Web",
    description: "Servicios profesionales de optimización de velocidad web para mejorar el rendimiento, la experiencia de usuario y el posicionamiento en buscadores.",
    images: ["/og-image.jpg"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/logo-icon.svg", type: "image/svg+xml" },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://ligeranto.com"
  },
  verification: {
    google: "tu-codigo-de-verificacion"
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#007ACC",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/logo-icon.svg" as="image" type="image/svg+xml" />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ligeranto",
              url: "https://ligeranto.com",
              logo: "https://ligeranto.com/logo.svg",
              description: "Servicios profesionales de optimización de velocidad web para mejorar el rendimiento, la experiencia de usuario y el posicionamiento en buscadores.",
              sameAs: [
                "https://wa.me/529981657293",
                "https://x.com/ligeranto",
                "https://linkedin.com/company/ligeranto"
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES",
                addressLocality: "México"
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "ligeranto@gmail.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="Ligeranto-theme"
        >
          <div className="flex flex-col min-h-screen">
            <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
              <div className="container flex h-16 items-center justify-between px-4">
                <LogoLink size="md" />
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                    Inicio
                  </Link>
                  <Link href="/servicios" className="text-sm font-medium transition-colors hover:text-primary">
                    Servicios
                  </Link>
                  <Link href="/planes" className="text-sm font-medium transition-colors hover:text-primary">
                    Planes
                  </Link>
                  <Link href="/nosotros" className="text-sm font-medium transition-colors hover:text-primary">
                    Nosotros
                  </Link>
                  <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
                    Blog
                  </Link>
                  <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-primary">
                    Contacto
                  </Link>
                  <Link href="/auditoria-web" className="text-sm font-medium transition-colors hover:text-primary">
                    Auditoría Web
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-4">
                    <Button asChild variant="outline">
                      <Link href="/auditoria-web">Auditoría Gratuita</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/contacto">Comenzar</Link>
                    </Button>
                  </div>
                  <MobileNav />
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t py-8 md:py-12">
              <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  <div className="col-span-2 md:col-span-1">
                    <LogoLink size="md" className="mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Servicios profesionales de optimización de velocidad web para mejorar el rendimiento, la
                      experiencia de usuario y el posicionamiento en buscadores.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Servicios</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/servicios#core-web-vitals" className="text-muted-foreground hover:text-foreground">
                          Core Web Vitals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/servicios#asset-optimization"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Optimización de Recursos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/servicios#server-optimization"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Optimización de Servidor
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/servicios#code-optimization"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Optimización de Código
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Empresa</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/nosotros" className="text-muted-foreground hover:text-foreground">
                          Sobre Nosotros
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/contacto" className="text-muted-foreground hover:text-foreground">
                          Contacto
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/politica-de-privacidad" className="text-muted-foreground hover:text-foreground">
                          Política de Privacidad
                        </Link>
                      </li>
                      <li>
                        <Link href="/terminos-de-servicio" className="text-muted-foreground hover:text-foreground">
                          Términos de Servicio
                        </Link>
                      </li>
                      <li>
                        <Link href="/politica-de-cookies" className="text-muted-foreground hover:text-foreground">
                          Política de Cookies
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-muted-foreground mb-4 md:mb-0 text-center md:text-left">
                    © 2025 Ligeranto. Todos los derechos reservados.
                  </p>
                  <div className="flex space-x-4">
                    <Link 
                      href="https://wa.me/529981657293?text=Hola%2C%20quisiera%20que%20me%20ayudes%20a%20optimizar%20la%20velocidad%20de%20mi%20sitio." 
                      className="text-muted-foreground hover:text-foreground"
                    >
                      WhatsApp
                    </Link>
                    <Link href="https://x.com/ligeranto" className="text-muted-foreground hover:text-foreground">
                      X
                    </Link>
                    <Link href="https://linkedin.com/company/ligeranto" className="text-muted-foreground hover:text-foreground">
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

