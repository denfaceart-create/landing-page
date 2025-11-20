"use client"

import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
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
						<div className="w-full px-20">
							<Carousel
								setApi={setApi}
								className="w-full"
								opts={{ loop: true }}
							>
								<CarouselContent>
									{galleryImages.map((image, index) => (
										<CarouselItem key={index}>
											<Card className="bg-primary/10" tabIndex={0}>
												<CardContent className="flex aspect-video items-center justify-center p-3">
													{/* biome-ignore lint/performance/noImgElement: is fine here */}
													<img
														src={image.url}
														alt={image.alt}
														className="aspect-square h-full w-full max-w-150 object-cover"
													/>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>

							<Carousel
								className="mx-auto mt-4 w-full max-w-xs"
								opts={{ loop: true }}
							>
								<CarouselContent className="my-1 flex justify-center">
									{galleryImages.map((image, index) => (
										<CarouselItem
											key={index}
											className={cn(
												"basis-1/5 cursor-pointer",
												current === index + 1 ? "opacity-100" : "opacity-50",
											)}
										>
											<Card onClick={() => handleThumbClick(index)}>
												<CardContent className="flex aspect-square items-center justify-center p-0">
													{/* biome-ignore lint/performance/noImgElement:  is fine here */}
													<img
														src={image.url}
														alt={image.alt}
														className="h-24 w-auto object-cover"
													/>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
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
