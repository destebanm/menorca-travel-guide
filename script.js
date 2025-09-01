// Menorca Travel Itinerary - Enhanced Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initializeItinerary();
    addKeyboardNavigation();
    addSmoothScrolling();
    initializeMaps();
    loadUserPreferences();
});

/**
 * Initialize the itinerary with enhanced features
 */
function initializeItinerary() {
    const dayCards = document.querySelectorAll('.day-card');
    dayCards.forEach((card, index) => {
        card.setAttribute('data-day', index + 1);
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        const header = card.querySelector('.day-title h2');
        if (header) {
            card.setAttribute('aria-label', `${header.textContent}`);
        }
    });
    
    updateProgressBar();
}

/**
 * Toggle content visibility for day cards
 */
function toggleContent(card) {
    const isActive = card.classList.contains('active');
    
    card.classList.toggle('active');
    card.setAttribute('aria-expanded', !isActive);
    
    if (!isActive) {
        card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'start'
        });
    }
    
    updateProgressBar();
    saveUserPreferences();
}

/**
 * Update progress bar based on opened days
 */
function updateProgressBar() {
    const totalDays = document.querySelectorAll('.day-card').length;
    const activeDays = document.querySelectorAll('.day-card.active').length;
    const percentage = Math.round((activeDays / totalDays) * 100);
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `Progreso del viaje: ${percentage}%`;
    }
}

/**
 * Add keyboard navigation support
 */
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('day-card')) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleContent(e.target);
            }
            
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
 * Add smooth scrolling behavior and scroll to top button
 */
function addSmoothScrolling() {
    const scrollToTopBtn = createScrollToTopButton();
    document.body.appendChild(scrollToTopBtn);
    
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
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
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
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    return button;
}

/**
 * Initialize maps for each day
 */
function initializeMaps() {
    const dayMaps = document.querySelectorAll('.day-map');
    dayMaps.forEach((mapElement, index) => {
        const dayNumber = index + 1;
        initializeDayMap(mapElement, dayNumber);
    });
}

/**
 * Initialize map for a specific day
 */
function initializeDayMap(mapElement, dayNumber) {
    // Hotel location (always marked in red)
    const hotelLocation = [39.8885, 4.2658]; // Mahón area
    
    // Day-specific locations
    const dayLocations = {
        1: { center: [39.8885, 4.2658], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Playa Es Grau', coords: [39.9342, 4.2547], type: 'beach' },
            { name: 'Puerto de Mahón', coords: [39.8883, 4.2659], type: 'poi' }
        ]},
        2: { center: [40.0003, 3.8385], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Cala Turqueta', coords: [39.9547, 3.9435], type: 'beach' },
            { name: 'Ciutadella', coords: [40.0003, 3.8385], type: 'city' }
        ]},
        3: { center: [40.0842, 4.1478], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Cala Pregonda', coords: [40.0842, 4.1478], type: 'beach' },
            { name: 'Fornells', coords: [40.0586, 4.1378], type: 'village' }
        ]},
        4: { center: [40.0586, 4.1378], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Playa Tirant', coords: [40.0489, 4.0689], type: 'beach' },
            { name: 'Fornells', coords: [40.0586, 4.1378], type: 'village' }
        ]},
        5: { center: [39.9435, 3.9342], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Cala Macarella', coords: [39.9435, 3.9342], type: 'beach' },
            { name: 'Son Saura', coords: [39.9245, 3.8956], type: 'beach' }
        ]},
        6: { center: [39.9789, 4.0978], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Cala Mitjana', coords: [39.9267, 4.0456], type: 'beach' },
            { name: 'Monte Toro', coords: [39.9789, 4.0978], type: 'mountain' }
        ]},
        7: { center: [39.8885, 4.2658], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Cala Presili', coords: [39.8756, 4.3156], type: 'beach' },
            { name: 'Centro Mahón', coords: [39.8883, 4.2659], type: 'shopping' }
        ]},
        8: { center: [39.8885, 4.2658], places: [
            { name: 'Hotel Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
            { name: 'Cala Mesquida', coords: [39.9678, 4.3189], type: 'beach' },
            { name: 'Aeropuerto', coords: [39.8625, 4.2189], type: 'airport' }
        ]}
    };
    
    const dayData = dayLocations[dayNumber];
    if (!dayData) return;
    
    try {
        const map = L.map(mapElement.id).setView(dayData.center, 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add markers for each place
        dayData.places.forEach(place => {
            const icon = getMarkerIcon(place.type);
            const marker = L.marker(place.coords, { icon }).addTo(map);
            marker.bindPopup(`<strong>${place.name}</strong><br>
                <a href="https://maps.google.com/?q=${place.coords[0]},${place.coords[1]}" target="_blank">
                    🗺️ Abrir en Google Maps
                </a>`);
        });
        
        // Fit map to show all markers
        if (dayData.places.length > 1) {
            const group = new L.featureGroup(map._layers);
            map.fitBounds(group.getBounds().pad(0.1));
        }
        
    } catch (error) {
        mapElement.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🗺️</div>
                <div style="font-weight: 500;">Mapa del Día ${dayNumber}</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                    <a href="https://maps.google.com/?q=Menorca" target="_blank" style="color: var(--primary-color);">
                        Ver en Google Maps
                    </a>
                </div>
            </div>
        `;
    }
}

/**
 * Get marker icon based on place type
 */
function getMarkerIcon(type) {
    const icons = {
        hotel: '🏨',
        beach: '🏖️',
        city: '🏛️',
        village: '🏘️',
        mountain: '⛰️',
        shopping: '🛍️',
        airport: '✈️',
        poi: '📍'
    };
    
    const emoji = icons[type] || '📍';
    
    return L.divIcon({
        html: `<div style="
            background: ${type === 'hotel' ? '#e74c3c' : 'var(--primary-color)'};
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">${emoji}</div>`,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

/**
 * Show general map modal
 */
function showGeneralMap() {
    const modal = document.getElementById('mapModal');
    const mapContainer = document.getElementById('generalMap');
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    
    // Initialize general map if not already done
    if (!mapContainer._leaflet_id) {
        initializeGeneralMap();
    }
}

/**
 * Initialize the general map of Menorca
 */
function initializeGeneralMap() {
    const mapContainer = document.getElementById('generalMap');
    const map = L.map(mapContainer).setView([39.9624, 4.0544], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add all important locations
    const allLocations = [
        { name: 'Hotel Base - Mahón', coords: [39.8885, 4.2658], type: 'hotel' },
        { name: 'Ciutadella', coords: [40.0003, 3.8385], type: 'city' },
        { name: 'Fornells', coords: [40.0586, 4.1378], type: 'village' },
        { name: 'Cala Turqueta', coords: [39.9547, 3.9435], type: 'beach' },
        { name: 'Cala Macarella', coords: [39.9435, 3.9342], type: 'beach' },
        { name: 'Cala Pregonda', coords: [40.0842, 4.1478], type: 'beach' },
        { name: 'Monte Toro', coords: [39.9789, 4.0978], type: 'mountain' },
        { name: 'Aeropuerto', coords: [39.8625, 4.2189], type: 'airport' }
    ];
    
    allLocations.forEach(location => {
        const icon = getMarkerIcon(location.type);
        const marker = L.marker(location.coords, { icon }).addTo(map);
        marker.bindPopup(`<strong>${location.name}</strong><br>
            <a href="https://maps.google.com/?q=${location.coords[0]},${location.coords[1]}" target="_blank">
                🗺️ Abrir en Google Maps
            </a>`);
    });
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('mapModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
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
    
    try {
        localStorage.setItem('menorcaItineraryPreferences', JSON.stringify(preferences));
    } catch (error) {
        console.log('No se pudieron guardar las preferencias');
    }
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('menorcaItineraryPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            
            // Only load preferences if they're recent (within 7 days)
            if (Date.now() - preferences.timestamp < 7 * 24 * 60 * 60 * 1000) {
                const cards = document.querySelectorAll('.day-card');
                preferences.expandedDays.forEach(dayIndex => {
                    if (cards[dayIndex]) {
                        cards[dayIndex].classList.add('active');
                        cards[dayIndex].setAttribute('aria-expanded', 'true');
                    }
                });
                updateProgressBar();
            }
        }
    } catch (error) {
        console.log('No se pudieron cargar las preferencias previas');
    }
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
    updateProgressBar();
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
    updateProgressBar();
    saveUserPreferences();
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('mapModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Export functions for global access
window.toggleContent = toggleContent;
window.showGeneralMap = showGeneralMap;
window.closeModal = closeModal;
window.expandAll = expandAll;
window.collapseAll = collapseAll;
