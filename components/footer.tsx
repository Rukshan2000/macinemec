import Link from "next/link"
import Image from "next/image"
import { HardHat, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/placeholder.svg?height=600&width=1920&text=Blueprint"
          alt="Blueprint background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-md bg-primary/20">
                <HardHat className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-wider text-white">MACHINEMEC</div>
                <div className="text-xs text-primary font-medium tracking-widest">ENGINEERING</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Premier steel builders and engineering experts in Sri Lanka, providing complete engineering solutions
              since 2009.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors duration-300">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors duration-300">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors duration-300">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Services", "Projects", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-primary flex items-center transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Building Construction",
                "Steel Structures",
                "Water Infrastructure",
                "Machine Installation",
                "Engineering Consultation",
                "Project Management",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-primary flex items-center transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-gray-400 text-sm">
                  No. 209/44, Biyagama City, Siyambalape South, Siyambalape, Biyagama, Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">071 413 9919 / 0112 400088</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">machinemec@sltnet.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Machinemec Engineering. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-primary text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
