"use client"

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
import { ShootingStars } from "./ui/shooting-stars"
import { StarsBackground } from "./ui/stars-background"

const GalleryImageCard = memo(function GalleryImageCard({
	image,
}: {
	image: { url: string; alt: string }
}) {
	return (
		<Card
			className={cn(
				"mx-auto max-w-2xl bg-neutral-900",

				"group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-4",
			)}
		>
			<CardContent className="flex aspect-video items-center justify-center p-3">
				{/* biome-ignore lint/performance/noImgElement: is fine here */}
				<img
					src={image.url}
					alt={image.alt}
					className="aspect-square h-full w-full max-w-150 object-cover"
				/>
				<ShootingStars />
				<StarsBackground />
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
	image: { url: string; alt: string }
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
				isActive || isHovered ? "opacity-100" : "opacity-50",
				shouldBlur && "scale-[0.95] blur-[2px]",
			)}
			tabIndex={0}
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
				{/* biome-ignore lint/performance/noImgElement:  is fine here */}
				<img
					src={image.url}
					alt={image.alt}
					className="inset-0 h-24 w-full object-cover"
				/>
			</CardContent>
		</Card>
	)
})

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
	const t = useTranslations("HomePage.gallery")
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (!api) return

		setCurrent(api.selectedScrollSnap() + 1)

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	const handleThumbClick = useCallback(
		(index: number) => api?.scrollTo(index),
		[api],
	)
	const [hovered, setHovered] = useState<number | null>(null)

	return (
		<section
			id="gallery"
			className="flex items-center justify-center bg-background py-24 md:py-32"
		>
			<div className="container px-4">
				<div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
					<h2 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
						{t("title")}
					</h2>
				</div>

				<div className="relative">
					<div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
						<div className="w-full px-4 md:px-20">
							<Carousel
								setApi={setApi}
								className="w-full md:px-2"
								opts={{ loop: true }}
							>
								<CarouselContent
									className="group py-2 focus-visible:outline-none"
									tabIndex={0}
								>
									{galleryImages.map((image, index) => (
										<CarouselItem key={index}>
											<GalleryImageCard image={image} />
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>

							<Carousel
								className="mx-auto mt-4 w-full max-w-xs"
								opts={{ loop: true }}
							>
								<CarouselContent className="my-1 flex justify-center">
									{galleryImages.map((image, index) => {
										const isActive = current === index + 1
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
										<CarouselPrevious tabIndex={0} />
										<CarouselNext tabIndex={0} />
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
