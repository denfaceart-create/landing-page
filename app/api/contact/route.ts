import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { ContactMeEmailTemplate } from "@/components/contact-me-email-template"
import { debugEmailAddress, myEmailAddress } from "@/config"

const { RESEND_API_KEY } = process.env
if (!RESEND_API_KEY) {
	throw new Error("RESEND_API_KEY is not defined")
}

const resend = new Resend(RESEND_API_KEY)

// Create rate limiter: 3 requests per hour per IP
const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(3, "1 h"),
	analytics: true,
	prefix: "contact-form",
})

// Spam keywords to filter
const SPAM_KEYWORDS = [
	"viagra",
	"cialis",
	"casino",
	"lottery",
	"prize",
	"winner",
	"crypto",
	"bitcoin",
	"investment opportunity",
	"click here",
	"limited time",
	"act now",
	"congratulations",
	"you won",
	"free money",
	"make money fast",
	"work from home",
	"mlm",
	"forex",
	"casino",
	"dating",
	"singles",
	"meet singles",
	"weight loss",
	"porn",
	"adult",
	"sex toys",
]

// Check for spam content
function containsSpam(text: string) {
	const lowerText = text.toLowerCase()
	return SPAM_KEYWORDS.some((keyword) => lowerText.includes(keyword))
}

export async function POST(request: NextRequest) {
	try {
		// Get IP address for rate limiting
		const ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"unknown"

		// Check rate limit
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

		// Parse request body
		const { name, email, phone, message, honeypot } = await request.json()

		// Honeypot check (if filled, it's a bot)
		if (honeypot) {
			console.warn("Bot detected via honeypot", {
				formData: { name, email, phone, message, honeypot },
			})
			// Return success to not alert the bot
			return NextResponse.json({ success: true })
		}

		// Validate required fields
		if (!name || !email || !message) {
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

		// Validate message length (prevent abuse)
		if (message.length < 10 || message.length > 5000) {
			return NextResponse.json(
				{ error: "Message must be between 10 and 5000 characters" },
				{ status: 400 },
			)
		}

		// Check for spam keywords
		if (containsSpam(name) || containsSpam(message)) {
			console.log("Spam detected in submission from:", email)
			// Return success to not alert spammers, but don't send email
			return NextResponse.json({ success: true })
		}

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: "contact@faceartow.ch",
			to: [myEmailAddress, debugEmailAddress],
			replyTo: email,
			subject: `[Face Art OW] Contact Request: ${name}`,
			react: ContactMeEmailTemplate({ name, email, phone, message, ip }),
		})

		if (error) {
			console.error("Resend error:", error)
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 },
			)
		}

		console.log("Email sent successfully:", data)

		return NextResponse.json({
			success: true,
			messageId: data.id,
		})
	} catch (error) {
		console.error("Contact form error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}

// Optional: Handle OPTIONS for CORS if needed
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
