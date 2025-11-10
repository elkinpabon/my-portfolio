// FIX CRÍTICO: Forzar visibilidad del formulario de contacto en móviles
// Este script se ejecuta al final para asegurar que el formulario siempre sea visible

(function() {
    'use strict';
    
    function forceContactFormVisibility() {
        // Detectar si es móvil
        const isMobile = window.innerWidth <= 480;
        
        if (isMobile) {
            const contactForm = document.querySelector('.contact-form');
            const contactInfo = document.querySelector('.contact-info');
            const contactContent = document.querySelector('.contact-content');
            
            // Forzar display del contenedor
            if (contactContent) {
                contactContent.style.cssText = 'display: block !important; width: 100% !important;';
            }
            
            // Forzar visibilidad del formulario
            if (contactForm) {
                contactForm.style.cssText = `
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    transform: none !important;
                    width: 100% !important;
                    position: relative !important;
                    animation: none !important;
                `;
                contactForm.removeAttribute('data-animate');
                
                // Forzar inputs visibles
                const inputs = contactForm.querySelectorAll('input, textarea, select, button');
                inputs.forEach(input => {
                    input.style.cssText = 'display: block !important; width: 100% !important;';
                });
            }
            
            // Forzar visibilidad de la info
            if (contactInfo) {
                contactInfo.style.cssText = `
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    transform: none !important;
                    width: 100% !important;
                `;
                contactInfo.removeAttribute('data-animate');
            }
            
            console.log('✅ Formulario de contacto forzado a visible en móvil');
        }
    }
    
    // Ejecutar inmediatamente
    forceContactFormVisibility();
    
    // Ejecutar después de que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceContactFormVisibility);
    }
    
    // Ejecutar después de que todo esté cargado
    window.addEventListener('load', forceContactFormVisibility);
    
    // Ejecutar en resize (por si rota la pantalla)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(forceContactFormVisibility, 250);
    });
    
})();
