"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Syringe,
  Stethoscope,
  Pill,
  AlertTriangle,
  FileText,
  Plus,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
} from "lucide-react"
import { pets } from "@/lib/mock-data"
import { format, differenceInDays } from "date-fns"

export default function MedicalPage() {
  const [selectedPetId, setSelectedPetId] = useState<string>("all")
  
  const allVaccinations = pets.flatMap(pet => 
    pet.vaccinations.map(v => ({ ...v, petName: pet.name, petId: pet.id, petImage: pet.profileImage }))
  )
  
  const allMedicalRecords = pets.flatMap(pet =>
    pet.medicalRecords.map(r => ({ ...r, petName: pet.name, petId: pet.id, petImage: pet.profileImage }))
  )

  const filteredVaccinations = selectedPetId === "all"
    ? allVaccinations
    : allVaccinations.filter(v => v.petId === selectedPetId)

  const filteredRecords = selectedPetId === "all"
    ? allMedicalRecords
    : allMedicalRecords.filter(r => r.petId === selectedPetId)

  const upcomingVaccinations = filteredVaccinations.filter(v => v.status === "expiring-soon")
  const expiredVaccinations = filteredVaccinations.filter(v => v.status === "expired")
  const currentVaccinations = filteredVaccinations.filter(v => v.status === "current")

  const statusColors = {
    current: "bg-success/10 text-success border-success/30",
    "expiring-soon": "bg-warning/10 text-warning border-warning/30",
    expired: "bg-destructive/10 text-destructive border-destructive/30",
  }

  const recordTypeIcons = {
    exam: Stethoscope,
    surgery: FileText,
    lab: FileText,
    prescription: Pill,
    allergy: AlertTriangle,
    condition: AlertTriangle,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Medical Records</h1>
          <p className="text-muted-foreground">
            Manage vaccinations, medical history, and health records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPetId} onValueChange={setSelectedPetId}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by pet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pets</SelectItem>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  {pet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Vaccinations</p>
                <p className="text-2xl font-bold text-foreground">{currentVaccinations.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-foreground">{upcomingVaccinations.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold text-foreground">{expiredVaccinations.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vaccinations" className="w-full">
        <TabsList>
          <TabsTrigger value="vaccinations" className="flex items-center gap-2">
            <Syringe className="h-4 w-4" />
            Vaccinations
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Medical Records
          </TabsTrigger>
          <TabsTrigger value="conditions" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Conditions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vaccinations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vaccination History</CardTitle>
              <CardDescription>All vaccination records across your pets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredVaccinations.length > 0 ? (
                  filteredVaccinations.map((vax) => {
                    const daysUntilExpiry = differenceInDays(new Date(vax.expirationDate), new Date())
                    return (
                      <div
                        key={vax.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={vax.petImage} alt={vax.petName} className="object-cover" />
                            <AvatarFallback>{vax.petName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">{vax.name}</p>
                              <Badge variant="outline" className={statusColors[vax.status]}>
                                {vax.status === "current" ? "Current" : vax.status === "expiring-soon" ? "Expiring Soon" : "Expired"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {vax.petName} &middot; {vax.veterinarian} at {vax.clinic}
                            </p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span>Given: {format(new Date(vax.dateAdministered), "MMM d, yyyy")}</span>
                              <span>Lot: {vax.lotNumber}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            Expires {format(new Date(vax.expirationDate), "MMM d, yyyy")}
                          </p>
                          <p className={`text-xs ${
                            daysUntilExpiry < 0 ? "text-destructive" :
                            daysUntilExpiry < 30 ? "text-warning" :
                            "text-muted-foreground"
                          }`}>
                            {daysUntilExpiry < 0
                              ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                              : `${daysUntilExpiry} days remaining`}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                      <Syringe className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-foreground">No Vaccination Records</p>
                    <p className="text-sm text-muted-foreground">Add your pet&apos;s vaccination history to keep track.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical History</CardTitle>
              <CardDescription>Exams, procedures, prescriptions, and lab results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredRecords.filter(r => r.type !== "condition" && r.type !== "allergy").length > 0 ? (
                  filteredRecords
                    .filter(r => r.type !== "condition" && r.type !== "allergy")
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((record) => {
                      const Icon = recordTypeIcons[record.type] || FileText
                      return (
                        <div
                          key={record.id}
                          className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={record.petImage} alt={record.petName} className="object-cover" />
                                <AvatarFallback>{record.petName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="capitalize text-xs">
                                    <Icon className="mr-1 h-3 w-3" />
                                    {record.type}
                                  </Badge>
                                  <span className="font-medium text-foreground">{record.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{record.petName}</p>
                              </div>
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
                      )
                    })
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-foreground">No Medical Records</p>
                    <p className="text-sm text-muted-foreground">Add your pet&apos;s medical history to keep track.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ongoing Conditions &amp; Allergies</CardTitle>
              <CardDescription>Chronic conditions and known allergies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredRecords.filter(r => r.type === "condition" || r.type === "allergy").length > 0 ? (
                  filteredRecords
                    .filter(r => r.type === "condition" || r.type === "allergy")
                    .map((record) => (
                      <div
                        key={record.id}
                        className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={record.petImage} alt={record.petName} className="object-cover" />
                              <AvatarFallback>{record.petName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`text-xs ${
                                  record.type === "allergy" ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-warning/10 text-warning border-warning/30"
                                }`}>
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {record.type === "allergy" ? "Allergy" : "Condition"}
                                </Badge>
                                <span className="font-medium text-foreground">{record.title}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{record.petName}</p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Diagnosed {format(new Date(record.date), "MMM d, yyyy")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{record.notes}</p>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-3">
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </div>
                    <p className="font-medium text-foreground">No Conditions or Allergies</p>
                    <p className="text-sm text-muted-foreground">Great news! No ongoing conditions recorded.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
