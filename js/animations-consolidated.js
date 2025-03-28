/**
 * House of Algo's - Consolidated Animations
 * This file contains all animation-related functionality for the website
 * Enhanced with AOS, jQuery, and custom animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with enhanced settings
    initEnhancedAOS();
    
    // Initialize custom animations
    initCustomAnimations();
    
    console.log('Enhanced animations initialized successfully');
});

/**
 * Initialize AOS (Animate on Scroll) with optimized settings
 */
function initEnhancedAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,              // Balanced duration for smooth animations
            easing: 'ease-out-cubic',    // More natural easing for smoother transitions
            once: false,                 // Allow animations to occur every time
            mirror: true,                // Enable animations when scrolling back up
            offset: 120,                 // Trigger animations earlier for better visibility
            disable: window.innerWidth < 768 ? true : false, // More precise mobile detection
            anchorPlacement: 'top-bottom', // Better anchor placement for visibility
            delay: 0,                    // No delay for immediate response
            throttleDelay: 50,           // Optimize performance
            debounceDelay: 50            // Optimize performance
        });
        
        // Enhanced AOS refresh with debouncing for better performance
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                AOS.refresh();
            }, 250);
        });
        
        // Refresh AOS when all images are loaded
        window.addEventListener('load', function() {
            AOS.refresh();
        });
    }
}

/**
 * Initialize custom animations for various elements
 */
function initCustomAnimations() {
    // Add custom animation for hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('gradient-text');
    }
    
    // Add shimmer effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('shimmer-effect');
    });
    
    // Add pulse animation to important elements
    const importantElements = document.querySelectorAll('.feature-icon, .income-icon, .card-icon');
    importantElements.forEach(element => {
        element.classList.add('pulse-animation');
    });
    
    // Add floating animation to background elements
    const floatingElements = document.querySelectorAll('.bg-element, .floating-element');
    floatingElements.forEach((element, index) => {
        // Create random animation parameters
        const duration = 15 + (Math.random() * 10);
        const delay = Math.random() * 5;
        
        // Apply floating animation
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    });
}

// Add custom CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Custom Animation Classes */
    .pulse-animation {
        animation: pulse 2s infinite;
    }
    
    .shimmer-effect {
        position: relative;
        overflow: hidden;
    }
    
    .shimmer-effect::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0), 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0));
        animation: shimmer 3s infinite;
    }
    
    /* Keyframe Animations */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;

document.head.appendChild(animationStyles);
