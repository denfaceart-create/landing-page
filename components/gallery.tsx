"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

const galleryImages = [
  {
    url: "/assets/den_1.jpeg",
    alt: "Floral patterns",
  },
  {
    url: "/assets/den_2.jpeg",
    alt: "Butterfly",
  },
  {
    url: "/assets/den_3.jpeg",
    alt: "Space Queen",
  },

]

export function Gallery() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".gallery-item")
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-in")
              }, index * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "Escape") {
        setSelectedImage(null)
      } else if (e.key === "ArrowRight") {
        setSelectedImage((prev) => (prev! + 1) % galleryImages.length)
      } else if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-24 md:py-32 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {t.gallery}
            </h2>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="gallery-item flex-shrink-0 w-[280px] md:w-[400px] h-[400px] md:h-[500px] relative overflow-hidden rounded-2xl group cursor-pointer opacity-0 translate-x-8 snap-center transition-all duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-background font-medium">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)
            }}
            className="absolute left-4 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage((prev) => (prev! + 1) % galleryImages.length)
            }}
            className="absolute right-4 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedImage].url || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-center mt-4 text-lg font-medium">{galleryImages[selectedImage].alt}</p>
          </div>
        </div>
      )}
    </>
  )
}
