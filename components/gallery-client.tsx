"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog"
import type { GalleryImage } from "@/lib/cloudinary"
import { cn } from "@/lib/utils"

export function GalleryGrid({
	images,
	positionLabel,
}: {
	images: GalleryImage[]
	positionLabel: string
}) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	const closeLightbox = useCallback(() => setLightboxIndex(null), [])

	const prev = useCallback(() => {
		setLightboxIndex((i) =>
			i === null ? null : (i - 1 + images.length) % images.length,
		)
	}, [images.length])

	const next = useCallback(() => {
		setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
	}, [images.length])

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
		lightboxIndex !== null ? images[lightboxIndex] : undefined

	const announcedPosition =
		lightboxIndex !== null
			? positionLabel
					.replace("{current}", String(lightboxIndex + 1))
					.replace("{total}", String(images.length))
			: ""

	return (
		<>
			<div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
				{images.map((image, index) => (
					<button
						key={image.url}
						type="button"
						className="mb-4 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						onClick={() => setLightboxIndex(index)}
						aria-label={`${image.alt} — click to enlarge`}
					>
						{/* biome-ignore lint/performance/noImgElement: intentional — next/image not used per project rules */}
						<img
							src={image.url}
							alt={image.alt}
							width={image.width}
							height={image.height}
							className={cn(
								"w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]",
							)}
							loading={index < 6 ? "eager" : "lazy"}
						/>
					</button>
				))}
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
						/* biome-ignore lint/performance/noImgElement: intentional — next/image not used per project rules */
						<img
							src={currentImage.url}
							alt={currentImage.alt}
							className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
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
								{lightboxIndex + 1} / {images.length}
							</span>
							<span className="sr-only">{announcedPosition}</span>
						</span>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}
