/**
 * House of Algo's - Enhanced Contact Form JavaScript
 * Advanced animations and interaction effects using jQuery, AOS and modern JS features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS specifically for contact section
    if (typeof AOS !== 'undefined') {
        // Refresh AOS to ensure proper animations
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }

    const $contactForm = $('#contactForm');
    if (!$contactForm.length) return;
    
    const $formMessage = $contactForm.find('.form-message');
    const $submitBtn = $contactForm.find('.submit-btn');
    const $btnText = $submitBtn.find('.btn-text');
    const $loadingSpinner = $submitBtn.find('.loading-spinner');
    
    // Enhanced 3D tilt effect for the form
    $contactForm.on('mousemove', function(e) {
        const $this = $(this);
        const formRect = $this[0].getBoundingClientRect();
        const centerX = formRect.left + formRect.width / 2;
        const centerY = formRect.top + formRect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate rotation based on mouse position
        const maxRotation = 2; // Maximum rotation in degrees
        const rotateY = maxRotation * (mouseX - centerX) / (formRect.width / 2);
        const rotateX = -maxRotation * (mouseY - centerY) / (formRect.height / 2);
        
        // Apply 3D transform effect with smooth transition
        $this.css({
            'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
            'transition': 'transform 0.1s ease'
        });
        
        // Add depth effects to form elements
        $this.find('.form-group').each(function(index) {
            const zTranslation = 20 + (index % 3) * 5; // Varied z-translation for depth
            $(this).css({
                'transform': `translateZ(${zTranslation}px)`,
                'transition': 'transform 0.1s ease'
            });
        });
    });
    
    // Reset form position when mouse leaves
    $contactForm.on('mouseleave', function() {
        $(this).css({
            'transform': 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
            'transition': 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        // Reset form elements
        $(this).find('.form-group').css({
            'transform': 'translateZ(0)',
            'transition': 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
    });
    
    // Add parallax effect to form elements
    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();
        const contactSection = $('#contact');
        const contactOffset = contactSection.offset().top;
        const contactHeight = contactSection.outerHeight();
        
        // Only apply effect when contact section is in view
        if (scrollPosition >= contactOffset - window.innerHeight && 
            scrollPosition <= contactOffset + contactHeight) {
            
            const parallaxFactor = 0.05;
            const relativeScroll = scrollPosition - contactOffset + window.innerHeight;
            
            // Apply parallax to form elements
            $contactForm.find('.form-group').each(function(index) {
                const yOffset = relativeScroll * parallaxFactor * (index % 3 + 1) * 0.2;
                $(this).css({
                    'transform': `translateY(${yOffset}px)`,
                    'transition': 'none'
                });
            });
        }
    });
    
    // Enhanced floating label effect
    $('.input-wrapper input, .input-wrapper textarea').on('focus', function() {
        const $wrapper = $(this).parent();
        const $formGroup = $wrapper.parent();
        
        $wrapper.addClass('focused');
        $formGroup.addClass('focused');
        
        // Add subtle pulsing glow animation
        $wrapper.css({
            'box-shadow': '0 8px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 215, 0, 0.2)',
            'transition': 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        });
    }).on('blur', function() {
        const $wrapper = $(this).parent();
        const $formGroup = $wrapper.parent();
        
        if ($(this).val().trim() === '') {
            $wrapper.removeClass('focused');
        }
        
        $formGroup.removeClass('focused');
        
        // Remove glow effect
        $wrapper.css({
            'box-shadow': '',
            'transition': 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        });
    });
    
    // Check if inputs already have values (e.g., on page reload)
    $('.input-wrapper input, .input-wrapper textarea').each(function() {
        if ($(this).val().trim() !== '') {
            $(this).parent().addClass('focused');
        }
    });
    
    // Enhanced ripple effect for submit button
    $submitBtn.on('mousedown', function(e) {
        const $this = $(this);
        const offset = $this.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        
        const $ripple = $('<span class="btn-ripple"></span>');
        $ripple.css({
            top: y + 'px',
            left: x + 'px'
        });
        
        $this.append($ripple);
        
        setTimeout(function() {
            $ripple.remove();
        }, 800);
    });
    
    // Advanced particle effect for the button on hover
    $submitBtn.on('mouseenter', function() {
        // Create particle container if it doesn't exist
        if (!$(this).find('.btn-particles').length) {
            const $particleContainer = $('<div class="btn-particles"></div>');
            $(this).append($particleContainer);
            
            // Create particles
            for (let i = 0; i < 12; i++) {
                const $particle = $('<span class="btn-particle"></span>');
                const size = Math.random() * 4 + 2;
                const x = Math.random() * 100;
                const delay = Math.random() * 0.5;
                
                $particle.css({
                    width: size + 'px',
                    height: size + 'px',
                    left: x + '%',
                    opacity: Math.random() * 0.5 + 0.2,
                    animationDelay: delay + 's'
                });
                
                $particleContainer.append($particle);
            }
        }
        
        $(this).find('.btn-particles').addClass('active');
    }).on('mouseleave', function() {
        $(this).find('.btn-particles').removeClass('active');
    });
    
    // Add custom styles for button particles
    $('<style>').text(`
        .btn-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: hidden;
            border-radius: 50px;
            pointer-events: none;
            z-index: 0;
        }
        
        .btn-particle {
            position: absolute;
            bottom: 0;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            transform: translateY(100%);
        }
        
        .btn-particles.active .btn-particle {
            animation: float-particle 1.5s ease-in-out infinite;
        }
        
        @keyframes float-particle {
            0% { transform: translateY(100%); opacity: 0; }
            50% { opacity: 0.7; }
            100% { transform: translateY(-100px); opacity: 0; }
        }
    `).appendTo('head');
    
    // Form submission with enhanced animations
    $contactForm.on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData($contactForm[0]);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(formDataObj)) {
            showMessage('Please fill in all required fields correctly.', 'error');
            shakeForm();
            return;
        }
        
        // Show loading state with enhanced animation
        $btnText.animate({ opacity: 0 }, 200, function() {
            $loadingSpinner.fadeIn(200);
            
            // Add pulse to button during loading
            $submitBtn.addClass('btn-loading');
        });
        
        $submitBtn.prop('disabled', true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Success scenario
            $loadingSpinner.fadeOut(200, function() {
                $btnText.animate({ opacity: 1 }, 200);
                $submitBtn.prop('disabled', false).removeClass('btn-loading');
                
                // Reset form with animation
                $contactForm.find('.input-wrapper').addClass('reset-animation');
                
                setTimeout(function() {
                    $contactForm[0].reset();
                    $contactForm.find('.input-wrapper').removeClass('focused reset-animation');
                }, 500);
                
                // Show enhanced success animation
                showEnhancedSuccessAnimation();
                
                // Show success message after animation completes
                setTimeout(function() {
                    showMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
                }, 2500);
            });
        }, 2000);
    });
    
    // Enhanced validator with visual feedback
    function validateForm(data) {
        let isValid = true;
        
        // Check all required fields
        $contactForm.find('input[required], textarea[required]').each(function() {
            if (!validateInput($(this))) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Show form message with enhanced animations
    function showMessage(message, type) {
        $formMessage.text(message)
            .removeClass('success error')
            .addClass(type)
            .css({
                opacity: 0,
                transform: 'translateY(10px) scale(0.95)'
            });
        
        // Animate message appearance with enhanced effects
        setTimeout(function() {
            $formMessage.css({
                opacity: 1,
                transform: 'translateY(0) scale(1)'
            });
            
            // Add subtle pulse animation
            setTimeout(function() {
                $formMessage.addClass('pulse-once');
                
                setTimeout(function() {
                    $formMessage.removeClass('pulse-once');
                }, 600);
            }, 300);
        }, 10);
        
        // Hide message after 7 seconds with animation
        setTimeout(function() {
            $formMessage.css({
                opacity: 0,
                transform: 'translateY(10px) scale(0.95)'
            });
            
            setTimeout(function() {
                $formMessage.removeClass('success error');
            }, 400);
        }, 7000);
    }
    
    // Add CSS for message pulse animation
    $('<style>').text(`
        .pulse-once {
            animation: message-pulse 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        @keyframes message-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .btn-loading {
            animation: btn-loading-pulse 1.5s ease infinite;
        }
        
        @keyframes btn-loading-pulse {
            0%, 100% { box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2); }
            50% { box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4); }
        }
    `).appendTo('head');
    
    // Enhanced shake animation for form errors
    function shakeForm() {
        $contactForm.addClass('shake');
        
        // Add highlight effect to invalid fields with staggered timing
        $contactForm.find('.input-wrapper.error').each(function(index) {
            const $this = $(this);
            
            setTimeout(function() {
                $this.addClass('highlight');
                
                setTimeout(function() {
                    $this.removeClass('highlight');
                }, 500);
            }, index * 100);
        });
        
        setTimeout(function() {
            $contactForm.removeClass('shake');
        }, 600);
    }
    
    // Enhanced success animation with particles and transitions
    function showEnhancedSuccessAnimation() {
        const $successOverlay = $('<div>', {
            'class': 'success-overlay'
        });
        
        const $successIcon = $('<div>', {
            'class': 'success-icon',
            'html': '<i class="fas fa-check"></i>'
        });
        
        $successOverlay.append($successIcon);
        $contactForm.append($successOverlay);
        
        // Add enhanced particle effects for celebration
        for (let i = 0; i < 40; i++) {
            const $particle = $('<div>', {
                'class': 'success-particle'
            });
            
            const size = Math.random() * 10 + 4;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const delay = Math.random() * 0.5;
            const duration = Math.random() * 0.5 + 0.5;
            
            // Use varied colors for particles (gold, green, blue tones)
            const colorType = Math.floor(Math.random() * 3);
            let color;
            
            if (colorType === 0) {
                // Gold tones
                color = `hsl(${Math.random() * 30 + 40}, 100%, 65%)`;
            } else if (colorType === 1) {
                // Green tones (success)
                color = `hsl(${Math.random() * 40 + 120}, 80%, 60%)`;
            } else {
                // Blue tones
                color = `hsl(${Math.random() * 40 + 200}, 80%, 65%)`;
            }
            
            $particle.css({
                width: size + 'px',
                height: size + 'px',
                background: color,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
                opacity: 0,
                boxShadow: `0 0 ${size/2}px ${color.replace('hsl', 'hsla').replace(')', ', 0.6)')}`,
                transition: `all ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`
            });
            
            $successOverlay.append($particle);
            
            setTimeout(function() {
                $particle.css({
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                    opacity: 1
                });
                
                setTimeout(function() {
                    $particle.css({
                        opacity: 0,
                        transform: `translate(${Math.cos(angle) * (distance + 50)}px, ${Math.sin(angle) * (distance + 50)}px) scale(0.5)`
                    });
                }, duration * 1000 + 600);
            }, 10);
        }
        
        setTimeout(function() {
            $successOverlay.addClass('show');
        }, 10);
        
        setTimeout(function() {
            $successOverlay.removeClass('show');
            
            setTimeout(function() {
                $successOverlay.remove();
            }, 500);
        }, 2000);
    }
    
    // Real-time validation with enhanced feedback
    $contactForm.find('input, textarea').on('blur', function() {
        validateInput($(this));
    }).on('input', function() {
        const $input = $(this);
        const $wrapper = $input.parent();
        
        if ($wrapper.hasClass('error')) {
            validateInput($input);
        }
    });
    
    function validateInput($input) {
        const $wrapper = $input.parent();
        const value = $input.val().trim();
        const inputType = $input.attr('type');
        const inputName = $input.attr('name');
        
        // Check if field is required and empty
        if ($input.prop('required') && value === '') {
            $wrapper.addClass('error');
            addErrorMessage($wrapper, 'This field is required');
            return false;
        }
        
        // Email validation
        if (inputType === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                $wrapper.addClass('error');
                addErrorMessage($wrapper, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (inputType === 'tel' && value !== '') {
            const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
            if (!phoneRegex.test(value)) {
                $wrapper.addClass('error');
                addErrorMessage($wrapper, 'Please enter a valid phone number');
                return false;
            }
        }
        
        // Message length validation
        if (inputName === 'message' && value.length < 10 && value !== '') {
            $wrapper.addClass('error');
            addErrorMessage($wrapper, 'Message must be at least 10 characters long');
            return false;
        }
        
        $wrapper.removeClass('error');
        removeErrorMessage($wrapper);
        return true;
    }
    
    // Enhanced error message with animation
    function addErrorMessage($wrapper, message) {
        removeErrorMessage($wrapper);
        
        const $errorMessage = $('<div>', {
            'class': 'input-error-message',
            'text': message
        });
        
        $wrapper.append($errorMessage);
        
        // Add animation for error message appearance
        setTimeout(function() {
            $errorMessage.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 10);
    }
    
    // Remove error message with animation
    function removeErrorMessage($wrapper) {
        const $errorMessage = $wrapper.find('.input-error-message');
        
        if ($errorMessage.length) {
            $errorMessage.css({
                'opacity': '0',
                'transform': 'translateY(-5px)'
            });
            
            setTimeout(function() {
                $errorMessage.remove();
            }, 300);
        }
    }
});

// Initialize contact form enhancements when document is ready
$(document).ready(function() {
    // Add AOS animation attributes to contact elements
    $('#contact .contact-form').attr({
        'data-aos': 'fade-up',
        'data-aos-duration': '1000',
        'data-aos-offset': '100'
    });
    
    $('#contact .form-group').each(function(index) {
        $(this).attr({
            'data-aos': 'fade-up',
            'data-aos-delay': (100 + (index * 50)).toString(),
            'data-aos-duration': '800'
        });
    });
    
    $('#contact .form-footer').attr({
        'data-aos': 'fade-up',
        'data-aos-delay': '400',
        'data-aos-duration': '800'
    });
    
    // Refresh AOS to apply new attributes
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
});
