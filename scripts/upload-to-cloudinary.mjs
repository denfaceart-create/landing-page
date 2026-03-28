/**
 * One-off script: uploads all gallery images from public/assets to Cloudinary
 * under the "gallery" folder, preserving the original filename as the public_id.
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs
 *
 * Requires .env.local to have:
 *   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

import { readFileSync } from "node:fs"
import { join, parse } from "node:path"
import { fileURLToPath } from "node:url"
import { v2 as cloudinary } from "cloudinary"

// ---------------------------------------------------------------------------
// Load .env.local manually (no dotenv dependency needed)
// ---------------------------------------------------------------------------
const __dirname = fileURLToPath(new URL(".", import.meta.url))
const envPath = join(__dirname, "..", ".env.local")
const envLines = readFileSync(envPath, "utf-8").split("\n")
for (const line of envLines) {
	const trimmed = line.trim()
	if (!trimmed || trimmed.startsWith("#")) continue
	const eqIndex = trimmed.indexOf("=")
	if (eqIndex === -1) continue
	const key = trimmed.slice(0, eqIndex).trim()
	const value = trimmed
		.slice(eqIndex + 1)
		.trim()
		.replace(/^["']|["']$/g, "")
	process.env[key] = value
}

// ---------------------------------------------------------------------------
// Configure Cloudinary
// ---------------------------------------------------------------------------
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

// ---------------------------------------------------------------------------
// Gallery images — exactly the files used in the gallery (no profile images)
// ---------------------------------------------------------------------------
const GALLERY_FILES = [
	"den_1.webp",
	"den_2.webp",
	"den_3.jpeg",
	"20251025_212054.webp",
	"20251025_215824.webp",
	"20251026_210040.webp",
	"20251027_213742.webp",
	"20251102_104350.webp",
	"20251102_112911.webp",
	"20251102_121245.webp",
	"20251103_202945.webp",
	"20251103_213105.webp",
	"20251104_210958.webp",
	"20251104_220143.webp",
	"20251113_141917.webp",
	"20251113_144922.webp",
	"20251117_230701.webp",
	"20251117_230856.webp",
	"20251118_103446.webp",
	"20251120_202507.webp",
	"20251120_210214.webp",
	"20251120_210922.webp",
	"20251120_211622.webp",
	"20251124_221559.webp",
	"20251124_221623.webp",
	"20251207_162853.webp",
	"20251221_095216.webp",
	"20251221_104709.webp",
	"20260120_211642.webp",
	"20260120_212045.webp",
	"20260120_221134.webp",
]

const ASSETS_DIR = join(__dirname, "..", "public", "assets")
const CLOUDINARY_FOLDER = "gallery"

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------
let uploaded = 0
let skipped = 0
let failed = 0

for (const filename of GALLERY_FILES) {
	const filePath = join(ASSETS_DIR, filename)
	const publicId = `${CLOUDINARY_FOLDER}/${parse(filename).name}`

	process.stdout.write(`Uploading ${filename} … `)

	try {
		const result = await cloudinary.uploader.upload(filePath, {
			public_id: publicId,
			overwrite: false, // skip if already uploaded (safe to re-run)
			resource_type: "image",
			use_filename: false,
			unique_filename: false,
		})

		if (result.existing) {
			console.log("already exists, skipped.")
			skipped++
		} else {
			console.log(`✓  ${result.secure_url}`)
			uploaded++
		}
	} catch (err) {
		console.error(`✗  failed: ${err.message}`)
		failed++
	}
}

console.log(
	`\nDone. Uploaded: ${uploaded}  |  Skipped: ${skipped}  |  Failed: ${failed}`,
)
