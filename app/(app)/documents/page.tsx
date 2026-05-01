"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Filter,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { pets } from "@/lib/mock-data"
import { format } from "date-fns"

export default function DocumentsPage() {
  const [selectedPetId, setSelectedPetId] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [documentType, setDocumentType] = useState<string>("all")

  const allDocuments = pets.flatMap(pet =>
    pet.travelDocuments.map(doc => ({
      ...doc,
      petName: pet.name,
      petId: pet.id,
      petImage: pet.profileImage,
    }))
  )

  const filteredDocuments = allDocuments
    .filter(doc => selectedPetId === "all" || doc.petId === selectedPetId)
    .filter(doc => documentType === "all" || doc.type === documentType)
    .filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const statusColors = {
    valid: "bg-success/10 text-success border-success/30",
    pending: "bg-warning/10 text-warning border-warning/30",
    expired: "bg-destructive/10 text-destructive border-destructive/30",
  }

  const documentTypeLabels: Record<string, string> = {
    "health-certificate": "Health Certificate",
    "import-permit": "Import Permit",
    "rabies-titer": "Rabies Titer",
    "microchip-registration": "Microchip Registration",
    "pet-passport": "Pet Passport",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize all pet-related documents
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
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
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="health-certificate">Health Certificate</SelectItem>
                <SelectItem value="import-permit">Import Permit</SelectItem>
                <SelectItem value="rabies-titer">Rabies Titer</SelectItem>
                <SelectItem value="microchip-registration">Microchip Registration</SelectItem>
                <SelectItem value="pet-passport">Pet Passport</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valid Documents</p>
                <p className="text-2xl font-bold text-foreground">
                  {allDocuments.filter(d => d.status === "valid").length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">
                  {allDocuments.filter(d => d.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold text-foreground">
                  {allDocuments.filter(d => d.status === "expired").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length > 0 ? (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <Badge variant="outline" className={statusColors[doc.status]}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={doc.petImage} alt={doc.petName} />
                          <AvatarFallback className="text-xs">{doc.petName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{doc.petName}</span>
                        <span>&middot;</span>
                        <span>{documentTypeLabels[doc.type] || doc.type}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.issuingAuthority} &middot; #{doc.documentNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4 hidden sm:block">
                      <p className="text-sm text-muted-foreground">
                        Issued: {format(new Date(doc.issueDate), "MMM d, yyyy")}
                      </p>
                      {doc.expirationDate && (
                        <p className="text-xs text-muted-foreground">
                          Expires: {format(new Date(doc.expirationDate), "MMM d, yyyy")}
                        </p>
                      )}
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No Documents Found</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                {searchQuery || documentType !== "all" || selectedPetId !== "all"
                  ? "Try adjusting your filters to find documents."
                  : "Upload your first document to get started."}
              </p>
              {!searchQuery && documentType === "all" && selectedPetId === "all" && (
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
