/**
 * One-off script: renames all gallery assets that still have the "gallery/"
 * prefix in their public_id, stripping it so the public_id matches the
 * asset_folder structure (e.g. "gallery/den_1" → "den_1" with asset_folder="gallery").
 *
 * Safe to re-run — skips assets that don't have the prefix.
 *
 * Usage:
 *   node scripts/rename-cloudinary-assets.mjs
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

const PREFIX = "gallery/"

// Fetch all assets that still have the gallery/ prefix in their public_id
const result = await cloudinary.api.resources({
	type: "upload",
	resource_type: "image",
	prefix: PREFIX,
	max_results: 500,
})

const toRename = result.resources.filter((r) => r.public_id.startsWith(PREFIX))

console.log(`Found ${toRename.length} assets to rename.\n`)

let ok = 0
let skipped = 0
let failed = 0

for (const resource of toRename) {
	const fromId = resource.public_id
	const toId = fromId.slice(PREFIX.length)

	process.stdout.write(`  ${fromId}  →  ${toId} … `)

	try {
		await cloudinary.uploader.rename(fromId, toId, {
			overwrite: false,
		})
		console.log("✓")
		ok++
	} catch (err) {
		if (err.error?.http_code === 404) {
			console.log("skipped (already renamed)")
			skipped++
		} else {
			console.error(`✗  ${err.message ?? JSON.stringify(err)}`)
			failed++
		}
	}
}

console.log(
	`\nDone. Renamed: ${ok}  |  Skipped: ${skipped}  |  Failed: ${failed}`,
)
