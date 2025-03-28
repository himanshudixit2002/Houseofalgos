/**
 * House of Algo's - FAQ Particles System
 * Premium gold particles effect for the FAQ section background
 */

document.addEventListener('DOMContentLoaded', function() {
    initFaqParticles();
});

/**
 * Initialize the gold particles effect in the FAQ section background
 */
function initFaqParticles() {
    const faqSection = document.querySelector('.faq');
    
    if (!faqSection) return;
    
    // Create the particles container if it doesn't exist
    let particlesContainer = faqSection.querySelector('.faq-particles');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'faq-particles';
        faqSection.appendChild(particlesContainer);
    }
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create gold particles with different sizes and animation parameters
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'faq-particle';
        
        // Random size between 5px and 20px
        const size = 5 + Math.random() * 15;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation parameters
        const animationDelay = Math.random() * 5;
        const animationDuration = 15 + Math.random() * 20;
        const opacity = 0.05 + Math.random() * 0.1;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.opacity = opacity;
        
        // Add the particle to the container
        particlesContainer.appendChild(particle);
    }
    
    // Add custom CSS for particles if not already present
    if (!document.getElementById('faq-particles-styles')) {
        const style = document.createElement('style');
        style.id = 'faq-particles-styles';
        style.textContent = `
            .faq-particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                overflow: hidden;
            }
            
            .faq-particle {
                position: absolute;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0) 70%);
                border-radius: 50%;
                pointer-events: none;
                filter: blur(3px);
                animation: float-particle 20s infinite ease-in-out;
            }
            
            @keyframes float-particle {
                0% { transform: translateY(0) translateX(0) scale(1); }
                25% { transform: translateY(-100px) translateX(50px) scale(1.2); }
                50% { transform: translateY(-50px) translateX(100px) scale(1); }
                75% { transform: translateY(100px) translateX(25px) scale(0.8); }
                100% { transform: translateY(0) translateX(0) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Reinitialize particles on window resize for better performance
window.addEventListener('resize', function() {
    // Debounce the resize event
    clearTimeout(window.faqParticlesResizeTimer);
    window.faqParticlesResizeTimer = setTimeout(initFaqParticles, 200);
});
