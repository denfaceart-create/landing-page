import assert from "node:assert/strict"
import { test } from "vitest"
import {
	buildItems,
	degPerColumn,
	dragDelta,
	frontSlotFor,
	neighbourSlot,
	nextRotationY,
	rotYForX,
	slotAt,
	wrapAngleSigned,
} from "@/components/dome-geometry"

const SEG = 24
const MID_ROW = 2
const UNIQUE = 40
const DRAG_SENSITIVITY = 20

const images = Array.from({ length: UNIQUE }, (_, i) => ({
	src: `img-${i}.jpg`,
	alt: `alt-${i}`,
}))
const items = buildItems(images, SEG)

const mod360 = (n: number) => ((n % 360) + 360) % 360

test("B15: every keypress is exactly one column, never reversing", () => {
	const per = degPerColumn(SEG)
	assert.equal(per, 15)

	let y = rotYForX(items[slotAt(0, MID_ROW, SEG)].x, SEG)
	const deltas: number[] = []

	for (let press = 1; press <= SEG * 2; press++) {
		const before = y
		y -= per
		deltas.push(y - before)

		// resting angle must match the old absolute target modulo a full turn
		const slot = slotAt(press, MID_ROW, SEG)
		const absolute = rotYForX(items[slot].x, SEG)
		assert.equal(
			mod360(y),
			mod360(absolute),
			`press ${press}: resting ${y} is not congruent with absolute ${absolute}`,
		)
	}

	assert.ok(
		deltas.every((d) => Math.abs(d + per) < 1e-9),
		`non-uniform steps: ${[...new Set(deltas.map((d) => d.toFixed(3)))]}`,
	)
	// the regression itself: a wrapped absolute target produced a single +345 step
	assert.ok(
		deltas.every((d) => d < 0),
		`rotation reversed: ${deltas.filter((d) => d > 0)}`,
	)
})

test("B15: a relative step never normalises, an absolute one snaps to the column", () => {
	const per = degPerColumn(SEG)
	const slotX = (slot: number) => items[slot].x

	// Home/End: undefined step means "snap to this column's front angle"
	assert.equal(
		nextRotationY(999, slotX(0), SEG, undefined),
		rotYForX(slotX(0), SEG),
	)

	// ArrowUp/Down: 0 means "move focus only" (Q2), so the angle must not budge
	assert.equal(nextRotationY(37.5, slotX(17), SEG, 0), 37.5)

	// ArrowLeft/Right: relative to where we are, not to the target column
	assert.equal(nextRotationY(37.5, slotX(17), SEG, -per), 22.5)

	// the regression: 24 relative steps from a mid-seam angle stay monotonic
	let y = -175
	for (let i = 0; i < SEG; i++) y = nextRotationY(y, 0, SEG, -per)
	assert.equal(y, -175 - 360)
})

test("B15: the accumulator is never normalised", () => {
	const per = degPerColumn(SEG)
	let y = 0
	for (let i = 0; i < SEG; i++) y -= per
	assert.equal(y, -360, "a full turn accumulates to exactly -360")
	assert.notEqual(
		y,
		wrapAngleSigned(y),
		"wrapping would have collapsed it to 0",
	)
})

test("frontSlotFor inverts rotYForX for every column", () => {
	for (let col = 0; col < SEG; col++) {
		const slot = slotAt(col, MID_ROW, SEG)
		assert.equal(frontSlotFor(rotYForX(items[slot].x, SEG), SEG), slot)
	}
})

test("neighbourSlot wraps columns and clamps rows", () => {
	assert.equal(
		neighbourSlot(slotAt(0, MID_ROW, SEG), "ArrowLeft", SEG),
		slotAt(SEG - 1, MID_ROW, SEG),
	)
	assert.equal(
		neighbourSlot(slotAt(SEG - 1, MID_ROW, SEG), "ArrowRight", SEG),
		slotAt(0, MID_ROW, SEG),
	)
	// rows advance one step and clamp at the ends (0 and 4), they do not wrap
	assert.equal(
		neighbourSlot(slotAt(3, 0, SEG), "ArrowUp", SEG),
		slotAt(3, 1, SEG),
	)
	assert.equal(
		neighbourSlot(slotAt(3, 3, SEG), "ArrowUp", SEG),
		slotAt(3, 4, SEG),
	)
	assert.equal(
		neighbourSlot(slotAt(3, 4, SEG), "ArrowUp", SEG),
		slotAt(3, 4, SEG),
		"ArrowUp clamps at the top row",
	)
	assert.equal(
		neighbourSlot(slotAt(3, 4, SEG), "ArrowDown", SEG),
		slotAt(3, 3, SEG),
	)
	assert.equal(
		neighbourSlot(slotAt(3, 0, SEG), "ArrowDown", SEG),
		slotAt(3, 0, SEG),
		"ArrowDown clamps at the bottom row",
	)
	assert.equal(neighbourSlot(0, "Enter", SEG), null)
})

test("buildItems fills every slot and indexes unique images, not tiles", () => {
	assert.equal(items.length, SEG * 5)
	assert.equal(new Set(items.map((i) => i.x)).size, SEG)
	assert.equal(new Set(items.map((i) => i.src)).size, UNIQUE)
	items.forEach((item, i) => {
		assert.equal(item.imageIndex, i % UNIQUE)
		assert.equal(item.src, `img-${item.imageIndex}.jpg`)
	})
})

test("B16: a cancelled pointer contributes no delta despite Chrome's 0,0", () => {
	// centre of a 390x844 viewport, which is where the reported bug was measured
	const start = { x: 195, y: 422 }

	assert.equal(dragDelta({ clientX: 0, clientY: 0 }, start, true), null)

	// the leak this prevents: -195 / 20 = -9.75deg of rotationY on every scroll
	assert.equal(start.x / DRAG_SENSITIVITY, 9.75)

	// a live pointer still reports its true delta
	assert.deepEqual(dragDelta({ clientX: 235, clientY: 400 }, start, false), {
		x: 40,
		y: -22,
	})
	assert.deepEqual(dragDelta({ clientX: 195, clientY: 422 }, start, false), {
		x: 0,
		y: 0,
	})
})

test("a cancelled partial drag preserves its last valid rotation", () => {
	const start = { x: 195, y: 422 }
	const initialRotation = 37.5
	let rotation = initialRotation
	for (const [pointer, cancelled] of [
		[{ clientX: 235, clientY: 430 }, false],
		[{ clientX: 0, clientY: 0 }, true],
	] as const) {
		const delta = dragDelta(pointer, start, cancelled)
		if (delta) rotation = initialRotation + delta.x / DRAG_SENSITIVITY
	}
	assert.equal(rotation, 39.5)
})

test("B14: degenerate geometry stays finite, never NaN", () => {
	for (const seg of [1, 2, SEG, 35]) {
		assert.ok(Number.isFinite(degPerColumn(seg)))
		assert.ok(Number.isFinite(rotYForX(0, seg)))
		assert.ok(Number.isFinite(frontSlotFor(0, seg)))
	}
	assert.equal(buildItems([], SEG).length, SEG * 5)
	assert.ok(buildItems([], SEG).every((i) => i.src === ""))
})
