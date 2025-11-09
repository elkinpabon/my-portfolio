/**
 * Professional Carousel Module
 * Ultra-smooth, performant, and accessible
 */

class ProjectCarousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carousel-slide');
        this.prevBtn = container.querySelector('.carousel-navigation.prev');
        this.nextBtn = container.querySelector('.carousel-navigation.next');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.createIndicators();
        this.attachEventListeners();
        this.startAutoplay();
        this.updateCarousel();
    }
    
    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            indicator.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
    }
    
    attachEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    goToSlide(index) {
        if (this.isTransitioning) return;
        
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isTransitioning = true;
        
        const slidesContainer = this.container.querySelector('.carousel-slides');
        const offset = -this.currentIndex * 100;
        
        slidesContainer.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        const indicators = this.indicatorsContainer?.querySelectorAll('.carousel-indicator');
        indicators?.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Reset transition lock after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(carousel => new ProjectCarousel(carousel));
});
