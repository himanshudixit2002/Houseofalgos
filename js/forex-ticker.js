/**
 * House of Algo's - Forex Ticker
 * Enhanced with jQuery for better performance and animations
 */

$(document).ready(function() {
    // Map currency codes to country codes for flags
    const currencyToCountryMap = {
        'EUR': 'eu',
        'GBP': 'gb',
        'USD': 'us',
        'JPY': 'jp',
        'CHF': 'ch',
        'AUD': 'au',
        'CAD': 'ca',
        'NZD': 'nz',
        'SGD': 'sg'
    };

    // Currency pairs data
    const currencyPairs = [
        { base: 'EUR', quote: 'USD' },
        { base: 'GBP', quote: 'USD' },
        { base: 'USD', quote: 'JPY' },
        { base: 'USD', quote: 'CHF' },
        { base: 'AUD', quote: 'USD' },
        { base: 'USD', quote: 'CAD' },
        { base: 'NZD', quote: 'USD' },
        { base: 'USD', quote: 'SGD' }
    ];

    // Helper function to get flag URL based on currency code
    function getFlagUrl(currency) {
        const countryCode = currencyToCountryMap[currency] || currency.toLowerCase();
        return `https://flagcdn.com/w20/${countryCode}.png`;
    }

    // Initialize the forex ticker
    function initForexTicker() {
        const $ticker = $('#forexTicker');
        if (!$ticker.length) return;

        // Clear any existing content
        $ticker.empty();

        // Create currency pairs
        $.each(currencyPairs, function(index, pair) {
            const value = generateRandomPrice(pair);
            const change = generateRandomChange();
            const isUp = change >= 0;

            const $pairElement = $('<div>', {
                'class': 'currency-pair',
                'data-pair': `${pair.base}${pair.quote}`
            }).html(`
                <div class="currency-name">
                    <div class="currency-flag">
                        <img src="${getFlagUrl(pair.base)}" alt="${pair.base} flag" width="32" height="32">
                    </div>
                    <span class="currency-code">${pair.base}</span>
                    <span class="currency-separator">/</span>
                    <div class="currency-flag">
                        <img src="${getFlagUrl(pair.quote)}" alt="${pair.quote} flag" width="32" height="32">
                    </div>
                    <span class="currency-code">${pair.quote}</span>
                </div>
                <div class="currency-value ${isUp ? 'up' : 'down'}">
                    <span>${value}</span>
                    <i class="fas fa-${isUp ? 'caret-up' : 'caret-down'}"></i>
                    <span class="currency-change">${change}%</span>
                </div>
            `);

            // Add click event for modal
            $pairElement.on('click', function() {
                showCurrencyModal(pair, value, change);
            });
            
            $ticker.append($pairElement);

            // Clone for infinite scroll
            const $clone = $pairElement.clone(true);
            $ticker.append($clone);
        });

        // Start updating values
        setInterval(updateValues, 3000);

        // Pause animation on hover with smooth transition
        const $tickerContainer = $('.forex-ticker-container');
        if ($tickerContainer.length) {
            $tickerContainer.on({
                mouseenter: function() {
                    $ticker.css('animation-play-state', 'paused');
                },
                mouseleave: function() {
                    $ticker.css('animation-play-state', 'running');
                }
            });
        }
    }

    // Show currency modal with enhanced animations
    function showCurrencyModal(pair, value, change) {
        const $template = $('#currencyModalTemplate');
        if (!$template.length) return;
        
        const $modal = $($template.html());
        
        $modal.find('.base-currency').html(`
            <img src="${getFlagUrl(pair.base)}" alt="${pair.base} flag" width="32" height="32">
            <span>${pair.base}</span>
        `);
        
        $modal.find('.quote-currency').html(`
            <img src="${getFlagUrl(pair.quote)}" alt="${pair.quote} flag" width="32" height="32">
            <span>${pair.quote}</span>
        `);
        
        $modal.find('.price-value').text(value);
        
        const $changeElement = $modal.find('.price-change');
        const isUp = change >= 0;
        $changeElement.attr('class', `price-change ${isUp ? 'up' : 'down'}`);
        $changeElement.html(`
            <i class="fas fa-${isUp ? 'caret-up' : 'caret-down'}"></i>
            ${change}%
        `);

        // Add animation to modal content
        const $modalContent = $modal.find('.modal-content');
        $modalContent.css('transform', 'translateY(20px)');
        
        setTimeout(function() {
            $modalContent.css('transform', 'translateY(0)');
        }, 10);

        // Close modal on button click or outside click
        $modal.find('.modal-close').on('click', function() {
            closeModal($modal);
        });
        
        $modal.on('click', function(e) {
            if ($(e.target).is($modal)) {
                closeModal($modal);
            }
        });

        // Close on escape key
        $(document).on('keydown.currencyModal', function(e) {
            if (e.key === 'Escape') {
                closeModal($modal);
                $(document).off('keydown.currencyModal');
            }
        });

        $('body').append($modal);
        setTimeout(function() {
            $modal.addClass('show');
        }, 10);
        
        // Add chart placeholder animation
        const $chartPlaceholder = $modal.find('.chart-placeholder');
        $chartPlaceholder.css('opacity', '0');
        
        setTimeout(function() {
            $chartPlaceholder.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 300);
    }

    // Close modal with enhanced animation
    function closeModal($modal) {
        const $modalContent = $modal.find('.modal-content');
        $modalContent.css('transform', 'translateY(20px)');
        $modal.removeClass('show');
        
        setTimeout(function() {
            $modal.remove();
        }, 300);
    }

    // Generate random price based on currency pair
    function generateRandomPrice(pair) {
        let min, max;
        
        // Set realistic ranges based on currency pair
        if (pair.base === 'EUR' && pair.quote === 'USD') {
            min = 1.05; max = 1.15;
        } else if (pair.base === 'GBP' && pair.quote === 'USD') {
            min = 1.20; max = 1.30;
        } else if (pair.base === 'USD' && pair.quote === 'JPY') {
            min = 105; max = 115;
            return (Math.random() * (max - min) + min).toFixed(2);
        } else if (pair.base === 'USD' && pair.quote === 'CHF') {
            min = 0.90; max = 0.95;
        } else if (pair.base === 'AUD' && pair.quote === 'USD') {
            min = 0.65; max = 0.75;
        } else if (pair.base === 'USD' && pair.quote === 'CAD') {
            min = 1.25; max = 1.35;
        } else if (pair.base === 'NZD' && pair.quote === 'USD') {
            min = 0.60; max = 0.70;
        } else if (pair.base === 'USD' && pair.quote === 'SGD') {
            min = 1.30; max = 1.40;
        } else {
            min = 0.5; max = 1.5;
        }
        
        return (Math.random() * (max - min) + min).toFixed(4);
    }

    // Generate random change percentage
    function generateRandomChange() {
        return (Math.random() * 2 - 1).toFixed(2);
    }

    // Update currency values with enhanced animations
    function updateValues() {
        $('.currency-pair').each(function() {
            const $pair = $(this);
            const pairCode = $pair.data('pair');
            if (!pairCode) return;
            
            const currencyPair = currencyPairs.find(p => `${p.base}${p.quote}` === pairCode);
            if (!currencyPair) return;
            
            const $valueElement = $pair.find('.currency-value');
            const $valueSpan = $valueElement.find('span').first();
            const $changeElement = $pair.find('.currency-change');
            const $iconElement = $valueElement.find('i');
            
            const newValue = generateRandomPrice(currencyPair);
            const newChange = generateRandomChange();
            const isUp = newChange >= 0;
            const oldValue = parseFloat($valueSpan.text());
            const newValueFloat = parseFloat(newValue);
            const valueChanged = newValueFloat !== oldValue;
            
            // Only animate if value actually changed
            if (valueChanged) {
                // Update value and change with animation
                $valueSpan.fadeOut(100, function() {
                    $(this).text(newValue).fadeIn(100);
                });
                
                $changeElement.fadeOut(100, function() {
                    $(this).text(`${newChange}%`).fadeIn(100);
                });

                // Update direction
                $valueElement.attr('class', `currency-value ${isUp ? 'up' : 'down'}`);
                $iconElement.attr('class', `fas fa-${isUp ? 'caret-up' : 'caret-down'}`);

                // Add animation
                $valueElement.addClass(isUp ? 'changing-up' : 'changing-down');
                setTimeout(function() {
                    $valueElement.removeClass('changing-up changing-down');
                }, 600);
            }
        });
    }

    // Initialize when document is ready
    initForexTicker();
});
