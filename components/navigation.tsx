"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/contact", label: "CONTACT" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl border-b border-primary/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/15 transition-all duration-300">
              <HardHat className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wider">MACHINEMEC</span>
              <div className="text-xs text-primary font-medium tracking-widest">ENGINEERING</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-6 py-3 text-sm font-medium tracking-wider text-foreground/80 hover:text-primary transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
              </Link>
            ))}
          </div>

          {/* CTA & Controls */}
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="hidden sm:block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-2 rounded-md transition-all duration-300 tracking-wider">
                GET QUOTE
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 hover:bg-primary/20 transition-all duration-300 rounded-md"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden h-10 w-10 hover:bg-primary/20 rounded-md transition-all duration-300 ${
                isOpen ? "hamburger-active" : ""
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex flex-col space-y-1">
                <div
                  className={`hamburger-line transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <div className={`hamburger-line transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <div
                  className={`hamburger-line transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-xl rounded-lg mt-2 border border-primary/20">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm font-bold tracking-wider text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block px-4 py-3 text-sm bg-primary text-primary-foreground font-bold rounded-md mt-2 text-center tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                GET QUOTE
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
