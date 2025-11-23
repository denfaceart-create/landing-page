export const port = process.env.PORT || 3000
export const host = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: `http://localhost:${port}`

export const myEmailAddress = "faceartow@gmail.com"
export const debugEmailAddress = "den.face.art@gmail.com"
export const phoneNumber = "+41796736445"
export const location = "Sarnen, Obwalden, Switzerland"
