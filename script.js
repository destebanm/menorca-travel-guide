// Menorca Travel Itinerary - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeItinerary();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add smooth scroll behavior
    addSmoothScrolling();
    
    // Add weather tips functionality
    addWeatherTips();
});

/**
 * Initialize the itinerary with enhanced features
 */
function initializeItinerary() {
    // Add click handlers to all day cards
    const dayCards = document.querySelectorAll('.day-card');
    dayCards.forEach((card, index) => {
        // Add data attributes for easier handling
        card.setAttribute('data-day', index + 1);
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        // Enhance accessibility
        const header = card.querySelector('.day-header h2');
        if (header) {
            card.setAttribute('aria-label', `Día ${index + 1}: ${header.textContent}`);
        }
    });
    
    // Add expand/collapse all functionality
    addToggleAllButtons();
}

/**
 * Toggle content visibility for day cards
 */
function toggleContent(card) {
    const isActive = card.classList.contains('active');
    
    // Toggle the active state
    card.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    card.setAttribute('aria-expanded', !isActive);
    
    // Add a subtle animation feedback
    if (!isActive) {
        card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'start'
        });
    }
    
    // Store user preferences in localStorage
    saveUserPreferences();
}

/**
 * Add keyboard navigation support
 */
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('day-card')) {
            // Space or Enter to toggle
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleContent(e.target);
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateCards(e.target, e.key === 'ArrowDown' ? 1 : -1);
            }
        }
    });
}

/**
 * Navigate between day cards using keyboard
 */
function navigateCards(currentCard, direction) {
    const cards = Array.from(document.querySelectorAll('.day-card'));
    const currentIndex = cards.indexOf(currentCard);
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < cards.length) {
        cards[nextIndex].focus();
        cards[nextIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

/**
 * Add expand/collapse all functionality
 */
function addToggleAllButtons() {
    const header = document.querySelector('header');
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'toggle-controls';
    buttonContainer.style.marginTop = '20px';
    
    const expandAllBtn = createButton('📂 Expandir todo', expandAll);
    const collapseAllBtn = createButton('📁 Contraer todo', collapseAll);
    
    buttonContainer.appendChild(expandAllBtn);
    buttonContainer.appendChild(collapseAllBtn);
    header.appendChild(buttonContainer);
}

/**
 * Create a styled button
 */
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = clickHandler;
    button.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 10px 20px;
        margin: 0 10px;
        border-radius: 25px;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'translateY(0)';
    });
    
    return button;
}

/**
 * Expand all day cards
 */
function expandAll() {
    const cards = document.querySelectorAll('.day-card');
    cards.forEach(card => {
        if (!card.classList.contains('active')) {
            card.classList.add('active');
            card.setAttribute('aria-expanded', 'true');
        }
    });
    saveUserPreferences();
}

/**
 * Collapse all day cards
 */
function collapseAll() {
    const cards = document.querySelectorAll('.day-card');
    cards.forEach(card => {
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            card.setAttribute('aria-expanded', 'false');
        }
    });
    saveUserPreferences();
}

/**
 * Add smooth scrolling behavior
 */
function addSmoothScrolling() {
    // Smooth scroll to top functionality
    const scrollToTopBtn = createScrollToTopButton();
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
}

/**
 * Create scroll to top button
 */
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '🔝';
    button.setAttribute('aria-label', 'Volver arriba');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#3a8572';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-color)';
    });
    
    return button;
}

/**
 * Add weather tips functionality
 */
function addWeatherTips() {
    // Add click handlers to info boxes for additional tips
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        box.style.cursor = 'pointer';
        box.addEventListener('click', function() {
            showWeatherTip(this);
        });
    });
}

/**
 * Show weather tip modal or tooltip
 */
function showWeatherTip(infoBox) {
    const tip = infoBox.textContent;
    
    // Create a simple tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = '💡 Haz clic en las alternativas para más consejos sobre el clima';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        font-size: 0.9rem;
        max-width: 300px;
        text-align: center;
    `;
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 3000);
}

/**
 * Save user preferences to localStorage
 */
function saveUserPreferences() {
    const preferences = {
        expandedDays: [],
        timestamp: Date.now()
    };
    
    const cards = document.querySelectorAll('.day-card');
    cards.forEach((card, index) => {
        if (card.classList.contains('active')) {
            preferences.expandedDays.push(index);
        }
    });
    
    localStorage.setItem('menorcaItineraryPreferences', JSON.stringify(preferences));
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('menorcaItineraryPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            
            // Only load preferences if they're recent (within 24 hours)
            if (Date.now() - preferences.timestamp < 24 * 60 * 60 * 1000) {
                const cards = document.querySelectorAll('.day-card');
                preferences.expandedDays.forEach(dayIndex => {
                    if (cards[dayIndex]) {
                        cards[dayIndex].classList.add('active');
                        cards[dayIndex].setAttribute('aria-expanded', 'true');
                    }
                });
            }
        }
    } catch (error) {
        console.log('No previous preferences found');
    }
}

// Load preferences when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadUserPreferences, 100);
});

// Export functions for global access
window.toggleContent = toggleContent;
