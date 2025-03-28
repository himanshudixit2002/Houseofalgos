/**
 * House of Algo's - Advanced Animations
 * This file contains advanced animations using AOS (2.3.4) and jQuery (3.6.0)
 * Optimized for performance and visual appeal
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check for reduced motion preference
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Initialize animations based on user preference
  if (!isReducedMotion) {
    initEnhancedAnimations();
  } else {
    initAccessibleAnimations();
  }
  
  // Initialize scroll-triggered effects
  initScrollEffects();
  
  // Initialize interactive elements
  initInteractiveElements();
  
  // Initialize text animations
  initTextAnimations();
});

/**
 * Initialize enhanced animations with premium visual effects
 */
function initEnhancedAnimations() {
  // Initialize AOS with optimized settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      once: false,
      mirror: true,
      offset: 100,
      delay: 0,
      anchorPlacement: 'top-bottom',
      disable: window.innerWidth < 768 ? true : false
    });
    
    // Refresh AOS on window resize with debouncing
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        AOS.refresh();
      }, 250);
    });
  }
  
  // Add staggered reveal animations to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', (index * 50).toString());
    section.setAttribute('data-aos-duration', '800');
  });
  
  // Add enhanced hover effects to cards
  const cards = document.querySelectorAll('.income-card, .feature-card, .step-card, .vision-card, .faq-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      
      // Add subtle glow effect
      const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color') || '#9b4dca';
      this.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(${hexToRgb(color)}, 0.1)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Add floating animations to icons
  const icons = document.querySelectorAll('.feature-icon, .income-icon, .step-icon, .value-icon');
  icons.forEach((icon, index) => {
    // Create unique animation for each icon
    const duration = 3 + (index % 3);
    const delay = index * 0.2;
    
    icon.style.animation = `float-animation ${duration}s ease-in-out infinite alternate`;
    icon.style.animationDelay = `${delay}s`;
  });
  
  // Add parallax effect to background elements
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax to background elements
    const bgElements = document.querySelectorAll('.bg-element, .floating-shapes .shape');
    bgElements.forEach((element, index) => {
      const speed = 0.05 + (index % 3) * 0.02;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
    
    // Apply parallax to hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
      const translateY = scrollPosition * 0.3;
      const opacity = 1 - (scrollPosition * 0.002);
      
      heroContent.style.transform = `translateY(${translateY * 0.2}px)`;
      heroContent.style.opacity = Math.max(0, opacity + 0.2);
    }
  }, { passive: true });
  
  // Add shimmer effect to buttons
  const buttons = document.querySelectorAll('.btn-primary, .submit-btn');
  buttons.forEach(button => {
    button.classList.add('shimmer-effect');
  });
  
  // Add gradient text effect to headings
  const headings = document.querySelectorAll('h1, h2');
  headings.forEach(heading => {
    if (!heading.classList.contains('gradient-text') && !heading.closest('.hero')) {
      heading.classList.add('gradient-text');
    }
  });
}

/**
 * Initialize accessible animations for users who prefer reduced motion
 */
function initAccessibleAnimations() {
  // Disable AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      disable: true
    });
  }
  
  // Remove animations from elements
  const animatedElements = document.querySelectorAll('[data-aos], [class*="animate"], [class*="float"]');
  animatedElements.forEach(element => {
    element.removeAttribute('data-aos');
    element.style.animation = 'none';
    element.style.transition = 'opacity 0.3s ease';
  });
  
  // Ensure content is visible
  const contentElements = document.querySelectorAll('.hero-content, .section-header, .card');
  contentElements.forEach(element => {
    element.style.opacity = '1';
    element.style.transform = 'none';
  });
  
  // Add subtle focus styles for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
  interactiveElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--accent-color, #9b4dca)';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = '';
    });
  });
}

/**
 * Initialize scroll-triggered effects
 */
function initScrollEffects() {
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  document.body.appendChild(progressBar);
  
  // Update progress bar on scroll
  window.addEventListener('scroll', function() {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
  
  // Enhance scroll to top button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    // Show/hide button with enhanced animation
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }, { passive: true });
    
    // Add pulse effect on hover
    scrollToTopBtn.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
      this.classList.remove('pulse');
    });
    
    // Smooth scroll with custom easing
    scrollToTopBtn.addEventListener('click', function() {
      // Add pulse animation on click
      this.classList.add('pulse');
      
      // Smooth scroll with easing
      const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        } else {
          this.classList.remove('pulse');
        }
      };
      
      scrollToTop();
    });
  }
  
  // Enhanced active navigation highlighting
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all navigation links with smooth transition
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section's navigation link with highlight effect
        const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          
          // Add subtle pulse animation to active link
          activeLink.classList.add('pulse-once');
          setTimeout(() => {
            activeLink.classList.remove('pulse-once');
          }, 500);
        }
      }
    });
  }, { passive: true });
  
  // Add custom CSS for enhanced navigation highlighting
  const navHighlightStyle = document.createElement('style');
  navHighlightStyle.textContent = `
    nav a {
      position: relative;
      transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
    }
    
    nav a.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #FFD700, #E94057);
      transform: scaleX(1);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    
    nav a:not(.active)::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #FFD700, #E94057);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    
    nav a:hover::after {
      transform: scaleX(1);
    }
    
    nav a.pulse-once {
      animation: link-pulse 0.5s ease-out;
    }
    
    @keyframes link-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    #scrollToTop {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
      transition: opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), 
                  transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
                  background-color 0.3s ease;
    }
    
    #scrollToTop.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    
    #scrollToTop:hover {
      background: linear-gradient(135deg, #FFD700, #E94057);
      transform: translateY(-5px) scale(1.1);
    }
    
    #scrollToTop.pulse {
      animation: btn-pulse 0.5s ease-out;
    }
    
    @keyframes btn-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(navHighlightStyle);
}

/**
 * Initialize interactive elements with enhanced effects
 */
function initInteractiveElements() {
  // Enhanced mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      // Toggle active classes with enhanced animations
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Add staggered animation to nav items when menu opens
      if (navLinks.classList.contains('active')) {
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach((item, index) => {
          item.style.animation = `navItemFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
          item.style.opacity = '0';
        });
      } else {
        // Reset animations when menu closes
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach(item => {
          item.style.animation = '';
        });
      }
    });
  }
  
  // Add custom CSS for enhanced mobile menu animations
  const mobileMenuStyle = document.createElement('style');
  mobileMenuStyle.textContent = `
    @keyframes navItemFade {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .menu-toggle {
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    
    .menu-toggle.active {
      transform: rotate(90deg);
    }
    
    .nav-links {
      transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    
    .nav-links.active {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(mobileMenuStyle);
  
  // Enhanced form interactions
  const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
  
  formInputs.forEach(input => {
    // Create label for floating effect if it doesn't exist
    if (!input.previousElementSibling || !input.previousElementSibling.classList.contains('floating-label')) {
      const placeholder = input.getAttribute('placeholder');
      if (placeholder) {
        const label = document.createElement('label');
        label.className = 'floating-label';
        label.textContent = placeholder;
        input.parentNode.insertBefore(label, input);
        input.setAttribute('placeholder', '');
      }
    }
    
    // Focus animation
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    // Blur animation
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
    
    // Check initial state
    if (input.value !== '') {
      input.parentElement.classList.add('focused');
    }
  });
  
  // Add custom CSS for floating labels
  const floatingLabelStyle = document.createElement('style');
  floatingLabelStyle.textContent = `
    .input-wrapper {
      position: relative;
      margin-bottom: 25px;
    }
    
    .floating-label {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    
    .input-wrapper.focused .floating-label {
      top: -10px;
      left: 10px;
      font-size: 12px;
      color: var(--accent-color, #9b4dca);
      background: rgba(30, 30, 30, 0.8);
      padding: 0 5px;
    }
    
    .input-wrapper input,
    .input-wrapper textarea {
      width: 100%;
      padding: 15px;
      background: rgba(30, 30, 30, 0.7);
      border: none;
      border-bottom: 2px solid rgba(155, 77, 202, 0.3);
      border-radius: 4px;
      color: var(--text-color, #f8f9fa);
      font-size: 16px;
      transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    
    .input-wrapper input:focus,
    .input-wrapper textarea:focus {
      background: rgba(30, 30, 30, 0.9);
      border-bottom-color: var(--accent-color, #9b4dca);
      box-shadow: 0 5px 15px rgba(155, 77, 202, 0.1);
      outline: none;
    }
  `;
  document.head.appendChild(floatingLabelStyle);
  
  // Enhanced FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      // Set initial state
      if (!item.classList.contains('active')) {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      }
      
      question.addEventListener('click', function() {
        // Toggle active class
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = '0';
            otherAnswer.style.opacity = '0';
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = '0';
          answer.style.opacity = '0';
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity = '1';
          
          // Add subtle highlight effect
          item.style.boxShadow = '0 0 20px rgba(155, 77, 202, 0.2)';
          setTimeout(() => {
            item.style.boxShadow = '';
          }, 500);
        }
      });
    }
  });
  
  // Add custom CSS for FAQ accordion
  const faqStyle = document.createElement('style');
  faqStyle.textContent = `
    .faq-answer {
      transition: max-height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), 
                  opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      overflow: hidden;
    }
    
    .faq-question {
      cursor: pointer;
      position: relative;
      padding-right: 30px;
    }
    
    .faq-question::after {
      content: '+';
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      transition: transform 0.3s ease;
    }
    
    .faq-item.active .faq-question::after {
      transform: translateY(-50%) rotate(45deg);
    }
  `;
  document.head.appendChild(faqStyle);
}

/**
 * Initialize text animations for more engaging content
 */
function initTextAnimations() {
  // Animate hero title with text reveal effect
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.classList.add('animate-in');
    
    // Add gradient animation to hero title
    heroTitle.style.backgroundSize = '200% auto';
    heroTitle.style.animation = 'gradient-shift 8s ease infinite alternate';
  }
  
  // Animate hero subtitle with staggered reveal
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const paragraphs = heroSubtitle.querySelectorAll('p');
    
    paragraphs.forEach((paragraph, index) => {
      setTimeout(() => {
        paragraph.classList.add('animate-in');
        paragraph.style.animation = `fade-in-up 0.8s ease forwards ${index * 0.3}s`;
      }, 500);
    });
  }
  
  // Add custom CSS for enhanced text animations
  const textAnimStyle = document.createElement('style');
  textAnimStyle.textContent = `
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .hero-title {
      background: linear-gradient(90deg, #FFD700, #E94057, #8A2387, #FFD700);
      background-size: 300% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .section-title {
      position: relative;
      display: inline-block;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #FFD700, #E94057);
      transition: width 0.3s ease;
    }
    
    .section-title:hover::after {
      width: 100%;
    }
    
    .text-highlight {
      position: relative;
      display: inline-block;
    }
    
    .text-highlight::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30%;
      background: linear-gradient(90deg, rgba(255, 215, 0, 0.2), rgba(233, 64, 87, 0.2));
      z-index: -1;
      transform: skewX(-15deg);
    }
  `;
  document.head.appendChild(textAnimStyle);
  
  // Add text splitting for character animations
  const headings = document.querySelectorAll('h1:not(.hero-title), h2:not(.section-title)');
  headings.forEach(heading => {
    // Only apply to headings that aren't already animated
    if (!heading.classList.contains('gradient-text') && !heading.classList.contains('text-split')) {
      heading.classList.add('text-split');
      
      const text = heading.textContent;
      heading.textContent = '';
      
      // Create spans for each character
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? ' ' : text[i];
        span.style.animationDelay = `${i * 0.03}s`;
        heading.appendChild(span);
      }
    }
  });
  
  // Add custom CSS for text splitting animation
  const textSplitStyle = document.createElement('style');
  textSplitStyle.textContent = `
    .text-split span {
      display: inline-block;
      opacity: 0;
      transform: translateY(20px);
      animation: none;
    }
    
    .text-split.aos-animate span {
      animation: char-animation 0.5s forwards;
    }
    
    @keyframes char-animation {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(textSplitStyle);
}

/**
 * Helper function to convert hex color to RGB
 */
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}
