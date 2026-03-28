import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { AccessibilityFeedbackEmailTemplate } from "@/components/accessibility-feedback-email-template"
import { debugEmailAddress, myEmailAddress } from "@/config"

const { RESEND_API_KEY } = process.env
if (!RESEND_API_KEY) {
	throw new Error("RESEND_API_KEY is not defined")
}

const resend = new Resend(RESEND_API_KEY)

const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(3, "1 h"),
	analytics: true,
	prefix: "accessibility-feedback-form",
})

export async function POST(request: NextRequest) {
	try {
		const ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"unknown"

		const ratelimiting = await ratelimit.limit(ip)
		if (!ratelimiting.success) {
			return NextResponse.json(
				{
					error: "Rate limit exceeded. Please try again later.",
					resetAt: new Date(ratelimiting.reset).toISOString(),
				},
				{ status: 429 },
			)
		}

		const { email, issueType, pageOrElement, description, honeypot } =
			await request.json()

		// Honeypot check
		if (honeypot) {
			return NextResponse.json({ success: true })
		}

		// Validate required fields
		if (!email || !issueType || !description) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			)
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			)
		}

		// Validate description length
		if (description.length < 10 || description.length > 5000) {
			return NextResponse.json(
				{ error: "Description must be between 10 and 5000 characters" },
				{ status: 400 },
			)
		}

		const to =
			email === debugEmailAddress
				? debugEmailAddress
				: [myEmailAddress, debugEmailAddress]

		const { data, error } = await resend.emails.send({
			from: "contact@faceartow.ch",
			to,
			replyTo: email,
			subject: `[Face Art OW] Accessibility Feedback: ${issueType}`,
			react: AccessibilityFeedbackEmailTemplate({
				email,
				issueType,
				pageOrElement: pageOrElement ?? "",
				description,
				ip,
			}),
		})

		if (error) {
			console.error("Resend error:", error)
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 },
			)
		}

		console.log("Accessibility feedback sent:", data)
		return NextResponse.json({ success: true, messageId: data.id })
	} catch (error) {
		console.error("Accessibility feedback error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}

export async function OPTIONS(_request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	})
}
