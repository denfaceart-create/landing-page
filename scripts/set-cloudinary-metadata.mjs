/**
 * One-off script: sets `order` (structured metadata) and `alt` (context)
 * on every gallery image in Cloudinary, matching the original display order.
 *
 * Usage:
 *   node scripts/set-cloudinary-metadata.mjs
 */

import { readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { v2 as cloudinary } from "cloudinary"

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

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

const IMAGES = [
	{ file: "den_1", alt: "Face painting artwork" },
	{ file: "den_2", alt: "Face painting artwork" },
	{ file: "den_3", alt: "Face painting artwork" },
	{ file: "20251025_212054", alt: "Face painting artwork" },
	{ file: "20251025_215824", alt: "Face painting artwork" },
	{ file: "20251026_210040", alt: "Face painting artwork" },
	{ file: "20251027_213742", alt: "Face painting artwork" },
	{ file: "20251102_104350", alt: "Face painting artwork" },
	{ file: "20251102_112911", alt: "Face painting artwork" },
	{ file: "20251102_121245", alt: "Face painting artwork" },
	{ file: "20251103_202945", alt: "Face painting artwork" },
	{ file: "20251103_213105", alt: "Face painting artwork" },
	{ file: "20251104_210958", alt: "Face painting artwork" },
	{ file: "20251104_220143", alt: "Face painting artwork" },
	{ file: "20251113_141917", alt: "Face painting artwork" },
	{ file: "20251113_144922", alt: "Face painting artwork" },
	{ file: "20251117_230701", alt: "Face painting artwork" },
	{ file: "20251117_230856", alt: "Face painting artwork" },
	{ file: "20251118_103446", alt: "Face painting artwork" },
	{ file: "20251120_202507", alt: "Face painting artwork" },
	{ file: "20251120_210214", alt: "Face painting artwork" },
	{ file: "20251120_210922", alt: "Face painting artwork" },
	{ file: "20251120_211622", alt: "Face painting artwork" },
	{ file: "20251124_221559", alt: "Face painting artwork" },
	{ file: "20251124_221623", alt: "Face painting artwork" },
	{ file: "20251207_162853", alt: "Face painting artwork" },
	{ file: "20251221_095216", alt: "Face painting artwork" },
	{ file: "20251221_104709", alt: "Face painting artwork" },
	{ file: "20260120_211642", alt: "Face painting artwork" },
	{ file: "20260120_212045", alt: "Face painting artwork" },
	{ file: "20260120_221134", alt: "Face painting artwork" },
]

let ok = 0
let failed = 0

for (let i = 0; i < IMAGES.length; i++) {
	const { file, alt } = IMAGES[i]
	const publicId = `gallery/${file}`
	const order = i + 1

	process.stdout.write(`[${order}] ${publicId} … `)

	try {
		await cloudinary.uploader.explicit(publicId, {
			type: "upload",
			context: `alt=${alt}`,
			metadata: `order=${order}`,
		})
		console.log("✓")
		ok++
	} catch (err) {
		console.error(`✗  ${err.message}`)
		failed++
	}
}

console.log(`\nDone. OK: ${ok}  |  Failed: ${failed}`)
