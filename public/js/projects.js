// JavaScript específico para la página de proyectos
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar las funciones originales si no hay sidebar
    if (!document.querySelector('.projects-sidebar')) {
        initProjectsPage();
        initProjectFilters();
        initProjectSearch();
        initProjectSort();
    } else {
        // Si hay sidebar, solo inicializar lo básico
        initProjectsPage();
        initProjectModal();
    }
    
    initMobileMenu();
    initAnimations();
    initLoadMore();
});

// Inicialización de la página de proyectos
function initProjectsPage() {
    // Animación de contadores en el header
    animateCounters();
    
    // Configurar Animate UI
    if (typeof AnimateUI !== 'undefined') {
        AnimateUI.init({
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
}

// Sistema de filtros de proyectos
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos con animación
            projectCards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                
                if (shouldShow) {
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
                    card.style.display = 'block';
                } else {
                    card.style.animation = 'fadeOutDown 0.3s ease both';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Actualizar contador
            updateProjectCount(filter);
        });
    });
}

// Sistema de búsqueda de proyectos
function initProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    const projectCards = document.querySelectorAll('.project-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        projectCards.forEach(card => {
            const projectName = card.dataset.name.toLowerCase();
            const projectContent = card.textContent.toLowerCase();
            const shouldShow = projectName.includes(searchTerm) || projectContent.includes(searchTerm);
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.3s ease both';
            } else {
                card.style.animation = 'fadeOutDown 0.3s ease both';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Mostrar mensaje si no hay resultados
        const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
        showNoResults(visibleCards.length === 0);
    });
}

// Sistema de ordenamiento de proyectos
function initProjectSort() {
    const sortSelect = document.getElementById('sortProjects');
    const projectsGrid = document.getElementById('projectsGrid');
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const projectCards = Array.from(document.querySelectorAll('.project-card'));
        
        projectCards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'popular':
                    return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
                case 'recent':
                    // Por defecto, ordenar por el orden en el DOM (más recientes primero)
                    return 0;
                case 'tech':
                    const techA = a.querySelector('.tech-tag.primary')?.textContent || '';
                    const techB = b.querySelector('.tech-tag.primary')?.textContent || '';
                    return techA.localeCompare(techB);
                default:
                    return 0;
            }
        });
        
        // Reorganizar el DOM con animación
        projectCards.forEach((card, index) => {
            card.style.animation = `fadeOutUp 0.3s ease ${index * 0.05}s both`;
        });
        
        setTimeout(() => {
            projectCards.forEach(card => {
                projectsGrid.appendChild(card);
                card.style.animation = `fadeInUp 0.3s ease both`;
            });
        }, 500);
    });
}

// Menú móvil
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Inicializar animaciones
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');
                
                // Animación especial para contadores
                if (element.classList.contains('stat-item')) {
                    animateCounter(element);
                }
                
                // Animación para project cards
                if (element.classList.contains('project-card')) {
                    animateProjectCard(element);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    document.querySelectorAll('.stat-item, .project-card, .page-header').forEach(el => {
        observer.observe(el);
    });
}

// Modal de detalles de proyecto
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    // Cerrar modal
    [modalClose, modalOverlay].forEach(element => {
        element.addEventListener('click', closeProjectModal);
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// Cargar más proyectos
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreText = document.querySelector('.load-more-text');
    let currentPage = 1;
    const projectsPerPage = 6;
    
    loadMoreBtn.addEventListener('click', function() {
        // Simular carga de más proyectos
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        this.disabled = true;
        
        setTimeout(() => {
            // Aquí cargarías más proyectos desde tu API
            currentPage++;
            const totalProjects = 12; // Total de proyectos disponibles
            const shown = currentPage * projectsPerPage;
            
            loadMoreText.textContent = `Mostrando ${Math.min(shown, totalProjects)} de ${totalProjects} proyectos`;
            
            if (shown >= totalProjects) {
                this.style.display = 'none';
                loadMoreText.textContent = 'Todos los proyectos han sido cargados';
            } else {
                this.innerHTML = '<i class="fas fa-plus-circle"></i> Cargar Más Proyectos';
                this.disabled = false;
            }
        }, 1500);
    });
}

// Funciones de utilidad

function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.counter);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
        }, 40);
    });
}

function animateCounter(element) {
    const counter = element.querySelector('h3[data-counter]');
    if (!counter) return;
    
    const target = parseInt(counter.dataset.counter);
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const suffix = counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '';
        counter.textContent = Math.floor(current) + suffix;
    }, 40);
}

function animateProjectCard(element) {
    element.style.transform = 'translateY(20px)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s ease';
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 100);
}

function updateProjectCount(filter) {
    const counts = {
        'all': 12,
        'web': 5,
        'api': 4,
        'mobile': 2,
        'tools': 1
    };
    
    const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
    const countSpan = filterBtn.querySelector('.count');
    if (countSpan) {
        countSpan.textContent = counts[filter] || 0;
    }
}

function showNoResults(show) {
    let noResults = document.getElementById('noResults');
    
    if (show && !noResults) {
        noResults = document.createElement('div');
        noResults.id = 'noResults';
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>No se encontraron proyectos</h3>
                <p>Intenta con otros términos de búsqueda o filtra por categoría.</p>
            </div>
        `;
        document.getElementById('projectsGrid').appendChild(noResults);
    } else if (!show && noResults) {
        noResults.remove();
    }
}

// Función global para abrir modal de proyecto
window.openProjectModal = function(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    // Datos de ejemplo para los modales
    const projectData = {
        'ecommerce': {
            title: 'E-commerce Platform',
            description: 'Plataforma completa de comercio electrónico desarrollada con arquitectura de microservicios.',
            features: [
                'Sistema de autenticación y autorización completo',
                'Gestión de inventario en tiempo real',
                'Procesamiento de pagos con Stripe y PayPal',
                'Panel de administración avanzado',
                'Sistema de reseñas y calificaciones',
                'Notificaciones push y email',
                'Analytics y reportes detallados',
                'API REST documentada con Swagger'
            ],
            technologies: ['Node.js', 'React', 'MongoDB', 'Redis', 'Stripe API', 'AWS S3', 'Docker', 'Jest'],
            challenges: 'El mayor desafío fue implementar un sistema de inventario que manejara actualizaciones concurrentes sin inconsistencias.',
            solution: 'Implementé un sistema de bloqueo optimista con Redis y transacciones atómicas en MongoDB.',
            images: ['ecommerce-1.jpg', 'ecommerce-2.jpg', 'ecommerce-3.jpg'],
            liveDemo: 'https://ecommerce-demo.com',
            github: 'https://github.com/tu-usuario/ecommerce-platform'
        },
        'dashboard': {
            title: 'Dashboard Analytics',
            description: 'Dashboard interactivo para análisis de datos empresariales con visualizaciones en tiempo real.',
            features: [
                'Visualizaciones interactivas con D3.js',
                'Actualizaciones en tiempo real con WebSockets',
                'Exportación de reportes en PDF/Excel',
                'Sistema de alertas configurables',
                'Dashboard personalizable por usuario',
                'API REST para integración de datos',
                'Autenticación multi-factor',
                'Modo offline con sincronización'
            ],
            technologies: ['React', 'D3.js', 'Socket.io', 'Node.js', 'PostgreSQL', 'Chart.js', 'Express', 'JWT'],
            challenges: 'Optimizar el rendimiento para mostrar grandes volúmenes de datos sin afectar la experiencia del usuario.',
            solution: 'Implementé virtualización de componentes, paginación inteligente y caching estratégico.',
            images: ['dashboard-1.jpg', 'dashboard-2.jpg'],
            liveDemo: 'https://dashboard-demo.com',
            github: 'https://github.com/tu-usuario/analytics-dashboard'
        }
        // Agregar más proyectos según sea necesario
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
        </div>
        
        <div class="modal-features">
            <h3><i class="fas fa-star"></i> Características Principales</h3>
            <ul class="features-list">
                ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-tech">
            <h3><i class="fas fa-tools"></i> Tecnologías Utilizadas</h3>
            <div class="tech-grid">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-challenge">
            <h3><i class="fas fa-puzzle-piece"></i> Desafío Principal</h3>
            <p>${project.challenges}</p>
            <h4><i class="fas fa-lightbulb"></i> Solución Implementada</h4>
            <p>${project.solution}</p>
        </div>
        
        <div class="modal-links">
            <a href="${project.liveDemo}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Ver Demo
            </a>
            <a href="${project.github}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i> Ver Código
            </a>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Función global para cerrar modal
window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efectos de scroll para navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Lazy loading para imágenes (si las hay)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        initLazyLoading();
    });
}