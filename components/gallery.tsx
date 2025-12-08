"use client"

import Fade from "embla-carousel-fade"
import Image from "next/image"
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

// Generate all gallery images from the public/assets folder
const galleryImages = [
	// Den's featured images
	{ url: "/assets/den_1.jpeg", alt: "Face painting artwork" },
	{ url: "/assets/den_2.jpeg", alt: "Face painting artwork" },
	{ url: "/assets/den_3.jpeg", alt: "Face painting artwork" },
	// All dated images
	// { url: "/assets/20251025_211036.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251025_212054.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251025_213154.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251025_214657.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251025_215824.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251026_205131.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251026_210040.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251026_211937.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251026_213121.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251026_213307.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251027_213742.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251028_155804.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251028_160313.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251028_213710.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251028_220727.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251028_221959.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251031_214718.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251031_220130.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251102_104350.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251102_112911.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251102_121245.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251103_202945.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251103_213105.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251104_210958.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251104_220143.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251105_221816.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251106_215046.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251108_115139.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251113_141917.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251113_144003.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251113_144922.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251113_150954.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251113_151044.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251113_155435.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251117_230701.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251117_230805.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251117_230856.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_103446.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251118_105432.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_134107.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_134558.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_135049.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_135321.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_140054.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_140620.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251118_141710.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251120_202507.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251120_210214.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251120_210922.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251120_211622.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251120_211657.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251124_221559.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251124_221623.jpg", alt: "Face painting artwork" },
	{ url: "/assets/20251124_221731.jpg", alt: "Face painting artwork" },
	// { url: "/assets/20251124_221758.jpg", alt: "Face painting artwork" },
]

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
			<CardContent className="relative flex aspect-video items-center justify-center p-3">
				<Image
					src={image.url}
					alt={image.alt}
					width={800}
					height={800}
					className="aspect-square h-full w-full max-w-150 object-cover"
					loading="lazy"
					quality={85}
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
				isActive || isHovered ? "opacity-100" : "opacity-50 delay-200",
				shouldBlur && "scale-[0.98] blur-[1px] delay-200",
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
				<Image
					src={image.url}
					alt={image.alt}
					width={96}
					height={96}
					className="inset-0 h-24 w-full object-cover"
					loading="lazy"
					quality={60}
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
								opts={{ loop: true, containScroll: false }}
								plugins={[Fade()]}
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
