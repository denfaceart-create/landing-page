"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog"
import type { GalleryImage } from "@/lib/cloudinary"

const SLIDE_CLASSES = [
	"gallery-animate-slide-left",
	"gallery-animate-slide-up",
	"gallery-animate-slide-right",
] as const

const PARALLAX_SPEEDS = [-0.1, 0.0, 0.1] as const

function useParallax(
	col0Ref: React.RefObject<HTMLDivElement | null>,
	col1Ref: React.RefObject<HTMLDivElement | null>,
	col2Ref: React.RefObject<HTMLDivElement | null>,
) {
	useEffect(() => {
		const refs = [col0Ref, col1Ref, col2Ref]

		function onScroll() {
			const y = window.scrollY
			for (let i = 0; i < refs.length; i++) {
				const el = refs[i].current
				if (el) el.style.transform = `translateY(${y * PARALLAX_SPEEDS[i]}px)`
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => {
			window.removeEventListener("scroll", onScroll)
			for (const ref of refs) {
				if (ref.current) ref.current.style.transform = ""
			}
		}
	}, [col0Ref, col1Ref, col2Ref])
}

interface GalleryItemProps {
	image: GalleryImage
	index: number
	colIndex: number
	mobile?: boolean
	onOpen: (index: number) => void
}

function GalleryItem({
	image,
	index,
	colIndex,
	mobile,
	onOpen,
}: GalleryItemProps) {
	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const enterClass = mobile
			? "gallery-animate-slide-up"
			: SLIDE_CLASSES[colIndex]
		const delay = Math.min(index * 55, 400)

		el.style.opacity = "0"
		for (const cls of SLIDE_CLASSES) el.classList.remove(cls)

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setTimeout(() => {
							el.style.opacity = ""
							void el.offsetWidth
							el.classList.add(enterClass)
						}, delay)
						observer.unobserve(el)
					}
				}
			},
			{ rootMargin: "0px 0px -5% 0px", threshold: 0 },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [index, colIndex, mobile])

	return (
		<button
			ref={ref}
			type="button"
			className="mb-4 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			onClick={() => onOpen(index)}
			aria-label={`${image.alt} — click to enlarge`}
		>
			{/* biome-ignore lint/performance/noImgElement: intentional — next/image not used per project rules */}
			<img
				src={image.url}
				alt={image.alt}
				width={image.width}
				height={image.height}
				className="w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
				loading={index < 6 ? "eager" : "lazy"}
			/>
		</button>
	)
}

export function GalleryGrid({
	images,
	positionLabel,
}: {
	images: GalleryImage[]
	positionLabel: string
}) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	const col0Ref = useRef<HTMLDivElement>(null)
	const col1Ref = useRef<HTMLDivElement>(null)
	const col2Ref = useRef<HTMLDivElement>(null)

	useParallax(col0Ref, col1Ref, col2Ref)

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

	const col0 = images.filter((_, i) => i % 3 === 0)
	const col1 = images.filter((_, i) => i % 3 === 1)
	const col2 = images.filter((_, i) => i % 3 === 2)

	const globalIndexFor = (colIndex: number, rowIndex: number) =>
		rowIndex * 3 + colIndex

	const colRefs = [col0Ref, col1Ref, col2Ref]
	const cols = [col0, col1, col2]

	return (
		<>
			<div className="hidden gap-4 lg:flex">
				{cols.map((col, colIndex) => (
					<div
						key={colIndex}
						ref={colRefs[colIndex]}
						className="gallery-col-parallax flex flex-1 flex-col"
					>
						{col.map((image, rowIndex) => (
							<GalleryItem
								key={image.url}
								image={image}
								index={globalIndexFor(colIndex, rowIndex)}
								colIndex={colIndex}
								onOpen={setLightboxIndex}
							/>
						))}
					</div>
				))}
			</div>

			<div className="flex flex-col gap-4 lg:hidden">
				{images.map((image, index) => (
					<GalleryItem
						key={image.url}
						image={image}
						index={index}
						colIndex={1}
						mobile
						onOpen={setLightboxIndex}
					/>
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
