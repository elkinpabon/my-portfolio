// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    // initTypingAnimation(); // Comentado - ahora usamos código estático
    initFormHandler();
    initSmoothScroll();

});



// Cambio de tema claro/oscuro
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
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

// Menú móvil
function initMobileMenu() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Agregar listeners a todos los items del navegador para navegación suave
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es un hash, hacer scroll suave
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
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
    // Configurar Animate UI
    if (typeof AnimateUI !== 'undefined') {
        AnimateUI.init({
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
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
                
                // Animación especial para contadores
                if (element.classList.contains('stat-item')) {
                    animateCounter(element);
                }
                
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

// Manejador del formulario de contacto
function initFormHandler() {
    console.log('🔄 Iniciando manejador del formulario...');
    
    const form = document.querySelector('.contact-form');
    const formById = document.querySelector('#contactForm');
    
    console.log('📋 Formulario por clase:', form);
    console.log('📋 Formulario por ID:', formById);
    
    const targetForm = form || formById;
    
    if (!targetForm) {
        console.log('❌ No se encontró el formulario de contacto');
        return;
    }
    
    console.log('✅ Formulario de contacto encontrado:', targetForm);
    
    targetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Evento submit capturado - Formulario enviado');
        
        // Obtener datos del formulario
        const formData = new FormData(targetForm);
        const data = Object.fromEntries(formData);
        
        console.log('📋 Datos del formulario:', data);
        
        // Validación básica del lado del cliente
        if (!data.name || !data.email || !data.subject || !data.message) {
            console.log('❌ Validación fallida: campos vacíos');
            showNotification('❌ Por favor, completa todos los campos', 'error');
            return;
        }

        const submitBtn = targetForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        console.log('🔄 Cambiando estado del botón a "enviando"');
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            console.log('🚀 Enviando solicitud al servidor...');
            
            // Enviar al servidor
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            console.log('📡 Respuesta del servidor recibida:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('📦 Resultado parseado:', result);
            
            if (result.success) {
                console.log('✅ Éxito confirmado del servidor');
                
                // Éxito - cambiar botón
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.style.background = '#10B981';
                
                console.log('🔔 Mostrando notificación de éxito...');
                
                // Mostrar notificación de éxito
                showNotification('✅ ¡Correo enviado exitosamente! Gracias por consultar con nosotros', 'success');
                
                // Alert de respaldo (se puede quitar después)
                alert('✅ ¡Correo enviado exitosamente! Gracias por consultar con nosotros');
                
                // Limpiar formulario después de 3 segundos
                setTimeout(() => {
                    targetForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
            } else {
                console.log('❌ Error reportado por el servidor:', result.message);
                throw new Error(result.message || 'Error desconocido del servidor');
            }
            
        } catch (error) {
            console.error('❌ Error capturado:', error);
            
            // Mostrar error en el botón
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            submitBtn.style.background = '#EF4444';
            
            // Mostrar notificación de error
            showNotification(`❌ Error: ${error.message}`, 'error');
            
            // Alert de respaldo para errores
            alert(`❌ Error al enviar el correo: ${error.message}`);
            
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
    
    console.log('✅ Event listener agregado al formulario');
}

// Función para mostrar notificaciones (versión ultra-simple y garantizada)
function showNotification(message, type = 'info') {
    console.log(`🔔 showNotification llamada: "${message}" (${type})`);
    
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
    
    // Estilos absolutamente garantizados
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
    
    // Agregar inmediatamente al DOM
    document.body.appendChild(notification);
    console.log('📍 Notificación agregada al DOM');
    
    // Forzar re-render y animar
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
        console.log('🎭 Animación de entrada iniciada');
    });
    
    // Auto-remover después de 7 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(600px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                    console.log('🗑️ Notificación removida');
                }
            }, 400);
        }
    }, 7000);
    
    console.log(`✅ Notificación "${message}" creada exitosamente`);
    return notification;
}

// Scroll suave para enlaces de navegación
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
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