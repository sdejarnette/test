"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { ArrowLeft, Dog, Cat, Upload, Loader2 } from "lucide-react"

const dogBreeds = [
  "Golden Retriever",
  "Labrador Retriever",
  "German Shepherd",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Siberian Husky",
  "Great Dane",
  "Doberman Pinscher",
  "Shih Tzu",
  "Other",
]

const catBreeds = [
  "Maine Coon",
  "Persian",
  "Ragdoll",
  "British Shorthair",
  "Siamese",
  "Bengal",
  "Abyssinian",
  "Scottish Fold",
  "Sphynx",
  "Russian Blue",
  "American Shorthair",
  "Norwegian Forest Cat",
  "Devon Rex",
  "Birman",
  "Domestic Shorthair",
  "Other",
]

const serviceAnimalTypes = [
  { value: "guide", label: "Guide Dog" },
  { value: "hearing", label: "Hearing Dog" },
  { value: "mobility", label: "Mobility Assistance" },
  { value: "psychiatric", label: "Psychiatric Service Dog" },
  { value: "medical-alert", label: "Medical Alert Dog" },
]

export default function NewPetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [species, setSpecies] = useState<"dog" | "cat">("dog")
  const [isServiceAnimal, setIsServiceAnimal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    router.push("/pets")
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
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Add New Pet</h1>
          <p className="text-muted-foreground">Create a new pet profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter your pet&apos;s basic details</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Pet Type</FieldLabel>
                    <RadioGroup
                      value={species}
                      onValueChange={(v) => setSpecies(v as "dog" | "cat")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="dog" id="dog" />
                        <Label htmlFor="dog" className="flex items-center gap-2 cursor-pointer">
                          <Dog className="h-4 w-4" />
                          Dog
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="cat" id="cat" />
                        <Label htmlFor="cat" className="flex items-center gap-2 cursor-pointer">
                          <Cat className="h-4 w-4" />
                          Cat
                        </Label>
                      </div>
                    </RadioGroup>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input id="name" placeholder="Enter pet name" required />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="breed">Breed</FieldLabel>
                      <Select required>
                        <SelectTrigger id="breed">
                          <SelectValue placeholder="Select breed" />
                        </SelectTrigger>
                        <SelectContent>
                          {(species === "dog" ? dogBreeds : catBreeds).map((breed) => (
                            <SelectItem key={breed} value={breed.toLowerCase().replace(/\s+/g, "-")}>
                              {breed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
                      <Input id="dateOfBirth" type="date" required />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="color">Color / Markings</FieldLabel>
                      <Input id="color" placeholder="e.g., Golden, Black & White" required />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="weight">Weight</FieldLabel>
                      <div className="flex gap-2">
                        <Input id="weight" type="number" placeholder="Weight" required className="flex-1" />
                        <Select defaultValue="lbs">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lbs">lbs</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="microchipId">Microchip ID (Optional)</FieldLabel>
                      <Input id="microchipId" placeholder="15-digit ISO microchip number" />
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Animal</CardTitle>
                <CardDescription>Configure service animal settings if applicable</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <FieldLabel className="mb-0">Is this a service animal?</FieldLabel>
                      <FieldDescription>
                        Service animals have special verification and travel privileges
                      </FieldDescription>
                    </div>
                    <Switch
                      checked={isServiceAnimal}
                      onCheckedChange={setIsServiceAnimal}
                    />
                  </Field>

                  {isServiceAnimal && (
                    <Field>
                      <FieldLabel htmlFor="serviceType">Service Animal Type</FieldLabel>
                      <Select required>
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceAnimalTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Any other important information about your pet</CardDescription>
              </CardHeader>
              <CardContent>
                <Field>
                  <FieldLabel htmlFor="notes">Notes</FieldLabel>
                  <Textarea
                    id="notes"
                    placeholder="Allergies, special needs, personality traits, etc."
                    rows={4}
                  />
                </Field>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo</CardTitle>
                <CardDescription>Upload a photo of your pet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Click to upload</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  After creating your pet&apos;s profile, you&apos;ll be able to:
                </p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                  <li>&bull; Add vaccination records</li>
                  <li>&bull; Upload medical documents</li>
                  <li>&bull; Request service animal verification</li>
                  <li>&bull; Prepare travel documentation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button asChild variant="outline">
            <Link href="/pets">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Pet Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
