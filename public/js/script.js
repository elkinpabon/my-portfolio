// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    try {
        initThemeToggle();
    } catch (e) {
        // Theme toggle no disponible
    }
    
    try {
        initMobileMenu();
    } catch (e) {
        // Mobile menu no disponible
    }
    
    try {
        initScrollEffects();
    } catch (e) {
        // Scroll effects no disponible
    }
    
    try {
        initAnimations();
    } catch (e) {
        // Animations no disponible
    }
    
    try {
        initFormHandler();
    } catch (e) {
        // Form handler no disponible
    }
    
    try {
        initSmoothScroll();
    } catch (e) {
        // Smooth scroll no disponible
    }
});



// Cambio de tema claro/oscuro
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        return;
    }
    
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Verificar tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme + '-theme';
    updateThemeIcon(icon, savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
        
        // Añadir efecto de transición suave
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Menú móvil - Usando delegación de eventos (event delegation)
function initMobileMenu() {
    // Usar delegación de eventos en el document para capturar clicks en .nav-item
    document.addEventListener('click', function(e) {
        // Verificar si el click fue en un .nav-item
        const navItem = e.target.closest('.nav-item');
        if (!navItem) return;
        
        const href = navItem.getAttribute('href');
        
        // Si es un hash a otra página (ej: index.html#about), permitir navegación normal
        if (href && href.includes('.html#')) {
            return; // Permitir que el navegador maneje la navegación
        }
        
        // Si es solo un hash en la página actual (ej: #about), hacer scroll suave
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, true); // Usar captura para asegurar que se capture
}

// Efectos de scroll
function initScrollEffects() {
    const navbar = document.querySelector('.navbar-modern');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlaces activos
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');
    
    let current = '';
    
    // Si hay secciones en la página, encontrar la actual
    if (sections.length > 0) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Determinar si el enlace debe estar activo
        if (current && href === '#' + current) {
            link.classList.add('active');
        } else if (!current && href === '../projects.html') {
            // En página de proyectos, marcar enlace de proyectos como activo
            link.classList.add('active');
        } else if (!current && (href.includes('../index.html') || href === '../index.html')) {
            // En página de inicio, marcar enlace de inicio como activo
            link.classList.add('active');
        }
    });
}

// Inicializar animaciones con Animate UI
function initAnimations() {
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 480;
    
    // Configurar Animate UI
    if (typeof AnimateUI !== 'undefined') {
        AnimateUI.init({
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    // FIX: Forzar visibilidad del formulario en móviles
    if (isMobile) {
        const contactForm = document.querySelector('.contact-form');
        const contactInfo = document.querySelector('.contact-info');
        
        if (contactForm) {
            contactForm.style.display = 'block';
            contactForm.style.visibility = 'visible';
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'none';
            contactForm.removeAttribute('data-animate');
        }
        
        if (contactInfo) {
            contactInfo.style.display = 'block';
            contactInfo.style.visibility = 'visible';
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'none';
            contactInfo.removeAttribute('data-animate');
        }
    }
    
    // Observer para animaciones personalizadas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');
                
                // Animación especial para contadores - DESHABILITADA
                // if (element.classList.contains('stat-item')) {
                //     animateCounter(element);
                // }
                
                // Animación para barras de progreso de habilidades
                if (element.classList.contains('skill-item')) {
                    animateSkillBar(element);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    document.querySelectorAll('.stat-item, .skill-item, .project-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Animación de contadores
function animateCounter(element) {
    const counter = element.querySelector('h3');
    if (!counter) return;
    
    const target = parseInt(counter.textContent);
    if (isNaN(target)) return;
    
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
}

// Animación para elementos de habilidades
function animateSkillBar(element) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 100);
}

// Animación de escritura
function initTypingAnimation() {
    const codeElement = document.querySelector('.typing-animation code');
    if (!codeElement) return;
    
    const text = codeElement.textContent;
    codeElement.textContent = '';
    codeElement.style.borderRight = '2px solid #10b981';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            codeElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Parpadeo del cursor
            setInterval(() => {
                codeElement.style.borderRight = codeElement.style.borderRight === '2px solid transparent' 
                    ? '2px solid #10b981' 
                    : '2px solid transparent';
            }, 500);
        }
    }
    
    // Iniciar animación cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(codeElement.closest('.code-window'));
}

// Manejador del formulario de contacto - Formspree
function initFormHandler() {
    const form = document.querySelector('.contact-form');
    const formById = document.querySelector('#contactForm');
    
    const targetForm = form || formById;
    
    if (!targetForm) {
        return;
    }
    
    targetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(targetForm);
        
        // Obtener valores
        const name = formData.get('name');
        const email = formData.get('email');
        const projectType = formData.get('projectType');
        const message = formData.get('message');
        
        // Validación básica del lado del cliente
        if (!name || !email || !projectType || !message) {
            showNotification('❌ Por favor, completa todos los campos', 'error');
            return;
        }

        // Generar asunto personalizado
        const timestamp = new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        const subjectLine = `ELKINEXT SOLUTIONS - Nueva solicitud de ${projectType} de ${name}`;
        
        // Establecer el asunto en el campo oculto
        document.getElementById('formSubject').value = subjectLine;

        const submitBtn = targetForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Enviar a Formspree
            const response = await fetch('https://formspree.io/f/xkgkwbgo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(targetForm)
            });
            
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }
            
            // Éxito - cambiar botón
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
            submitBtn.style.background = '#10B981';
            
            // Mostrar notificación de éxito
            showNotification('✅ ¡Correo enviado exitosamente! Nos pondremos en contacto pronto.', 'success');
            
            // Limpiar formulario después de 3 segundos
            setTimeout(() => {
                targetForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
        } catch (error) {
            // Mostrar error en el botón
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            submitBtn.style.background = '#EF4444';
            
            // Mostrar notificación de error
            showNotification(`❌ Error: ${error.message}`, 'error');
            
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existing = document.querySelectorAll('.simple-notification');
    existing.forEach(el => el.remove());
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'simple-notification';
    
    // Configurar colores
    const colors = {
        success: { bg: '#10B981', icon: '✅' },
        error: { bg: '#EF4444', icon: '❌' },
        info: { bg: '#3B82F6', icon: 'ℹ️' }
    };
    
    const color = colors[type] || colors.info;
    
    // HTML simple
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
            <span style="font-size: 18px;">${color.icon}</span>
            <span style="flex: 1; font-weight: 500;">${message}</span>
            <span onclick="this.parentElement.parentElement.remove()" 
                  style="cursor: pointer; font-size: 20px; opacity: 0.7; padding: 4px;">×</span>
        </div>
    `;
    
    // Estilos garantizados
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '999999';
    notification.style.backgroundColor = color.bg;
    notification.style.color = 'white';
    notification.style.padding = '16px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    notification.style.minWidth = '350px';
    notification.style.maxWidth = '500px';
    notification.style.fontSize = '14px';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.border = '2px solid rgba(255,255,255,0.3)';
    notification.style.transform = 'translateX(600px)';
    notification.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto-remover después de 7 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(600px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 7000);
    
    return notification;
}

// Scroll suave para enlaces de navegación - Usando delegación de eventos
function initSmoothScroll() {
    // Usar delegación de eventos para capturar clicks en cualquier enlace con hash
    document.addEventListener('click', function(e) {
        // Buscar el enlace más cercano
        const link = e.target.closest('a[href*="#"]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Si es un enlace a otra página con hash (ej: index.html#about)
        if (href.includes('.html#')) {
            // Permitir que el navegador maneje la navegación normal
            return;
        }
        
        // Si es solo un hash en la página actual (ej: #about)
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }, true); // Usar captura
}

// Efectos de partículas en el background (opcional)
function initParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#10b981';
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Efecto parallax sutil
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .code-window');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Lazy loading para imágenes
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

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Descomentar para efectos adicionales
    // initParticleEffect();
    // initParallax();
    initLazyLoading();
    
    // FIX CRÍTICO: Asegurar visibilidad del formulario en móviles
    if (window.innerWidth <= 480) {
        setTimeout(() => {
            const contactForm = document.querySelector('.contact-form');
            const contactInfo = document.querySelector('.contact-info');
            
            if (contactForm) {
                contactForm.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; transform: none !important;';
                contactForm.removeAttribute('data-animate');
            }
            
            if (contactInfo) {
                contactInfo.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; transform: none !important;';
                contactInfo.removeAttribute('data-animate');
            }
        }, 100);
    }
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Cargar funcionalidades no críticas
        initParticleEffect();
    });
}