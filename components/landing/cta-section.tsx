import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <PawPrint className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl text-balance">
            Ready to Simplify Your Pet&apos;s Health Management?
          </h2>
          
          <p className="mb-8 text-lg text-primary-foreground/80 text-pretty">
            Join thousands of pet owners who trust PawPass to keep their furry family members&apos; records organized, verified, and always accessible.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base"
            >
              <Link href="/dashboard">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            No credit card required. Free forever for basic features.
          </p>
        </div>
      </div>
    </section>
  )
}
