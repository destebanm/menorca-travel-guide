# Menorca Travel Itinerary Website

Una guía interactiva de viaje de 8 días por Menorca con itinerarios detallados, alternativas para días de lluvia y consejos prácticos.

## 🏝️ Características

- **Itinerario de 8 días** con actividades detalladas para cada día
- **Interfaz interactiva** con tarjetas expansibles por día
- **Alternativas para mal tiempo** incluidas en cada día
- **Diseño responsivo** optimizado para móvil y escritorio
- **Navegación accesible** con soporte para teclado
- **Preferencias guardadas** en localStorage
- **Animaciones suaves** y transiciones elegantes

## 🚀 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva
- **GitHub Pages** - Despliegue automático

## 📋 Estructura del Proyecto

```
menorca/
├── index.html          # Página principal con el itinerario
├── styles.css          # Estilos responsivos y animaciones
├── script.js           # Funcionalidad interactiva
├── .github/
│   └── workflows/
│       └── deploy.yml  # Configuración de GitHub Actions
└── README.md           # Documentación del proyecto
```

## 🌟 Funcionalidades Interactivas

### Navegación por Días
- **Clic/Tap**: Expandir/contraer contenido de cada día
- **Teclado**: Usar `Espacio` o `Enter` para expandir
- **Flechas**: Navegar entre días con ↑ ↓

### Controles Globales
- **Expandir Todo**: Abrir todas las tarjetas de días
- **Contraer Todo**: Cerrar todas las tarjetas
- **Scroll to Top**: Botón flotante para volver arriba

### Persistencia
- Las preferencias de expansión se guardan en localStorage
- Se mantienen durante 24 horas para una experiencia fluida

## 🎨 Diseño

### Paleta de Colores
- **Primario**: `#4a9b8e` (Verde mar mediterráneo)
- **Secundario**: `#2c6e49` (Verde bosque)
- **Acento**: `#f4f7f5` (Blanco roto)

### Tipografía
- **Principal**: Poppins (Google Fonts)
- **Fallback**: Sans-serif system fonts

### Responsive Design
- **Móvil**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚢 Despliegue

### GitHub Pages
El sitio se despliega automáticamente via GitHub Actions cuando se hace push a `main`:

1. **Push a main** → Dispara el workflow
2. **GitHub Actions** → Procesa los archivos
3. **GitHub Pages** → Sitio disponible en la URL

### Configuración Local
```bash
# Clonar el repositorio
git clone [tu-repo-url]
cd menorca

# Abrir en un servidor local (opcional)
python -m http.server 8000
# o
npx serve .
```

## 📍 Itinerario Incluido

### Día 1: Llegada a Mahón
- Exploración del puerto y centro histórico
- Cena en restaurante tradicional

### Día 2: Ciudadela y Cala Turqueta
- Ciudad medieval de Ciudadela
- Playa paradisíaca de Cala Turqueta

### Día 3: Camí de Cavalls Norte
- Senderismo por el sendero costero
- Calas vírgenes del norte

### Día 4: Fornells y Actividades Acuáticas
- Pueblo pesquero de Fornells
- Kayak, windsurf o navegación

### Día 5: Playas del Sur
- Cala Macarella y Macarelleta
- Son Saura y otras calas

### Día 6: Cultura y Tradición
- Naveta des Tudons (prehistoria)
- Pueblos del interior (Es Mercadal, Ferreries)

### Día 7: Relax y Compras
- Día libre para relax
- Compras de souvenirs y productos locales

### Día 8: Mahón y Despedida
- Últimas compras
- Traslado al aeropuerto

## 🌧️ Alternativas para Días de Lluvia

Cada día incluye opciones cubiertas:
- Museos y centros culturales
- Bodegas y queserías
- Centros comerciales y mercados
- Actividades gastronómicas

## 🛠️ Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contacto

Si tienes preguntas o sugerencias sobre el itinerario, no dudes en abrir un issue en el repositorio.

---

¡Disfruta tu viaje a Menorca! 🏖️✨
