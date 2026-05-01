import Link from "next/link"
import { PawPrint } from "lucide-react"

const footerLinks = {
  Product: [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/feed", label: "Community" },
  ],
  Company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
  ],
  Resources: [
    { href: "#", label: "Documentation" },
    { href: "#", label: "Help Center" },
    { href: "#", label: "Travel Guides" },
    { href: "#", label: "API" },
  ],
  Legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "Cookies" },
    { href: "#", label: "Licenses" },
  ],
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PawPass</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your pet&apos;s complete health and travel documentation platform. Trusted by pet owners, veterinarians, and airlines worldwide.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PawPass. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
