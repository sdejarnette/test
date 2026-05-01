"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Image, Camera, Stethoscope, Trophy, Plane, Send, Users, TrendingUp } from "lucide-react"
import { FeedPostCard } from "@/components/feed/feed-post-card"
import { feedPosts, pets, currentOwner } from "@/lib/mock-data"

export default function FeedPage() {
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedPet, setSelectedPet] = useState(pets[0]?.id || "")
  const [filter, setFilter] = useState("all")

  const handlePost = () => {
    if (newPostContent.trim() && selectedPet) {
      // In a real app, this would create the post
      setNewPostContent("")
    }
  }

  const filteredPosts = filter === "all"
    ? feedPosts
    : feedPosts.filter((post) => post.type === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Community Feed</h1>
          <p className="text-muted-foreground">
            Share updates and celebrate milestones with the pet community
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentOwner.profileImage} alt={currentOwner.name} />
                  <AvatarFallback>
                    {currentOwner.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Share an update about your pet..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select value={selectedPet} onValueChange={setSelectedPet}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select pet" />
                        </SelectTrigger>
                        <SelectContent>
                          {pets.map((pet) => (
                            <SelectItem key={pet.id} value={pet.id}>
                              {pet.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="hidden sm:flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="h-4 w-4" />
                          <span className="sr-only">Add image</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Take photo</span>
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handlePost} disabled={!newPostContent.trim() || !selectedPet}>
                      <Send className="mr-2 h-4 w-4" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="milestone" className="hidden sm:flex">
                  <Trophy className="mr-1 h-3 w-3" />
                  Milestones
                </TabsTrigger>
                <TabsTrigger value="health-update" className="hidden sm:flex">
                  <Stethoscope className="mr-1 h-3 w-3" />
                  Health
                </TabsTrigger>
                <TabsTrigger value="travel" className="hidden sm:flex">
                  <Plane className="mr-1 h-3 w-3" />
                  Travel
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Be the first to share an update! Post about your pet&apos;s milestones, health updates, or adventures.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { tag: "#VaccinationDay", posts: 234 },
                  { tag: "#ServiceDogLife", posts: 189 },
                  { tag: "#PetTravel", posts: 156 },
                  { tag: "#HealthyPets", posts: 142 },
                  { tag: "#MilestoneMonday", posts: 98 },
                ].map((topic) => (
                  <div
                    key={topic.tag}
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <span className="text-sm font-medium text-primary">{topic.tag}</span>
                    <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Suggested Follows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Max", breed: "German Shepherd", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&h=80&fit=crop&crop=face", owner: "David K." },
                  { name: "Bella", breed: "Labrador", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=80&h=80&fit=crop&crop=face", owner: "Emily T." },
                  { name: "Charlie", breed: "Beagle", image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=80&h=80&fit=crop&crop=face", owner: "Chris P." },
                ].map((pet) => (
                  <div key={pet.name} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={pet.image} alt={pet.name} className="object-cover" />
                      <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{pet.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{pet.breed} &middot; {pet.owner}</p>
                    </div>
                    <Button variant="outline" size="sm">Follow</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-2">Community Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                Keep our community safe and friendly. Share only your own pets&apos; photos and be respectful of others.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
