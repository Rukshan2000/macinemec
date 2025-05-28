import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, DollarSign, User, CheckCircle } from "lucide-react"

async function getProjectsData() {
  const filePath = path.join(process.cwd(), "data", "projects.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}

async function getProject(projectId: string) {
  const data = await getProjectsData()
  return data.projects.find((project: any) => project.id === projectId)
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string }
}) {
  const project = await getProject(params.projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/projects" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                {project.category}
              </Badge>
              <Badge
                variant={project.details.status === "Completed" ? "default" : "secondary"}
                className={
                  project.details.status === "Completed"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }
              >
                {project.details.status}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{project.description}</p>

            {/* Project Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-muted-foreground">
                <User className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="text-sm">Client</div>
                  <div className="font-medium text-foreground">{project.details.client}</div>
                </div>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="text-sm">Duration</div>
                  <div className="font-medium text-foreground">{project.details.duration}</div>
                </div>
              </div>

              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="text-sm">Location</div>
                  <div className="font-medium text-foreground">{project.details.location}</div>
                </div>
              </div>

              <div className="flex items-center text-muted-foreground">
                <DollarSign className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="text-sm">Budget</div>
                  <div className="font-medium text-foreground">{project.details.budget}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 lg:h-full rounded-xl overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        </div>

        {/* Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((image: string, index: number) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} gallery ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Features & Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Key Features</h3>
              <div className="space-y-4">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-4 py-2 text-sm border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-colors duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Interested in a Similar Project?</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your construction vision to life with our innovative solutions and
              expertise.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Your Project
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
