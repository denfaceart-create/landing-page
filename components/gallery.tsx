"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const galleryImages = [
	{ url: "/assets/den_1.webp", alt: "Face painting artwork" },
	{ url: "/assets/den_2.webp", alt: "Face painting artwork" },
	{ url: "/assets/den_3.jpeg", alt: "Face painting artwork" },
	{ url: "/assets/20251025_212054.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251025_215824.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251026_210040.webp", alt: "Face painting artwork" },
	{
		url: "/assets/20251027_213742.webp",
		alt: "Face painting artwork",
		rotate: "90" as const,
	},
	{ url: "/assets/20251102_104350.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251102_112911.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251102_121245.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251103_202945.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251103_213105.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251104_210958.webp", alt: "Face painting artwork" },
	{
		url: "/assets/20251104_220143.webp",
		alt: "Face painting artwork",
		rotate: "90" as const,
	},
	{ url: "/assets/20251113_141917.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251113_144922.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251117_230701.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251117_230856.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251118_103446.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251120_202507.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251120_210214.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251120_210922.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251120_211622.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251124_221559.webp", alt: "Face painting artwork" },
	{ url: "/assets/20251124_221623.webp", alt: "Face painting artwork" },
	{
		url: "/assets/20251207_162853.webp",
		alt: "Face painting artwork",
		rotate: "-90" as const,
	},
	{
		url: "/assets/20251221_095216.webp",
		alt: "Face painting artwork",
		rotate: "-90" as const,
	},
	{
		url: "/assets/20251221_104709.webp",
		alt: "Face painting artwork",
		rotate: "90" as const,
	},
	{ url: "/assets/20260120_211642.webp", alt: "Face painting artwork" },
	{ url: "/assets/20260120_212045.webp", alt: "Face painting artwork" },
	{ url: "/assets/20260120_221134.webp", alt: "Face painting artwork" },
]

type GalleryImage = { url: string; alt: string; rotate?: "90" | "-90" }

const rotateClass = {
	"90": "rotate-90",
	"-90": "-rotate-90",
} as const

export function Gallery() {
	const t = useTranslations("HomePage.gallery")
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	const openLightbox = (index: number) => setLightboxIndex(index)
	const closeLightbox = useCallback(() => setLightboxIndex(null), [])

	const prev = useCallback(() => {
		setLightboxIndex((i) =>
			i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
		)
	}, [])

	const next = useCallback(() => {
		setLightboxIndex((i) =>
			i === null ? null : (i + 1) % galleryImages.length,
		)
	}, [])

	useEffect(() => {
		if (lightboxIndex === null) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") prev()
			else if (e.key === "ArrowRight") next()
			else if (e.key === "Escape") closeLightbox()
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [lightboxIndex, prev, next, closeLightbox])

	const currentImage: GalleryImage | undefined =
		lightboxIndex !== null ? galleryImages[lightboxIndex] : undefined

	return (
		<section id="gallery" className="bg-muted/30 py-24 md:py-32">
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
					<h2
						id="gallery-title"
						className="text-balance font-bold font-display text-4xl tracking-tight md:text-5xl lg:text-6xl"
					>
						{t("title")}
					</h2>
				</div>

				<div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
					{galleryImages.map((image, index) => (
						<button
							key={image.url}
							type="button"
							className="mb-4 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							onClick={() => openLightbox(index)}
							aria-label={`${image.alt} — click to enlarge`}
						>
							{/* biome-ignore lint/performance/noImgElement: intentional */}
							<img
								src={image.url}
								alt={image.alt}
								className={cn(
									"w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]",
									image.rotate && rotateClass[image.rotate],
								)}
								loading={index < 6 ? "eager" : "lazy"}
							/>
						</button>
					))}
				</div>
			</div>

			<Dialog
				open={lightboxIndex !== null}
				onOpenChange={(open) => !open && closeLightbox()}
			>
				<DialogContent
					className="flex max-h-[95vh] max-w-[95vw] items-center justify-center overflow-hidden border-0 bg-black/95 p-0 shadow-2xl"
					aria-describedby={undefined}
					showCloseButton={false}
				>
					<DialogTitle className="sr-only">
						{currentImage?.alt ?? "Gallery image"}
					</DialogTitle>

					<button
						type="button"
						onClick={prev}
						className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						aria-label="Previous image"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>

					{currentImage && (
						/* biome-ignore lint/performance/noImgElement: intentional */
						<img
							src={currentImage.url}
							alt={currentImage.alt}
							className={cn(
								"max-h-[90vh] max-w-[90vw] rounded-lg object-contain",
								currentImage.rotate && rotateClass[currentImage.rotate],
							)}
						/>
					)}

					<button
						type="button"
						onClick={next}
						className="absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						aria-label="Next image"
					>
						<ChevronRight className="h-6 w-6" />
					</button>

					<DialogClose asChild>
						<button
							type="button"
							className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
							aria-label="Close lightbox"
						>
							<X className="h-5 w-5" />
						</button>
					</DialogClose>

					{lightboxIndex !== null && (
						<span
							aria-live="polite"
							className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white"
						>
							<span aria-hidden="true">
								{lightboxIndex + 1} / {galleryImages.length}
							</span>
							<span className="sr-only">
								{t("positionAnnouncement", {
									current: String(lightboxIndex + 1),
									total: String(galleryImages.length),
								})}
							</span>
						</span>
					)}
				</DialogContent>
			</Dialog>
		</section>
	)
}
