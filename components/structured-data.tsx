import { myEmailAddress, phoneNumber } from "@/config"

export function StructuredData() {
	const denise = {
		"@type": "Person",
		"@id": "https://www.faceartow.ch/#denise-winberger",
		name: "Denise Winberger",
		alternateName: ["Denise Aeschbacher", "Denise Winberger-Aeschbacher"],
		givenName: "Denise",
		familyName: "Winberger",
		jobTitle: "Face Painter",
		worksFor: {
			"@id": "https://www.faceartow.ch",
		},
		sameAs: ["https://www.instagram.com/faceartow"],
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": ["Organization", "LocalBusiness"],
		name: "Face Art Obwalden",
		alternateName: "Face Art Obwaldä",
		image: "https://www.faceartow.ch/logo.png",
		logo: {
			"@type": "ImageObject",
			url: "https://www.faceartow.ch/logo.png",
			width: 1024,
			height: 1024,
		},
		"@id": "https://www.faceartow.ch",
		url: "https://www.faceartow.ch",
		telephone: phoneNumber,
		email: myEmailAddress,
		priceRange: "$$",
		founder: denise,
		employee: denise,
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
