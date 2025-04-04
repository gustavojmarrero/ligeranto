"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b pb-4">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Logo size="md" />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4 py-6">
            <Link
              href="/"
              className="text-base font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className="text-base font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/planes"
              className="text-base font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Planes
            </Link>
            <Link
              href="/nosotros"
              className="text-base font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/blog"
              className="text-base font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contacto"
              className="text-base font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Contacto
            </Link>
          </nav>
          <div className="mt-auto border-t pt-6 flex flex-col gap-4">
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href="/contacto">Comenzar</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
              <Link href="/auditoria-web">Auditoría Gratuita</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

