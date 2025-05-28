"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ZoomIn, Filter } from "lucide-react"

// Since we can't use fs in client components, we'll simulate the data
const galleryData = {
  categories: [
    {
      id: "infrastructure",
      name: "Infrastructure",
      images: [
        {
          id: "1",
          url: "/placeholder.svg?height=400&width=600",
          title: "Metro Station Construction",
          description: "Advanced metro infrastructure development",
        },
        {
          id: "2",
          url: "/placeholder.svg?height=400&width=600",
          title: "Highway Bridge",
          description: "Modern bridge construction with smart monitoring",
        },
        {
          id: "3",
          url: "/placeholder.svg?height=400&width=600",
          title: "Airport Terminal",
          description: "State-of-the-art airport terminal facility",
        },
        {
          id: "10",
          url: "/placeholder.svg?height=400&width=600",
          title: "Railway Station",
          description: "Modern railway infrastructure project",
        },
        {
          id: "11",
          url: "/placeholder.svg?height=400&width=600",
          title: "Underground Tunnel",
          description: "Advanced tunneling technology implementation",
        },
        {
          id: "12",
          url: "/placeholder.svg?height=400&width=600",
          title: "Smart Highway",
          description: "Intelligent transportation infrastructure",
        },
      ],
    },
    {
      id: "commercial",
      name: "Commercial",
      images: [
        {
          id: "4",
          url: "/placeholder.svg?height=400&width=600",
          title: "Smart Office Building",
          description: "Intelligent commercial building systems",
        },
        {
          id: "5",
          url: "/placeholder.svg?height=400&width=600",
          title: "Shopping Complex",
          description: "Modern retail and entertainment complex",
        },
        {
          id: "6",
          url: "/placeholder.svg?height=400&width=600",
          title: "Hotel Tower",
          description: "Luxury hotel with smart amenities",
        },
        {
          id: "13",
          url: "/placeholder.svg?height=400&width=600",
          title: "Corporate Headquarters",
          description: "Sustainable corporate office complex",
        },
        {
          id: "14",
          url: "/placeholder.svg?height=400&width=600",
          title: "Mixed-Use Development",
          description: "Integrated commercial and residential project",
        },
        {
          id: "15",
          url: "/placeholder.svg?height=400&width=600",
          title: "Convention Center",
          description: "Large-scale event and exhibition facility",
        },
      ],
    },
    {
      id: "industrial",
      name: "Industrial",
      images: [
        {
          id: "7",
          url: "/placeholder.svg?height=400&width=600",
          title: "Manufacturing Plant",
          description: "Automated manufacturing facility",
        },
        {
          id: "8",
          url: "/placeholder.svg?height=400&width=600",
          title: "Warehouse Complex",
          description: "Smart logistics and storage facility",
        },
        {
          id: "9",
          url: "/placeholder.svg?height=400&width=600",
          title: "Power Plant",
          description: "Renewable energy generation facility",
        },
        {
          id: "16",
          url: "/placeholder.svg?height=400&width=600",
          title: "Chemical Processing Plant",
          description: "Advanced chemical manufacturing facility",
        },
        {
          id: "17",
          url: "/placeholder.svg?height=400&width=600",
          title: "Data Center",
          description: "High-tech data processing facility",
        },
        {
          id: "18",
          url: "/placeholder.svg?height=400&width=600",
          title: "Research Laboratory",
          description: "State-of-the-art research and development facility",
        },
      ],
    },
  ],
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredImages, setFilteredImages] = useState<any[]>([])

  useEffect(() => {
    if (selectedCategory === "all") {
      const allImages = galleryData.categories.flatMap((category) =>
        category.images.map((image) => ({ ...image, category: category.name })),
      )
      setFilteredImages(allImages)
    } else {
      const category = galleryData.categories.find((cat) => cat.id === selectedCategory)
      if (category) {
        setFilteredImages(category.images.map((image) => ({ ...image, category: category.name })))
      }
    }
  }, [selectedCategory])

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive portfolio showcasing innovative construction projects across various sectors and
            industries.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "border-border hover:border-blue-500/50 hover:bg-accent/50"
            }`}
          >
            <Filter className="mr-2 h-4 w-4" />
            All Projects
          </Button>
          {galleryData.categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "border-border hover:border-blue-500/50 hover:bg-accent/50"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-border/50 hover:border-blue-500/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {image.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-md border-border/50">
                <div className="relative h-96 md:h-[600px]">
                  <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-contain" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {image.category}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{image.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{image.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Stats Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-8 text-foreground">Our Portfolio in Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-muted-foreground">Cities Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">15+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">99%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
