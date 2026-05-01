import {
  Syringe,
  Stethoscope,
  Shield,
  Plane,
  QrCode,
  Share2,
  FileText,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Syringe,
    title: "Vaccination Tracking",
    description: "Keep all vaccination records up to date with automatic expiration reminders. Never miss a booster again.",
  },
  {
    icon: Stethoscope,
    title: "Medical Records",
    description: "Store complete medical history including exams, prescriptions, surgeries, and lab results in one secure location.",
  },
  {
    icon: Shield,
    title: "Service Animal Verification",
    description: "Official verification system for service and emotional support animals. Accepted by airlines and businesses.",
  },
  {
    icon: Plane,
    title: "Travel Documentation",
    description: "Generate country-specific travel documents, health certificates, and import permits for international travel.",
  },
  {
    icon: QrCode,
    title: "Instant QR Verification",
    description: "Share verified pet information instantly via QR code. Perfect for vet visits, travel, or emergencies.",
  },
  {
    icon: Share2,
    title: "Secure Sharing",
    description: "Grant temporary or permanent access to vets, airlines, pet sitters, or family members with granular permissions.",
  },
  {
    icon: FileText,
    title: "Document Storage",
    description: "Upload and organize all pet-related documents including adoption papers, insurance, and registration.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Automated alerts for upcoming vaccinations, expiring documents, and scheduled appointments.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4 text-balance">
            Everything Your Pet Needs, In One Place
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From routine vaccinations to international travel, PawPass handles every aspect of your pet&apos;s health documentation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
