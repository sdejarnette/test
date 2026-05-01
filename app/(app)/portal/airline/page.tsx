import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plane,
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Shield,
  Dog,
  Clock,
} from "lucide-react"

export default function AirlinePortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">Airline Portal</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Airline Verification</h1>
          <p className="text-muted-foreground">
            Verify pet documentation and service animal credentials
          </p>
        </div>
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 shrink-0">
              <Plane className="h-8 w-8 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2">Verify Pet Documentation</h2>
              <p className="text-muted-foreground mb-4">
                Scan the passenger&apos;s PawPass QR code or enter their verification ID to confirm pet travel eligibility
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Enter verification ID or booking reference..." className="pl-9" />
                </div>
                <Button variant="outline">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
                <Button>Verify</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Today</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Service Animals</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Verifications</CardTitle>
              <CardDescription>Latest pet verification requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    pet: "Luna", 
                    owner: "Sarah M.", 
                    flight: "UA 1234", 
                    type: "Service Animal",
                    status: "verified",
                    time: "10 min ago"
                  },
                  { 
                    pet: "Max", 
                    owner: "David K.", 
                    flight: "UA 5678", 
                    type: "Cabin Pet",
                    status: "verified",
                    time: "25 min ago"
                  },
                  { 
                    pet: "Bella", 
                    owner: "Emily T.", 
                    flight: "UA 9012", 
                    type: "Cargo",
                    status: "pending",
                    time: "1 hour ago"
                  },
                  { 
                    pet: "Charlie", 
                    owner: "Chris P.", 
                    flight: "UA 3456", 
                    type: "Service Animal",
                    status: "rejected",
                    reason: "Expired health certificate",
                    time: "2 hours ago"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        item.status === "verified" ? "bg-success/10" :
                        item.status === "pending" ? "bg-warning/10" :
                        "bg-destructive/10"
                      }`}>
                        {item.status === "verified" ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : item.status === "pending" ? (
                          <Clock className="h-5 w-5 text-warning" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{item.pet}</p>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.owner} &middot; Flight {item.flight}
                        </p>
                        {item.reason && (
                          <p className="text-xs text-destructive">{item.reason}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={
                        item.status === "verified" ? "bg-success/10 text-success border-success/30" :
                        item.status === "pending" ? "bg-warning/10 text-warning border-warning/30" :
                        "bg-destructive/10 text-destructive border-destructive/30"
                      }>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
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
              <CardTitle className="text-lg">Verification Checklist</CardTitle>
              <CardDescription>Required for pet travel approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { item: "Valid health certificate (within 10 days)", required: true },
                  { item: "Current rabies vaccination", required: true },
                  { item: "ISO microchip registered", required: true },
                  { item: "Carrier meets size requirements", required: true },
                  { item: "Service animal verification (if applicable)", required: false },
                  { item: "Destination country import permit", required: false },
                ].map((check, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`h-5 w-5 rounded border-2 shrink-0 ${
                      check.required ? "border-primary bg-primary/10" : "border-muted"
                    }`} />
                    <div>
                      <p className="text-sm text-foreground">{check.item}</p>
                      {check.required && (
                        <p className="text-xs text-muted-foreground">Required</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Pet Policy Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Service Animal FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Dog className="mr-2 h-4 w-4" />
                  Breed Restrictions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
