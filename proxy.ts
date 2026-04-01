import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"

export default function proxy(request: NextRequest) {
	const requestHeaders = new Headers(request.headers)

	requestHeaders.set("x-current-path", request.nextUrl.pathname)
	return createMiddleware(routing)(request)
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
}
