"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  PawPrint,
  Newspaper,
  Stethoscope,
  Shield,
  Plane,
  FileText,
  Settings,
  Building2,
  BadgeCheck,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { currentOwner } from "@/lib/mock-data"

const mainNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "My Pets", href: "/pets", icon: PawPrint },
  { title: "Feed", href: "/feed", icon: Newspaper },
]

const healthNavItems = [
  { title: "Medical Records", href: "/medical", icon: Stethoscope },
  { title: "Service Animal", href: "/service-animal", icon: Shield },
]

const travelNavItems = [
  { title: "Travel", href: "/travel", icon: Plane },
  { title: "Documents", href: "/documents", icon: FileText },
]

const portalNavItems = [
  { title: "Vet Portal", href: "/portal/vet", icon: Stethoscope },
  { title: "Airline Portal", href: "/portal/airline", icon: Plane },
  { title: "Authority Portal", href: "/portal/authority", icon: Building2 },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <PawPrint className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground">PawPass</span>
            <span className="text-xs text-sidebar-foreground/60">Pet Health Passport</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel>Health & Wellness</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {healthNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel>Travel & Documents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {travelNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel>Verification Portals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portalNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentOwner.profileImage} alt={currentOwner.name} />
                    <AvatarFallback>
                      {currentOwner.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{currentOwner.name}</span>
                    <span className="text-xs text-sidebar-foreground/60">{currentOwner.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/verifications">
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    My Verifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
