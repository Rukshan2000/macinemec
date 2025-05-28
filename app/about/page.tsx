import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Users, Target, Lightbulb } from "lucide-react"

async function getAboutData() {
  try {
    const filePath = path.join(process.cwd(), "data", "about.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error loading about data:", error)
    return {
      company: {
        name: "Machinemec Engineering",
        founded: "2009",
        mission: "To become the preferred provider of superior construction services.",
        vision: "To become the premier steel builder of the Nation.",
        description:
          "Machinemec Engineering (Pvt) Ltd is committed to being the most reliable and sought-after steel fabrication and construction company in Sri Lanka.",
      },
      values: [
        {
          title: "Partnership",
          description: "Building strong partnerships with external providers for comprehensive solutions",
        },
        {
          title: "Safety & Compliance",
          description: "Unwavering commitment to safety standards and legal compliance in all operations",
        },
        {
          title: "Continuous Improvement",
          description: "Dedicated to continuous process improvement and innovation in engineering",
        },
        {
          title: "Professionalism",
          description: "Maintaining the highest standards of professionalism and integrity in all dealings",
        },
      ],
      team: [
        {
          name: "Mr. Palitha Thilakarathna",
          position: "Managing Director",
          experience: "20+ years",
          image: "/placeholder.svg?height=300&width=300",
        },
      ],
      certifications: [
        "Incorporation Certificate No: PV - 14942",
        "VAT Registration No: 114448630 - 7000",
        "SVAT Registration No: 002868",
        "ISO Quality Management Standards",
      ],
    }
  }
}

export default async function AboutPage() {
  const data = await getAboutData()

  const valueIcons = {
    Innovation: Lightbulb,
    Quality: Award,
    Sustainability: Target,
    Safety: CheckCircle,
    Partnership: Users,
    "Safety & Compliance": CheckCircle,
    "Continuous Improvement": Target,
    Professionalism: Award,
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            About <span className="text-primary">{data.company?.name || "Machinemec Engineering"}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {data.company?.description || "Leading construction and engineering company in Sri Lanka"}
          </p>
        </div>

        {/* Company Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30">
                  Founded {data.company?.founded || "2009"}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30">
                  15+ Years Experience
                </Badge>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{data.company?.mission}</p>

              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{data.company?.vision}</p>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=About+Us"
                alt="MachineMec Engineering Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.values &&
              data.values.map((value: any, index: number) => {
                const IconComponent = valueIcons[value.title as keyof typeof valueIcons] || CheckCircle
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals leading MachineMec Engineering towards innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.team &&
              data.team.map((member: any, index: number) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300&text=Team+Member"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.position}</p>
                    <div className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{member.experience}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Certifications & Standards</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to quality and safety is validated by industry-leading certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.certifications &&
              data.certifications.map((cert: string, index: number) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-6 flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cert}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-primary/5 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/placeholder.svg?height=600&width=1200&text=Contact+Us"
                alt="Contact background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-foreground">Ready to Work With Us?</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have trusted MachineMec Engineering with their construction
                projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-md shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  Get In Touch
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground border border-border hover:border-primary/50 rounded-md hover:bg-accent/50 transition-all duration-300"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
