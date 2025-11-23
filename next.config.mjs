import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
}

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./i18n/request.ts",
})
export default withNextIntl(nextConfig)
