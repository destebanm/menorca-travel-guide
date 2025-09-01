// Menorca Travel Itinerary - Enhanced Interactive Features
let map;
let currentDay = 1;
let weatherData = {};
let offlineMode = false;

// API Keys (usar variables de entorno en producción)
const WEATHER_API_KEY = '30d71f1efc934b78b45154509242409'; // API gratuita de WeatherAPI

// Coordinates for Menorca locations
const locations = {
    menorca: [39.9624, 4.0685],
    mahon: [39.8885, 4.2659],
    ciutadella: [40.0015, 3.8407],
    calaTurqueta: [39.9381, 3.9517],
    calaGaldana: [39.9347, 4.0422],
    fornells: [40.0581, 4.1333],
    pontDenGil: [39.8664, 4.2167],
    calaMacarella: [39.9464, 3.9544],
    monteToro: [39.9883, 4.1167],
    hotel: [39.8664, 4.2167], // Hotel Occidental Menorca location
};

// Daily routes with coordinates
const dailyRoutes = {
    1: [
        { name: 'Hotel Occidental Menorca', coords: locations.hotel, time: '9:00', activity: 'Check-in y llegada' },
        { name: 'Playa de Punta Prima', coords: [39.8664, 4.2167], time: '10:00', activity: 'Primera playa del viaje' },
        { name: 'Binibèquer Vell', coords: [39.8591, 4.2119], time: '17:00', activity: 'Pueblo pintoresco' }
    ],
    2: [
        { name: 'Hotel', coords: locations.hotel, time: '9:00', activity: 'Salida' },
        { name: 'Cala Galdana', coords: locations.calaGaldana, time: '9:45', activity: 'Base para Macarella' },
        { name: 'Cala Macarella', coords: locations.calaMacarella, time: '10:00', activity: 'Playa paradisíaca' },
        { name: 'Ciutadella', coords: locations.ciutadella, time: '14:00', activity: 'Ciudad medieval' }
    ],
    3: [
        { name: 'Cala Cavalleria', coords: [40.0542, 4.0833], time: '10:00', activity: 'Norte salvaje' },
        { name: 'Fornells', coords: locations.fornells, time: '14:00', activity: 'Pueblo pesquero' },
        { name: 'Monte Toro', coords: locations.monteToro, time: '17:00', activity: 'Vistas 360°' }
    ],
    4: [
        { name: 'Puerto de Mahón', coords: locations.mahon, time: '9:20', activity: 'Centro histórico' },
        { name: 'Playa de Binidalí', coords: [39.8833, 4.2833], time: '16:00', activity: 'Cala tranquila' }
    ],
    5: [
        { name: 'Cala en Turqueta', coords: locations.calaTurqueta, time: '10:00', activity: 'Cala virgen' },
        { name: 'Cala en Bosch', coords: [39.9833, 3.8167], time: '13:30', activity: 'Playa familiar' }
    ],
    6: [
        { name: 'Naveta des Tudons', coords: [40.0167, 3.8833], time: '10:00', activity: 'Prehistoria' },
        { name: 'Es Mercadal', coords: [39.9917, 4.0917], time: '12:00', activity: 'Pueblo interior' },
        { name: 'Ferreries', coords: [39.9758, 3.9986], time: '14:00', activity: 'Tradición rural' }
    ],
    7: [
        { name: 'Son Bou', coords: [39.9167, 4.0667], time: '10:00', activity: 'Playa más larga' },
        { name: 'Alaior', coords: [39.9333, 4.1333], time: '16:00', activity: 'Compras locales' }
    ],
    8: [
        { name: 'Mahón Centro', coords: locations.mahon, time: '10:00', activity: 'Últimas compras' },
        { name: 'Aeropuerto', coords: [39.8625, 4.2186], time: '19:00', activity: 'Despedida' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced features
    initializeWeather();
    initializeItinerary();
    addKeyboardNavigation();
    addSmoothScrolling();
    setupOfflineMode();
    
    // Add offline indicator
    createOfflineIndicator();
    
    // Load saved notes
    loadSavedNotes();
});

/**
 * Initialize weather functionality
 */
async function initializeWeather() {
    await updateCurrentWeather();
    updateDailyWeather();
    
    // Update weather every 30 minutes
    setInterval(updateCurrentWeather, 30 * 60 * 1000);
}

/**
 * Update current weather
 */
async function updateCurrentWeather() {
    if (offlineMode) {
        showOfflineWeather();
        return;
    }
    
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Menorca,Spain&aqi=no`
        );
        
        if (!response.ok) throw new Error('Weather API error');
        
        const data = await response.json();
        updateWeatherDisplay(data);
        
        // Cache for offline mode
        localStorage.setItem('cachedWeather', JSON.stringify({
            data: data,
            timestamp: Date.now()
        }));
        
    } catch (error) {
        console.log('Weather API not available, using cached data');
        showCachedWeather();
    }
}

/**
 * Update weather display
 */
function updateWeatherDisplay(data) {
    const tempElement = document.querySelector('.temperature');
    const descElement = document.querySelector('.weather-desc');
    const iconElement = document.querySelector('.weather-icon');
    
    if (tempElement) tempElement.textContent = `${Math.round(data.current.temp_c)}°C`;
    if (descElement) descElement.textContent = data.current.condition.text;
    
    // Update weather icon based on conditions
    if (iconElement) {
        const condition = data.current.condition.text.toLowerCase();
        if (condition.includes('sun') || condition.includes('clear')) {
            iconElement.className = 'fas fa-sun weather-icon';
        } else if (condition.includes('cloud')) {
            iconElement.className = 'fas fa-cloud weather-icon';
        } else if (condition.includes('rain')) {
            iconElement.className = 'fas fa-cloud-rain weather-icon';
        } else {
            iconElement.className = 'fas fa-cloud-sun weather-icon';
        }
    }
}

/**
 * Show cached weather when offline
 */
function showCachedWeather() {
    const cached = localStorage.getItem('cachedWeather');
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        
        // Use cached data if less than 2 hours old
        if (Date.now() - timestamp < 2 * 60 * 60 * 1000) {
            updateWeatherDisplay(data);
            return;
        }
    }
    
    showOfflineWeather();
}

/**
 * Show offline weather placeholder
 */
function showOfflineWeather() {
    const tempElement = document.querySelector('.temperature');
    const descElement = document.querySelector('.weather-desc');
    
    if (tempElement) tempElement.textContent = 'Sin conexión';
    if (descElement) descElement.textContent = 'Datos no disponibles';
}

/**
 * Update daily weather for each day card
 */
function updateDailyWeather() {
    // Simulate daily temperatures (in production, use forecast API)
    const dailyTemps = [25, 27, 24, 26, 28, 23, 25, 26];
    
    document.querySelectorAll('.day-weather').forEach((element, index) => {
        const tempSpan = element.querySelector('.day-temp');
        if (tempSpan) {
            tempSpan.textContent = `${dailyTemps[index] || 25}°`;
        }
    });
}

/**
 * Enhanced itinerary initialization
 */
function initializeItinerary() {
    const dayCards = document.querySelectorAll('.day-card');
    dayCards.forEach((card, index) => {
        card.setAttribute('data-day', index + 1);
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        const header = card.querySelector('.day-header h2');
        if (header) {
            card.setAttribute('aria-label', `Día ${index + 1}: ${header.textContent}`);
        }
    });
    
    addToggleAllButtons();
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
    
    saveUserPreferences();
}

/**
 * Show main map modal
 */
function showMap() {
    const modal = document.getElementById('mapModal');
    modal.style.display = 'block';
    
    setTimeout(() => {
        initializeMap();
        showDayRoute(currentDay);
    }, 100);
}

/**
 * Initialize Leaflet map
 */
function initializeMap() {
    if (map) {
        map.remove();
    }
    
    map = L.map('map').setView(locations.menorca, 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add all locations as markers
    Object.entries(locations).forEach(([name, coords]) => {
        if (name !== 'menorca') {
            L.marker(coords)
                .addTo(map)
                .bindPopup(name.charAt(0).toUpperCase() + name.slice(1));
        }
    });
}

/**
 * Show specific day route on map
 */
function showDayRoute(day) {
    if (!map) return;
    
    currentDay = day;
    
    // Update active day button
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-day') == day) {
            btn.classList.add('active');
        }
    });
    
    // Clear existing route
    map.eachLayer(layer => {
        if (layer instanceof L.Polyline || (layer instanceof L.Marker && layer.options.dayRoute)) {
            map.removeLayer(layer);
        }
    });
    
    const dayRoute = dailyRoutes[day];
    if (!dayRoute) return;
    
    // Add route markers
    const routeCoords = [];
    dayRoute.forEach((stop, index) => {
        const marker = L.marker(stop.coords, { dayRoute: true })
            .addTo(map)
            .bindPopup(`
                <strong>${stop.name}</strong><br>
                <i class="fas fa-clock"></i> ${stop.time}<br>
                <i class="fas fa-info-circle"></i> ${stop.activity}
            `);
        
        routeCoords.push(stop.coords);
    });
    
    // Draw route line
    if (routeCoords.length > 1) {
        L.polyline(routeCoords, {
            color: '#4a9b8e',
            weight: 4,
            opacity: 0.8
        }).addTo(map);
    }
    
    // Fit map to route
    if (routeCoords.length > 0) {
        map.fitBounds(routeCoords, { padding: [20, 20] });
    }
}

/**
 * Show day-specific map
 */
function showDayMap(day) {
    showMap();
    setTimeout(() => showDayRoute(day), 200);
}

/**
 * Show weather forecast modal
 */
async function showWeatherForecast() {
    const modal = document.getElementById('weatherModal');
    const forecastContainer = document.getElementById('weatherForecast');
    
    modal.style.display = 'block';
    forecastContainer.innerHTML = '<div class="loading">Cargando previsión...</div>';
    
    if (offlineMode) {
        forecastContainer.innerHTML = `
            <div class="forecast-day">
                <div class="forecast-date">Modo offline</div>
                <div class="forecast-weather">
                    <i class="fas fa-wifi-slash"></i>
                    <span>Datos no disponibles sin conexión</span>
                </div>
            </div>
        `;
        return;
    }
    
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Menorca,Spain&days=7`
        );
        
        if (!response.ok) throw new Error('Forecast API error');
        
        const data = await response.json();
        displayWeatherForecast(data.forecast.forecastday);
        
    } catch (error) {
        forecastContainer.innerHTML = `
            <div class="forecast-day">
                <div class="forecast-date">Error</div>
                <div class="forecast-weather">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>No se pudo cargar la previsión</span>
                </div>
            </div>
        `;
    }
}

/**
 * Display weather forecast
 */
function displayWeatherForecast(forecastDays) {
    const forecastContainer = document.getElementById('weatherForecast');
    
    const forecastHTML = forecastDays.map(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });
        
        return `
            <div class="forecast-day">
                <div class="forecast-date">${dayName}</div>
                <div class="forecast-weather">
                    <i class="fas fa-thermometer-half"></i>
                    <span class="forecast-temp">${Math.round(day.day.maxtemp_c)}°/${Math.round(day.day.mintemp_c)}°</span>
                    <span>${day.day.condition.text}</span>
                </div>
            </div>
        `;
    }).join('');
    
    forecastContainer.innerHTML = forecastHTML;
}

/**
 * Toggle offline mode
 */
function toggleOfflineMode() {
    offlineMode = !offlineMode;
    
    const indicator = document.querySelector('.offline-indicator');
    const btn = document.querySelector('.nav-btn[onclick="toggleOfflineMode()"]');
    
    if (offlineMode) {
        indicator.classList.add('show');
        indicator.classList.remove('online');
        indicator.innerHTML = '<i class="fas fa-wifi-slash"></i> Modo offline activo';
        btn.innerHTML = '<i class="fas fa-wifi-slash"></i> Online';
    } else {
        indicator.classList.remove('show');
        btn.innerHTML = '<i class="fas fa-wifi"></i> Offline';
        updateCurrentWeather();
    }
    
    localStorage.setItem('offlineMode', offlineMode);
}

/**
 * Setup offline mode functionality
 */
function setupOfflineMode() {
    // Check if previously set to offline
    const savedOfflineMode = localStorage.getItem('offlineMode') === 'true';
    if (savedOfflineMode) {
        toggleOfflineMode();
    }
    
    // Monitor network status
    window.addEventListener('online', () => {
        if (!offlineMode) {
            const indicator = document.querySelector('.offline-indicator');
            indicator.classList.add('show', 'online');
            indicator.innerHTML = '<i class="fas fa-wifi"></i> Conexión restaurada';
            setTimeout(() => indicator.classList.remove('show'), 3000);
            updateCurrentWeather();
        }
    });
    
    window.addEventListener('offline', () => {
        if (!offlineMode) {
            const indicator = document.querySelector('.offline-indicator');
            indicator.classList.add('show');
            indicator.classList.remove('online');
            indicator.innerHTML = '<i class="fas fa-wifi-slash"></i> Sin conexión a internet';
        }
    });
}

/**
 * Create offline indicator
 */
function createOfflineIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    document.body.appendChild(indicator);
}

/**
 * Add notes functionality
 */
function addNotes(day) {
    const modal = document.getElementById('notesModal');
    const textarea = document.getElementById('dayNotes');
    
    // Load existing notes for this day
    const savedNotes = localStorage.getItem(`dayNotes_${day}`) || '';
    textarea.value = savedNotes;
    textarea.setAttribute('data-day', day);
    
    modal.style.display = 'block';
    textarea.focus();
}

/**
 * Save notes
 */
function saveNotes() {
    const textarea = document.getElementById('dayNotes');
    const day = textarea.getAttribute('data-day');
    const notes = textarea.value;
    
    localStorage.setItem(`dayNotes_${day}`, notes);
    closeModal('notesModal');
    
    // Show success feedback
    showToast('Notas guardadas correctamente');
}

/**
 * Load saved notes indicators
 */
function loadSavedNotes() {
    for (let day = 1; day <= 8; day++) {
        const notes = localStorage.getItem(`dayNotes_${day}`);
        if (notes && notes.trim()) {
            const dayCard = document.querySelector(`[data-day="${day}"]`);
            if (dayCard) {
                const notesBtn = dayCard.querySelector('.control-btn[onclick*="addNotes"]');
                if (notesBtn) {
                    notesBtn.innerHTML = '<i class="fas fa-sticky-note" style="color: #ffd700;"></i> Notas';
                    notesBtn.setAttribute('title', 'Ver/editar notas guardadas');
                }
            }
        }
    }
}

/**
 * Share day functionality
 */
function shareDay(day) {
    const dayCard = document.querySelector(`[data-day="${day}"]`);
    const dayTitle = dayCard.querySelector('h2').textContent;
    
    const shareData = {
        title: `Menorca Travel Guide - ${dayTitle}`,
        text: `Mira este día del itinerario de Menorca: ${dayTitle}`,
        url: `${window.location.href}#day${day}`
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback: copy to clipboard
        const url = `${window.location.href}#day${day}`;
        navigator.clipboard.writeText(url).then(() => {
            showToast('Enlace copiado al portapapeles');
        });
    }
}

/**
 * Close modal
 */
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Enhanced keyboard navigation
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
            
            // Quick shortcuts
            if (e.key === 'm' || e.key === 'M') {
                e.preventDefault();
                const day = e.target.getAttribute('data-day');
                showDayMap(parseInt(day));
            }
        }
        
        // Global shortcuts
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'm') {
                e.preventDefault();
                showMap();
            }
            if (e.key === 'w') {
                e.preventDefault();
                showWeatherForecast();
            }
        }
        
        // Close modals with Escape
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
}

/**
 * Navigate between cards
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
 * Enhanced toggle all functionality
 */
function addToggleAllButtons() {
    const header = document.querySelector('.header-content');
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
 * Create styled button
 */
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = clickHandler;
    button.className = 'nav-btn';
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
 * Enhanced smooth scrolling
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
    
    return button;
}

/**
 * Save user preferences
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
 * Load user preferences
 */
function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('menorcaItineraryPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            
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

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Export functions for global access
window.toggleContent = toggleContent;
window.showMap = showMap;
window.showDayRoute = showDayRoute;
window.showDayMap = showDayMap;
window.showWeatherForecast = showWeatherForecast;
window.toggleOfflineMode = toggleOfflineMode;
window.addNotes = addNotes;
window.saveNotes = saveNotes;
window.shareDay = shareDay;
window.closeModal = closeModal;
