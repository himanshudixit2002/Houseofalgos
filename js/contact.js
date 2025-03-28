/**
 * House of Algo's - Contact Form JavaScript
 * Enhanced with jQuery animations and effects
 */

$(document).ready(function() {
    const $contactForm = $('#contactForm');
    if (!$contactForm.length) return;
    
    const $formMessage = $contactForm.find('.form-message');
    const $submitBtn = $contactForm.find('.submit-btn');
    const $btnText = $submitBtn.find('.btn-text');
    const $loadingSpinner = $submitBtn.find('.loading-spinner');
    
    // Add AOS animations to contact form elements
    $('.contact-form').attr({
        'data-aos': 'fade-up',
        'data-aos-duration': '800'
    });
    
    $('.form-group').each(function(index) {
        $(this).attr({
            'data-aos': 'fade-up',
            'data-aos-delay': (index * 100).toString()
        });
    });
    
    // Add floating label effect
    $('.input-wrapper input, .input-wrapper textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val().trim() === '') {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Check if inputs already have values (e.g., on page reload)
    $('.input-wrapper input, .input-wrapper textarea').each(function() {
        if ($(this).val().trim() !== '') {
            $(this).parent().addClass('focused');
        }
    });
    
    // Add ripple effect to submit button
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
        }, 700);
    });
    
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
        
        // Show loading state with animation
        $btnText.animate({ opacity: 0 }, 200, function() {
            $loadingSpinner.fadeIn(200);
        });
        
        $submitBtn.prop('disabled', true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Success scenario
            $loadingSpinner.fadeOut(200, function() {
                $btnText.animate({ opacity: 1 }, 200);
                $submitBtn.prop('disabled', false);
                
                // Show success message
                showMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
                
                // Reset form with animation
                $contactForm.find('.input-wrapper').addClass('reset-animation');
                
                setTimeout(function() {
                    $contactForm[0].reset();
                    $contactForm.find('.input-wrapper').removeClass('focused reset-animation');
                }, 300);
                
                // Show success animation
                showSuccessAnimation();
            });
        }, 2000);
    });
    
    // Validate form data
    function validateForm(data) {
        let isValid = true;
        
        // Check if all fields are filled and validate each field
        $contactForm.find('input, textarea').each(function() {
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
                transform: 'translateY(10px)'
            });
        
        // Animate message appearance
        setTimeout(function() {
            $formMessage.css({
                opacity: 1,
                transform: 'translateY(0)'
            });
        }, 10);
        
        // Hide message after 5 seconds with animation
        setTimeout(function() {
            $formMessage.css({
                opacity: 0,
                transform: 'translateY(10px)'
            });
            
            setTimeout(function() {
                $formMessage.removeClass('success error');
            }, 300);
        }, 5000);
    }
    
    // Shake form on error with enhanced animation
    function shakeForm() {
        $contactForm.addClass('shake');
        
        // Add highlight effect to invalid fields
        $contactForm.find('.input-wrapper.error').addClass('highlight');
        
        setTimeout(function() {
            $contactForm.removeClass('shake');
            $contactForm.find('.input-wrapper.error').removeClass('highlight');
        }, 600);
    }
    
    // Show success animation with enhanced effects
    function showSuccessAnimation() {
        const $successOverlay = $('<div>', {
            'class': 'success-overlay'
        });
        
        const $successIcon = $('<div>', {
            'class': 'success-icon',
            'html': '<i class="fas fa-check"></i>'
        });
        
        $successOverlay.append($successIcon);
        $contactForm.append($successOverlay);
        
        // Add particle effects for celebration
        for (let i = 0; i < 30; i++) {
            const $particle = $('<div>', {
                'class': 'success-particle'
            });
            
            const size = Math.random() * 8 + 4;
            const angle = Math.random() * 360;
            const distance = Math.random() * 80 + 50;
            const delay = Math.random() * 0.2;
            
            $particle.css({
                width: size + 'px',
                height: size + 'px',
                background: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
                opacity: 0
            });
            
            $successOverlay.append($particle);
            
            setTimeout(function() {
                $particle.css({
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                    opacity: 1
                });
                
                setTimeout(function() {
                    $particle.css({
                        opacity: 0
                    });
                }, 600);
            }, delay * 1000);
        }
        
        setTimeout(function() {
            $successOverlay.addClass('show');
        }, 10);
        
        setTimeout(function() {
            $successOverlay.removeClass('show');
            
            setTimeout(function() {
                $successOverlay.remove();
            }, 300);
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
        
        if (value === '') {
            $wrapper.addClass('error');
            addErrorMessage($wrapper, 'This field is required');
            return false;
        }
        
        if ($input.attr('type') === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                $wrapper.addClass('error');
                addErrorMessage($wrapper, 'Please enter a valid email address');
                return false;
            }
        }
        
        $wrapper.removeClass('error');
        removeErrorMessage($wrapper);
        return true;
    }
    
    // Add error message under input
    function addErrorMessage($wrapper, message) {
        removeErrorMessage($wrapper);
        
        const $errorMessage = $('<div>', {
            'class': 'input-error-message',
            'text': message
        });
        
        $wrapper.append($errorMessage);
        
        setTimeout(function() {
            $errorMessage.css('opacity', 1);
        }, 10);
    }
    
    // Remove error message
    function removeErrorMessage($wrapper) {
        const $errorMessage = $wrapper.find('.input-error-message');
        
        if ($errorMessage.length) {
            $errorMessage.css('opacity', 0);
            
            setTimeout(function() {
                $errorMessage.remove();
            }, 300);
        }
    }
    
    // Add custom CSS for enhanced contact form
    const customCSS = `
        .input-wrapper {
            position: relative;
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .input-wrapper:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            transition: width 0.3s ease;
            z-index: 1;
        }
        
        .input-wrapper.focused:before {
            width: 100%;
        }
        
        .input-wrapper.error:before {
            background: #dc3545;
            width: 100%;
        }
        
        .input-wrapper.highlight {
            animation: highlight 0.6s ease;
        }
        
        @keyframes highlight {
            0%, 100% { box-shadow: 0 0 0 rgba(220, 53, 69, 0); }
            50% { box-shadow: 0 0 10px rgba(220, 53, 69, 0.5); }
        }
        
        .input-error-message {
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .btn-ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.7s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .reset-animation {
            animation: reset-fields 0.3s ease;
        }
        
        @keyframes reset-fields {
            0% { transform: translateY(0); }
            50% { transform: translateY(5px); }
            100% { transform: translateY(0); }
        }
        
        .success-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        }
        
        .success-overlay.show {
            opacity: 1;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #28a745, #20c997);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: scale(0);
            animation: success-icon 0.5s ease forwards;
        }
        
        .success-icon i {
            color: white;
            font-size: 40px;
        }
        
        @keyframes success-icon {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .success-particle {
            position: absolute;
            border-radius: 50%;
            transition: all 0.8s ease;
        }
    `;
    
    $('<style>').text(customCSS).appendTo('head');
});
