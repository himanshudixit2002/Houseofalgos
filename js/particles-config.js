/**
 * House of Algo's - Enhanced Particles Configuration
 * This file contains advanced configuration for the particles.js background
 * Optimized for performance and visual appeal with AOS integration
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        // Check if we're on a mobile device with more precise detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        
        // Adjust particle count and speed based on device and performance
        const particleCount = isMobile ? 30 : 100;
        const particleSpeed = isMobile ? 1 : 2;
        
        // Enhanced particle configuration with premium visual effects
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
                    "value": ["#FFD700", "#E94057", "#8A2387", "#ffffff", "#F5D76E", "#D4AF37", "#C0392B", "#9A12B3"]
                },
                "shape": {
                    "type": ["circle", "triangle", "polygon", "star"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 6
                    },
                    "character": {
                        "value": ["$", "¥", "€", "£", "₿"],
                        "font": "Verdana",
                        "style": "",
                        "weight": "normal",
                        "fill": true
                    }
                },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1.2,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": particleSpeed * 1.2,
                        "size_min": 0.5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 180,
                    "color": "#FFD700",
                    "opacity": 0.5,
                    "width": 1.5,
                    "shadow": {
                        "enable": true,
                        "color": "#E94057",
                        "blur": 8
                    }
                },
                "move": {
                    "enable": true,
                    "speed": particleSpeed * 1.1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": true,
                    "attract": {
                        "enable": true,
                        "rotateX": 800,
                        "rotateY": 1500
                    }
                }
            },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 200,
                            "line_linked": {
                                "opacity": 0.9,
                                "color": "#FFD700"
                            }
                        },
                        "bubble": {
                            "distance": 250,
                            "size": 12,
                            "duration": 1.5,
                            "opacity": 0.8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 300,
                            "duration": 0.8
                        },
                        "push": {
                            "particles_nb": 6
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
            },
            "retina_detect": true,
            "fps_limit": 60
        });
        
        // Enhanced mouse parallax effect with smoother transitions
        const particlesContainer = document.getElementById('particles-js');
        let currentX = 0;
        let currentY = 0;
        let aimX = 0;
        let aimY = 0;
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            aimX = mouseX * 30 - 15;
            aimY = mouseY * 30 - 15;
        });
        
        // Smooth animation for particle container movement
        function updateParticlesPosition() {
            currentX += (aimX - currentX) * 0.1;
            currentY += (aimY - currentY) * 0.1;
            
            if (particlesContainer) {
                particlesContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
            
            requestAnimationFrame(updateParticlesPosition);
        }
        
        updateParticlesPosition();
        
        // Enhanced resize handler with debouncing for better performance
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            
            resizeTimer = setTimeout(() => {
                // Destroy and recreate particles on resize for better performance
                if (typeof particlesJS.destroy === 'function') {
                    particlesJS.destroy();
                }
                
                // Check if we're on a mobile device after resize with more precise detection
                const isMobileAfterResize = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
                
                // Adjust particle count and speed based on new device size and performance
                const particleCountAfterResize = isMobileAfterResize ? 30 : 100;
                const particleSpeedAfterResize = isMobileAfterResize ? 1 : 2;
                
                // Reinitialize with new settings
                particlesJS('particles-js', {
                    "particles": {
                        "number": {
                            "value": particleCountAfterResize,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": ["#FFD700", "#BA3C5E", "#53165F", "#ffffff", "#F5D76E"]
                        },
                        "shape": {
                            "type": ["circle", "triangle", "polygon"],
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 6
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
                            "value": 4,
                            "random": true,
                            "anim": {
                                "enable": true,
                                "speed": particleSpeedAfterResize,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#FFD700",
                            "opacity": 0.4,
                            "width": 1.2,
                            "shadow": {
                                "enable": true,
                                "color": "#BA3C5E",
                                "blur": 5
                            }
                        },
                        "move": {
                            "enable": true,
                            "speed": particleSpeedAfterResize,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": true,
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
                                "distance": 180,
                                "line_linked": {
                                    "opacity": 0.8,
                                    "color": "#FFD700"
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
                    "retina_detect": true,
                    "fps_limit": 60
                });
                
                // Refresh AOS animations after particles are reinitialized
                if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
                    setTimeout(() => {
                        AOS.refresh();
                    }, 300);
                }
            }, 250);
        });
        
        // Add pulse effect to particles on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            
            if (st > lastScrollTop && st > 100) {
                // Scrolling down - add pulse effect
                if (particlesContainer) {
                    particlesContainer.classList.add('pulse-effect');
                    
                    setTimeout(() => {
                        particlesContainer.classList.remove('pulse-effect');
                    }, 500);
                }
            }
            
            lastScrollTop = st <= 0 ? 0 : st;
        }, { passive: true });
        
        // Add CSS for enhanced particle effects
        const particleStyles = document.createElement('style');
        particleStyles.textContent = `
            #particles-js {
                transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
                will-change: transform;
                position: relative;
            }
            
            .pulse-effect {
                animation: particlePulse 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            @keyframes particlePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .particles-js-canvas-el {
                will-change: transform, opacity;
                filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
            }
            
            /* Add glowing effect on hover */
            #particles-js:hover .particles-js-canvas-el {
                filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.5));
                transition: filter 0.5s ease;
            }
            
            /* Add subtle animation to the entire hero section */
            .hero {
                animation: subtle-float 8s ease-in-out infinite alternate;
            }
            
            @keyframes subtle-float {
                0% { transform: translateY(0); }
                100% { transform: translateY(-10px); }
            }
        `;
        
        document.head.appendChild(particleStyles);
    }
});
