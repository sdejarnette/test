"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Key,
  Mail,
  CreditCard,
  Upload,
  Save,
  CheckCircle2,
} from "lucide-react"
import { currentOwner } from "@/lib/mock-data"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [vaccinationReminders, setVaccinationReminders] = useState(true)
  const [documentExpiry, setDocumentExpiry] = useState(true)
  const [socialUpdates, setSocialUpdates] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Information</CardTitle>
              <CardDescription>Update your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentOwner.profileImage} alt={currentOwner.name} />
                  <AvatarFallback className="text-xl">
                    {currentOwner.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input id="firstName" defaultValue="Sarah" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input id="lastName" defaultValue="Mitchell" />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input id="email" type="email" defaultValue={currentOwner.email} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input id="phone" type="tel" defaultValue={currentOwner.phone} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input id="address" defaultValue={currentOwner.address} />
                </Field>
              </FieldGroup>

              <div className="flex justify-end mt-6">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Field className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <FieldLabel className="mb-0">Email Notifications</FieldLabel>
                      <FieldDescription>Receive updates via email</FieldDescription>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </Field>

                <Field className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <FieldLabel className="mb-0">Push Notifications</FieldLabel>
                      <FieldDescription>Receive notifications on your device</FieldDescription>
                    </div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Types</CardTitle>
              <CardDescription>Select which notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">Vaccination Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified before vaccinations expire</p>
                  </div>
                  <Switch checked={vaccinationReminders} onCheckedChange={setVaccinationReminders} />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">Document Expiry Alerts</p>
                    <p className="text-sm text-muted-foreground">Notifications for expiring documents</p>
                  </div>
                  <Switch checked={documentExpiry} onCheckedChange={setDocumentExpiry} />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">Social Updates</p>
                    <p className="text-sm text-muted-foreground">Comments, likes, and community activity</p>
                  </div>
                  <Switch checked={socialUpdates} onCheckedChange={setSocialUpdates} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Password</CardTitle>
              <CardDescription>Update your password regularly to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                  <Input id="currentPassword" type="password" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <Input id="newPassword" type="password" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                  <Input id="confirmPassword" type="password" />
                </Field>
              </FieldGroup>
              <div className="flex justify-end mt-6">
                <Button>
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication Enabled</p>
                    <p className="text-sm text-muted-foreground">Your account is protected with 2FA</p>
                  </div>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Sessions</CardTitle>
              <CardDescription>Manage devices logged into your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { device: "MacBook Pro", location: "Portland, OR", current: true },
                  { device: "iPhone 15", location: "Portland, OR", current: false },
                  { device: "iPad Air", location: "Portland, OR", current: false },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground flex items-center gap-2">
                          {session.device}
                          {session.current && (
                            <Badge variant="secondary" className="text-xs">Current</Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{session.location}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Plan</CardTitle>
              <CardDescription>Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">Free Plan</h3>
                    <Badge>Current</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Basic features for pet owners</p>
                </div>
                <Button>Upgrade to Pro</Button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-3">Plan Features</h4>
                <ul className="space-y-2">
                  {[
                    "Up to 2 pet profiles",
                    "Basic vaccination tracking",
                    "Document storage (100MB)",
                    "Community feed access",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
              <CardDescription>Add a payment method for premium features</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
