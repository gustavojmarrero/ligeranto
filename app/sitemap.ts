import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ligeranto.com"

  // Rutas estáticas principales
  const routes = [
    "",
    "/services",
    "/planes",
    "/nosotros",
    "/blog",
    "/contact",
    "/politica-de-privacidad",
    "/terminos-de-servicio",
    "/politica-de-cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  return [...routes]
} 