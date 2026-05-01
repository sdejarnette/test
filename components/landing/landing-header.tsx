"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PawPrint, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/portal/vet", label: "For Vets" },
  { href: "/portal/airline", label: "For Airlines" },
]

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PawPass</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 pt-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
