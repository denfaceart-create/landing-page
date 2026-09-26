import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { getGalleryImages } from "@/lib/cloudinary"
import DomeGallery from "./dome-gallery"

export async function Gallery() {
	const images = await getGalleryImages()
	return <GalleryInner images={images} />
}

function GalleryInner({
	images,
}: {
	images: Awaited<ReturnType<typeof getGalleryImages>>
}) {
	const t = useTranslations("HomePage.gallery")
	const domeImages = useMemo(
		() => images.map((image) => ({ src: image.url, alt: image.alt })),
		[images],
	)
	return (
		<section
			id="gallery"
			className="bg-muted/30 py-6 sm:py-10 md:py-16 lg:py-24 xl:py-32"
		>
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
					<h2
						id="gallery-title"
						className="text-balance font-bold font-display text-4xl tracking-tight md:text-5xl lg:text-6xl"
					>
						{t("title")}
					</h2>
				</div>
				<div className="h-125 overflow-hidden rounded-lg">
					<DomeGallery
						images={domeImages}
						fit={0.2}
						maxVerticalRotationDeg={2}
						segments={24}
						dragDampening={5}
						overlayBlurColor="transparent"
					/>
				</div>
			</div>
		</section>
	)
}
