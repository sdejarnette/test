import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Shield,
  Scale,
  ClipboardCheck,
  History,
} from "lucide-react"

export default function AuthorityPortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">Authority Portal</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Regulatory Access</h1>
          <p className="text-muted-foreground">
            Verify compliance and review service animal registrations
          </p>
        </div>
      </div>

      <Card className="bg-muted/30 border-muted">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shrink-0">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2">Verify Credentials</h2>
              <p className="text-muted-foreground mb-4">
                Look up service animal registrations, verify training certifications, or review compliance records
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Enter registration ID, microchip, or owner name..." className="pl-9" />
                </div>
                <Button variant="outline">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan ID
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
              <CardTitle className="text-lg">Verification Tools</CardTitle>
              <CardDescription>Access regulatory and compliance tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Service Animal Registry</p>
                    <p className="text-sm text-muted-foreground">Search registered service animals and their handlers</p>
                  </div>
                </button>

                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <ClipboardCheck className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Training Certifications</p>
                    <p className="text-sm text-muted-foreground">Verify training program completions</p>
                  </div>
                </button>

                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Scale className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compliance Records</p>
                    <p className="text-sm text-muted-foreground">Review ADA and DOT compliance status</p>
                  </div>
                </button>

                <button className="flex items-start gap-4 rounded-lg border border-border p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                    <History className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Audit History</p>
                    <p className="text-sm text-muted-foreground">View verification audit trails</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Inquiries</CardTitle>
              <CardDescription>Latest verification requests processed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    id: "SA-2024-1234", 
                    type: "Service Animal Verification",
                    requestor: "United Airlines",
                    status: "verified",
                    time: "15 min ago"
                  },
                  { 
                    id: "TC-2024-5678", 
                    type: "Training Certification Check",
                    requestor: "City of Portland",
                    status: "verified",
                    time: "1 hour ago"
                  },
                  { 
                    id: "SA-2024-9012", 
                    type: "Service Animal Verification",
                    requestor: "Delta Air Lines",
                    status: "pending",
                    time: "2 hours ago"
                  },
                  { 
                    id: "CR-2024-3456", 
                    type: "Compliance Review",
                    requestor: "DOT Audit",
                    status: "verified",
                    time: "1 day ago"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.status === "verified" ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : item.status === "pending" ? (
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{item.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.type} &middot; {item.requestor}
                        </p>
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
              <CardTitle className="text-lg">Statistics</CardTitle>
              <CardDescription>This month&apos;s activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Verifications</span>
                  <span className="text-lg font-bold text-foreground">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Service Animals</span>
                  <span className="text-lg font-bold text-foreground">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Training Certs</span>
                  <span className="text-lg font-bold text-foreground">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Compliance Reviews</span>
                  <span className="text-lg font-bold text-foreground">121</span>
                </div>
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
                  <Scale className="mr-2 h-4 w-4" />
                  ADA Service Animal Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  DOT ACAA Regulations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  State-Specific Laws
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-2">Need Assistance?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Contact our compliance team for help with complex verification requests.
              </p>
              <Button size="sm" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
