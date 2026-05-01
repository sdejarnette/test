import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: "default" | "success" | "warning" | "destructive"
}

const variantStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", variantStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
