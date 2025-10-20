// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    initTypingAnimation();
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

// Efectos de scroll
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
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
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
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
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simular envío (aquí conectarías con tu backend)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
            submitBtn.style.background = '#22c55e';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
                
                // Mostrar mensaje de éxito
                showNotification('¡Mensaje enviado correctamente!', 'success');
            }, 2000);
        }, 1500);
    });
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

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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