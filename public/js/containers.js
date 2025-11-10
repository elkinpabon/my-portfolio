// Datos de proyectos centralizados
const PROYECTOS_DATA = [
    {
        id: 1,
        title: "Sistema Web de Gestión RRHH HealthyFood",
        description: "Plataforma integral de recursos humanos con control biométrico, nómina automatizada y dashboard ejecutivo para HealthyFood S.A.",
        image: "assets/miniaturas/rhHealthyFood/5.png",
        link: "projects/healthyfood-rrhh.html",
        tech: ["React", "Node.js", "PostgreSQL", "Docker"],
        category: "web",
        featured: true,
        status: "completed"
    },
    {
        id: 2,
        title: "App Móvil Control de Asistencia HealthyFood",
        description: "Aplicación móvil diseñada para el control de asistencia de empleados en tiempo real. Desarrollada para tablets, permite registrar entrada/salida mediante escaneo QR o PIN.",
        image: "assets/miniaturas/healthyFoodMovil/1.png",
        link: "projects/healthyfood-mobile.html",
        tech: ["Flutter", "Dart", "Node.js", "MongoDB", "Firebase"],
        category: "mobile",
        featured: false,
        status: "completed"
    },
    {
        id: 3,
        title: "Aplicación Web HealthyFood",
        description: "Aplicación web informativa y de presentación para Healthy Food, mostrando la misión, visión, servicios y productos de la empresa.",
        image: "assets/miniaturas/healthyFoodWEB/healthy1.png",
        link: "projects/healthyfood-web.html",
        tech: ["Next.js", "Tailwind CSS", "React"],
        category: "web",
        featured: false,
        status: "completed"
    },
    {
        id: 4,
        title: "Sistema Web Ferretería DSA",
        description: "Sistema integral para la gestión de inventarios y ventas en la Ferretería DSA, permitiendo la creación de usuarios, gestión de productos, generación de ventas y reportes.",
        image: "assets/miniaturas/ferreteriaDSA/8.png",
        link: "projects/ferreteria-dsa.html",
        tech: ["Node.js", "Express", "React", "MySQL", "JWT"],
        category: "web",
        featured: false,
        status: "completed"
    },
    {
        id: 5,
        title: "E-commerce MADECOR",
        description: "Plataforma de ecommerce para la venta de material didáctico, con catálogo de productos, carrito de compras, pasarela de pago y generación de facturas.",
        image: "assets/miniaturas/madecor/1.png",
        link: "projects/madecor-ecommerce.html",
        tech: ["Spring Boot", "Angular", "PostgreSQL", "Stripe"],
        category: "web",
        featured: true,
        status: "completed"
    },
    {
        id: 6,
        title: "Plataforma Linxspector",
        description: "Plataforma de monitoreo en tiempo real de los recursos computacionales de equipos Linux y Windows con estadísticas y alertas automáticas.",
        image: "assets/miniaturas/linsxpector/13.jpg",
        link: "projects/linxspector.html",
        tech: ["Python", "Django", "React", "MySQL", "Chart.js"],
        category: "enterprise",
        featured: false,
        status: "completed"
    },
    {
        id: 7,
        title: "BookTech SaaS",
        description: "Plataforma SaaS completa para gestión de libros y bibliotecas con microservicios, escalable en Kubernetes con Spring Boot y React.",
        image: "assets/miniaturas/booktech/1.png",
        link: "projects/booktech-saas.html",
        tech: ["Spring Boot", "PostgreSQL", "React", "Kubernetes", "RabbitMQ"],
        category: "enterprise",
        featured: true,
        status: "completed"
    },
    {
        id: 8,
        title: "App Evacuación Cotopaxi",
        description: "Aplicación para rutas de evacuación segura durante emergencias del volcán Cotopaxi con integración de Google Maps y chatbot de ayuda.",
        image: "assets/miniaturas/rutasEmergencia/2.png",
        link: "projects/cotopaxi-evacuacion.html",
        tech: ["PHP", "JavaScript", "Google Maps API", "Chatbot"],
        category: "mobile",
        featured: false,
        status: "completed"
    },
    {
        id: 9,
        title: "LiveChat Cifrado",
        description: "Sistema de chat en tiempo real con cifrado end-to-end, soporte para múltiples conversaciones y notificaciones en tiempo real.",
        image: "assets/miniaturas/liveChat/1.png",
        link: "projects/livechat.html",
        tech: ["Node.js", "Express", "React", "WebSockets", "MongoDB", "CryptoJS"],
        category: "web",
        featured: false,
        status: "completed"
    }
];

/**
 * Función para renderizar un proyecto
 * @param {Object} proyecto - Datos del proyecto
 * @returns {HTMLElement} - Elemento del proyecto
 */
function crearProjectoCard(proyecto) {
    const template = document.getElementById('project-card-template');
    const clone = template.content.cloneNode(true);

    // Establecer atributos y datos
    const card = clone.querySelector('.project-card');
    card.setAttribute('data-project-id', proyecto.id);
    if (proyecto.featured) card.classList.add('featured');
    card.setAttribute('data-category', proyecto.category);

    // Imagen
    clone.querySelector('.project-image-link').href = proyecto.link;
    clone.querySelector('.project-thumbnail').src = proyecto.image;
    clone.querySelector('.project-thumbnail').alt = proyecto.title;

    // Título y descripción
    clone.querySelector('.project-title').textContent = proyecto.title;
    clone.querySelector('.project-description').textContent = proyecto.description;

    // Tech badges
    const techContainer = clone.querySelector('.project-tech');
    techContainer.innerHTML = '';
    proyecto.tech.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        techContainer.appendChild(badge);
    });

    // Link del botón
    clone.querySelector('.project-links a').href = proyecto.link;

    // Status
    const statusEl = clone.querySelector('.project-status');
    statusEl.textContent = proyecto.status === 'completed' ? 'Completado' : 'En Progreso';
    statusEl.className = `project-status ${proyecto.status}`;

    return clone;
}

/**
 * Función para cargar todos los proyectos en un contenedor
 * @param {string} containerId - ID del contenedor donde agregar los proyectos
 * @param {string} filter - Filtro opcional ('all', 'web', 'mobile', 'enterprise')
 * @param {number} limit - Límite de proyectos a mostrar (0 = sin límite)
 */
function cargarProyectos(containerId, filter = 'all', limit = 0) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Contenedor con ID "${containerId}" no encontrado`);
        return;
    }

    // Filtrar proyectos
    let proyectosFiltrados = PROYECTOS_DATA;
    if (filter !== 'all') {
        proyectosFiltrados = PROYECTOS_DATA.filter(p => p.category === filter);
    }

    // Aplicar límite
    if (limit > 0) {
        proyectosFiltrados = proyectosFiltrados.slice(0, limit);
    }

    // Limpiar contenedor y agregar proyectos
    container.innerHTML = '';
    proyectosFiltrados.forEach((proyecto, index) => {
        const card = crearProjectoCard(proyecto);
        card.querySelector('.project-card').setAttribute('data-delay', (index * 100) + 100);
        card.querySelector('.project-card').setAttribute('data-animate', 'fade-in-up');
        container.appendChild(card);
    });

    // Re-inicializar animaciones si están disponibles
    if (typeof AnimateUI !== 'undefined') {
        AnimateUI.observe();
    }
}

/**
 * Función para obtener un proyecto por ID
 * @param {number} id - ID del proyecto
 * @returns {Object|null} - Datos del proyecto o null
 */
function obtenerProyecto(id) {
    return PROYECTOS_DATA.find(p => p.id === id) || null;
}

/**
 * Función para obtener proyectos por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Array} - Array de proyectos
 */
function obtenerProyectosPorCategoria(category) {
    return PROYECTOS_DATA.filter(p => p.category === category);
}

/**
 * Función para obtener proyectos destacados
 * @returns {Array} - Array de proyectos destacados
 */
function obtenerProyectosDestacados() {
    return PROYECTOS_DATA.filter(p => p.featured);
}

// Asegurar que las funciones estén disponibles globalmente
window.cargarProyectos = cargarProyectos;
window.PROYECTOS_DATA = PROYECTOS_DATA;
window.obtenerProyecto = obtenerProyecto;
window.obtenerProyectosPorCategoria = obtenerProyectosPorCategoria;
window.obtenerProyectosDestacados = obtenerProyectosDestacados;

// Log de confirmación
console.log('✅ containers.js cargado correctamente - ' + PROYECTOS_DATA.length + ' proyectos disponibles');
