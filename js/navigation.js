/**
 * House of Algo's - Navigation JavaScript
 * This file contains advanced functionality for website navigation
 * Enhanced with jQuery, AOS, and smooth transitions
 */

$(document).ready(function() {
    // Mobile menu toggle with enhanced animations
    const $menuToggle = $('.menu-toggle');
    const $navLinks = $('#nav-links');
    const $navbar = $('#navbar');
    const $navItems = $('.nav-links li');
    
    // Enhanced mobile menu toggle
    $menuToggle.on('click', function() {
        $navLinks.toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close menu when clicking outside
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).closest('.navbar').length && $navLinks.hasClass('active')) {
            $navLinks.removeClass('active');
            $menuToggle.removeClass('active');
        }
    });

    // Enhanced sticky navigation with smooth transition
    let lastScrollTop = 0;
    const scrollThreshold = 50;
    
    $(window).on('scroll', function() {
        const currentScrollTop = $(window).scrollTop();
        
        // Add scrolled class based on scroll position
        if (currentScrollTop > scrollThreshold) {
            if (!$navbar.hasClass('scrolled')) {
                $navbar.addClass('scrolled');
            }
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
                $navbar.addClass('nav-up');
            } else {
                $navbar.removeClass('nav-up');
            }
        } else {
            $navbar.removeClass('scrolled');
        }
        
        lastScrollTop = currentScrollTop;
    });
    
    // Trigger scroll event on page load
    $(window).trigger('scroll');
    
    // Enhanced hover effects for navigation links
    $('.nav-links a').on({
        mouseenter: function() {
            $(this).addClass('hover');
        },
        mouseleave: function() {
            $(this).removeClass('hover');
        }
    });
    
    // Active link highlighting with scroll spy
    function updateActiveNavLink() {
        const scrollPosition = $(window).scrollTop();
        const navbarHeight = $navbar.outerHeight();
        const offset = navbarHeight + 100;
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top - offset;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.nav-links a').removeClass('active');
                $(`.nav-links a[href="#${sectionId}"]`).addClass('active');
            }
        });
    }
    
    // Update active link on scroll and page load
    $(window).on('scroll', updateActiveNavLink);
    $(window).on('load', updateActiveNavLink);
    
    // Responsive behavior
    function handleResponsiveNavigation() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 768) {
            // Mobile-specific behaviors
            $('.nav-links a').off('click.mobile').on('click.mobile', function() {
                $navLinks.removeClass('active');
                $menuToggle.removeClass('active');
            });
        } else {
            // Desktop-specific behaviors
            $('.nav-links a').off('click.mobile');
        }
    }
    
    // Initialize responsive behavior
    handleResponsiveNavigation();
    
    // Update responsive behavior on window resize
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsiveNavigation, 250);
    });
    
    // Add CSS for enhanced navigation effects
    const navStyles = `
        .navbar {
            transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .navbar.scrolled {
            background-color: rgba(30, 30, 30, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .navbar.nav-up {
            transform: translateY(-100%);
        }
        
        .nav-links a.hover {
            color: var(--rich-gold);
            text-shadow: 0 0 10px rgba(var(--rich-gold-rgb), 0.5);
        }
        
        .nav-links a.active {
            color: var(--rich-gold);
            font-weight: 600;
            position: relative;
        }
        
        .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--gold-gradient);
            border-radius: 2px;
            box-shadow: 0 0 8px rgba(var(--rich-gold-rgb), 0.5);
        }
    `;
    
    $('<style>').text(navStyles).appendTo('head');
});
