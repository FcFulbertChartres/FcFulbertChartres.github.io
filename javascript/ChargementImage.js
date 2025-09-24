        document.addEventListener("DOMContentLoaded", function() {
            const lazyImages = document.querySelectorAll('.lazy-load');
            
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
                img.dataset.src = img.src;
                imageObserver.observe(img);
            });
            
            // Amélioration de l'accessibilité du clavier
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusableElements.forEach((element, index) => {
                element.setAttribute('tabindex', index + 1);
            });
        });