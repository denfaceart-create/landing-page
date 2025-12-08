import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Using standard Next.js image optimization
		formats: ["image/avif", "image/webp"],
		qualities: [60, 75, 85],
	},
}

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./i18n/request.ts",
	experimental: {
		createMessagesDeclaration: "./i18n/translations/ch.json",
	},
})
export default withNextIntl(nextConfig)
