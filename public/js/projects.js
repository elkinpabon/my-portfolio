let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    // Esperar más tiempo para desktop
    setTimeout(initializeProjectFilters, 800);
});

function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const newFilter = this.getAttribute('data-filter');
            if (newFilter === currentFilter) return;
            
            currentFilter = newFilter;
            
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            this.classList.add('active');
            applyFilter(newFilter);
        });
    });
}

function applyFilter(filterValue) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    const allCards = projectsGrid.querySelectorAll('.project-card');
    let visibleCards = [];
    
    allCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isVisible = (filterValue === 'all') || (category === filterValue);
        
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCards.push(card);
    });
    
    setTimeout(() => {
        visibleCards.forEach((card, idx) => {
            card.style.animation = 'none';
            void card.offsetWidth;
            const delay = idx * 50 + 'ms';
            card.style.animation = 'fadeInUp 0.5s ease-out ' + delay + ' forwards';
        });
    }, 10);
}
