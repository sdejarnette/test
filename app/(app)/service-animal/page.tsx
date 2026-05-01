import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  QrCode,
  FileText,
  Download,
  ExternalLink,
  Plane,
  Building2,
  ArrowRight,
  BadgeCheck,
} from "lucide-react"
import { pets } from "@/lib/mock-data"
import { format } from "date-fns"

export default function ServiceAnimalPage() {
  const serviceAnimals = pets.filter(pet => pet.isServiceAnimal)
  const luna = serviceAnimals[0] // Luna is our service animal

  const verificationSteps = [
    { id: 1, title: "Pet Profile Complete", status: "complete" as const },
    { id: 2, title: "Training Documentation", status: "complete" as const },
    { id: 3, title: "Veterinary Verification", status: "complete" as const },
    { id: 4, title: "Handler Information", status: "complete" as const },
    { id: 5, title: "Final Review", status: "complete" as const },
  ]

  const completedSteps = verificationSteps.filter(s => s.status === "complete").length
  const progress = (completedSteps / verificationSteps.length) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Service Animal</h1>
          <p className="text-muted-foreground">
            Manage verifications, credentials, and travel documentation
          </p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Request New Verification
        </Button>
      </div>

      {serviceAnimals.length > 0 ? (
        <>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verified Service Animals</CardTitle>
                  <CardDescription>Your registered service animals and their verification status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceAnimals.map((pet) => {
                      const verification = pet.verifications.find(v => v.type === "service-animal")
                      return (
                        <div
                          key={pet.id}
                          className="rounded-lg border border-border p-4"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 rounded-xl">
                              <AvatarImage src={pet.profileImage} alt={pet.name} className="object-cover" />
                              <AvatarFallback className="rounded-xl text-xl">{pet.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-foreground">{pet.name}</h3>
                                {verification?.status === "verified" && (
                                  <Badge className="bg-success/10 text-success border-success/30">
                                    <BadgeCheck className="mr-1 h-3 w-3" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {pet.serviceAnimalType?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} Service {pet.species === "dog" ? "Dog" : "Animal"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {pet.breed} &middot; ID: {pet.microchipId}
                              </p>
                              {verification && (
                                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>Verified by: {verification.verifiedBy}</span>
                                  <span>Valid until: {format(new Date(verification.expiresAt!), "MMM d, yyyy")}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm">
                                <QrCode className="mr-2 h-4 w-4" />
                                Show QR
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Certificate
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verification History</CardTitle>
                  <CardDescription>Timeline of verification activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-4 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
                    {[
                      { date: "2023-09-15", event: "Service Animal Verification Approved", status: "success" },
                      { date: "2023-09-10", event: "Documentation Review Complete", status: "success" },
                      { date: "2023-09-05", event: "Veterinary Letter Submitted", status: "success" },
                      { date: "2023-09-01", event: "Verification Request Submitted", status: "success" },
                    ].map((item, index) => (
                      <div key={index} className="relative flex items-start gap-4 pl-10">
                        <div className={`absolute left-2.5 flex h-3 w-3 items-center justify-center rounded-full ${
                          item.status === "success" ? "bg-success" : "bg-muted"
                        }`} />
                        <div>
                          <p className="font-medium text-foreground">{item.event}</p>
                          <p className="text-sm text-muted-foreground">{format(new Date(item.date), "MMMM d, yyyy")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Completion</span>
                      <span className="text-sm font-medium">{completedSteps}/{verificationSteps.length}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    {verificationSteps.map((step) => (
                      <div key={step.id} className="flex items-center gap-3">
                        {step.status === "complete" ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : step.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-warning" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        )}
                        <span className={`text-sm ${step.status === "complete" ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Button asChild variant="outline" className="justify-start">
                      <Link href="/travel">
                        <Plane className="mr-2 h-4 w-4" />
                        Plan Air Travel
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start">
                      <Link href="/documents">
                        <FileText className="mr-2 h-4 w-4" />
                        Upload Documents
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start">
                      <Link href="/portal/airline">
                        <Building2 className="mr-2 h-4 w-4" />
                        Airline Portal
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Know Your Rights</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Service animals are protected under the ADA. Learn about your rights and responsibilities.
                      </p>
                      <Button variant="link" className="h-auto p-0 text-primary" asChild>
                        <a href="https://www.ada.gov/topics/service-animals/" target="_blank" rel="noopener noreferrer">
                          Learn More
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Service Animals Registered</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-6">
              Register your service animal to access verification, travel documentation, and public access credentials.
            </p>
            <Button asChild>
              <Link href="/pets">
                Add Service Animal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
