/**
 * House of Algo's - Refined Animations
 * This file contains subtle and professional animations using jQuery (3.6.0) and AOS (2.3.4)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Only apply animations if user hasn't requested reduced motion
  if (!isReducedMotion) {
    initRefinedAnimations();
  } else {
    // Apply minimal animations for users who prefer reduced motion
    initMinimalAnimations();
  }
  
  // Initialize FAQ accordion functionality
  initFaqAccordion();
  
  // Initialize form animations
  initFormAnimations();
  
  // Initialize scroll animations
  initScrollAnimations();
});

/**
 * Initialize refined animations for the website
 */
function initRefinedAnimations() {
  // Configure AOS with more subtle settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,              // Shorter duration for more subtle animations
      easing: 'ease-out',         // More natural easing
      once: true,                 // Only animate once
      mirror: false,              // Don't animate when scrolling back up
      offset: 100,                // Trigger animations earlier
      disable: window.innerWidth < 768 ? true : false,
      anchorPlacement: 'top-bottom'
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
      AOS.refresh();
    });
  }
  
  // Add subtle hover effects to cards
  const cards = document.querySelectorAll('.income-card, .feature-card, .step-card, .vision-card, .faq-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      this.style.borderColor = 'rgba(52, 152, 219, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      this.style.borderColor = '';
    });
  });
  
  // Add subtle scroll effects
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Subtle parallax for background elements
    const bgElements = document.querySelectorAll('.bg-element, .floating-shapes .shape');
    bgElements.forEach((element, index) => {
      const speed = 0.03 + (index % 3) * 0.01;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
  
  // Add staggered animations to lists
  const lists = document.querySelectorAll('.clean-list, .values-grid, .features-grid, .income-cards');
  lists.forEach(list => {
    const items = list.children;
    Array.from(items).forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s`;
    });
  });
  
  // Add smooth reveal for section dividers
  const sectionDividers = document.querySelectorAll('.section-divider');
  sectionDividers.forEach(divider => {
    divider.style.width = '0';
    divider.style.transition = 'width 1s ease-out';
    
    // Create an observer for the divider
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            divider.style.width = '80px';
          }, 200);
          observer.unobserve(divider);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(divider);
  });
  
  // Subtle scroll indicator animation
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.animation = 'subtle-bounce 2.5s infinite';
  }
  
  // Add CSS for the subtle bounce animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes subtle-bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize minimal animations for users who prefer reduced motion
 */
function initMinimalAnimations() {
  // Disable AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      disable: true
    });
  }
  
  // Remove any existing animations
  const animatedElements = document.querySelectorAll('[class*="animate"], [class*="aos-"]');
  animatedElements.forEach(element => {
    element.style.animation = 'none';
    element.style.transition = 'none';
  });
  
  // Ensure content is immediately visible
  const contentElements = document.querySelectorAll('.hero-content, .section-header, .income-cards, .features-grid');
  contentElements.forEach(element => {
    element.style.opacity = '1';
    element.style.transform = 'none';
  });
}

/**
 * Initialize FAQ accordion functionality with smooth animations
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Set initial state
    answer.style.maxHeight = '0';
    
    question.addEventListener('click', function() {
      // Toggle active class
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Initialize form animations for better user experience
 */
function initFormAnimations() {
  const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
  
  formInputs.forEach(input => {
    // Focus animation
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
      this.parentElement.style.borderColor = 'rgba(52, 152, 219, 0.5)';
      this.parentElement.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.2)';
    });
    
    // Blur animation
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      this.parentElement.style.borderColor = '';
      this.parentElement.style.boxShadow = '';
    });
  });
  
  // Form submission animation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const spinner = submitBtn.querySelector('.loading-spinner');
      const formMessage = this.querySelector('.form-message');
      
      // Show loading state
      btnText.style.opacity = '0';
      spinner.style.display = 'block';
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // Hide loading state
        btnText.style.opacity = '1';
        spinner.style.display = 'none';
        
        // Show success message
        formMessage.textContent = 'Your message has been sent successfully!';
        formMessage.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.classList.remove('success');
        }, 5000);
      }, 1500);
    });
  }
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav a, .scroll-indicator a, a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only apply to internal links
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          history.pushState(null, null, targetId);
        }
      }
    });
  });
  
  // Highlight active navigation item based on scroll position
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all navigation links
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section's navigation link
        const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  });
  
  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
      }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Animate numbers when they come into view (with more subtle animation)
  const animateNumbers = () => {
    const numberElements = document.querySelectorAll('.animate-number');
    
    numberElements.forEach(element => {
      const targetNumber = parseInt(element.getAttribute('data-target'), 10);
      const duration = parseInt(element.getAttribute('data-duration') || '1500', 10);
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let startTime;
            let currentNumber = 0;
            
            const updateNumber = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = timestamp - startTime;
              
              if (progress < duration) {
                currentNumber = Math.floor((progress / duration) * targetNumber);
                element.textContent = currentNumber;
                requestAnimationFrame(updateNumber);
              } else {
                element.textContent = targetNumber;
              }
            };
            
            requestAnimationFrame(updateNumber);
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  };
  
  // Call animate numbers function
  animateNumbers();
}
