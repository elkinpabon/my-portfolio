// Sistema de tema global - Funciona en todas las páginas
(function() {
    'use strict';
    
    // Función para aplicar el tema inmediatamente (antes de que cargue el DOM)
    function applyThemeImmediate() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.className = savedTheme + '-theme';
        
        // Actualizar el meta tag de color para el tema
        updateMetaThemeColor(savedTheme);
    }
    
    // Aplicar tema inmediatamente para evitar flash
    applyThemeImmediate();
    
    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        initGlobalTheme();
        initBackToTop();
    });
    
    function initGlobalTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        if (!themeToggle) {
            console.log('Theme toggle button not found on this page');
            return; // Si no hay toggle en esta página, solo aplicar tema
        }
        
        const icon = themeToggle.querySelector('i');
        
        // Verificar tema guardado en localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
        updateThemeIcon(icon, savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Aplicar nuevo tema
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('theme-manual', 'true'); // Indicar que fue selección manual
            updateThemeIcon(icon, newTheme);
            
            // Añadir efecto de transición suave
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
            
            // Emitir evento personalizado para otras funcionalidades
            document.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: newTheme } 
            }));
            
            console.log('Theme changed to:', newTheme);
        });
    }
    
    function applyTheme(theme) {
        document.body.className = theme + '-theme';
        document.documentElement.setAttribute('data-theme', theme);
        updateMetaThemeColor(theme);
    }
    
    function updateThemeIcon(icon, theme) {
        if (!icon) return;
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    function updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#ffffff';
    }
    
    // Botón back to top global
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Función para sincronizar tema entre pestañas
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme') {
            const newTheme = e.newValue || 'light';
            applyTheme(newTheme);
            
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                updateThemeIcon(icon, newTheme);
            }
            
            console.log('Theme synchronized from another tab:', newTheme);
        }
    });
    
    // Detectar preferencia del sistema si no hay tema guardado
    function detectSystemTheme() {
        if (!localStorage.getItem('theme') && !localStorage.getItem('theme-manual')) {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultTheme = systemPrefersDark ? 'dark' : 'light';
            localStorage.setItem('theme', defaultTheme);
            applyTheme(defaultTheme);
            console.log('Detected system theme:', defaultTheme);
        }
    }
    
    // Detectar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme-manual')) {
            const newTheme = e.matches ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
            
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                updateThemeIcon(icon, newTheme);
            }
            
            console.log('System theme preference changed:', newTheme);
        }
    });
    
    // Inicializar detección de tema del sistema
    detectSystemTheme();
    
    // Exponer funciones globales
    window.ThemeManager = {
        setTheme: function(theme) {
            localStorage.setItem('theme', theme);
            localStorage.setItem('theme-manual', 'true');
            applyTheme(theme);
            
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                updateThemeIcon(icon, theme);
            }
            
            console.log('Theme set programmatically:', theme);
        },
        
        getTheme: function() {
            return localStorage.getItem('theme') || 'light';
        },
        
        toggleTheme: function() {
            const current = this.getTheme();
            const newTheme = current === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            return newTheme;
        },
        
        isSystemTheme: function() {
            return !localStorage.getItem('theme-manual');
        }
    };
    
    // Debug: Mostrar información del tema en consola
    console.log('Theme Manager initialized');
    console.log('Current theme:', window.ThemeManager.getTheme());
    console.log('Is system theme:', window.ThemeManager.isSystemTheme());
    
})();