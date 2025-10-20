/* ===================================
   INICIALIZADOR DE EFECTOS PROFESIONALES
   =================================== */

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Inicializar efectos profesionales
    initAdvancedEffects();
    initScrollReveal();
    initParallaxEffects();
    initNavigationEffects();
    initCounterAnimations();
    initTypingAnimation();
    initParticleSystem();
});

// Efectos avanzados de entrada
function initAdvancedEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                const delay = index * 150;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('revealed');
                    
                    // Trigger specific effects based on classes
                    if (entry.target.classList.contains('pulse-ring')) {
                        triggerPulseEffect(entry.target);
                    }
                    
                    // Add subtle bounce effect for important elements
                    if (entry.target.classList.contains('hero-title') || 
                        entry.target.classList.contains('page-title')) {
                        setTimeout(() => {
                            entry.target.style.animation = 'gentleBounce 0.8s ease-out';
                        }, 200);
                    }
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observar elementos con efectos
    const elementsToObserve = document.querySelectorAll(
        '.advanced-fade-in, .advanced-slide-up, .reveal-on-scroll, .card-pro, .pulse-ring'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
}

// Sistema de scroll reveal mejorado
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || (index * 100);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // Add extra sparkle effect for special elements
                    if (entry.target.classList.contains('stat-item')) {
                        createSparkleEffect(entry.target);
                    }
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -120px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Efectos parallax profesionales y sobrios
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element, .floating-particles, .hero-glow');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            // Velocidad muy lenta y sutil para estilo profesional
            const speed = 0.05 + (index * 0.01); // Extremadamente reducido
            const yPos = -(scrolled * speed);
            
            // Rotación mínima casi imperceptible
            const rotation = scrolled * 0.001; // Muy sutil
            
            // Escala casi imperceptible
            const scale = 1 + (Math.sin(scrolled * 0.0005) * 0.005);
            
            element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg) scale(${scale})`;
            
            // Opacidad muy estable
            const opacity = 0.8 + (Math.sin(scrolled * 0.0008) * 0.1);
            element.style.opacity = Math.max(0.6, Math.min(1, opacity));
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Efectos de navegación moderna
function initNavigationEffects() {
    const navbar = document.querySelector('.navbar-modern');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Auto-hide navigation on scroll down with smoother transition
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateX(-50%) translateY(-120%)';
            navbar.style.opacity = '0.7';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
            navbar.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    
    // Active link tracking with smoother transitions
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                // Add gentle pulse to active link
                link.style.animation = 'gentleBounce 0.6s ease-out';
                setTimeout(() => {
                    link.style.animation = '';
                }, 600);
            }
        });
    }
    
    let linkTicking = false;
    function requestLinkUpdate() {
        if (!linkTicking) {
            requestAnimationFrame(updateActiveLink);
            linkTicking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestLinkUpdate();
        linkTicking = false;
    }, { passive: true });
}

// Animaciones de contador
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.counter);
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Animación de typing mejorada
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #34d399';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                // Velocidad más lenta y profesional
                const randomDelay = Math.random() * 80 + 120;
                setTimeout(typeWriter, randomDelay);
            } else {
                // Cursor con parpadeo muy lento y sutil
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' ? 
                        '2px solid #6b7280' : 'none';
                }, 1500);
            }
        };
        
        // Start typing when element is visible with longer delay
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 2500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Sistema de partículas avanzado
function initParticleSystem() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    heroSection.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle-pro';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 6 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
    }
}

// Trigger pulse effect
function triggerPulseEffect(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'pulseRing 3s ease-out infinite';
    }, 10);
}

// Create sparkle effect for special elements
function createSparkleEffect(element) {
    const sparkles = 5;
    for (let i = 0; i < sparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #34d399;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 1.5s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

// Utility functions for effects
const EffectsUtils = {
    // Add glow effect to element
    addGlow: function(element, color = '#34d399') {
        element.style.boxShadow = `0 0 20px ${color}`;
        element.style.transition = 'box-shadow 0.3s ease';
    },
    
    // Remove glow effect
    removeGlow: function(element) {
        element.style.boxShadow = '';
    },
    
    // Add shimmer effect
    addShimmer: function(element) {
        element.classList.add('text-shimmer');
        setTimeout(() => {
            element.classList.remove('text-shimmer');
        }, 2000);
    },
    
    // Trigger morph animation
    triggerMorph: function(element) {
        element.classList.add('morph-hover');
        setTimeout(() => {
            element.classList.remove('morph-hover');
        }, 400);
    }
};

// Smooth scroll enhancement
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize smooth scroll
initSmoothScroll();

// Mouse cursor enhancement
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #34d399, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn-pro, .nav-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effects for desktop
if (window.innerWidth > 768) {
    initCursorEffects();
}

// Performance monitoring
const PerformanceMonitor = {
    init: function() {
        this.measureFCP();
        this.measureLCP();
        this.monitorCLS();
    },
    
    measureFCP: function() {
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FCP candidate:', entry.startTime, entry);
            }
        }).observe({type: 'paint', buffered: true});
    },
    
    measureLCP: function() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP candidate:', lastEntry.startTime, lastEntry);
        }).observe({type: 'largest-contentful-paint', buffered: true});
    },
    
    monitorCLS: function() {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('Current CLS value:', clsValue, entry);
                }
            }
        }).observe({type: 'layout-shift', buffered: true});
    }
};

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost') {
    PerformanceMonitor.init();
}

// Export utilities for global use
window.EffectsUtils = EffectsUtils;