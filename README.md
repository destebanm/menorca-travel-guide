# 🏝️ Menorca Travel Guide - Itinerario Interactivo Mejorado

Una guía completa e interactiva de 8 días por Menorca con **mapas en tiempo real**, **información meteorológica actualizada** y **experiencia de usuario optimizada** para el viaje perfecto.

## ✨ Nuevas Características Destacadas

### 🗺️ **Mapas Interactivos**
- **Mapa general** con todos los puntos de interés
- **Rutas diarias** con trayectos optimizados
- **Marcadores interactivos** con información detallada
- **Visualización de distancias** y tiempos de viaje

### 🌤️ **Tiempo Real**
- **Clima actual** de Menorca actualizado cada 30 minutos
- **Previsión extendida** de 7 días
- **Información por día** en cada tarjeta del itinerario
- **Modo offline** con datos en caché

### 📱 **UX Optimizada para Viajeros**
- **Controles rápidos** en el header (Mapa, Tiempo, Offline)
- **Notas personales** por día con guardado automático
- **Compartir días** específicos del itinerario
- **Indicadores visuales** de contenido guardado
- **Navegación por teclado** mejorada
- **Modo offline** completo

## 🚀 Funcionalidades Principales

### 📋 **Itinerario Detallado**
- **8 días completos** con horarios optimizados
- **Ajuste del Día 1**: Siesta después de la comida por cansancio del viaje
- **Alternativas por clima** para cada día
- **Información de costes** y distancias
- **Resumen diario** con datos clave

### 🎯 **Interactividad Avanzada**
- **Tarjetas expandibles** con animaciones suaves
- **Mapas por día** con rutas específicas
- **Sistema de notas** personal
- **Compartir contenido** vía Web Share API
- **Preferencias guardadas** en localStorage

### 🌐 **Conectividad Inteligente**
- **API de tiempo real** (WeatherAPI)
- **Modo offline** con caché inteligente
- **Indicador de conexión** automático
- **Datos persistentes** sin conexión

## 🗺️ Mapas y Ubicaciones

### Coordenadas Principales
```javascript
Mahón: [39.8885, 4.2659]
Ciutadella: [40.0015, 3.8407]
Cala Turqueta: [39.9381, 3.9517]
Fornells: [40.0581, 4.1333]
Monte Toro: [39.9883, 4.1167]
```

### Rutas por Día
- **Día 1**: Hotel → Punta Prima → Binibèquer (25km)
- **Día 2**: Cala Galdana → Macarella → Ciutadella (45km)
- **Día 3**: Cavalleria → Fornells → Monte Toro (60km)
- **Día 4**: Mahón → Binidalí (15km)
- **Y más...**

## 🌤️ Información Meteorológica

### API Integration
- **Proveedor**: WeatherAPI (clave incluida)
- **Actualización**: Cada 30 minutos
- **Datos**: Temperatura, condiciones, previsión 7 días
- **Cache**: 2 horas para modo offline

### Funcionalidades Climáticas
- **Widget principal** en header
- **Temperatura por día** en tarjetas
- **Modal de previsión** extendida
- **Recomendaciones** según condiciones

## 📱 Mejoras de UX

### Navegación Intuitiva
```bash
Ctrl/Cmd + M  → Abrir mapa general
Ctrl/Cmd + W  → Mostrar previsión del tiempo
M (en tarjeta) → Mapa del día específico
Escape        → Cerrar modales
Espacio/Enter → Expandir/contraer día
```

### Controles por Día
- **🗺️ Mapa**: Ver ruta específica del día
- **📤 Compartir**: Enviar día via Web Share API
- **📝 Notas**: Añadir comentarios personales

### Indicadores Visuales
- **📝 Dorado**: Día con notas guardadas
- **🌡️ Temperatura**: Actualizada en tiempo real
- **🔌 Conexión**: Estado online/offline
- **✅ Guardado**: Confirmación de acciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** con estructura semántica mejorada
- **CSS3** con variables CSS y animaciones
- **JavaScript ES6+** con APIs modernas
- **Leaflet.js** para mapas interactivos
- **Font Awesome** para iconografía

### APIs Externas
- **WeatherAPI** para datos meteorológicos
- **OpenStreetMap** para mapas base
- **Web Share API** para compartir contenido
- **Geolocation API** para ubicación (futuro)

### Persistencia
- **localStorage** para preferencias y notas
- **Cache API** para modo offline
- **IndexedDB** para datos complejos (futuro)

## � Estructura Mejorada

```
menorca/
├── index.html          # Página principal mejorada
├── styles.css          # Estilos responsivos + nuevos componentes
├── script.js           # Funcionalidad completa + APIs
├── .github/
│   └── workflows/
│       └── deploy.yml  # Deploy automático
└── README.md           # Documentación completa
```

## 🚀 Instalación y Uso

### Desarrollo Local
```bash
# Clonar repositorio
git clone https://github.com/destebanm/menorca-travel-guide.git
cd menorca-travel-guide

# Servir localmente
python -m http.server 8000
# o
npx serve .

# Abrir en navegador
open http://localhost:8000
```

### GitHub Pages
**URL en vivo**: https://destebanm.github.io/menorca-travel-guide/

## 💡 Uso Durante el Viaje

### Preparación
1. **Visita la web** antes del viaje
2. **Explora los mapas** y rutas
3. **Añade notas personales** por día
4. **Activa modo offline** si necesario

### Durante el Viaje
1. **Consulta el tiempo** cada mañana
2. **Sigue la ruta** del día en el mapa
3. **Ajusta según clima** con alternativas
4. **Toma notas** de tus experiencias

### Características Móviles
- **Diseño responsive** optimizado para móvil
- **Touch gestures** para navegación
- **Botones grandes** para uso fácil
- **Carga rápida** con recursos optimizados

## 🔧 Configuración API

### WeatherAPI (Opcional)
Si quieres tu propia clave API:
```javascript
// En script.js, línea 8
const WEATHER_API_KEY = 'tu_clave_aqui';
```

### Registro gratuito en:
- [WeatherAPI.com](https://weatherapi.com) - 1M llamadas/mes gratis

## 🤝 Contribuciones

### Áreas de Mejora
- [ ] **Geolocalización** automática
- [ ] **Notificaciones push** para recordatorios
- [ ] **Integración con calendario**
- [ ] **Fotos de usuarios** en ubicaciones
- [ ] **Reseñas y ratings** de lugares

### Cómo Contribuir
1. Fork el proyecto
2. Crea rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Añadir funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre Pull Request

## 📄 Licencia

Proyecto bajo Licencia MIT - ver [LICENSE](LICENSE) para detalles.

## 🌟 Agradecimientos

- **OpenStreetMap** por los mapas base
- **WeatherAPI** por datos meteorológicos
- **Leaflet.js** por la biblioteca de mapas
- **Font Awesome** por los iconos

---

**¡Disfruta tu aventura en Menorca! 🏖️🗺️**

*Última actualización: Septiembre 2025*
