import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

type ResourceContext = {
	custom?: {
		caption?: string
		alt?: string
	}
}

type ResourceMetadata = {
	order?: number
}

export type GalleryImage = {
	url: string
	alt: string
	width: number
	height: number
}

const FALLBACK_ALT = "Face painting artwork by Denise"
const GALLERY_FOLDER = "gallery"

export async function getGalleryImages(): Promise<GalleryImage[]> {
	const result = await cloudinary.api.resources_by_asset_folder(
		GALLERY_FOLDER,
		{
			max_results: 500,
			context: true, // include context (alt_text set from dashboard)
			metadata: true, // include structured metadata (order field)
		},
	)
	return result.resources
		.map((resource) => ({
			url: resource.secure_url as string,
			alt: (resource.context as ResourceContext)?.custom?.alt ?? FALLBACK_ALT,
			width: resource.width as number,
			height: resource.height as number,
			order:
				(resource.metadata as ResourceMetadata)?.order ??
				Number.MAX_SAFE_INTEGER,
			publicId: resource.public_id as string,
		}))
		.sort((a, b) => a.order - b.order || a.publicId.localeCompare(b.publicId))
		.map(({ order: _order, publicId: _publicId, ...image }) => image)
}
