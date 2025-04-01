export default function Loading() {
  // Puedes personalizar este componente de carga
  // Este es un ejemplo básico similar al de la página de resultados
  return (
    <div className="container px-4 py-12 mx-auto max-w-5xl">
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-center">
          Cargando resultados de la auditoría...
        </p>
        <p className="text-muted-foreground text-center">Por favor, espera un momento</p>
      </div>
    </div>
  )
}

