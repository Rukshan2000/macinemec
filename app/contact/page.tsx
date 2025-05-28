"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Factory,
  MessageSquare,
  VoicemailIcon as Fax,
  User,
} from "lucide-react"

// Contact data from JSON
const contactData = {
  contact: {
    title: "Let's Work Together!",
    description:
      "If you're interested in hearing more about how we work, have a business proposal, or want to make a purchase, we'd love to hear from you.",
    officeAddress: {
      title: "Office Address",
      street: "No. 209/44, Biyagama City",
      area: "Siyambalape South, Siyambalape",
      city: "Biyagama",
      country: "Sri Lanka",
    },
    workshopAddress: {
      title: "Workshop Address",
      street: "No. 187/B2",
      area: "Biyagama Export Processing Road",
      city: "Biyagama",
      country: "Sri Lanka",
    },
    phone: "071 413 9919 / 0112 400088",
    fax: "0112 400088",
    emails: ["machinemec@sltnet.lk", "MD@machinemecengineering.com", "palithamme@gmail.com"],
  },
  offices: [
    {
      name: "Head Office",
      address: "No. 209/44, Biyagama City, Siyambalape South, Siyambalape, Biyagama, Sri Lanka",
      phone: "071 413 9919 / 0112 400088",
      fax: "0112 400088",
      email: "machinemec@sltnet.lk",
      type: "office",
    },
    {
      name: "Workshop Facility",
      address: "No. 187/B2, Biyagama Export Processing Road, Biyagama, Sri Lanka",
      phone: "071 413 9919",
      email: "MD@machinemecengineering.com",
      type: "workshop",
    },
  ],
  managingDirector: {
    name: "Mr. Palitha Thilakarathna",
    email: "palithamme@gmail.com",
    title: "Managing Director",
  },
  businessHours: {
    weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 12:00 PM",
    sunday: "Sunday: Closed",
  },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      lastName: "",
      email: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-primary/80 text-sm font-medium mb-6">
            <span>Contact Machinemec Engineering</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{contactData.contact.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{contactData.contact.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-md bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background border-border focus:border-primary/50"
                        placeholder="Your first name"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-background border-border focus:border-primary/50"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-background border-border focus:border-primary/50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-background border-border focus:border-primary/50 resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium rounded-md subtle-shadow transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" />
                        Submit
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Locations */}
            {contactData.offices.map((office, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      {office.type === "office" ? (
                        <Building2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Factory className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-foreground">{office.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{office.phone}</p>
                    </div>

                    {office.fax && (
                      <div className="flex items-center gap-3">
                        <Fax className="h-4 w-4 text-primary flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">Fax: {office.fax}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{office.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Managing Director */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">Managing Director</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">{contactData.managingDirector.name}</p>
                    <p className="text-sm text-muted-foreground">{contactData.managingDirector.title}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{contactData.managingDirector.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">Business Hours</h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{contactData.businessHours.weekdays}</p>
                  <p className="text-sm text-muted-foreground">{contactData.businessHours.saturday}</p>
                  <p className="text-sm text-muted-foreground">{contactData.businessHours.sunday}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Contact Information */}
        <section className="mt-16">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Multiple Ways to Reach Us</h3>
                <p className="text-muted-foreground">Choose the most convenient way to get in touch with our team</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Phone & Fax</h4>
                  <p className="text-sm text-muted-foreground">{contactData.contact.phone}</p>
                  <p className="text-sm text-muted-foreground">Fax: {contactData.contact.fax}</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Email Addresses</h4>
                  {contactData.contact.emails.map((email, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {email}
                    </p>
                  ))}
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Visit Our Locations</h4>
                  <p className="text-sm text-muted-foreground">Office & Workshop in Biyagama</p>
                  <p className="text-sm text-muted-foreground">Sri Lanka</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
