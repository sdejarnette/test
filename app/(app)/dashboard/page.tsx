import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatCard } from "@/components/shared/stat-card"
import { PetCard } from "@/components/shared/pet-card"
import {
  PawPrint,
  Calendar,
  AlertTriangle,
  Plane,
  Plus,
  ArrowRight,
  Syringe,
  FileText,
  Shield,
} from "lucide-react"
import { pets, notifications, dashboardStats } from "@/lib/mock-data"
import { formatDistanceToNow, format } from "date-fns"

export default function DashboardPage() {
  const upcomingVaccinations = pets.flatMap(pet => 
    pet.vaccinations
      .filter(v => v.status === "expiring-soon")
      .map(v => ({ ...v, petName: pet.name, petId: pet.id }))
  )

  const expiringDocuments = pets.flatMap(pet =>
    pet.travelDocuments
      .filter(d => d.status === "expired" || d.status === "pending")
      .map(d => ({ ...d, petName: pet.name, petId: pet.id }))
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your pets&apos; health status.
          </p>
        </div>
        <Button asChild>
          <Link href="/pets/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Pet
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pets"
          value={dashboardStats.totalPets}
          icon={PawPrint}
          variant="default"
        />
        <StatCard
          title="Upcoming Appointments"
          value={dashboardStats.upcomingAppointments}
          icon={Calendar}
          description="Next: Annual checkup"
          variant="default"
        />
        <StatCard
          title="Expiring Documents"
          value={dashboardStats.expiringDocuments}
          icon={AlertTriangle}
          description="Action required"
          variant="warning"
        />
        <StatCard
          title="Travel Ready"
          value={dashboardStats.travelReadyPets}
          icon={Plane}
          description="Pets with valid docs"
          variant="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">My Pets</CardTitle>
                <CardDescription>Quick access to your pet profiles</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/pets">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Upcoming Vaccinations</CardTitle>
                <CardDescription>Vaccinations due in the next 30 days</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/medical">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingVaccinations.length > 0 ? (
                <div className="space-y-3">
                  {upcomingVaccinations.map((vax) => (
                    <div
                      key={vax.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                          <Syringe className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{vax.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {vax.petName} &middot; Expires {format(new Date(vax.expirationDate), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                        Expiring Soon
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-3">
                    <Syringe className="h-6 w-6 text-success" />
                  </div>
                  <p className="font-medium text-foreground">All Caught Up!</p>
                  <p className="text-sm text-muted-foreground">No vaccinations due in the next 30 days</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.slice(0, 4).map((notif) => (
                  <Link
                    key={notif.id}
                    href={notif.actionUrl || "#"}
                    className="flex items-start gap-3 group"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      notif.type === "vaccination" ? "bg-warning/10" :
                      notif.type === "verification" ? "bg-primary/10" :
                      notif.type === "travel" ? "bg-accent/10" :
                      "bg-muted"
                    }`}>
                      {notif.type === "vaccination" && <Syringe className="h-4 w-4 text-warning" />}
                      {notif.type === "verification" && <Shield className="h-4 w-4 text-primary" />}
                      {notif.type === "travel" && <Plane className="h-4 w-4 text-accent" />}
                      {notif.type === "social" && <PawPrint className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium group-hover:text-primary transition-colors ${
                        !notif.isRead ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2" />
                    )}
                  </Link>
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
                  <Link href="/medical">
                    <Syringe className="mr-2 h-4 w-4" />
                    Add Vaccination Record
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/travel">
                    <Plane className="mr-2 h-4 w-4" />
                    Plan Travel
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/service-animal">
                    <Shield className="mr-2 h-4 w-4" />
                    Request Verification
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
