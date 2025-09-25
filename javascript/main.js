// js/main.js - Fonctions communes à toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    // Optimisation du chargement des images
    initLazyLoading();
    
    // Amélioration de l'accessibilité
    initAccessibility();
    
    // Gestion des mots-clés locaux
    highlightLocalKeywords();
    
    // Animation des cartes au scroll
    initScrollAnimations();
});

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

function initAccessibility() {
    // Ajout des attributs ARIA manquants
    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Navigation principale');
    }
    
    // Gestion du focus pour l'accessibilité clavier
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element, index) => {
        element.setAttribute('tabindex', index + 1);
    });
}

function highlightLocalKeywords() {
    const elements = document.querySelectorAll('p, li, span, h1, h2, h3, h4, h5, h6');
    elements.forEach(el => {
        let text = el.innerHTML;
        LOCAL_KEYWORDS.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            text = text.replace(regex, `<strong class="local-keyword">${keyword}</strong>`);
        });
        el.innerHTML = text;
    });
}

function initScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .team-member').forEach(el => {
        animateOnScroll.observe(el);
    });
}

// Fonction utilitaire pour formater les dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}