/**
 * House of Algo's - FAQ JavaScript
 * Enhanced with jQuery and AOS animations
 */

$(document).ready(function() {
    const $faqItems = $('.faq-item');
    
    // Set first item as active by default
    if ($faqItems.length > 0) {
        $faqItems.first().addClass('active');
    }
    
    // Add enhanced animations to FAQ items
    $faqItems.each(function() {
        const $item = $(this);
        const $question = $item.find('.faq-question');
        const $answer = $item.find('.faq-answer');
        const $toggle = $item.find('.faq-toggle');
        
        // Add hover effect
        $question.on('mouseenter', function() {
            if (!$item.hasClass('active')) {
                $question.addClass('hover');
            }
        }).on('mouseleave', function() {
            $question.removeClass('hover');
        });
        
        $question.on('click', function() {
            // Check if this item is already active
            const isActive = $item.hasClass('active');
            
            // Close all other items with smooth animation
            $faqItems.not($item).each(function() {
                const $otherItem = $(this);
                const $otherAnswer = $otherItem.find('.faq-answer');
                const $otherToggle = $otherItem.find('.faq-toggle i');
                
                $otherItem.removeClass('active');
                
                // Animate closing with jQuery
                $otherAnswer.animate({
                    maxHeight: '0px'
                }, 300);
                
                $otherToggle.css({
                    'transform': 'rotate(0deg)',
                    'transition': 'transform 0.3s ease'
                });
            });
            
            // Toggle current item with enhanced animation
            if (isActive) {
                $item.removeClass('active');
                
                $answer.animate({
                    maxHeight: '0px'
                }, 300);
                
                $toggle.find('i').css({
                    'transform': 'rotate(0deg)',
                    'transition': 'transform 0.3s ease'
                });
            } else {
                $item.addClass('active');
                
                // Calculate the height dynamically
                const height = $answer.prop('scrollHeight');
                
                $answer.animate({
                    maxHeight: height + 'px'
                }, 300);
                
                $toggle.find('i').css({
                    'transform': 'rotate(180deg)',
                    'transition': 'transform 0.3s ease'
                });
                
                // Add subtle pulse animation to the active question
                $question.addClass('pulse');
                setTimeout(function() {
                    $question.removeClass('pulse');
                }, 500);
            }
        });
        
        // Set initial state for active item
        if ($item.hasClass('active')) {
            const height = $answer.prop('scrollHeight');
            $answer.css('maxHeight', height + 'px');
            $toggle.find('i').css('transform', 'rotate(180deg)');
        } else {
            $answer.css('maxHeight', '0px');
            $toggle.find('i').css('transform', 'rotate(0deg)');
        }
    });
    
    // Handle window resize to adjust maxHeight
    $(window).on('resize', function() {
        const $activeItems = $('.faq-item.active');
        
        $activeItems.each(function() {
            const $answer = $(this).find('.faq-answer');
            const height = $answer.prop('scrollHeight');
            $answer.css('maxHeight', height + 'px');
        });
    });
    
    // Add AOS animations to FAQ section
    $('.faq-item').attr({
        'data-aos': 'fade-up',
        'data-aos-duration': '800'
    });
    
    // Stagger the animations
    $('.faq-item').each(function(index) {
        $(this).attr('data-aos-delay', (index * 100).toString());
    });
    
    // Add custom CSS for enhanced FAQ animations
    const customCSS = `
        .faq-question {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .faq-question:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            transition: width 0.3s ease;
        }
        
        .faq-question.hover:before {
            width: 100%;
        }
        
        .faq-question.pulse {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .faq-toggle i {
            transition: transform 0.3s ease;
        }
        
        .faq-item.active .faq-question {
            background: rgba(0, 123, 255, 0.05);
        }
    `;
    
    $('<style>').text(customCSS).appendTo('head');
});
