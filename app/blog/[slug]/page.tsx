import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

// Definir el tipo para los datos del post
interface PostData {
  title: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: string;
}

// Función para obtener los datos del post según el slug
function getPostData(slug: string) {
  // En un caso real, esto vendría de una base de datos o CMS
  const posts = {
    "velocidad-carga-afecta-ventas": {
      title: "Cómo la velocidad de carga de tu sitio web afecta tus ventas en Shopify y WordPress",
      date: "15 de marzo de 2025",
      readTime: "8 min de lectura",
      image: "/images/velocidad.png",
      category: "Optimización Web",
      content: `
        <p class="lead">Si tienes una tienda online en Shopify o una página web en WordPress, la velocidad de carga puede ser el factor decisivo para captar o perder clientes. Una carga lenta no solo impacta negativamente en la experiencia del usuario, sino también reduce tus ventas y afecta la posición en buscadores como Google. En este artículo descubrirás por qué la velocidad es vital para tu negocio y cómo nuestro servicio especializado puede ayudarte a optimizar tu sitio web para mejorar tus resultados comerciales.</p>
        
        <h2>La velocidad importa: impactos reales en Shopify y WordPress</h2>
        
        <p>La velocidad de carga se refiere al tiempo que tarda tu sitio en mostrar todo su contenido al visitante. Cada segundo adicional reduce las probabilidades de convertir visitantes en clientes:</p>
        
        <ul>
          <li><strong>Menos conversiones</strong>: Estudios indican que cada segundo extra de carga disminuye las conversiones en hasta un 7%. Por ejemplo, pasar de 3 a 5 segundos podría implicar perder el 14% de tus posibles ventas.</li>
          <li><strong>Alta tasa de abandono</strong>: Aproximadamente el 40% de los usuarios abandona una página que tarda más de 3 segundos en cargar, especialmente en dispositivos móviles.</li>
          <li><strong>Pérdida de ingresos</strong>: Empresas como Amazon observaron que solo 100 ms de retraso pueden reducir sus ventas en un 1%. Imagina lo que esto podría significar para tu tienda Shopify o tu sitio WordPress.</li>
        </ul>
        
        <p>Optimizar la velocidad es indispensable para aumentar tus ventas y mejorar la satisfacción de tus clientes.</p>
        
        <h2>Casos de éxito: la importancia de optimizar Shopify y WordPress</h2>
        
        <p>Grandes compañías y negocios medianos han comprobado la importancia de optimizar la velocidad:</p>
        
        <ul>
          <li>Google confirmó que mejorar en solo 0,1 segundos la carga móvil aumenta hasta un 8% las conversiones.</li>
          <li>Una tienda en Shopify, tras optimizar imágenes, código CSS y JS, y activar una CDN, redujo su carga de 4 a 1,5 segundos, incrementando las ventas un 20% y reduciendo significativamente la tasa de rebote.</li>
        </ul>
        
        <p>Estos ejemplos ilustran claramente que nuestro servicio especializado puede brindarte resultados tangibles.</p>
        
        <h2>Problemas comunes de velocidad en Shopify y WordPress</h2>
        
        <p>Antes de optimizar, debes conocer qué afecta a tu velocidad:</p>
        
        <ul>
          <li><strong>Imágenes sin optimizar</strong>: Subir imágenes pesadas o sin comprimir aumenta significativamente la carga.</li>
          <li><strong>Exceso de plugins y aplicaciones</strong>: Tanto en WordPress como en Shopify, demasiadas aplicaciones o plugins no optimizados pueden ralentizar tu sitio.</li>
          <li><strong>Falta de optimización de caché y CDN</strong>: No aprovechar estas herramientas causa lentitud, especialmente para visitantes alejados geográficamente.</li>
          <li><strong>Hosting lento</strong>: Usar un hosting deficiente afecta directamente la velocidad general.</li>
        </ul>
        
        <p>Entender estos aspectos te permite elegir un servicio que ataque directamente estos problemas.</p>
        
        <h2>Cómo nuestro servicio puede optimizar la velocidad de tu Shopify y WordPress</h2>
        
        <p>Aquí está cómo ayudamos a nuestros clientes a mejorar la velocidad:</p>
        
        <h3>1. Optimización de imágenes avanzada</h3>
        <p>Comprimimos tus imágenes y convertimos automáticamente formatos pesados a formatos modernos como WebP o AVIF, manteniendo una excelente calidad visual pero con archivos mucho más ligeros.</p>
        
        <h3>2. Minimización y limpieza de código</h3>
        <p>Reducimos el peso de archivos CSS y JavaScript eliminando código redundante, combinando recursos y optimizando scripts para minimizar solicitudes HTTP.</p>
        
        <h3>3. Configuración experta de caché</h3>
        <p>Implementamos configuraciones avanzadas de caché en Shopify y WordPress para acelerar significativamente las visitas repetidas de tus clientes.</p>
        
        <h3>4. Integración con CDN</h3>
        <p>Configuramos redes de distribución de contenido (CDN) para entregar tu contenido rápidamente, independientemente de dónde estén tus visitantes.</p>
        
        <h3>5. Hosting optimizado para tu plataforma</h3>
        <p>Te asesoramos en elegir el mejor hosting o configuramos tu servidor actual para garantizar la mejor velocidad posible, adaptándonos específicamente a Shopify o WordPress.</p>
        
        <h3>6. Auditoría constante y ajustes personalizados</h3>
        <p>Utilizamos herramientas avanzadas (Google PageSpeed Insights, GTmetrix y Pingdom) para diagnosticar continuamente el rendimiento y aplicar ajustes específicos según las necesidades de tu sitio.</p>
        
        <h2>Herramientas que utilizamos</h2>
        
        <p>Nuestras soluciones se apoyan en herramientas líderes del mercado:</p>
        
        <ul>
          <li><strong>Google PageSpeed Insights</strong>: Proporciona análisis precisos y recomendaciones específicas para Shopify y WordPress.</li>
          <li><strong>GTmetrix</strong>: Permite identificar claramente qué factores ralentizan tu sitio y cómo solucionarlos.</li>
          <li><strong>Pingdom</strong>: Facilita monitorear el rendimiento global desde diversas ubicaciones geográficas.</li>
          <li><strong>WebPageTest</strong>: Una herramienta avanzada para evaluar bajo condiciones realistas la experiencia de tus usuarios.</li>
        </ul>
        
        <h2>Conclusión: optimiza tu Shopify o WordPress hoy</h2>
        
        <p>La velocidad es un factor decisivo en la experiencia del usuario, en tu posicionamiento SEO y en tus ventas. Una tienda rápida en Shopify o un sitio eficiente en WordPress puede marcar una enorme diferencia en tu éxito online.</p>
        
        <p>Nuestro servicio especializado está diseñado específicamente para resolver problemas comunes en estas plataformas. Al invertir en optimizar la velocidad, no solo mejoras la experiencia del usuario, sino que también incrementas tus conversiones y, en última instancia, tus ingresos.</p>
        
        <p>No permitas que la lentitud afecte tus ventas y la satisfacción de tus clientes. Contáctanos y deja que nuestro equipo especializado transforme tu tienda Shopify o tu web WordPress en una plataforma veloz, eficiente y rentable.</p>
      `,
    },
    "core-web-vitals-guia": {
      title: "Guía Completa de Core Web Vitals para Principiantes",
      date: "28 de febrero de 2025",
      readTime: "10 min de lectura",
      image: "/images/Core_Web.png",
      category: "SEO Técnico",
      content: `
        <h2>¿Qué son los Core Web Vitals y por qué son importantes?</h2>
        
        <p class="lead">En 2020, Google lanzó <strong>Core Web Vitals</strong>, métricas fundamentales para medir la experiencia de usuario en páginas web. Estas métricas evalúan la velocidad de carga, la interactividad y la estabilidad visual del contenido. En resumen, indican qué tan rápido carga tu página, cómo responde a las interacciones y qué tan estable es visualmente durante la carga.</p>
        
        <p>La importancia de estas métricas radica en dos factores clave: mejoran la satisfacción del usuario (nadie quiere esperar o lidiar con sitios inestables) y son cruciales para el posicionamiento en Google. Desde la actualización "Page Experience" en 2021, los sitios optimizados para Core Web Vitals tienen ventajas directas en el SEO frente a páginas lentas o inestables.</p>
        
        <p>A continuación, profundizaremos en cada métrica principal, los problemas más comunes en Shopify y WordPress, y cómo puedes solucionarlos.</p>
        
        <h2>Largest Contentful Paint (LCP)</h2>
        
        <p><strong>Largest Contentful Paint (LCP)</strong> mide cuánto tiempo tarda en cargarse el elemento principal visible (imagen destacada, titular principal, etc.). Google recomienda que tu LCP sea inferior a <strong>2.5 segundos</strong> para una buena experiencia.</p>
        
        <p><strong>Causas comunes de un mal LCP:</strong></p>
        <ul>
          <li>Imágenes pesadas y no optimizadas.</li>
          <li>Servidores lentos.</li>
          <li>Archivos CSS y JavaScript que bloquean el renderizado.</li>
        </ul>
        
        <h2>First Input Delay (FID) e Interaction to Next Paint (INP)</h2>
        
        <p>Originalmente, Google medía la interactividad con <strong>First Input Delay (FID)</strong>, que registra el retraso desde la primera interacción del usuario hasta la respuesta del navegador (bueno si es menor a <strong>100 ms</strong>). Sin embargo, desde 2024, <strong>Interaction to Next Paint (INP)</strong> reemplaza a FID y evalúa la rapidez de respuesta en todas las interacciones del usuario, siendo óptimo un INP inferior a <strong>200 ms</strong>.</p>
        
        <p><strong>Problemas frecuentes que afectan FID/INP:</strong></p>
        <ul>
          <li>JavaScript excesivo o tareas pesadas.</li>
          <li>Demasiados plugins o aplicaciones.</li>
        </ul>
        
        <h2>Cumulative Layout Shift (CLS)</h2>
        
        <p><strong>Cumulative Layout Shift (CLS)</strong> evalúa los movimientos inesperados del contenido durante la carga. Un CLS bueno está por debajo de <strong>0.1</strong>, mientras que valores superiores a <strong>0.25</strong> indican problemas importantes.</p>
        
        <p><strong>Causas habituales de mal CLS:</strong></p>
        <ul>
          <li>Imágenes sin dimensiones especificadas.</li>
          <li>Anuncios emergentes repentinos.</li>
          <li>Fuentes web que alteran el diseño durante la carga.</li>
        </ul>
        
        <h2>Factores comunes en WordPress y Shopify</h2>
        
        <p>Aunque Shopify y WordPress son plataformas potentes, presentan desafíos similares en rendimiento:</p>
        
        <ul>
          <li><strong>Imágenes sin optimizar</strong>: Fotos pesadas aumentan significativamente los tiempos de carga.</li>
          <li><strong>Exceso de plugins/apps</strong>: Más plugins significan más código y solicitudes, ralentizando tu página.</li>
          <li><strong>Temas mal optimizados</strong>: Un diseño atractivo pero ineficiente puede ralentizar considerablemente tu sitio.</li>
          <li><strong>Scripts externos</strong>: Códigos de terceros (analíticas, publicidad, chats) pueden afectar tu rendimiento.</li>
          <li><strong>Falta de caché/CDN</strong>: No aprovechar cachés y redes de contenido (CDN) afecta negativamente la velocidad del servidor.</li>
        </ul>
        
        <h2>Mejores prácticas para optimizar los Core Web Vitals</h2>
        
        <h3>Optimización de LCP:</h3>
        <ul>
          <li>Comprime imágenes y utiliza formatos modernos (WebP).</li>
          <li>Implementa carga diferida (<strong>lazy load</strong>).</li>
          <li>Minifica y difiere CSS y JS.</li>
          <li>Usa caché y mejora la respuesta del servidor con CDN.</li>
        </ul>
        
        <h3>Optimización de FID/INP:</h3>
        <ul>
          <li>Reduce JavaScript innecesario.</li>
          <li>Carga scripts externos de manera diferida o asíncrona.</li>
          <li>Prefiere animaciones ligeras en CSS en lugar de JavaScript pesado.</li>
        </ul>
        
        <h3>Optimización de CLS:</h3>
        <ul>
          <li>Define tamaños específicos para medios (imágenes, videos).</li>
          <li>Establece contenedores fijos para anuncios y elementos externos.</li>
          <li>Usa la propiedad <code>font-display: swap</code> para fuentes web.</li>
        </ul>
        
        <h2>Herramientas gratuitas para medir Core Web Vitals</h2>
        
        <ul>
          <li><strong>Google PageSpeed Insights</strong>: Métricas claras y recomendaciones específicas.</li>
          <li><strong>Lighthouse</strong>: Informes detallados dentro de Chrome DevTools.</li>
          <li><strong>Google Search Console</strong>: Datos reales del rendimiento de usuarios.</li>
          <li><strong>GTmetrix</strong>: Análisis exhaustivo con identificación precisa de problemas.</li>
        </ul>
        
        <h2>¿Cómo nuestro servicio puede ayudarte?</h2>
        
        <p>Optimizar Core Web Vitals es fundamental pero técnicamente desafiante. Nuestro servicio especializado para Shopify y WordPress ofrece:</p>
        
        <ul>
          <li><strong>Optimización integral de imágenes y código</strong>: Reducción de peso y carga eficiente de recursos.</li>
          <li><strong>Configuración avanzada de CDN y caché</strong>: Mejora global del tiempo de carga.</li>
          <li><strong>Auditoría completa y ajustes específicos</strong>: Eliminación de código innecesario y optimización de scripts.</li>
        </ul>
        
        <p>Nos encargamos del trabajo técnico para que puedas centrarte en tu negocio. Con nuestra ayuda, tu tienda o web obtendrá mejor velocidad, mejor SEO y mayor satisfacción del usuario.</p>
        
        <p>¡Contáctanos ahora y da el paso definitivo hacia un sitio optimizado, rápido y rentable!</p>
      `,
    },
    "optimizacion-imagenes": {
      title: "Técnicas Avanzadas de Optimización de Imágenes para Web",
      date: "10 de febrero de 2025",
      readTime: "9 min de lectura",
      image: "/images/imagenes.png",
      category: "Rendimiento Web",
      content: `
        <p class="lead">Las imágenes suelen ser el recurso más pesado en una página web, representando alrededor del 75% del peso total según estadísticas recientes de HTTP Archive. Esto influye significativamente en la velocidad de carga, experiencia del usuario y, en última instancia, en las conversiones y SEO. Un sitio lento puede provocar que hasta el 79% de los visitantes no regresen, afectando directamente tus ventas.</p>
        
        <p>En este artículo, descubrirás técnicas avanzadas para optimizar imágenes específicamente en plataformas Shopify y WordPress. Explicaremos conceptos clave, compararemos formatos modernos y ofreceremos recomendaciones prácticas que ayudarán a mejorar la velocidad y rendimiento de tu sitio web.</p>
        
        <h2>¿Por qué es fundamental optimizar imágenes?</h2>
        
        <p>Optimizar imágenes significa reducir su tamaño de archivo sin perder calidad visual perceptible. Los beneficios inmediatos son:</p>
        
        <ul>
          <li><strong>Mejora en la velocidad de carga</strong>: Imágenes ligeras significan cargas más rápidas.</li>
          <li><strong>Experiencia del usuario optimizada</strong>: Usuarios satisfechos con una carga ágil.</li>
          <li><strong>Mejor SEO</strong>: Google favorece páginas rápidas, mejorando tu posicionamiento.</li>
          <li><strong>Menor consumo de datos móviles</strong>: Ideal para usuarios que navegan desde dispositivos móviles.</li>
        </ul>
        
        <h2>Formatos modernos de imágenes</h2>
        
        <h3>WebP</h3>
        
        <p>Creado por Google, combina ventajas de JPEG y PNG. Ofrece una reducción de peso de hasta un 30% frente a JPEG sin pérdida notable de calidad. Es compatible con la mayoría de navegadores modernos, ideal para uso general en sitios Shopify y WordPress.</p>
        
        <h3>AVIF</h3>
        
        <p>Formato más reciente con compresión aún superior, reduciendo imágenes hasta un 50% respecto a JPEG. Aunque ofrece gran calidad visual, su soporte en navegadores aún es limitado. Recomendado para imágenes en alta resolución cuando el soporte del navegador es seguro.</p>
        
        <h3>JPEG XL</h3>
        
        <p>Potencial sucesor del JPEG, ofreciendo mayor calidad y compresión. Actualmente tiene soporte muy limitado, por lo que es mejor monitorearlo para futuras aplicaciones.</p>
        
        <p>La estrategia ideal: Usar principalmente WebP y AVIF cuando sea posible, manteniendo JPEG como alternativa de compatibilidad.</p>
        
        <h2>Compresión: ¿Con o sin pérdida?</h2>
        
        <ul>
          <li><strong>Sin pérdida (Lossless)</strong>: Conserva toda la calidad original. Recomendado para gráficos y logotipos.</li>
          <li><strong>Con pérdida (Lossy)</strong>: Mayor reducción de tamaño sacrificando mínimamente calidad visual. Ideal para imágenes fotográficas, consiguiendo una excelente reducción sin impacto notable para el usuario.</li>
        </ul>
        
        <h2>Lazy loading (Carga diferida)</h2>
        
        <p>Retrasa la carga de imágenes hasta que el usuario hace scroll. Esto acelera significativamente la carga inicial y mejora la experiencia, especialmente en dispositivos móviles. Shopify y WordPress tienen soporte nativo o plugins/apps sencillos para implementarlo.</p>
        
        <h2>Imágenes responsivas (srcset y sizes)</h2>
        
        <p>Estas técnicas permiten servir la imagen más adecuada según el dispositivo y resolución del usuario, evitando cargar imágenes más grandes de lo necesario. Tanto Shopify como WordPress tienen mecanismos integrados o fáciles de configurar para imágenes responsivas.</p>
        
        <h2>Uso de un CDN con compresión automática</h2>
        
        <p>Las CDNs modernas optimizan automáticamente imágenes al servirlas desde ubicaciones cercanas al usuario, proporcionando formatos adecuados como WebP o AVIF según el navegador. Esto mejora drásticamente la velocidad global del sitio y reduce carga en tu servidor.</p>
        
        <h2>Eliminación de metadatos EXIF</h2>
        
        <p>Eliminar metadatos reduce peso adicional en imágenes sin afectar la calidad visual. Herramientas o plugins especializados pueden automatizar este proceso fácilmente.</p>
        
        <h2>Herramientas recomendadas</h2>
        
        <h3>Plugins WordPress:</h3>
        <ul>
          <li>Smush</li>
          <li>ShortPixel</li>
          <li>Imagify</li>
          <li>EWWW Optimizer</li>
        </ul>
        
        <h3>Apps Shopify:</h3>
        <ul>
          <li>TinyIMG</li>
          <li>Crush.pics</li>
          <li>Image Optimizer by AVADA</li>
        </ul>
        
        <h3>Herramientas externas:</h3>
        <ul>
          <li>Squoosh.app</li>
          <li>TinyPNG/TinyJPG</li>
          <li>ImageOptim (Mac) o FileOptimizer (Windows)</li>
        </ul>
        
        <h2>Buenas prácticas al subir imágenes</h2>
        
        <ul>
          <li>Redimensiona adecuadamente antes de subir.</li>
          <li>Usa formatos óptimos según el contenido.</li>
          <li>Aplica compresión con criterio (lossy para fotos, lossless para gráficos).</li>
          <li>Nombra imágenes de forma descriptiva para mejorar SEO.</li>
        </ul>
        
        <h2>¿Cómo nuestro servicio puede ayudarte?</h2>
        
        <p>En SpeedOptimize, nos especializamos en optimizar imágenes para Shopify y WordPress. Te ayudamos a implementar automáticamente todas estas técnicas avanzadas:</p>
        
        <ul>
          <li>Auditoría personalizada y recomendaciones específicas.</li>
          <li>Implementación de formatos modernos (WebP/AVIF).</li>
          <li>Configuración de CDN y lazy loading.</li>
          <li>Optimización continua y monitoreo del rendimiento.</li>
          <li>Aseguramos calidad visual y máxima reducción de peso.</li>
        </ul>
        
        <p>Optimizar las imágenes de tu sitio nunca había sido tan fácil. Permítenos mejorar la velocidad, experiencia del usuario y SEO de tu web para que puedas concentrarte en hacer crecer tu negocio.</p>
        
        <p>¡Contáctanos hoy mismo y lleva tu sitio web al siguiente nivel de rendimiento!</p>
      `,
    },
    // Otros posts irían aquí
  }

  // Asegurarse de que el tipo del objeto 'posts' permite indexación por string
  const postCollection: { [key: string]: PostData } = posts;

  return postCollection[slug] || null
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug)

  if (!post) {
    return (
      <div className="container px-4 py-12 mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
        <p className="text-muted-foreground mb-6">Lo sentimos, el artículo que buscas no existe o ha sido movido.</p>
        <Button asChild>
          <Link href="/blog">Volver al Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Blog
          </Link>
        </Button>

        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {post.category}
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>

        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.date}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime}</span>
        </div>

        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto rounded-lg mb-8" />
      </div>

      <article className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      <div className="border-t pt-8 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="font-medium mb-4 sm:mb-0">Comparte este artículo:</h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" aria-label="Compartir en Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Compartir en Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Compartir en LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Compartir">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Quieres mejorar la velocidad de tu sitio web?</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Nuestro equipo de expertos puede ayudarte a optimizar tu sitio web para obtener mejores resultados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Contactar Ahora</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auditoria-web">Auditoría Gratuita</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

