// ===================================
// FUNCIONALIDAD DEL SIDEBAR DE FILTROS
// ===================================

class SidebarManager {
  constructor() {
    this.sidebar = document.querySelector('.projects-sidebar');
    this.overlay = document.querySelector('.sidebar-overlay');
        this.toggleBtn = document.querySelector('.floating-filter-btn');
    this.closeBtn = document.querySelector('.sidebar-toggle');
    this.searchInput = document.querySelector('#projectSearchSidebar');
    this.sortSelect = document.querySelector('#sortProjectsSidebar');
    this.categoryFilters = document.querySelectorAll('.filter-option');
    this.techFilters = document.querySelectorAll('.tech-filter');
    this.clearFiltersBtn = document.querySelector('#clearFilters');
    this.clearSearchBtn = document.querySelector('.clear-search');
    
    this.projectsContainer = document.querySelector('.projects-grid');
    this.allProjects = [];
    this.filteredProjects = [];
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadProjects();
    this.updateStats();
  }

  bindEvents() {
    // Toggle sidebar
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.openSidebar());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeSidebar());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeSidebar());
    }
    
    // Buscar proyectos
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
    
    // Ordenamiento
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.handleSort(e.target.value);
      });
    }
    
    // Filtros de categoría
    this.categoryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        this.handleCategoryFilter(filter);
      });
    });
    
    // Filtros de tecnología
    this.techFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        this.handleTechFilter(filter);
      });
    });
    
    // Limpiar filtros
    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener('click', () => {
        this.clearAllFilters();
      });
    }
    
    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        this.clearSearch();
      });
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isSidebarOpen()) {
        this.closeSidebar();
      }
    });
  }

  openSidebar() {
    if (this.sidebar && this.overlay) {
      this.sidebar.classList.add('active');
      this.overlay.classList.add('active');
      document.body.classList.add('sidebar-open');
      
      // Focus en el input de búsqueda
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }, 300);
    }
  }

  closeSidebar() {
    if (this.sidebar && this.overlay) {
      this.sidebar.classList.remove('active');
      this.overlay.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }
  }

  isSidebarOpen() {
    return this.sidebar && this.sidebar.classList.contains('active');
  }

  loadProjects() {
    // Cargar todos los proyectos del DOM
    const projectCards = document.querySelectorAll('.project-card');
    
    this.allProjects = Array.from(projectCards).map(card => {
      const title = card.querySelector('h3')?.textContent || '';
      const description = card.querySelector('.project-description')?.textContent || '';
      const category = card.dataset.category || 'web';
      const technologies = (card.dataset.tech || '').split(',').map(tech => tech.trim());
      const date = card.dataset.date || new Date().toISOString();
      
      return {
        element: card,
        title,
        description,
        category,
        technologies,
        date: new Date(date)
      };
    });
    
    this.filteredProjects = [...this.allProjects];
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
      this.showAllProjects();
    } else {
      this.filteredProjects = this.allProjects.filter(project => {
        return project.title.toLowerCase().includes(searchTerm) ||
               project.description.toLowerCase().includes(searchTerm) ||
               project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
      });
    }
    
    this.renderProjects();
    this.updateStats();
  }

  handleSort(sortType) {
    switch (sortType) {
      case 'newest':
        this.filteredProjects.sort((a, b) => b.date - a.date);
        break;
      case 'oldest':
        this.filteredProjects.sort((a, b) => a.date - b.date);
        break;
      case 'name-asc':
        this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        this.filteredProjects.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    this.renderProjects();
  }

  handleCategoryFilter(filterElement) {
    const category = filterElement.dataset.filter;
    
    // Toggle active state
    filterElement.classList.toggle('active');
    
    // Si se selecciona "all", mostrar todos y limpiar otros filtros
    if (category === 'all') {
      this.categoryFilters.forEach(filter => {
        if (filter !== filterElement) {
          filter.classList.remove('active');
        }
      });
      this.filteredProjects = [...this.allProjects];
    } else {
      // Desactivar el filtro "all" si se selecciona otro
      const allFilter = Array.from(this.categoryFilters).find(f => f.dataset.filter === 'all');
      if (allFilter) {
        allFilter.classList.remove('active');
      }
      
      // Obtener todas las categorías activas
      const activeCategories = Array.from(this.categoryFilters)
        .filter(filter => filter.classList.contains('active') && filter.dataset.filter !== 'all')
        .map(filter => filter.dataset.filter);
      
      // Si no hay categorías activas, mostrar todos
      if (activeCategories.length === 0) {
        this.filteredProjects = [...this.allProjects];
        if (allFilter) {
          allFilter.classList.add('active');
        }
      } else {
        this.filteredProjects = this.allProjects.filter(project => 
          activeCategories.includes(project.category)
        );
      }
    }
    
    this.renderProjects();
    this.updateStats();
  }

  handleTechFilter(filterElement) {
    const tech = filterElement.dataset.tech;
    
    // Toggle active state
    filterElement.classList.toggle('active');
    
    // Obtener todas las tecnologías activas
    const activeTechnologies = Array.from(this.techFilters)
      .filter(filter => filter.classList.contains('active'))
      .map(filter => filter.dataset.tech);
    
    // Si no hay tecnologías activas, mostrar todos
    if (activeTechnologies.length === 0) {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter(project => 
        activeTechnologies.some(tech => project.technologies.includes(tech))
      );
    }
    
    this.renderProjects();
    this.updateStats();
  }

  clearAllFilters() {
    // Limpiar filtros activos
    this.categoryFilters.forEach(filter => {
      filter.classList.remove('active');
    });
    
    this.techFilters.forEach(filter => {
      filter.classList.remove('active');
    });
    
    // Reset búsqueda
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    
    // Reset ordenamiento
    if (this.sortSelect) {
      this.sortSelect.value = 'newest';
    }
    
    this.showAllProjects();
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
      this.handleSearch('');
    }
  }

  showAllProjects() {
    this.filteredProjects = [...this.allProjects];
    this.renderProjects();
    this.updateStats();
  }

  renderProjects() {
    if (!this.projectsContainer) return;
    
    // Ocultar todos los proyectos
    this.allProjects.forEach(project => {
      project.element.style.display = 'none';
    });
    
    // Mostrar proyectos filtrados
    this.filteredProjects.forEach((project, index) => {
      project.element.style.display = 'block';
      
      // Animación de entrada
      project.element.style.animationDelay = `${index * 0.1}s`;
      project.element.classList.add('fade-in-up');
    });
    
    // Mostrar mensaje si no hay resultados
    this.showNoResultsMessage(this.filteredProjects.length === 0);
  }

  showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results-message';
      noResultsMsg.innerHTML = `
        <div class="no-results-content">
          <i class="fas fa-search"></i>
          <h3>No se encontraron proyectos</h3>
          <p>Intenta cambiar los filtros o términos de búsqueda</p>
          <button class="btn btn-primary" onclick="sidebarManager.clearAllFilters()">
            Limpiar filtros
          </button>
        </div>
      `;
      this.projectsContainer.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  updateStats() {
    const totalProjects = this.allProjects.length;
    const visibleProjects = this.filteredProjects.length;
    
    // Actualizar contadores en filtros
    this.updateFilterCounts();
    
    // Actualizar estadísticas rápidas
    const statsElements = document.querySelectorAll('.stat-number');
    if (statsElements.length >= 2) {
      statsElements[0].textContent = visibleProjects;
      statsElements[1].textContent = totalProjects;
    }
  }

  updateFilterCounts() {
    this.categoryFilters.forEach(filter => {
      const category = filter.dataset.category;
      const count = this.allProjects.filter(p => p.category === category).length;
      const countElement = filter.querySelector('.count');
      if (countElement) {
        countElement.textContent = count;
      }
    });
  }
}

// ===================================
// INICIALIZACIÓN
// ===================================

let sidebarManager;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Solo inicializar en la página de proyectos
  if (document.querySelector('.projects-sidebar')) {
    sidebarManager = new SidebarManager();
  }
});

// ===================================
// UTILIDADES ADICIONALES
// ===================================

// Función para añadir animaciones suaves
function addSmoothAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-up {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .no-results-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }
    
    .no-results-content i {
      font-size: 3rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    
    .no-results-content h3 {
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }
    
    .no-results-content p {
      margin-bottom: 1.5rem;
    }
  `;
  document.head.appendChild(style);
}

// Ejecutar animaciones
addSmoothAnimations();

// ===================================
// INICIALIZACIÓN
// ===================================

// Inicializar el sidebar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new SidebarManager();
  console.log('Sidebar Manager initialized');
});