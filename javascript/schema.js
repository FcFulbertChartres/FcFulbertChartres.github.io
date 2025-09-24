// schema.js - Données structurées pour le FC Fulbert Chartres
function loadSchemaData() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        "name": "FC Fulbert Chartres",
        "url": "https://fcfulbertchartres.github.io/",
        "description": "Club de football amateur à Chartres",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Stade des Ormes, Rue du Sport",
            "addressLocality": "Chartres",
            "postalCode": "28000",
            "addressCountry": "FR",
            "addressRegion": "Centre-Val de Loire"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "48.443854",
            "longitude": "1.489012"
        },
        "areaServed": "Chartres et agglomération",
        "sameAs": [
            "https://www.facebook.com/fcfulbertchartres",
            "https://www.instagram.com/fcfulbertchartres"
        ]
    };
    
    // Créer et injecter le script JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

// Exécuter au chargement de la page
document.addEventListener('DOMContentLoaded', loadSchemaData);