import { MetadataRoute } from "next"

// Función para verificar si una URL debe incluirse en el sitemap
export function shouldIncludeInSitemap(url: string, canonicalUrl: string | undefined): boolean {
  // Si no hay URL canónica definida, incluir la URL actual
  if (!canonicalUrl) {
    return true;
  }
  
  // Solo incluir en el sitemap si la URL es la canónica
  return url === canonicalUrl;
}

// Función para obtener las URLs canónicas de los posts del blog
export async function getCanonicalBlogPosts(): Promise<MetadataRoute.Sitemap> {
  // Por ahora usando un enfoque estático, pero preparado para futura integración con CMS
  const blogPostSlugs = [
    "velocidad-carga-afecta-ventas",
    "core-web-vitals-guia",
    "optimizacion-imagenes",
  ];
  
  const baseUrl = "https://ligeranto.com";
  
  // Solo incluir URLs que sean canónicas
  return blogPostSlugs.map(slug => {
    const url = `${baseUrl}/blog/${slug}`;
    const canonicalUrl = `${baseUrl}/blog/${slug}`; // En este caso son iguales
    
    // Solo devolver URLs que deban incluirse en el sitemap
    if (shouldIncludeInSitemap(url, canonicalUrl)) {
      return {
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }
    return null;
  }).filter((entry): entry is NonNullable<typeof entry> => entry !== null); // Filtrar elementos nulos con type guard
} 