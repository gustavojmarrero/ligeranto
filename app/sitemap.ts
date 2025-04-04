import { MetadataRoute } from "next"
import { getCanonicalBlogPosts } from "./lib/sitemapHelpers"

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
    "/auditoria-web",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Obtener posts del blog que sean canónicos
  const blogPosts = await getCanonicalBlogPosts();
  
  return [...routes, ...blogPosts]
} 