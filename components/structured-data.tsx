import { myEmailAddress, phoneNumber } from "@/config"

export function StructuredData() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": ["Organization", "LocalBusiness"],
		name: "Face Art Obwalden",
		alternateName: "Face Art Obwaldä",
		image: "https://faceartow.ch/logo.png",
		logo: "https://faceartow.ch/logo.png",
		"@id": "https://faceartow.ch",
		url: "https://faceartow.ch",
		telephone: phoneNumber,
		email: myEmailAddress,
		priceRange: "$$",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Sarnen",
			addressRegion: "Obwalden",
			addressCountry: "CH",
		},
		areaServed: [
			{ "@type": "Place", name: "Obwalden, Switzerland" },
			{ "@type": "Place", name: "Central Switzerland" },
			{ "@type": "Place", name: "Switzerland" },
			{ "@type": "Place", name: "Obwalden, Schweiz" },
			{ "@type": "Place", name: "Zentral Schweiz" },
			{ "@type": "Place", name: "Schweiz" },
		],
		sameAs: [
			"https://www.instagram.com/faceartow",
			// Add additional social media URLs
		],
		description:
			"Professional face painting services for events, parties, and celebrations in Obwalden and Central Switzerland. Creative, safe, and unforgettable designs for kids and families.",
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: It is okay here
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
