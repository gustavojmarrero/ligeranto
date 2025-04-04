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
          "/*.json$",
          "/b4712a525b3d4884bbe9a22cb67699c2.txt"
        ]
      }
    ],
    sitemap: "https://ligeranto.com/sitemap.xml"
  }
} 