"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { notifications } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

const unreadCount = notifications.filter((n) => !n.isRead).length

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </SidebarTrigger>

      <div className="hidden flex-1 md:flex">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search pets, records, documents..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <Link
                  href={notification.actionUrl || "#"}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <span className={`text-sm font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </span>
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="w-full text-center text-sm text-primary">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
