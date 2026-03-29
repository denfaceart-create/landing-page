import { type NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
	const response = intlMiddleware(request)

	// Forward the pathname so Server Components can access it via headers()
	const headers = new Headers(
		response instanceof NextResponse ? response.headers : undefined,
	)
	headers.set("x-current-path", request.nextUrl.pathname)

	return NextResponse.next({
		request: { headers: new Headers(request.headers) },
		headers,
	})
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
}
