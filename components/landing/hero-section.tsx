import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PawPrint, ArrowRight, Shield, Plane, FileCheck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            Trusted by 50,000+ Pet Owners
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Your Pet&apos;s Complete Health &amp; Travel Passport
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty">
            Manage vaccinations, medical records, service animal verifications, and travel documents all in one secure platform. Trusted by airlines, veterinarians, and pet owners worldwide.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/dashboard">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="#features">
                See How It Works
              </Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-accent" />
              <span>Airline Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-accent" />
              <span>Vet Approved</span>
            </div>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
              <span className="ml-4 text-xs text-muted-foreground">app.pawpass.com</span>
            </div>
            <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 p-8">
              <div className="grid h-full gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <PawPrint className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Luna</p>
                      <p className="text-xs text-muted-foreground">Golden Retriever</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-success/30 w-full" />
                    <p className="text-xs text-muted-foreground">All vaccinations current</p>
                  </div>
                </div>
                <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Upcoming</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-warning" />
                      <span className="text-xs">Rabies booster - 2 weeks</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-xs">Annual checkup - 1 month</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Travel Ready</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                      UK Approved
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                      EU Ready
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
