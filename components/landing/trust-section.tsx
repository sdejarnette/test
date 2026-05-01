import { Badge } from "@/components/ui/badge"

const airlines = [
  "United Airlines",
  "Delta Air Lines",
  "American Airlines",
  "Southwest Airlines",
  "JetBlue Airways",
]

const stats = [
  { value: "50K+", label: "Pet Profiles" },
  { value: "2.5M+", label: "Records Stored" },
  { value: "120+", label: "Countries Supported" },
  { value: "99.9%", label: "Uptime" },
]

export function TrustSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Trusted by Leading Airlines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {airlines.map((airline) => (
              <div
                key={airline}
                className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {airline}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
