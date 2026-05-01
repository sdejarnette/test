import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Edit,
  Share2,
  QrCode,
  Shield,
  Syringe,
  Stethoscope,
  FileText,
  Plane,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Weight,
  Dna,
  Microchip,
} from "lucide-react"
import { pets } from "@/lib/mock-data"
import { format, differenceInYears, differenceInMonths } from "date-fns"

function getAge(dateOfBirth: string) {
  const dob = new Date(dateOfBirth)
  const years = differenceInYears(new Date(), dob)
  if (years === 0) {
    const months = differenceInMonths(new Date(), dob)
    return `${months} month${months !== 1 ? "s" : ""}`
  }
  return `${years} year${years !== 1 ? "s" : ""}`
}

interface PetDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PetDetailPage({ params }: PetDetailPageProps) {
  const { id } = await params
  const pet = pets.find((p) => p.id === id)

  if (!pet) {
    notFound()
  }

  const statusColors = {
    current: "bg-success/10 text-success border-success/30",
    "expiring-soon": "bg-warning/10 text-warning border-warning/30",
    expired: "bg-destructive/10 text-destructive border-destructive/30",
  }

  const documentStatusColors = {
    valid: "bg-success/10 text-success border-success/30",
    pending: "bg-warning/10 text-warning border-warning/30",
    expired: "bg-destructive/10 text-destructive border-destructive/30",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/pets">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to pets</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">{pet.name}</h1>
          <p className="text-muted-foreground">{pet.breed}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <QrCode className="mr-2 h-4 w-4" />
            QR Code
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 rounded-2xl mb-4">
                <AvatarImage src={pet.profileImage} alt={pet.name} className="object-cover" />
                <AvatarFallback className="rounded-2xl text-4xl">
                  {pet.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-semibold text-foreground mb-1">{pet.name}</h2>
              
              {pet.isServiceAnimal && (
                <Badge className="mb-3 flex items-center gap-1 bg-primary/10 text-primary border-primary/30">
                  <Shield className="h-3 w-3" />
                  {pet.serviceAnimalType?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} Service Dog
                </Badge>
              )}
              
              <p className="text-muted-foreground mb-4">{pet.breed}</p>
              
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Born:</span>
                  <span className="font-medium">{format(new Date(pet.dateOfBirth), "MMMM d, yyyy")} ({getAge(pet.dateOfBirth)} old)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{pet.weight} {pet.weightUnit}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Dna className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-medium">{pet.color}</span>
                </div>
                {pet.microchipId && (
                  <div className="flex items-center gap-3 text-sm">
                    <Microchip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Microchip:</span>
                    <span className="font-medium font-mono text-xs">{pet.microchipId}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="vaccinations" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="vaccinations" className="flex items-center gap-2">
                <Syringe className="h-4 w-4" />
                <span className="hidden sm:inline">Vaccinations</span>
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                <span className="hidden sm:inline">Medical</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="travel" className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">Travel</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vaccinations" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Vaccination Records</CardTitle>
                    <CardDescription>Track all vaccination history and upcoming boosters</CardDescription>
                  </div>
                  <Button size="sm">
                    <Syringe className="mr-2 h-4 w-4" />
                    Add Record
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pet.vaccinations.map((vax) => (
                      <div
                        key={vax.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            vax.status === "current" ? "bg-success/10" :
                            vax.status === "expiring-soon" ? "bg-warning/10" :
                            "bg-destructive/10"
                          }`}>
                            {vax.status === "current" ? (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            ) : (
                              <AlertCircle className={`h-5 w-5 ${vax.status === "expiring-soon" ? "text-warning" : "text-destructive"}`} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{vax.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Administered: {format(new Date(vax.dateAdministered), "MMM d, yyyy")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {vax.veterinarian} at {vax.clinic}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={statusColors[vax.status]}>
                            {vax.status === "current" ? "Current" : vax.status === "expiring-soon" ? "Expiring Soon" : "Expired"}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Expires: {format(new Date(vax.expirationDate), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Medical Records</CardTitle>
                    <CardDescription>Complete medical history and conditions</CardDescription>
                  </div>
                  <Button size="sm">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Add Record
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pet.medicalRecords.map((record) => (
                      <div
                        key={record.id}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs capitalize">
                              {record.type}
                            </Badge>
                            <span className="font-medium text-foreground">{record.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(record.date), "MMM d, yyyy")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{record.notes}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.provider} at {record.clinic}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Travel Documents</CardTitle>
                    <CardDescription>Health certificates and travel documentation</CardDescription>
                  </div>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  {pet.travelDocuments.length > 0 ? (
                    <div className="space-y-3">
                      {pet.travelDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between rounded-lg border border-border p-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {doc.issuingAuthority}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Document #: {doc.documentNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className={documentStatusColors[doc.status]}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </Badge>
                            {doc.expirationDate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Expires: {format(new Date(doc.expirationDate), "MMM d, yyyy")}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-foreground">No Documents Yet</p>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Upload travel documents, health certificates, or other important paperwork.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="travel" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Travel Readiness</CardTitle>
                  <CardDescription>Check travel requirements and document status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <h4 className="font-medium text-foreground mb-2">Current Status</h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          {pet.vaccinations.every(v => v.status === "current") ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              <span className="text-sm">All vaccinations current</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-warning" />
                              <span className="text-sm">Some vaccinations need attention</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {pet.microchipId ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              <span className="text-sm">Microchip registered</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-warning" />
                              <span className="text-sm">Microchip required for travel</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/travel">
                        <Plane className="mr-2 h-4 w-4" />
                        Plan International Travel
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
