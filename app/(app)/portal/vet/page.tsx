import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Stethoscope,
  Search,
  QrCode,
  FileText,
  CheckCircle2,
  Clock,
  Syringe,
  Upload,
  Download,
  ClipboardList,
} from "lucide-react"

export default function VetPortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">Veterinary Portal</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Veterinary Access</h1>
          <p className="text-muted-foreground">
            Access patient records and submit verifications
          </p>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shrink-0">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2">Look Up Patient</h2>
              <p className="text-muted-foreground mb-4">
                Search by microchip ID, patient name, or scan the PawPass QR code to access records
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Enter microchip ID or patient name..." className="pl-9" />
                </div>
                <Button variant="outline">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
                <Button>Search</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common veterinary tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Syringe className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add Vaccination</p>
                    <p className="text-sm text-muted-foreground">Record a new vaccination for a patient</p>
                  </div>
                </button>

                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Issue Health Certificate</p>
                    <p className="text-sm text-muted-foreground">Create travel health documentation</p>
                  </div>
                </button>

                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Verify Records</p>
                    <p className="text-sm text-muted-foreground">Confirm and sign off on patient records</p>
                  </div>
                </button>

                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                    <ClipboardList className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add Medical Record</p>
                    <p className="text-sm text-muted-foreground">Document exam results or procedures</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest records and verifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { pet: "Luna", action: "Vaccination Record Added", type: "Rabies", time: "2 hours ago", status: "complete" },
                  { pet: "Max", action: "Health Certificate Issued", type: "Travel to UK", time: "5 hours ago", status: "complete" },
                  { pet: "Bella", action: "Annual Exam Recorded", type: "Wellness Check", time: "1 day ago", status: "complete" },
                  { pet: "Charlie", action: "Pending Verification", type: "Service Animal", time: "2 days ago", status: "pending" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      {item.status === "complete" ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Clock className="h-5 w-5 text-warning" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{item.pet} - {item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { pet: "Luna", request: "Health Certificate", due: "Tomorrow" },
                  { pet: "Charlie", request: "Service Animal Verification", due: "3 days" },
                ].map((item, index) => (
                  <div key={index} className="rounded-lg bg-warning/5 border border-warning/20 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground">{item.pet}</p>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                        Due: {item.due}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.request}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  USDA APHIS Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Import Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
