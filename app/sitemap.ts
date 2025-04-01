import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ligeranto.com"

  // Rutas estáticas principales
  const routes = [
    "",
    "/servicios",
    "/planes",
    "/nosotros",
    "/blog",
    "/contacto",
    "/politica-de-privacidad",
    "/terminos-de-servicio",
    "/politica-de-cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Artículos del blog
  const blogPosts = [
    "/blog/velocidad-carga-afecta-ventas",
    "/blog/core-web-vitals-guia",
    "/blog/optimizacion-imagenes",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...blogPosts]
} 