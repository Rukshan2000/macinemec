import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, MapPin } from "lucide-react"

async function getProjectsData() {
  const filePath = path.join(process.cwd(), "data", "projects.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}

export default async function ProjectsPage() {
  const data = await getProjectsData()

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-primary/80 text-sm font-medium mb-6">
            <span>Construction Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of innovative construction projects that showcase our expertise in modern engineering
            and smart building solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {data.projects.map((project: any) => (
            <Card
              key={project.id}
              className="group hover:subtle-shadow transition-all duration-500 bg-card border-border hover:border-primary/20 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 text-foreground backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge
                    variant={project.details.status === "Completed" ? "default" : "secondary"}
                    className={
                      project.details.status === "Completed"
                        ? "bg-green-500/20 text-green-600 dark:text-green-400 backdrop-blur-sm"
                        : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 backdrop-blur-sm"
                    }
                  >
                    {project.details.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-2 text-primary/60" />
                    {project.details.location}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-2 text-primary/60" />
                    {project.details.duration}
                  </div>
                </div>

                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium group/link"
                >
                  View Details
                  <ArrowRight className="ml-2 h-3 w-3 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
