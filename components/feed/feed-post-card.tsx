"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Trophy,
  Camera,
  Stethoscope,
  Plane,
  Star,
  Send,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type FeedPost } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface FeedPostCardProps {
  post: FeedPost
}

const postTypeConfig = {
  milestone: { icon: Star, label: "Milestone", color: "bg-warning/10 text-warning" },
  photo: { icon: Camera, label: "Photo", color: "bg-primary/10 text-primary" },
  "health-update": { icon: Stethoscope, label: "Health Update", color: "bg-success/10 text-success" },
  travel: { icon: Plane, label: "Travel", color: "bg-accent/10 text-accent" },
  achievement: { icon: Trophy, label: "Achievement", color: "bg-primary/10 text-primary" },
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  const typeConfig = postTypeConfig[post.type]
  const TypeIcon = typeConfig.icon

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      // In a real app, this would post the comment
      setNewComment("")
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.petImage} alt={post.petName} className="object-cover" />
              <AvatarFallback>{post.petName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{post.petName}</span>
                <Badge variant="outline" className={cn("text-xs", typeConfig.color)}>
                  <TypeIcon className="mr-1 h-3 w-3" />
                  {typeConfig.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {post.ownerName} &middot; {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-foreground mb-3">{post.content}</p>
        
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={`Post by ${post.petName}`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-border pt-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-2",
                isLiked && "text-destructive hover:text-destructive"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span>{likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full space-y-3">
            {post.comments.length > 0 && (
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.authorImage} alt={comment.authorName} />
                      <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{comment.authorName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] resize-none"
                />
                <Button
                  size="icon"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send comment</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
