/**
 * Sistema de Filtros de Proyectos - Versión Limpia y Optimizada
 * Este archivo contiene SOLO la funcionalidad de filtros
 * Sin conflictos ni funciones duplicadas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que los proyectos se carguen completamente
    setTimeout(() => {
        initializeProjectFilters();
    }, 250);
});

/**
 * Inicializar el sistema de filtros
 */
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Validar que existan elementos
    if (!filterButtons.length) {
        console.warn('⚠️ No se encontraron botones de filtro (.filter-btn)');
        return;
    }
    
    if (!projectCards.length) {
        console.warn('⚠️ No se encontraron proyectos (.project-card)');
        return;
    }
    
    console.log('✅ Sistema de filtros inicializado');
    console.log(`   - Botones de filtro encontrados: ${filterButtons.length}`);
    console.log(`   - Proyectos encontrados: ${projectCards.length}`);

    // Agregar event listeners a cada botón
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const selectedFilter = this.getAttribute('data-filter');
            
            // Actualizar estado activo de botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log(`🔍 Filtro aplicado: "${selectedFilter}"`);
            
            // Filtrar y animar proyectos
            applyFilter(projectCards, selectedFilter);
        });
    });
}

/**
 * Aplicar filtro a los proyectos
 * @param {NodeList} cards - Lista de tarjetas de proyecto
 * @param {string} filter - Filtro a aplicar
 */
function applyFilter(cards, filter) {
    let visibleCount = 0;
    
    cards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = (filter === 'all') || (cardCategory === filter);
        
        if (shouldShow) {
            // Mostrar con animación
            card.style.display = 'block';
            card.style.animation = 'none';
            
            // Forzar reflow para reiniciar la animación
            void card.offsetWidth;
            
            card.style.animation = `fadeInUp 0.4s ease ${index * 50}ms forwards`;
            visibleCount++;
        } else {
            // Ocultar sin animación
            card.style.display = 'none';
            card.style.animation = 'none';
        }
    });
    
    console.log(`   ✓ ${visibleCount} proyecto(s) visible(s)`);
}

/**
 * Resetear filtros (función global)
 */
window.resetProjectFilters = function() {
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.click();
        console.log('🔄 Filtros resetados');
    }
};
