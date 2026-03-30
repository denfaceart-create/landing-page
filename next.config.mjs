import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Using standard Next.js image optimization
		formats: ["image/avif", "image/webp"],
		qualities: [60, 75, 85],
	},
	async redirects() {
		return [
			// /about redirects (all locale variants)
			{ source: "/about", destination: "/#about", permanent: true },
			{ source: "/über", destination: "/#about", permanent: true },
			{ source: "/en/about", destination: "/en#about", permanent: true },
			{ source: "/de/über", destination: "/de#about", permanent: true },
			// /faq redirects (all locale variants)
			{ source: "/faq", destination: "/#faq", permanent: true },
			{ source: "/en/faq", destination: "/en#faq", permanent: true },
			{ source: "/de/faq", destination: "/de#faq", permanent: true },
		]
	},
}

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./i18n/request.ts",
	experimental: {
		createMessagesDeclaration: "./i18n/translations/ch.json",
	},
})
export default withNextIntl(nextConfig)
