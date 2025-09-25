// js/schemas.js - Gestion des données structurées
function generateSchema(pageType, customData = null) {
    const baseSchema = {
        "@context": "https://schema.org",
        "name": CLUB_CONFIG.name,
        "url": CLUB_CONFIG.url,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": CLUB_CONFIG.address.street,
            "addressLocality": CLUB_CONFIG.address.city,
            "postalCode": CLUB_CONFIG.address.postalCode,
            "addressCountry": CLUB_CONFIG.address.country,
            "addressRegion": CLUB_CONFIG.address.region
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": CLUB_CONFIG.address.latitude,
            "longitude": CLUB_CONFIG.address.longitude
        }
    };

    switch(pageType) {
        case 'home':
            return {
                ...baseSchema,
                "@type": "SportsOrganization",
                "description": CLUB_CONFIG.description.default,
                "areaServed": `${CLUB_CONFIG.address.city} et agglomération`,
                "sameAs": Object.values(CLUB_CONFIG.social)
            };

        case 'equipe':
            return {
                ...baseSchema,
                "@type": "SportsTeam",
                "description": CLUB_CONFIG.description.equipe,
                "coach": customData?.coach || "À déterminer",
                "sport": "Football"
            };

        case 'calendrier':
            return {
                ...baseSchema,
                "@type": "SportsOrganization",
                "description": CLUB_CONFIG.description.calendrier,
                "event": customData?.nextMatch ? {
                    "@type": "SportsEvent",
                    "name": customData.nextMatch.name,
                    "startDate": customData.nextMatch.date,
                    "location": customData.nextMatch.location
                } : null
            };

        case 'actualites':
            return {
                ...baseSchema,
                "@type": "NewsArticle" | "SportsOrganization",
                "description": CLUB_CONFIG.description.actualites
            };

        case 'contact':
            return {
                ...baseSchema,
                "@type": "ContactPage",
                "description": CLUB_CONFIG.description.contact,
                "email": CLUB_CONFIG.email,
                "telephone": CLUB_CONFIG.telephone
            };

        default:
            return baseSchema;
    }
}

function injectSchema(pageType, customData = null) {
    const schema = generateSchema(pageType, customData);
    
    // Supprimer l'ancien schéma
    const oldScript = document.querySelector('script[type="application/ld+json"]');
    if (oldScript) oldScript.remove();

    // Injecter le nouveau
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}