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
    // Initialize maps for all 8 days
    for (let dayNumber = 1; dayNumber <= 8; dayNumber++) {
        const mapElement = document.getElementById(`map-day${dayNumber}`);
        if (mapElement) {
            initializeDayMap(mapElement, dayNumber);
        }
    }
}

/**
 * Initialize map for a specific day with route from/to hotel
 */
function initializeDayMap(mapElement, dayNumber) {
    // Hotel location (Hotel Occidental Menorca, Punta Prima - always start/end point)
    const hotelLocation = [39.8638, 4.2531]; // Hotel Occidental Menorca, Punta Prima
    
    // Day-specific route waypoints with optimized geography
    const dayRoutes = {
        1: {
            title: "Llegada y Relajación",
            waypoints: [
                "Aeropuerto+Menorca+MAH",
                "Hotel+Occidental+Menorca+Punta+Prima", 
                "Playa+Punta+Prima+Menorca"
            ]
        },
        2: {
            title: "Sur - Calas Macarella",
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Cala+Macarella+Menorca",
                "Cala+Macarelleta+Menorca",
                "Hotel+Occidental+Menorca+Punta+Prima"
            ]
        },
        3: {
            title: "Norte - Cala Pregonda y Fornells", 
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Cala+Pregonda+Menorca",
                "Fornells+Menorca",
                "Hotel+Occidental+Menorca+Punta+Prima"
            ]
        },
        4: {
            title: "Oeste - Ciutadella",
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Ciutadella+Menorca",
                "Cala+en+Brut+Menorca",
                "Cala+en+Bosch+Menorca",
                "Hotel+Occidental+Menorca+Punta+Prima"
            ]
        },
        5: {
            title: "Este - Binibeca",
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Binibeca+Vell+Menorca",
                "Es+Calo+Blanc+Menorca",
                "Hotel+Occidental+Menorca+Punta+Prima"
            ]
        },
        6: {
            title: "Centro - Mahón y Cova d'en Xoroi",
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Mahon+Centro+Menorca",
                "Cala+Mesquida+Menorca", 
                "Cova+den+Xoroi+Menorca",
                "Hotel+Occidental+Menorca+Punta+Prima"
            ]
        },
        7: {
            title: "Norte Alternativo - Es Grau",
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Es+Grau+Menorca",
                "Faro+de+Favaritx+Menorca",
                "Hotel+Occidental+Menorca+Punta+Prima"
            ]
        },
        8: {
            title: "Despedida - Última playa y aeropuerto",
            waypoints: [
                "Hotel+Occidental+Menorca+Punta+Prima",
                "Playa+Punta+Prima+Menorca",
                "Aeropuerto+Menorca+MAH"
            ]
        }
    };
    
    const dayRoute = dayRoutes[dayNumber];
    if (!dayRoute) return;
    
    try {
        // Create Google Maps route URL
        const origin = dayRoute.waypoints[0];
        const destination = dayRoute.waypoints[dayRoute.waypoints.length - 1];
        const waypoints = dayRoute.waypoints.slice(1, -1);
        
        let mapsUrl = `https://www.google.com/maps/dir/${origin}`;
        waypoints.forEach(waypoint => {
            mapsUrl += `/${waypoint}`;
        });
        mapsUrl += `/${destination}`;
        
        // Create embedded map view
        mapElement.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 12px; text-align: center;">
                    <h4 style="margin: 0; font-size: 14px;">📍 ${dayRoute.title}</h4>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #333;">Ruta del Día ${dayNumber}</div>
                    <div style="font-size: 14px; color: #666; margin-bottom: 20px; text-align: center; line-height: 1.4;">
                        ${dayRoute.waypoints.length} paradas<br>
                        🏨 Desde/hacia Hotel Occidental
                    </div>
                    <a href="${mapsUrl}" target="_blank" 
                       style="background: var(--primary-color); color: white; padding: 12px 24px; 
                              border-radius: 25px; text-decoration: none; font-weight: 600; 
                              transition: all 0.3s ease; display: inline-block;">
                        🚗 Ver Ruta Completa
                    </a>
                    <div style="margin-top: 12px; font-size: 12px; color: #888;">
                        Se abre en Google Maps con navegación
                    </div>
                </div>
            </div>
        `;
        
    } catch (error) {
        mapElement.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; background: #f8f9fa; border-radius: 8px;">
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
        restaurant: '🍽️',
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
    
    // Add all important locations from real itinerary
    const allLocations = [
        { name: 'Hotel Occidental Menorca', coords: [39.8638, 4.2531], type: 'hotel' },
        { name: 'Playa de Punta Prima', coords: [39.8632, 4.2542], type: 'beach' },
        { name: 'Cala Macarella', coords: [39.9435, 3.9342], type: 'beach' },
        { name: 'Cala Macarelleta', coords: [39.9428, 3.9351], type: 'beach' },
        { name: 'Cala Pregonda', coords: [40.0842, 4.1478], type: 'beach' },
        { name: 'Fornells', coords: [40.0586, 4.1378], type: 'village' },
        { name: 'Ciutadella', coords: [40.0003, 3.8385], type: 'city' },
        { name: 'Binibeca Vell', coords: [39.8897, 4.2156], type: 'village' },
        { name: 'Mahón Centro', coords: [39.8883, 4.2659], type: 'city' },
        { name: 'Cova d\'en Xoroi', coords: [39.9234, 4.0612], type: 'poi' },
        { name: 'Aeropuerto Menorca', coords: [39.8625, 4.2189], type: 'airport' }
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
