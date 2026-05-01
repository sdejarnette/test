import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Shield, AlertCircle, CheckCircle2, ChevronRight, Dog, Cat } from "lucide-react"
import { pets } from "@/lib/mock-data"
import { format, differenceInYears, differenceInMonths } from "date-fns"

function getAge(dateOfBirth: string) {
  const dob = new Date(dateOfBirth)
  const years = differenceInYears(new Date(), dob)
  if (years === 0) {
    const months = differenceInMonths(new Date(), dob)
    return `${months} month${months !== 1 ? "s" : ""} old`
  }
  return `${years} year${years !== 1 ? "s" : ""} old`
}

export default function PetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">My Pets</h1>
          <p className="text-muted-foreground">
            Manage your pet profiles, health records, and documentation.
          </p>
        </div>
        <Button asChild>
          <Link href="/pets/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Pet
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pets.map((pet) => {
          const expiringVaccinations = pet.vaccinations.filter(v => v.status === "expiring-soon")
          const expiredVaccinations = pet.vaccinations.filter(v => v.status === "expired")
          const currentVaccinations = pet.vaccinations.filter(v => v.status === "current")
          const hasIssues = expiringVaccinations.length > 0 || expiredVaccinations.length > 0

          return (
            <Card key={pet.id} className="group overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-0">
                <Link href={`/pets/${pet.id}`} className="block p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 rounded-xl">
                      <AvatarImage src={pet.profileImage} alt={pet.name} className="object-cover" />
                      <AvatarFallback className="rounded-xl text-2xl">
                        {pet.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-semibold text-foreground">{pet.name}</h2>
                        {pet.isServiceAnimal && (
                          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                            <Shield className="h-3 w-3" />
                            Service Animal
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        {pet.species === "dog" ? (
                          <Dog className="h-4 w-4" />
                        ) : (
                          <Cat className="h-4 w-4" />
                        )}
                        <span>{pet.breed}</span>
                        <span>&middot;</span>
                        <span>{getAge(pet.dateOfBirth)}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {pet.weight} {pet.weightUnit}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {pet.color}
                        </Badge>
                        {pet.microchipId && (
                          <Badge variant="outline" className="text-xs">
                            Microchipped
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-xs">
                            {hasIssues ? (
                              <>
                                <AlertCircle className="h-3.5 w-3.5 text-warning" />
                                <span className="text-warning">
                                  {expiredVaccinations.length > 0
                                    ? `${expiredVaccinations.length} expired`
                                    : `${expiringVaccinations.length} expiring`}
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                                <span className="text-success">All current</span>
                              </>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {currentVaccinations.length} vaccination{currentVaccinations.length !== 1 ? "s" : ""}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {pet.medicalRecords.length} record{pet.medicalRecords.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {pets.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Dog className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Pets Yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-6">
              Add your first pet to start tracking their health records, vaccinations, and travel documents.
            </p>
            <Button asChild>
              <Link href="/pets/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Pet
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
