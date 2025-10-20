/* ===================================
   INICIALIZADOR DE FONDOS ANIMADOS
   =================================== */

// Inicialización de fondos animados
document.addEventListener('DOMContentLoaded', function() {
    initAnimatedBackgrounds();
    initParticleEffects();
    initWaveAnimations();
    observeAnimatedSections();
});

// Función para inicializar fondos animados
function initAnimatedBackgrounds() {
    // Agregar partículas flotantes a secciones específicas
    const particleSections = document.querySelectorAll('.animated-bg-particles, .animated-bg-hero');
    
    particleSections.forEach(section => {
        createFloatingParticles(section);
    });
    
    // Agregar círculos decorativos
    const gradientSections = document.querySelectorAll('.animated-bg-gradient');
    gradientSections.forEach(section => {
        createDecorativeCircles(section);
    });
    
    // Agregar líneas de onda
    const waveSections = document.querySelectorAll('.animated-bg-waves');
    waveSections.forEach(section => {
        createWaveLines(section);
    });
}

// Crear partículas flotantes
function createFloatingParticles(container) {
    const particlesContainer = container.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    // Crear múltiples partículas
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: var(--primary-green);
            border-radius: 50%;
            opacity: ${Math.random() * 0.7 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 8}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Crear círculos decorativos
function createDecorativeCircles(container) {
    const circlesContainer = container.querySelector('.decorative-circles');
    if (!circlesContainer) return;
    
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'decorative-circle';
        circle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            border: 1px solid var(--primary-green);
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
            animation: rotate ${Math.random() * 20 + 30}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;
        circlesContainer.appendChild(circle);
    }
}

// Crear líneas de onda
function createWaveLines(container) {
    const waveContainer = container.querySelector('.wave-lines');
    if (!waveContainer) return;
    
    for (let i = 0; i < 4; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave-line';
        wave.style.cssText = `
            position: absolute;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary-green), transparent);
            left: 0;
            top: ${25 * i + 20}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: wave ${Math.random() * 4 + 6}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
            transform-origin: left center;
        `;
        waveContainer.appendChild(wave);
    }
}

// Efectos de partículas mejorados
function initParticleEffects() {
    // Crear efecto parallax para elementos existentes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-particles, .hero-glow, .decorative-circles');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Inicializar animaciones de onda
function initWaveAnimations() {
    // Agregar CSS dinámico para las ondas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave {
            0%, 100% { transform: scaleX(0.8) translateX(-10px); }
            50% { transform: scaleX(1.2) translateX(10px); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Observador para activar animaciones al hacer scroll
function observeAnimatedSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animation-active');
                
                // Activar efectos específicos basados en la clase
                if (entry.target.classList.contains('animated-bg-gradient')) {
                    triggerGradientAnimation(entry.target);
                }
                if (entry.target.classList.contains('animated-bg-waves')) {
                    triggerWaveAnimation(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar todas las secciones con fondos animados
    const animatedSections = document.querySelectorAll('[class*="animated-bg"]');
    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

// Activar animación de gradiente
function triggerGradientAnimation(section) {
    section.style.background = `
        linear-gradient(-45deg, 
            var(--bg-color), 
            var(--bg-secondary), 
            var(--bg-color), 
            var(--bg-tertiary)
        )`;
    section.style.backgroundSize = '400% 400%';
    section.style.animation = 'gradientShift 15s ease infinite';
}

// Activar animación de ondas
function triggerWaveAnimation(section) {
    const waveElements = section.querySelectorAll('.wave-line');
    waveElements.forEach((wave, index) => {
        wave.style.animationDelay = `${index * 0.5}s`;
        wave.style.animation = `wave ${6 + index}s infinite ease-in-out`;
    });
}

// Función para tema dinámico en fondos
function updateAnimatedBackgroundsTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const particles = document.querySelectorAll('.particle');
    const circles = document.querySelectorAll('.decorative-circle');
    
    particles.forEach(particle => {
        particle.style.background = isDarkTheme ? 
            'rgba(52, 211, 153, 0.7)' : 
            'var(--primary-green)';
    });
    
    circles.forEach(circle => {
        circle.style.borderColor = isDarkTheme ? 
            'rgba(52, 211, 153, 0.3)' : 
            'var(--primary-green)';
    });
}

// Escuchar cambios de tema
document.addEventListener('themeChanged', updateAnimatedBackgroundsTheme);

/* ===================================
   UTILIDADES DE RENDIMIENTO
   =================================== */

// Optimizar animaciones para dispositivos de bajo rendimiento
function optimizeAnimationsForPerformance() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Desactivar animaciones pesadas
        const animatedElements = document.querySelectorAll('[class*="animated-bg"]');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
    }
}

// Llamar optimización al cargar
document.addEventListener('DOMContentLoaded', optimizeAnimationsForPerformance);