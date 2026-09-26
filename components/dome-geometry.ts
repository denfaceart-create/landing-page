export type ImageItem = string | { src: string; alt?: string }

export type ItemDef = {
	src: string
	alt: string
	/** 0-based index among the *unique* images, so repeat tiles stay distinguishable. */
	imageIndex: number
	x: number
	y: number
	sizeX: number
	sizeY: number
}

export const clamp = (v: number, min: number, max: number) =>
	Math.min(Math.max(v, min), max)

export const wrapAngleSigned = (deg: number) => {
	const a = (((deg + 180) % 360) + 360) % 360
	return a - 180
}

// Grid geometry. The CSS places a tile at
// rotateY(rotY * (offsetX + (sizeX - 1) / 2)), where rotY is (360deg / segments) / 2,
// so a tile's angle from the viewer is degPerUnit * (offsetX + 0.5) + rotation.y.
// Every column has the same height, which is what makes slot arithmetic possible.
const X_BASE = -37
const X_STEP = 2
const Y_EVEN = [-4, -2, 0, 2, 4]
const Y_ODD = [-3, -1, 1, 3, 5]
const MID_ROW = 2

export const degPerUnit = (seg: number) => 360 / seg / 2
export const colOf = (slot: number) => Math.floor(slot / Y_EVEN.length)
export const rowOf = (slot: number) => slot % Y_EVEN.length
export const slotAt = (col: number, row: number, seg: number) =>
	(((col % seg) + seg) % seg) * Y_EVEN.length + row

/** rotation.y that brings a tile with this offset-x to the front */
export const rotYForX = (x: number, seg: number) =>
	wrapAngleSigned(-degPerUnit(seg) * (x + 0.5))

/** the slot sitting at the front for a given rotation.y */
export const frontSlotFor = (rotY: number, seg: number) =>
	slotAt(
		Math.round((-rotY / degPerUnit(seg) - 0.5 - X_BASE) / X_STEP),
		MID_ROW,
		seg,
	)

/**
 * Degrees of rotationY per column; the columns span a full 360° turn.
 *
 * Keyboard navigation adds this to the running rotation instead of aiming at an
 * absolute column angle. Aiming absolutely re-normalises into (-180, 180], so
 * every 24th press would interpolate the long way round (+345°) — see B15.
 */
export const degPerColumn = (seg: number) => 360 / seg

/**
 * rotationY to glide to when keyboard focus moves to a tile.
 *
 * `step` is the whole contract:
 *   - a number  → rotate relatively by it, never normalised, so N presses always
 *     travel N * step and the seam cannot send the sphere backwards (B15);
 *   - `0`       → focus only, do not rotate;
 *   - `undefined` → snap to that column's absolute front angle (Home/End).
 */
export const nextRotationY = (
	currentY: number,
	targetX: number,
	seg: number,
	step: number | undefined,
) => (step === undefined ? rotYForX(targetX, seg) : currentY + step)

/** Spatial neighbour. Columns wrap because the dome is a full ring; rows clamp. */
export const neighbourSlot = (slot: number, key: string, seg: number) => {
	const col = colOf(slot)
	const row = rowOf(slot)
	switch (key) {
		case "ArrowLeft":
			return slotAt(col - 1, row, seg)
		case "ArrowRight":
			return slotAt(col + 1, row, seg)
		case "ArrowDown":
			return slotAt(col, Math.max(0, row - 1), seg)
		case "ArrowUp":
			return slotAt(col, Math.min(Y_EVEN.length - 1, row + 1), seg)
		default:
			return null
	}
}

/**
 * Pointer delta for the current drag step.
 *
 * A pointer the browser has taken over (vertical page scroll under
 * `touch-action: pan-y`) arrives as `pointercancel`, and Chrome reports its
 * clientX/clientY as 0,0. Read literally that is a drag from the gesture origin
 * to the viewport corner; at dragSensitivity 20 a touch at the centre of a
 * 390x844 phone is -195/20 = -9.75deg of rotationY on every scroll. A cancelled
 * event therefore returns null so the caller preserves the last valid rotation.
 */
export const dragDelta = (
	current: { clientX: number; clientY: number },
	start: { x: number; y: number },
	cancelled: boolean,
) =>
	cancelled
		? null
		: { x: current.clientX - start.x, y: current.clientY - start.y }

const toImage = (image: ImageItem) =>
	typeof image === "string"
		? { src: image, alt: "" }
		: { src: image.src || "", alt: image.alt || "" }

export function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
	const xCols = Array.from({ length: seg }, (_, i) => X_BASE + i * X_STEP)

	const coords = xCols.flatMap((x, c) => {
		const ys = c % 2 === 0 ? Y_EVEN : Y_ODD
		return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }))
	})

	const totalSlots = coords.length
	if (pool.length === 0) {
		return coords.map((c) => ({
			...c,
			src: "",
			alt: "",
			imageIndex: 0,
		}))
	}

	const normalizedImages = pool.map(toImage)

	const usedImages = Array.from(
		{ length: totalSlots },
		(_, i) => normalizedImages[i % normalizedImages.length],
	)

	return coords.map((c, i) => ({
		...c,
		src: usedImages[i].src,
		alt: usedImages[i].alt,
		imageIndex: i % normalizedImages.length,
	}))
}
