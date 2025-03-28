/**
 * House of Algo's - Main JavaScript
 * This file contains general functionality for the website
 * Enhanced with jQuery, AOS, and particles.js integration
 */

$(document).ready(function() {
    // Preloader with improved animation
    $(window).on('load', function() {
        setTimeout(function() {
            $('.preloader').addClass('fade-out');
            
            // Enable scrolling after preloader is gone with smooth transition
            $('body').css({
                'overflow': 'visible',
                'transition': 'opacity 0.5s ease'
            });
            
            // Trigger AOS refresh to ensure animations work after preloader
            setTimeout(function() {
                AOS.refresh();
            }, 500);
        }, 1000);
    });

    // Disable scrolling until preloader is gone
    $('body').css('overflow', 'hidden');

    // Set current year in footer
    $('#currentYear').text(new Date().getFullYear());

    // Scroll to top button functionality with enhanced animation
    const $scrollToTopBtn = $('#scrollToTop');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $scrollToTopBtn.addClass('visible');
        } else {
            $scrollToTopBtn.removeClass('visible');
        }
    });

    $scrollToTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutExpo');
        return false;
    });

    // Smooth scrolling for anchor links with jQuery animation
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        const $targetElement = $(targetId);
        if (!$targetElement.length) return;
        
        const navbarHeight = $('.navbar').outerHeight();
        const targetPosition = $targetElement.offset().top - navbarHeight;
        
        $('html, body').animate({
            scrollTop: targetPosition
        }, 800, 'easeInOutExpo');
        
        // Close mobile menu if open
        const $navLinks = $('#nav-links');
        const $menuToggle = $('.menu-toggle');
        if ($navLinks.hasClass('active')) {
            $navLinks.removeClass('active');
            $menuToggle.removeClass('active');
        }
    });

    // Active navigation link based on scroll position with improved accuracy
    function setActiveNavLink() {
        const scrollPosition = $(window).scrollTop();
        const navbarHeight = $('.navbar').outerHeight();
        
        // Add a small offset for better accuracy
        const offset = navbarHeight + 100;
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top - offset;
            const sectionBottom = sectionTop + $(this).outerHeight();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = $(this).attr('id');
                
                $('.nav-links a').removeClass('active');
                $(`.nav-links a[href="#${currentId}"]`).addClass('active');
            }
        });
    }

    $(window).on('scroll', setActiveNavLink);
    $(window).on('load', setActiveNavLink);

    // Enhanced counter animation with jQuery
    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));
            
            $({ Counter: 0 }).animate({
                Counter: target
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter));
                },
                complete: function() {
                    $this.text(target);
                    
                    // Add a subtle pulse animation when counter completes
                    $this.addClass('pulse-animation');
                    setTimeout(function() {
                        $this.removeClass('pulse-animation');
                    }, 1000);
                }
            });
        });
    }

    // Initialize AOS (Animate on Scroll) with optimized options for smoother animations
    // Note: Main AOS initialization is now handled in animations-consolidated.js
    function initAOS() {
        // This function now serves as a fallback in case animations-consolidated.js fails to load
        if (typeof AOS === 'undefined' || typeof AOS.init !== 'function') {
            console.warn('AOS not found or animations-consolidated.js not loaded. Using fallback initialization.');
            
            // Load AOS from CDN if not available
            if (typeof AOS === 'undefined') {
                const aosScript = document.createElement('script');
                aosScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
                aosScript.onload = function() {
                    initAOSFallback();
                };
                document.head.appendChild(aosScript);
                
                const aosStyles = document.createElement('link');
                aosStyles.rel = 'stylesheet';
                aosStyles.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
                document.head.appendChild(aosStyles);
            } else {
                initAOSFallback();
            }
        } else {
            // If AOS is already initialized by animations-consolidated.js, just refresh it
            setTimeout(function() {
                AOS.refresh();
            }, 500);
        }
    }
    
    // Fallback AOS initialization
    function initAOSFallback() {
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
        
        console.log('AOS initialized with fallback settings');
        
        // Enhanced AOS refresh with debouncing for better performance
        let resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                AOS.refresh();
            }, 250);
        });
        
        // Refresh AOS when all images are loaded
        $(window).on('load', function() {
            AOS.refresh();
        });
    }

    // Initialize counters when they come into view with Intersection Observer
    function initCounterObserver() {
        const counterSection = document.querySelector('.hero');
        const aboutCounters = document.querySelector('.about-numbers');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px' // Trigger earlier
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        if (counterSection) observer.observe(counterSection);
        if (aboutCounters) observer.observe(aboutCounters);
    }

    // Enhanced newsletter form with validation and animation
    function initNewsletterForm() {
        const $newsletterForm = $('#newsletterForm');
        if ($newsletterForm.length) {
            $newsletterForm.on('submit', function(e) {
                e.preventDefault();
                const $emailInput = $newsletterForm.find('input[type="email"]');
                const email = $emailInput.val().trim();
                
                // Enhanced validation
                if (email === '') {
                    showFormError($emailInput, 'Please enter your email address');
                    return;
                }
                
                // Email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showFormError($emailInput, 'Please enter a valid email address');
                    return;
                }
                
                // Simulate form submission with loading state
                const $submitBtn = $newsletterForm.find('button[type="submit"]');
                $submitBtn.prop('disabled', true).addClass('loading');
                
                setTimeout(function() {
                    $emailInput.val('');
                    $submitBtn.prop('disabled', false).removeClass('loading');
                    
                    // Show success message with animation
                    const $successMsg = $('<div class="success-message">Thank you for subscribing to our newsletter!</div>');
                    $newsletterForm.append($successMsg);
                    
                    $successMsg.animate({
                        opacity: 1,
                        top: '0'
                    }, 300);
                    
                    setTimeout(function() {
                        $successMsg.animate({
                            opacity: 0,
                            top: '-20px'
                        }, 300, function() {
                            $successMsg.remove();
                        });
                    }, 3000);
                }, 1500);
            });
            
            // Function to show form error
            function showFormError($input, message) {
                const $errorMsg = $('<div class="error-message"></div>').text(message);
                $input.addClass('error').after($errorMsg);
                
                $errorMsg.animate({
                    opacity: 1,
                    top: '0'
                }, 300);
                
                // Remove error after 3 seconds
                setTimeout(function() {
                    $input.removeClass('error');
                    $errorMsg.animate({
                        opacity: 0,
                        top: '-20px'
                    }, 300, function() {
                        $errorMsg.remove();
                    });
                }, 3000);
                
                // Also remove error when input is focused
                $input.one('focus', function() {
                    $input.removeClass('error');
                    $errorMsg.animate({
                        opacity: 0,
                        top: '-20px'
                    }, 300, function() {
                        $errorMsg.remove();
                    });
                });
            }
        }
    }

    // Initialize particles.js with dynamic configuration
    function initParticles() {
        if (typeof particlesJS !== 'undefined' && $('#particles-js').length) {
            // Check if we're on a mobile device
            const isMobile = window.innerWidth <= 768;
            
            // Adjust particle count and speed based on device
            const particleCount = isMobile ? 30 : 80;
            const particleSpeed = isMobile ? 1 : 2;
            
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": particleCount,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": particleSpeed,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": particleSpeed,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.5
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
            
            // Add mouse parallax effect to particles container
            const $particlesContainer = $('#particles-js');
            
            $(document).on('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                $particlesContainer.css({
                    'transform': `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`
                });
            });
        }
    }

    // Add parallax scrolling effect to sections
    function initParallaxEffect() {
        $(window).on('scroll', function() {
            const scrollPosition = $(window).scrollTop();
            
            // Apply parallax effect to hero section
            $('.hero .video-background').css({
                'transform': `translateY(${scrollPosition * 0.3}px)`
            });
            
            // Apply parallax effect to section backgrounds
            $('.section-header').each(function() {
                const $this = $(this);
                const offsetTop = $this.offset().top;
                const distance = offsetTop - scrollPosition;
                
                if (distance < window.innerHeight && distance > -$this.height()) {
                    $this.css({
                        'transform': `translateY(${(distance / 20)}px)`
                    });
                }
            });
        });
    }

    // Add scroll progress indicator
    function initScrollProgress() {
        const $progressBar = $('<div class="scroll-progress-bar"></div>');
        $('body').append($progressBar);
        
        $(window).on('scroll', function() {
            const windowHeight = $(document).height() - $(window).height();
            const scrollPosition = $(window).scrollTop();
            const scrollPercentage = (scrollPosition / windowHeight) * 100;
            
            $progressBar.css('width', `${scrollPercentage}%`);
        });
    }

    // Add lazy loading for images
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                        imageObserver.unobserve(lazyImage);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            let lazyLoadThrottleTimeout;
            
            function lazyLoad() {
                if (lazyLoadThrottleTimeout) {
                    clearTimeout(lazyLoadThrottleTimeout);
                }
                
                lazyLoadThrottleTimeout = setTimeout(() => {
                    const scrollTop = $(window).scrollTop();
                    
                    lazyImages.forEach(lazyImage => {
                        if (lazyImage.offsetTop < window.innerHeight + scrollTop) {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.removeAttribute('data-src');
                        }
                    });
                    
                    if (lazyImages.length === 0) {
                        $(window).off('scroll', lazyLoad);
                    }
                }, 20);
            }
            
            $(window).on('scroll', lazyLoad);
            lazyLoad();
        }
    }

    // Initialize all components
    function init() {
        // Initialize AOS first to ensure animations are ready
        initAOS();
        
        // Initialize other components
        initCounterObserver();
        initNewsletterForm();
        initParticles();
        initParallaxEffect();
        initScrollProgress();
        initLazyLoading();
        
        // Add custom easing functions for smoother animations
        $.extend($.easing, {
            easeInOutExpo: function(x, t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        });
        
        // Add CSS for new features
        const customCSS = `
            .scroll-progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #53165F, #BA3C5E, #FFD700);
                z-index: 9999;
                width: 0%;
                transition: width 0.1s;
            }
            
            .pulse-animation {
                animation: pulse 0.5s ease-in-out;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            /* Improved image-text alignment */
            .feature-card img, .income-card img, .vision-card img, .point img {
                max-width: 100%;
                height: auto;
                margin-bottom: 15px;
                object-fit: contain;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            .feature-text, .income-text, .vision-text {
                text-align: center;
                width: 100%;
            }
            
            .success-message, .error-message {
                padding: 8px 12px;
                border-radius: 4px;
                margin-top: 10px;
                position: relative;
                opacity: 0;
                top: -20px;
            }
            
            .success-message {
                background-color: rgba(40, 167, 69, 0.1);
                border: 1px solid #28a745;
                color: #28a745;
            }
            
            .error-message {
                background-color: rgba(220, 53, 69, 0.1);
                border: 1px solid #dc3545;
                color: #dc3545;
            }
            
            input.error {
                border-color: #dc3545 !important;
            }
        `;
        
        $('<style>').text(customCSS).appendTo('head');
    }

    // Initialize everything when DOM is loaded
    init();
    
    // Additional refresh after delays to ensure all elements are properly initialized
    setTimeout(function() {
        AOS.refresh();
    }, 1000);
    
    setTimeout(function() {
        AOS.refresh();
    }, 2500);
});
