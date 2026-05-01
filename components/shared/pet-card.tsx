import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react"
import { type Pet } from "@/lib/mock-data"

interface PetCardProps {
  pet: Pet
  showStatus?: boolean
}

export function PetCard({ pet, showStatus = true }: PetCardProps) {
  const expiringVaccinations = pet.vaccinations.filter(v => v.status === "expiring-soon")
  const expiredVaccinations = pet.vaccinations.filter(v => v.status === "expired")
  const hasIssues = expiringVaccinations.length > 0 || expiredVaccinations.length > 0

  return (
    <Link href={`/pets/${pet.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-md hover:border-primary/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 rounded-xl">
              <AvatarImage src={pet.profileImage} alt={pet.name} className="object-cover" />
              <AvatarFallback className="rounded-xl text-lg">
                {pet.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground truncate">{pet.name}</h3>
                {pet.isServiceAnimal && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    <Shield className="h-3 w-3" />
                    Service
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {pet.breed} &middot; {pet.species === "dog" ? "Dog" : "Cat"}
              </p>
              
              {showStatus && (
                <div className="mt-2 flex items-center gap-2">
                  {hasIssues ? (
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>
                        {expiredVaccinations.length > 0
                          ? `${expiredVaccinations.length} expired`
                          : `${expiringVaccinations.length} expiring soon`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>All records current</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
