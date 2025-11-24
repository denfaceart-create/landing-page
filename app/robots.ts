import type { MetadataRoute } from "next"

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
			},
			{
				userAgent: [
					"GPTBot", // OpenAI
					"ChatGPT-User", // OpenAI
					"CCBot", // Common Crawl (used by many AI)
					"anthropic-ai", // Anthropic
					"Claude-Web", // Anthropic
					"Google-Extended", // Google Bard/Gemini
					"Applebot-Extended", // Apple Intelligence
					"PerplexityBot", // Perplexity
					"Bytespider", // ByteDance (TikTok)
					"Diffbot", // Diffbot
				],
				allow: "/",
			},
		],
		sitemap: "https://faceartow.ch/sitemap.xml",
	} satisfies MetadataRoute.Robots
}
