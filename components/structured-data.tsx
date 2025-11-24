import { phoneNumber } from "@/config"

export function StructuredData() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Face Art Obwalden",
		image: "https://faceartow.ch/logo.png",
		"@id": "https://faceartow.ch",
		url: "https://faceartow.ch",
		telephone: phoneNumber,
		areaServed: {
			"@type": "Place",
			name: "Obwalden, Switzerland",
		},
		sameAs: [
			"https://www.instagram.com/faceartow",
			// Add addition social media URLs
		],
		description:
			"Professional face painting services for events, parties, and celebrations in Obwalden, Switzerland.",
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: It is okay here
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
