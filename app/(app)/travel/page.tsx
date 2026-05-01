"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Plane,
  Globe,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  ChevronRight,
  Info,
} from "lucide-react"
import { pets, countryRequirements } from "@/lib/mock-data"

export default function TravelPage() {
  const [selectedPet, setSelectedPet] = useState("")
  const [destination, setDestination] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCountries = countryRequirements.filter(country =>
    country.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedCountry = countryRequirements.find(c => c.country === destination)
  const selectedPetData = pets.find(p => p.id === selectedPet)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Travel Planning</h1>
          <p className="text-muted-foreground">
            Check requirements and prepare documentation for international pet travel
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan Your Trip</CardTitle>
          <CardDescription>Select your pet and destination to see requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Traveling Pet</FieldLabel>
              <Select value={selectedPet} onValueChange={setSelectedPet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} ({pet.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Destination Country</FieldLabel>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {countryRequirements.map((country) => (
                    <SelectItem key={country.country} value={country.country}>
                      {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Travel Date</FieldLabel>
              <Input type="date" />
            </Field>
          </div>
        </CardContent>
      </Card>

      {selectedCountry && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {selectedCountry.country} Requirements
                    </CardTitle>
                    <CardDescription>Required documentation and procedures</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedCountry.processingTime}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCountry.requirements.map((req, index) => {
                    // Simulate checking if pet meets requirement
                    const isMet = selectedPetData && (
                      (req.includes("microchip") && selectedPetData.microchipId) ||
                      (req.includes("Rabies") && selectedPetData.vaccinations.some(v => v.name === "Rabies" && v.status === "current"))
                    )
                    
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border border-border p-4"
                      >
                        {isMet ? (
                          <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className={`font-medium ${isMet ? "text-foreground" : "text-muted-foreground"}`}>
                            {req}
                          </p>
                          {!isMet && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Action required before travel
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {selectedCountry.notes && (
                  <div className="mt-4 flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <Info className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Important Note</p>
                      <p className="text-sm text-muted-foreground">{selectedCountry.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedPetData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pet Readiness: {selectedPetData.name}</CardTitle>
                  <CardDescription>Current status of travel requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedPetData.microchipId ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                        <span className="font-medium">Microchip</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedPetData.microchipId
                          ? `Registered: ${selectedPetData.microchipId}`
                          : "Not microchipped - required for travel"}
                      </p>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedPetData.vaccinations.some(v => v.name === "Rabies" && v.status === "current") ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                        <span className="font-medium">Rabies Vaccination</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedPetData.vaccinations.find(v => v.name === "Rabies")
                          ? "Current - valid for travel"
                          : "Vaccination required"}
                      </p>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedPetData.travelDocuments.some(d => d.type === "health-certificate" && d.status === "valid") ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                        <span className="font-medium">Health Certificate</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedPetData.travelDocuments.some(d => d.type === "health-certificate" && d.status === "valid")
                          ? "Valid certificate on file"
                          : "Certificate needed - obtain within 10 days of travel"}
                      </p>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedPetData.travelDocuments.some(d => d.type === "rabies-titer" && d.status === "valid") ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                        <span className="font-medium">Rabies Titer Test</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedPetData.travelDocuments.some(d => d.type === "rabies-titer" && d.status === "valid")
                          ? "Valid titer on file"
                          : "May be required - check destination requirements"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
                <CardDescription>Recommended preparation schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
                  {[
                    { time: "6+ months", task: "Start rabies titer test if required" },
                    { time: "4 months", task: "Ensure all vaccinations are current" },
                    { time: "1 month", task: "Schedule vet appointment for health cert" },
                    { time: "10 days", task: "Obtain health certificate" },
                    { time: "5 days", task: "Complete tapeworm treatment if required" },
                    { time: "Day of", task: "Bring all documentation" },
                  ].map((item, index) => (
                    <div key={index} className="relative flex items-start gap-4 pl-6">
                      <div className="absolute left-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary" />
                      <div>
                        <p className="font-medium text-foreground">{item.time}</p>
                        <p className="text-sm text-muted-foreground">{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="https://www.aphis.usda.gov/pet-travel" target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      USDA Pet Travel Guide
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/documents">
                      <FileText className="mr-2 h-4 w-4" />
                      My Travel Documents
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/portal/airline">
                      <Plane className="mr-2 h-4 w-4" />
                      Airline Portal
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!selectedCountry && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Browse Country Requirements</CardTitle>
            <CardDescription>Search for pet import requirements by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {filteredCountries.map((country) => (
                <button
                  key={country.country}
                  onClick={() => setDestination(country.country)}
                  className="flex items-center justify-between rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{country.country}</p>
                    <p className="text-sm text-muted-foreground">
                      {country.requirements.length} requirements &middot; {country.processingTime}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
