import { useTranslations } from "next-intl"
import { getGalleryImages } from "@/lib/cloudinary"
import { GalleryGrid } from "./gallery-client"

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
				<GalleryGrid
					images={images}
					positionLabel={t("positionAnnouncement", {
						current: "{current}",
						total: "{total}",
					})}
				/>
			</div>
		</section>
	)
}
