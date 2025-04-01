import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin", 
          "/private",
          "/*.json$"
        ]
      }
    ],
    sitemap: "https://ligeranto.com/sitemap.xml",
    host: "https://ligeranto.com"
  }
} 