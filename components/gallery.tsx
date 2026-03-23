"use client"

import Fade from "embla-carousel-fade"
import { useTranslations } from "next-intl"
import { memo, useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
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

const GalleryImageCard = memo(function GalleryImageCard({
	image,
	isPriority,
}: {
	image: GalleryImage
	isPriority?: boolean
}) {
	return (
		<Card
			className={cn(
				"mx-auto max-w-2xl bg-neutral-900",

				"group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-4",
			)}
		>
			<CardContent className="relative flex aspect-video items-center justify-center p-3">
				{/** biome-ignore lint/performance/noImgElement: Using nextjs Image element for optimizations limits the ability to apply dynamic dimensions */}
				<img
					src={image.url}
					alt={image.alt}
					className={cn(
						"aspect-square h-full w-full max-w-150 object-cover",
						image.rotate && rotateClass[image.rotate],
					)}
					loading={isPriority ? "eager" : "lazy"}
				/>
			</CardContent>
		</Card>
	)
})

const ThumbnailCard = memo(function ThumbnailCarouselItem({
	image,
	isActive,
	isHovered,
	shouldBlur,
	onFocus,
	onBlur,
	onClick,
}: {
	image: GalleryImage
	isActive: boolean
	isHovered: boolean
	shouldBlur: boolean
	onFocus: () => void
	onBlur: () => void
	onClick: () => void
}) {
	return (
		<Card
			className={cn(
				"relative w-full overflow-hidden rounded-lg bg-primary/10 transition-all duration-300 ease-out dark:bg-primary/90",
				isActive || isHovered ? "opacity-100" : "opacity-50 delay-200",
				shouldBlur && "scale-[0.98] blur-[1px] delay-200",
			)}
			tabIndex={0}
			role="button"
			aria-current={isActive ? "true" : undefined}
			aria-label={
				isActive ? `Current image: ${image.alt}` : `Go to: ${image.alt}`
			}
			onMouseEnter={onFocus}
			onMouseLeave={onBlur}
			onFocus={onFocus}
			onBlur={onBlur}
			onClick={(e) => {
				onClick()
				if (navigator?.maxTouchPoints > 0) e.currentTarget?.blur() // blur on touch devices
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClick()
				}
			}}
		>
			<CardContent className="flex aspect-square items-center justify-center p-0">
				{/** biome-ignore lint/performance/noImgElement: Using nextjs Image element for optimizations limits the ability to apply dynamic dimensions */}
				<img
					src={image.url}
					alt={image.alt}
					className={cn(
						"inset-0 h-24 w-full object-cover",
						image.rotate && rotateClass[image.rotate],
					)}
					loading="lazy"
				/>
			</CardContent>
		</Card>
	)
})

export function Gallery() {
	const t = useTranslations("HomePage.gallery")
	const [api, setApi] = useState<CarouselApi>()
	const [thumbApi, setThumbApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (!api || !thumbApi) return

		api.on("select", () => {
			const selected = api.selectedScrollSnap()
			setCurrent(selected)
			thumbApi.scrollTo(selected)
		})
	}, [api, thumbApi])

	const handleThumbClick = useCallback(
		(index: number) => api?.scrollTo(index),
		[api],
	)
	const [hovered, setHovered] = useState<number | null>(null)

	return (
		<section className="flex items-center justify-center bg-background py-24 md:py-32">
			<div className="container px-4">
				<div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
					<h2
						id="gallery-title"
						className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl"
					>
						{t("title")}
					</h2>
				</div>

				<div className="relative">
					<div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
						<div className="w-full px-4 md:px-20">
							<Carousel
								setApi={setApi}
								className="w-full md:px-2"
								opts={{ loop: true, containScroll: false }}
								plugins={[Fade()]}
								aria-labelledby="gallery-title"
							>
								<CarouselContent
									className="group py-2 focus-visible:outline-none"
									tabIndex={0}
								>
									{galleryImages.map((image, index) => (
										<CarouselItem key={index}>
											<GalleryImageCard
												image={image}
												isPriority={index === 0}
											/>
										</CarouselItem>
									))}
								</CarouselContent>
								{/* Screen reader slide position announcement */}
								<p className="sr-only" aria-live="polite" aria-atomic="true">
									{t("positionAnnouncement", {
										current: `${current + 1}`,
										total: `${galleryImages.length}`,
									})}
								</p>
							</Carousel>

							<Carousel
								setApi={setThumbApi}
								className="mx-auto mt-4 w-full max-w-xs"
								opts={{
									containScroll: "keepSnaps",
									dragFree: true,
									loop: true,
								}}
							>
								<CarouselContent className="my-1">
									{galleryImages.map((image, index) => {
										const isActive = current === index
										const isHovered = hovered === index
										return (
											<CarouselItem
												key={index}
												className={cn("basis-1/5 cursor-pointer")}
											>
												<ThumbnailCard
													onFocus={() => setHovered(index)}
													onBlur={() => setHovered(null)}
													onClick={() => handleThumbClick(index)}
													image={image}
													isActive={isActive}
													isHovered={isHovered}
													shouldBlur={hovered !== null && !isHovered}
												/>
											</CarouselItem>
										)
									})}
								</CarouselContent>
								{galleryImages.length > 5 && (
									<>
										<CarouselPrevious tabIndex={0} className="hidden md:flex" />
										<CarouselNext tabIndex={0} className="hidden md:flex" />
									</>
								)}
							</Carousel>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
