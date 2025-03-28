/**
 * House of Algo's - Enhanced FAQ JavaScript
 * Premium animations, interactions and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced FAQ functionality when the document is ready
    initializeEnhancedFAQ();
    
    // Add AOS animations to FAQ elements if AOS is available
    if (typeof AOS !== 'undefined') {
        addAOSAnimations();
        
        // Refresh AOS when all images and fonts are loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                AOS.refresh();
            }, 500);
        });
    }
});

/**
 * Initialize enhanced FAQ functionality with premium animations
 */
function initializeEnhancedFAQ() {
    const $faqItems = $('.faq-item');
    const $faqContainer = $('.faq-container');
    
    // Set first item as active by default
    if ($faqItems.length > 0) {
        $faqItems.first().addClass('active');
        initializeFaqItem($faqItems.first());
    }
    
    // Generate dynamic background elements for visual enhancement
    generateBackgroundParticles();
    
    // Enhanced hover effects with cursor tracking
    $faqContainer.on('mousemove', function(e) {
        const containerRect = $faqContainer[0].getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;
        
        // Apply subtle 3D tilt effect to FAQ items on hover
        $faqItems.each(function() {
            const $item = $(this);
            const itemRect = $item[0].getBoundingClientRect();
            
            // Check if mouse is over this item
            if (
                mouseX >= itemRect.left - containerRect.left &&
                mouseX <= itemRect.right - containerRect.left &&
                mouseY >= itemRect.top - containerRect.top &&
                mouseY <= itemRect.bottom - containerRect.top
            ) {
                const itemCenterX = (itemRect.left + itemRect.right) / 2 - containerRect.left;
                const itemCenterY = (itemRect.top + itemRect.bottom) / 2 - containerRect.top;
                
                // Calculate rotation based on mouse position relative to item center
                const rotateY = ((mouseX - itemCenterX) / (itemRect.width / 2)) * 2;
                const rotateX = ((itemCenterY - mouseY) / (itemRect.height / 2)) * 1;
                
                $item.css({
                    'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.01)`,
                    'transition': 'transform 0.1s ease'
                });
            } else {
                // Reset transform if mouse is not over this item
                $item.css({
                    'transform': '',
                    'transition': 'transform 0.5s ease'
                });
            }
        });
    });
    
    // Reset transforms when mouse leaves container
    $faqContainer.on('mouseleave', function() {
        $faqItems.css({
            'transform': '',
            'transition': 'transform 0.5s ease'
        });
    });
    
    // Add enhanced interactions to each FAQ item
    $faqItems.each(function() {
        initializeFaqItem($(this));
    });
    
    // Add keyboard accessibility
    enhanceFAQAccessibility();
    
    // Handle window resize to adjust heights
    $(window).on('resize', function() {
        debounce(adjustActiveItemsHeight, 100)();
    });
}

/**
 * Initialize enhanced interactions for a single FAQ item
 */
function initializeFaqItem($item) {
    const $question = $item.find('.faq-question');
    const $answer = $item.find('.faq-answer');
    const $toggle = $item.find('.faq-toggle');
    
    // Add ripple effect on click
    $question.on('click', function(e) {
        // Create ripple effect
        createRippleEffect(e, $question);
        
        // Toggle active state with enhanced animations
        toggleFaqItem($item);
    });
    
    // Set initial state for active item
    if ($item.hasClass('active')) {
        const height = $answer.prop('scrollHeight');
        $answer.css('maxHeight', height + 'px');
        $answer.css('opacity', '1');
        $answer.css('transform', 'translateY(0)');
    } else {
        $answer.css('maxHeight', '0');
        $answer.css('opacity', '0');
        $answer.css('transform', 'translateY(-10px)');
    }
}

/**
 * Toggle FAQ item open/closed state with enhanced animations
 */
function toggleFaqItem($item) {
    const $answer = $item.find('.faq-answer');
    const $toggle = $item.find('.faq-toggle');
    const isActive = $item.hasClass('active');
    
    // Close all other items with smooth animation
    $('.faq-item').not($item).each(function() {
        const $otherItem = $(this);
        const $otherAnswer = $otherItem.find('.faq-answer');
        
        $otherItem.removeClass('active');
        
        // Animate closing with smooth transition
        $otherAnswer.css({
            'max-height': '0',
            'opacity': '0',
            'transform': 'translateY(-10px)'
        });
    });
    
    // Toggle current item with enhanced animation
    if (isActive) {
        $item.removeClass('active');
        
        $answer.css({
            'max-height': '0',
            'opacity': '0',
            'transform': 'translateY(-10px)'
        });
    } else {
        $item.addClass('active');
        
        // Calculate the height dynamically
        const height = $answer.prop('scrollHeight');
        
        $answer.css({
            'max-height': height + 'px',
            'opacity': '1',
            'transform': 'translateY(0)'
        });
        
        // Add subtle highlight animation to the active question
        $item.find('.faq-question').addClass('highlight-pulse');
        setTimeout(function() {
            $item.find('.faq-question').removeClass('highlight-pulse');
        }, 700);
    }
}

/**
 * Create ripple effect on click
 */
function createRippleEffect(e, $element) {
    const target = $element[0];
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const $ripple = $('<span class="ripple-effect"></span>');
    $ripple.css({
        'top': y + 'px',
        'left': x + 'px'
    });
    
    $element.append($ripple);
    
    setTimeout(function() {
        $ripple.remove();
    }, 600);
}

/**
 * Generate background particles for visual enhancement
 */
function generateBackgroundParticles() {
    const $faqSection = $('.faq');
    
    // Add particles container if it doesn't exist
    if (!$faqSection.find('.faq-particles').length) {
        const $particlesContainer = $('<div class="faq-particles"></div>');
        $faqSection.append($particlesContainer);
        
        // Add particles
        for (let i = 0; i < 15; i++) {
            const $particle = $('<span class="faq-particle"></span>');
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 20 + 10;
            
            $particle.css({
                'width': size + 'px',
                'height': size + 'px',
                'left': posX + 'vw',
                'top': posY + 'vh',
                'animation-delay': delay + 's',
                'animation-duration': duration + 's'
            });
            
            $particlesContainer.append($particle);
        }
    }
    
    // Add custom CSS for particles
    const particlesCSS = `
        .faq-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
        }
        
        .faq-particle {
            position: absolute;
            background: linear-gradient(45deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.05));
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            opacity: 0;
            animation: float-particle 15s infinite linear, fade-in-out 15s infinite ease-in-out;
        }
        
        @keyframes float-particle {
            0% { transform: translateY(0) translateX(0) rotate(0deg); }
            25% { transform: translateY(-30vh) translateX(10vw) rotate(90deg); }
            50% { transform: translateY(0) translateX(20vw) rotate(180deg); }
            75% { transform: translateY(30vh) translateX(10vw) rotate(270deg); }
            100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
        
        @keyframes fade-in-out {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.5; }
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.2);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
        
        .highlight-pulse {
            animation: highlight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @keyframes highlight {
            0% { background: rgba(0, 0, 0, 0.1); }
            50% { background: rgba(255, 215, 0, 0.1); }
            100% { background: rgba(0, 0, 0, 0.1); }
        }
    `;
    
    // Add styles if they don't already exist
    if (!$('#faq-particles-style').length) {
        $('<style id="faq-particles-style"></style>').text(particlesCSS).appendTo('head');
    }
}

/**
 * Add AOS animations to FAQ elements
 */
function addAOSAnimations() {
    // Add animation to section header
    $('.faq .section-header').attr({
        'data-aos': 'fade-up',
        'data-aos-duration': '1000',
        'data-aos-once': 'false'
    });
    
    // Add animations to FAQ items with staggered delay
    $('.faq-item').each(function(index) {
        $(this).attr({
            'data-aos': 'fade-up',
            'data-aos-duration': '800',
            'data-aos-delay': (index * 100).toString(),
            'data-aos-once': 'false',
            'data-aos-anchor-placement': 'top-bottom'
        });
    });
    
    // Add animation to contact button section
    $('.faq-more').attr({
        'data-aos': 'fade-up',
        'data-aos-duration': '800',
        'data-aos-delay': '200',
        'data-aos-once': 'false'
    });
}

/**
 * Add keyboard accessibility to FAQ items
 */
function enhanceFAQAccessibility() {
    $('.faq-question').each(function(index) {
        const $question = $(this);
        const $item = $question.closest('.faq-item');
        
        // Add tabindex for keyboard navigation
        $question.attr('tabindex', '0');
        
        // Add ARIA attributes
        $question.attr('aria-expanded', $item.hasClass('active').toString());
        const answerId = 'faq-answer-' + index;
        $question.attr('aria-controls', answerId);
        $item.find('.faq-answer').attr('id', answerId);
        
        // Handle keyboard interaction
        $question.on('keydown', function(e) {
            // Enter or Space key to toggle
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaqItem($item);
                $question.attr('aria-expanded', $item.hasClass('active').toString());
            }
        });
        
        // Update ARIA attributes on click too
        $question.on('click', function() {
            setTimeout(function() {
                $question.attr('aria-expanded', $item.hasClass('active').toString());
            }, 100);
        });
    });
}

/**
 * Adjust heights of active FAQ items
 */
function adjustActiveItemsHeight() {
    $('.faq-item.active').each(function() {
        const $answer = $(this).find('.faq-answer');
        const height = $answer.prop('scrollHeight');
        $answer.css('maxHeight', height + 'px');
    });
}

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}
