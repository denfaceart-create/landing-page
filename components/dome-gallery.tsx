"use client"

import { useGesture } from "@use-gesture/react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useTranslations } from "next-intl"
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog"
import "./dome-gallery.css"

/** Delivery URLs are `/upload/<version>/<publicId>`, so transforms go right after `/upload/`. */
const cloudinaryTransform = (url: string, transformation: string) =>
	url.replace("/upload/", `/upload/${transformation}/`)

type ImageItem = string | { src: string; alt?: string }

type DomeGalleryProps = {
	images: ImageItem[]
	fit?: number
	fitBasis?: "auto" | "min" | "max" | "width" | "height"
	minRadius?: number
	maxRadius?: number
	overlayBlurColor?: string
	maxVerticalRotationDeg?: number
	dragSensitivity?: number
	segments?: number
	dragDampening?: number
	imageBorderRadius?: string
	grayscale?: boolean
}

type ItemDef = {
	src: string
	alt: string
	/** 0-based index among the *unique* images, so repeat tiles stay distinguishable. */
	imageIndex: number
	x: number
	y: number
	sizeX: number
	sizeY: number
}

const DEFAULTS = {
	maxVerticalRotationDeg: 5,
	dragSensitivity: 20,
	segments: 35,
} as const

const clamp = (v: number, min: number, max: number) =>
	Math.min(Math.max(v, min), max)
const wrapAngleSigned = (deg: number) => {
	const a = (((deg + 180) % 360) + 360) % 360
	return a - 180
}

const toImage = (image: ImageItem) =>
	typeof image === "string"
		? { src: image, alt: "" }
		: { src: image.src || "", alt: image.alt || "" }

// Grid geometry. The CSS places a tile at
// rotateY(rotY * (offsetX + (sizeX - 1) / 2)), where rotY is (360deg / segments) / 2,
// so a tile's angle from the viewer is degPerUnit * (offsetX + 0.5) + rotation.y.
// Every column has the same height, which is what makes slot arithmetic possible.
const X_BASE = -37
const X_STEP = 2
const Y_EVEN = [-4, -2, 0, 2, 4]
const Y_ODD = [-3, -1, 1, 3, 5]
const MID_ROW = 2

const degPerUnit = (seg: number) => 360 / seg / 2
const colOf = (slot: number) => Math.floor(slot / Y_EVEN.length)
const rowOf = (slot: number) => slot % Y_EVEN.length
const slotAt = (col: number, row: number, seg: number) =>
	(((col % seg) + seg) % seg) * Y_EVEN.length + row
/** rotation.y that brings a tile with this offset-x to the front */
const rotYForX = (x: number, seg: number) =>
	wrapAngleSigned(-degPerUnit(seg) * (x + 0.5))
/** the slot sitting at the front for a given rotation.y */
const frontSlotFor = (rotY: number, seg: number) =>
	slotAt(
		Math.round((-rotY / degPerUnit(seg) - 0.5 - X_BASE) / X_STEP),
		MID_ROW,
		seg,
	)

/** Degrees of rotationY per column; the columns span a full 360° turn. */
const degPerColumn = (seg: number) => 360 / seg

/** Spatial neighbour. Columns wrap because the dome is a full ring; rows clamp. */
const neighbourSlot = (slot: number, key: string, seg: number) => {
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

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
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

const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function DomeGallery({
	images,
	fit = 0.5,
	fitBasis = "auto",
	minRadius = 600,
	maxRadius = Infinity,
	overlayBlurColor = "#120F17",
	maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
	dragSensitivity = DEFAULTS.dragSensitivity,
	segments = DEFAULTS.segments,
	dragDampening = 2,
	imageBorderRadius = "30px",
	grayscale = false,
}: DomeGalleryProps) {
	const t = useTranslations("HomePage.gallery")

	const rootRef = useRef<HTMLDivElement>(null)
	const mainRef = useRef<HTMLDivElement>(null)
	const sphereRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const originRectRef = useRef<{ x: number; y: number } | null>(null)
	const triggerRef = useRef<HTMLElement | null>(null)
	const prevButtonRef = useRef<HTMLButtonElement>(null)
	const nextButtonRef = useRef<HTMLButtonElement>(null)

	const rotationRef = useRef({ x: 0, y: 0 })
	const startRotRef = useRef({ x: 0, y: 0 })
	const startPosRef = useRef<{ x: number; y: number } | null>(null)
	const draggingRef = useRef(false)
	const movedRef = useRef(false)
	const inertiaRAF = useRef<number | null>(null)

	const lastDragEndAt = useRef(0)

	const items = useMemo(() => buildItems(images, segments), [images, segments])

	// The sphere repeats images across its slots; the lightbox navigates the unique list.
	const uniqueImages = useMemo(() => images.map(toImage), [images])
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	// Roving tabindex: exactly one tile is in the tab order, and it tracks whichever
	// tile the sphere is currently presenting, so tabbing in never lands on the
	// hidden side of the dome.
	const [activeSlot, setActiveSlot] = useState(() => frontSlotFor(0, segments))
	const sphereTimer = useRef<number | null>(null)

	const applyTransform = useCallback((xDeg: number, yDeg: number) => {
		const el = sphereRef.current
		if (el) {
			el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
		}
	}, [])

	const lockedRadiusRef = useRef<number | null>(null)

	useEffect(() => {
		const root = rootRef.current
		if (!root) return
		const ro = new ResizeObserver((entries) => {
			const cr = entries[0].contentRect
			const w = Math.max(1, cr.width),
				h = Math.max(1, cr.height)
			const minDim = Math.min(w, h),
				maxDim = Math.max(w, h),
				aspect = w / h
			let basis: number
			switch (fitBasis) {
				case "min":
					basis = minDim
					break
				case "max":
					basis = maxDim
					break
				case "width":
					basis = w
					break
				case "height":
					basis = h
					break
				default:
					basis = aspect >= 1.3 ? w : minDim
			}
			let radius = basis * fit
			const heightGuard = h * 1.35
			radius = Math.min(radius, heightGuard)
			radius = clamp(radius, minRadius, maxRadius)
			lockedRadiusRef.current = Math.round(radius)

			root.style.setProperty("--radius", `${lockedRadiusRef.current}px`)
			root.style.setProperty("--overlay-blur-color", overlayBlurColor)
			root.style.setProperty("--tile-radius", imageBorderRadius)
			root.style.setProperty(
				"--image-filter",
				grayscale ? "grayscale(1)" : "none",
			)
			applyTransform(rotationRef.current.x, rotationRef.current.y)
		})
		ro.observe(root)
		return () => ro.disconnect()
	}, [
		fit,
		fitBasis,
		minRadius,
		maxRadius,
		overlayBlurColor,
		grayscale,
		imageBorderRadius,
		applyTransform,
	])

	useEffect(() => {
		applyTransform(rotationRef.current.x, rotationRef.current.y)
	}, [applyTransform])

	const stopInertia = useCallback(() => {
		if (inertiaRAF.current) {
			cancelAnimationFrame(inertiaRAF.current)
			inertiaRAF.current = null
		}
	}, [])

	/** Re-anchor the tab stop on whatever tile is now facing the viewer. */
	const syncActiveToFront = useCallback(() => {
		setActiveSlot(frontSlotFor(rotationRef.current.y, segments))
	}, [segments])

	const startInertia = useCallback(
		(vx: number, vy: number) => {
			if (prefersReducedMotion()) {
				syncActiveToFront()
				return
			}
			const MAX_V = 1.4
			let vX = clamp(vx, -MAX_V, MAX_V) * 80
			let vY = clamp(vy, -MAX_V, MAX_V) * 80

			let frames = 0
			const d = clamp(dragDampening ?? 0.6, 0, 1)
			const frictionMul = 0.94 + 0.055 * d
			const stopThreshold = 0.015 - 0.01 * d
			const maxFrames = Math.round(90 + 270 * d)

			const step = () => {
				vX *= frictionMul
				vY *= frictionMul
				if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
					inertiaRAF.current = null
					syncActiveToFront()
					return
				}
				if (++frames > maxFrames) {
					inertiaRAF.current = null
					syncActiveToFront()
					return
				}
				const nextX = clamp(
					rotationRef.current.x - vY / 200,
					-maxVerticalRotationDeg,
					maxVerticalRotationDeg,
				)
				const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
				rotationRef.current = { x: nextX, y: nextY }
				applyTransform(nextX, nextY)
				inertiaRAF.current = requestAnimationFrame(step)
			}
			stopInertia()
			inertiaRAF.current = requestAnimationFrame(step)
		},
		[
			dragDampening,
			maxVerticalRotationDeg,
			stopInertia,
			syncActiveToFront,
			applyTransform,
		],
	)

	useGesture(
		{
			onDragStart: ({ event }) => {
				stopInertia()
				const evt = event as PointerEvent
				draggingRef.current = true
				movedRef.current = false
				startRotRef.current = { ...rotationRef.current }
				startPosRef.current = { x: evt.clientX, y: evt.clientY }
			},
			onDrag: ({
				event,
				last,
				velocity = [0, 0],
				direction = [0, 0],
				movement,
			}) => {
				if (!draggingRef.current || !startPosRef.current) return

				const evt = event as PointerEvent
				const dxTotal = evt.clientX - startPosRef.current.x
				const dyTotal = evt.clientY - startPosRef.current.y

				if (!movedRef.current) {
					const dist2 = dxTotal * dxTotal + dyTotal * dyTotal
					if (dist2 > 16) movedRef.current = true
				}

				const nextX = clamp(
					startRotRef.current.x - dyTotal / dragSensitivity,
					-maxVerticalRotationDeg,
					maxVerticalRotationDeg,
				)
				const nextY = wrapAngleSigned(
					startRotRef.current.y + dxTotal / dragSensitivity,
				)

				if (
					rotationRef.current.x !== nextX ||
					rotationRef.current.y !== nextY
				) {
					rotationRef.current = { x: nextX, y: nextY }
					applyTransform(nextX, nextY)
				}

				if (last) {
					draggingRef.current = false

					const [vMagX, vMagY] = velocity
					const [dirX, dirY] = direction
					let vx = vMagX * dirX
					let vy = vMagY * dirY

					if (
						Math.abs(vx) < 0.001 &&
						Math.abs(vy) < 0.001 &&
						Array.isArray(movement)
					) {
						const [mx, my] = movement
						vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2)
						vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2)
					}

					if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
						startInertia(vx, vy)
					} else {
						syncActiveToFront()
					}

					if (movedRef.current) lastDragEndAt.current = performance.now()

					movedRef.current = false
				}
			},
		},
		// keys:false — @use-gesture defaults keys:true and maps arrows to drag
		// deltas, which NaNs rotation and blocks Enter. Keyboard is onTileKeyDown's.
		{
			target: mainRef,
			eventOptions: { passive: true },
			drag: { pointer: { keys: false } },
		},
	)

	const openLightbox = useCallback(
		(slot: number, el: HTMLElement) => {
			if (uniqueImages.length === 0) return
			stopInertia()
			const r = el.getBoundingClientRect()
			originRectRef.current = {
				x: r.left + r.width / 2,
				y: r.top + r.height / 2,
			}
			// Radix restores to whatever was focused when it mounted, but the tile only
			// takes focus in the click's default action -- after this setState commits.
			triggerRef.current = el
			// buildItems can reorder slots for duplicate srcs, so trust the tile's src.
			const index = uniqueImages.findIndex((im) => im.src === items[slot].src)
			setLightboxIndex(index === -1 ? 0 : index)
		},
		[items, stopInertia, uniqueImages],
	)

	const closeLightbox = useCallback(() => setLightboxIndex(null), [])

	const stepLightbox = useCallback(
		(delta: number) => {
			setLightboxIndex((i) =>
				i === null
					? null
					: (i + delta + uniqueImages.length) % uniqueImages.length,
			)
		},
		[uniqueImages.length],
	)

	const applyOrigin = useCallback(() => {
		const content = contentRef.current
		const origin = originRectRef.current
		if (!content || !origin) return
		const rect = content.getBoundingClientRect()
		// offsetWidth/Height are untransformed, and a zoom animation leaves the
		// centre fixed, so this stays correct while zoom-in-95 is still running.
		const left = rect.left + rect.width / 2 - content.offsetWidth / 2
		const top = rect.top + rect.height / 2 - content.offsetHeight / 2
		content.style.transformOrigin = `${origin.x - left}px ${origin.y - top}px`
	}, [])

	useLayoutEffect(() => {
		if (lightboxIndex === null) return
		applyOrigin()
	}, [applyOrigin, lightboxIndex])

	useEffect(() => {
		if (lightboxIndex === null) return
		const onKey = (e: KeyboardEvent) => {
			// Move focus to the arrow that was used, so the visible focus ring
			// confirms the direction the keyboard user just travelled in.
			if (e.key === "ArrowLeft") {
				e.preventDefault()
				stepLightbox(-1)
				prevButtonRef.current?.focus()
			} else if (e.key === "ArrowRight") {
				e.preventDefault()
				stepLightbox(1)
				nextButtonRef.current?.focus()
			}
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [lightboxIndex, stepLightbox])

	const onTileClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>, slot: number) => {
			if (draggingRef.current) return
			if (movedRef.current) return
			if (performance.now() - lastDragEndAt.current < 80) return
			openLightbox(slot, e.currentTarget)
		},
		[openLightbox],
	)

	/** Ease the sphere to a rotation, then drop the transition so drags stay 1:1. */
	const glideTo = useCallback(
		(nextRotY: number) => {
			stopInertia()
			rotationRef.current = { x: rotationRef.current.x, y: nextRotY }
			applyTransform(rotationRef.current.x, nextRotY)
			const el = sphereRef.current
			if (!el || prefersReducedMotion()) return
			el.classList.add("sphere--gliding")
			if (sphereTimer.current) clearTimeout(sphereTimer.current)
			sphereTimer.current = window.setTimeout(() => {
				el.classList.remove("sphere--gliding")
				sphereTimer.current = null
			}, 420)
		},
		[applyTransform, stopInertia],
	)

	const focusSlot = useCallback(
		(slot: number, step?: number) => {
			const target = items[slot]
			if (!target) return
			setActiveSlot(slot)
			// Rotating to an absolute front angle wraps at the seam and sends the
			// sphere backwards through itself, which dragging never does.
			const rotY =
				step === undefined
					? rotYForX(target.x, segments)
					: rotationRef.current.y + step
			glideTo(rotY)
			sphereRef.current
				?.querySelector<HTMLElement>(`[data-slot="${slot}"]`)
				?.focus()
		},
		[glideTo, items, segments],
	)

	const onTileKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLButtonElement>, slot: number) => {
			if (e.key === "Home") {
				e.preventDefault()
				focusSlot(0)
				return
			}
			if (e.key === "End") {
				e.preventDefault()
				focusSlot(items.length - 1)
				return
			}
			const next = neighbourSlot(slot, e.key, segments)
			if (next === null) return
			e.preventDefault()
			const per = degPerColumn(segments)
			if (e.key === "ArrowRight") focusSlot(next, -per)
			else if (e.key === "ArrowLeft") focusSlot(next, per)
			else focusSlot(next, 0)
		},
		[focusSlot, items.length, segments],
	)

	useEffect(
		() => () => {
			if (sphereTimer.current) clearTimeout(sphereTimer.current)
		},
		[],
	)

	const currentImage =
		lightboxIndex !== null ? uniqueImages[lightboxIndex] : undefined

	const announcedPosition =
		lightboxIndex !== null
			? t("positionAnnouncement", {
					current: String(lightboxIndex + 1),
					total: String(uniqueImages.length),
				})
			: ""

	return (
		<>
			<div
				ref={rootRef}
				className="sphere-root"
				style={
					{
						"--segments-x": segments,
						"--segments-y": segments,
						"--overlay-blur-color": overlayBlurColor,
						"--tile-radius": imageBorderRadius,
						"--image-filter": grayscale ? "grayscale(1)" : "none",
					} as React.CSSProperties
				}
			>
				<div ref={mainRef} className="sphere-main">
					<div className="stage">
						{/** biome-ignore lint/a11y/useSemanticElements: role="group" is used for a non-form 3D image gallery; <fieldset> is for form controls and would be semantically incorrect + break the preserve-3d transform chain */}
						<div
							ref={sphereRef}
							className="sphere"
							role="group"
							aria-label={t("title")}
						>
							{items.map((it, i) => (
								<div
									key={`${it.x},${it.y},${i}`}
									className="item"
									style={
										{
											"--offset-x": it.x,
											"--offset-y": it.y,
											"--item-size-x": it.sizeX,
											"--item-size-y": it.sizeY,
										} as React.CSSProperties
									}
								>
									<button
										type="button"
										data-slot={i}
										className="item__image"
										tabIndex={i === activeSlot ? 0 : -1}
										aria-label={[
											it.alt,
											t("positionAnnouncement", {
												current: String(it.imageIndex + 1),
												total: String(uniqueImages.length),
											}),
										]
											.filter(Boolean)
											.join(" ")}
										onClick={(e) => onTileClick(e, i)}
										onKeyDown={(e) => onTileKeyDown(e, i)}
									>
										{/** biome-ignore lint/performance/noImgElement: next/image cannot be used inside a 3D-transformed preserve-3d subtree -- it injects its own wrapper that breaks the transform chain */}
										<img
											src={cloudinaryTransform(it.src, "w_400,q_auto,f_auto")}
											draggable={false}
											alt=""
											decoding="async"
										/>
									</button>
								</div>
							))}
						</div>
					</div>

					<div className="overlay" />
					<div className="overlay overlay--blur" />
					<div className="edge-fade edge-fade--top" />
					<div className="edge-fade edge-fade--bottom" />
				</div>
			</div>

			<Dialog
				open={lightboxIndex !== null}
				onOpenChange={(open) => !open && closeLightbox()}
			>
				<DialogContent
					ref={(node) => {
						contentRef.current = node
						if (node) applyOrigin()
					}}
					showCloseButton={false}
					aria-describedby={undefined}
					onCloseAutoFocus={(e) => {
						e.preventDefault()
						triggerRef.current?.focus()
					}}
					className="flex max-h-[95vh] max-w-[95vw] items-center justify-center overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-[95vw]"
				>
					<DialogTitle className="sr-only">
						{currentImage?.alt || t("lightboxLabel")}
					</DialogTitle>

					<button
						type="button"
						ref={prevButtonRef}
						onClick={() => stepLightbox(-1)}
						className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						aria-label={t("previousImage")}
					>
						<ChevronLeft className="h-6 w-6" />
					</button>

					{currentImage && (
						/* biome-ignore lint/performance/noImgElement: intentional — next/image not used per project rules */
						<img
							src={cloudinaryTransform(
								currentImage.src,
								"w_1600,q_auto,f_auto",
							)}
							alt={currentImage.alt}
							onLoad={applyOrigin}
							className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
							decoding="async"
						/>
					)}

					<button
						type="button"
						ref={nextButtonRef}
						onClick={() => stepLightbox(1)}
						className="absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						aria-label={t("nextImage")}
					>
						<ChevronRight className="h-6 w-6" />
					</button>

					<DialogClose asChild>
						<button
							type="button"
							className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
							aria-label={t("closeLightbox")}
						>
							<X className="h-5 w-5" />
						</button>
					</DialogClose>

					{lightboxIndex !== null && (
						<span
							aria-live="polite"
							className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white"
						>
							<span aria-hidden="true">
								{lightboxIndex + 1} / {uniqueImages.length}
							</span>
							<span className="sr-only">{announcedPosition}</span>
						</span>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}
