//Variable global de promociones 
let promociones = {};

// Cargar los datos del JSON
async function CargarPromociones() {
    try {
        const response = await fetch('promociones.json');
        promociones = await response.json();
        initializeApp();
    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
}

// Función para generar los íconos de Bootstrap Icons
function getIconElement(iconName) {
    const iconMap = {
        "camera": "bi-camera",
        "binoculars": "bi-binoculars",
        "train-front": "bi-train-front",
        "h-square": "bi-h-square",
        "bus-front": "bi-bus-front",
        "person": "bi-person",
        "airplane": "bi-airplane",
        "utensils": "bi-utensils",
        "ship": "bi-ship"
    };
    
    const iconClass = iconMap[iconName] || 'bi-question-circle';
    const title = promociones.iconTitles[iconName] || iconName;
    
    return `<i class="bi ${iconClass} mr-1" style="color:#004351" title="${title}"></i>`;
}

// Función para generar estrellas de dificultad
function generateDifficultyStars(difficulty) {
    let stars = '';
    const maxDifficulty = promociones.config?.maxDifficulty || 5;
    
    for (let i = 1; i <= maxDifficulty; i++) {
        if (i <= difficulty) {
            stars += '<i class="bi bi-circle-fill" style="color:#004351"></i>';
        } else {
            stars += '<i class="bi bi-circle text-gray-400"></i>';
        }
    }
    return `<span class="flex gap-1">${stars}</span>`;
}

// Función para generar estrellas de calificación
function generateRatingStars(rating) {
    let stars = '';
    const maxRating = promociones.config?.maxRating || 5;
    
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill text-[#e27e08]"></i>';
        } else {
            stars += '<i class="bi bi-star text-gray-400"></i>';
        }
    }
    return `<span class="flex gap-1">${stars}</span>`;
}

// Función para renderizar las cartas de un destino
function renderCards(destination) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Limpiar contenedor
    
    const tours = promociones.toursByDestination[destination] || [];
    const template = document.getElementById('card-template');
    
    tours.forEach(tour => {
        const card = template.content.cloneNode(true);
        
        // Llenar los datos de la carta
        card.querySelector('img').src = tour.image;
        card.querySelector('img').alt = tour.alt;
        
        if (tour.ribbon) {
            const ribbon = card.querySelector('.discount-badge');
            ribbon.textContent = tour.ribbon;
            ribbon.style.display = 'block';
        }
        
        card.querySelector('.days-badge').innerHTML = `<i class="bi bi-calendar-week-fill mr-1"></i> ${tour.days}`;
        card.querySelector('h5').textContent = tour.title;
        card.querySelector('.location-text').textContent = tour.location;
        card.querySelector('.description-text').textContent = tour.description;
        
        // Generar íconos de "Incluye"
        const includesContainer = card.querySelector('.includes-icons');
        includesContainer.innerHTML = tour.includes.map(icon => getIconElement(icon)).join('');
        
        // Dificultad
        card.querySelector('.difficulty-stars').innerHTML = generateDifficultyStars(tour.difficulty);
        
        // Calificación
        card.querySelector('.rating-stars').innerHTML = generateRatingStars(tour.rating);
        card.querySelector('.reviews-text').textContent = `(${tour.totalReviews} reseñas)`;
        
        // Precios
        card.querySelector('.price-value').textContent = `$${tour.price}`;
        card.querySelector('.old-price-value').textContent = `antes $${tour.oldPrice}`;
        
        container.appendChild(card);
    });
}

// Función para manejar el cambio de destino
function handleDestinationChange(destination) {
    // Actualizar el tab activo
    document.querySelectorAll('.destinos').forEach(el => {
        const parent = el.parentElement;
        if (el.dataset.destination === destination) {
            parent.classList.add('border-b-4', 'font-bold', 'text-[#004351]', 'border-[#e27e08]');
            parent.classList.remove('text-gray-700', 'hover:text-blue-600');
        } else {
            parent.classList.remove('border-b-4', 'font-bold', 'text-[#004351]', 'border-[#e27e08]');
            parent.classList.add('text-gray-700', 'hover:text-blue-600');
        }
    });
    
    // Renderizar las cartas del destino seleccionado
    renderCards(destination);
}

// Inicializar la aplicación
function initializeApp() {
    // Configurar event listeners para los tabs de destino
    document.querySelectorAll('.destinos').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.dataset.destination;
            handleDestinationChange(destination);
        });
    });
    
    // Renderizar el destino por defecto al cargar la página
    const defaultDestination = promociones.config?.defaultDestination || 'cusco';
    handleDestinationChange(defaultDestination);
}

// Iniciar la carga de datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', CargarPromociones);


// configuracion de cartas de camino inca 

// Variables globales
let caminoIncaData = {};

// Cargar los datos del JSON
async function CargaCaminoInca() {
    try {
        const response = await fetch('camino-inca.json');
        caminoIncaData = await response.json();
        renderCaminoIncaCards();
    } catch (error) {
        console.error('Error cargando los datos del Camino Inca:', error);
    }
}

// Función para generar los íconos de Bootstrap Icons
function getCaminoIncaIconElement(iconName) {
    const iconMap = {
        "camera": "bi-camera",
        "binoculars": "bi-binoculars",
        "train-front": "bi-train-front",
        "h-square": "bi-h-square",
        "bus-front": "bi-bus-front",
        "person": "bi-person",
        "utensils": "bi-utensils"
    };
    
    const iconClass = iconMap[iconName] || 'bi-question-circle';
    const title = caminoIncaData.iconTitles[iconName] || iconName;
    
    return `<i class="bi ${iconClass} mr-1" style="color:#004351" title="${title}"></i>`;
}

// Función para generar estrellas de dificultad
function generateCaminoIncaDifficultyStars(difficulty) {
    let stars = '';
    const maxDifficulty = caminoIncaData.config?.maxDifficulty || 5;
    
    for (let i = 1; i <= maxDifficulty; i++) {
        if (i <= difficulty) {
            stars += '<i class="bi bi-circle-fill" style="color:#004351"></i>';
        } else {
            stars += '<i class="bi bi-circle text-gray-400"></i>';
        }
    }
    return `<span class="flex gap-1">${stars}</span>`;
}

// Función para generar estrellas de calificación
function generateCaminoIncaRatingStars(rating) {
    let stars = '';
    const maxRating = caminoIncaData.config?.maxRating || 5;
    
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill text-[#e27e08]"></i>';
        } else {
            stars += '<i class="bi bi-star text-gray-400"></i>';
        }
    }
    return `<span class="flex gap-1">${stars}</span>`;
}

// Función para renderizar las cartas del Camino Inca
function renderCaminoIncaCards() {
    const container = document.getElementById('camino-inca-cards-container');
    container.innerHTML = ''; // Limpiar contenedor
    
    const tours = caminoIncaData.tours || [];
    const template = document.getElementById('camino-inca-card-template');
    
    tours.forEach(tour => {
        const card = template.content.cloneNode(true);
        
        // Llenar los datos de la carta
        card.querySelector('img').src = tour.image;
        card.querySelector('img').alt = tour.alt;
        
        if (tour.ribbon) {
            const ribbon = card.querySelector('.discount-badge');
            ribbon.textContent = tour.ribbon;
            ribbon.style.display = 'block';
        }
        
        card.querySelector('.days-badge').innerHTML = `<i class="bi bi-calendar-week-fill mr-1"></i> ${tour.duration}`;
        card.querySelector('h5').textContent = tour.title;
        card.querySelector('.location-text').textContent = tour.location;
        card.querySelector('.description-text').textContent = tour.description;
        
        // Generar íconos de "Incluye"
        const includesContainer = card.querySelector('.includes-icons');
        includesContainer.innerHTML = tour.includes.map(icon => getCaminoIncaIconElement(icon)).join('');
        
        // Dificultad
        card.querySelector('.difficulty-stars').innerHTML = generateCaminoIncaDifficultyStars(tour.difficulty);
        
        // Calificación
        card.querySelector('.rating-stars').innerHTML = generateCaminoIncaRatingStars(tour.rating);
        card.querySelector('.reviews-text').textContent = `(${tour.totalReviews} reseñas)`;
        
        // Precios
        card.querySelector('.price-value').textContent = `$${tour.price}`;
        card.querySelector('.old-price-value').textContent = `antes $${tour.oldPrice}`;
        
        container.appendChild(card);
    });
}

// Iniciar la carga de datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', CargaCaminoInca);


// configuracion de las cartas de salkantay

// Variables globales
let salkantay = {};

// Cargar los datos del JSON
async function cargaSalkantay() {
    try {
        const response = await fetch('salkantay.json');
        salkantay = await response.json();
        renderSalkantayCards();
    } catch (error) {
        console.error('Error cargando los datos del Salkantay:', error);
    }
}

// Función para renderizar las cartas del Salkantay
function renderSalkantayCards() {
    const container = document.getElementById('salkantay-cards-container');
    container.innerHTML = ''; // Limpiar contenedor
    
    const tours = salkantay.tours || [];
    const template = document.getElementById('salkantay-card-template');
    
    tours.forEach(tour => {
        const card = template.content.cloneNode(true);
        
        // Llenar los datos de la carta
        card.querySelector('img').src = tour.image;
        card.querySelector('img').alt = tour.alt;
        
        card.querySelector('h5').textContent = tour.title;
        card.querySelector('.salkantay-days-badge').innerHTML = `<i class="bi bi-calendar-week-fill salkantay-mr-1"></i> ${tour.days}`;
        
        // Precios
        card.querySelector('.salkantay-price-value').textContent = `$${tour.price}`;
        card.querySelector('.salkantay-old-price-value').textContent = `antes $${tour.oldPrice}`;
        
        // Datos por defecto del JSON
        if (salkantay.config) {
            const locationText = card.querySelector('.salkantay-text-sm.salkantay-mb-2');
            if (locationText) {
                const icon = locationText.querySelector('i');
                locationText.innerHTML = `${icon.outerHTML} ${salkantay.config.defaultLocation || 'Cusco - Machu Picchu'}`;
            }
            
            const descriptionText = card.querySelector('.salkantay-text-gray-600');
            if (descriptionText) {
                descriptionText.textContent = salkantay.config.defaultDescription || 'Explora el impresionante sendero Salkantay hasta llegar a Machu Picchu.';
            }
            
            const reviewsText = card.querySelector('.salkantay-text-gray-500');
            if (reviewsText) {
                reviewsText.textContent = `(${salkantay.config.defaultReviews || 20} reseñas)`;
            }
        }
        
        container.appendChild(card);
    });
}

// Iniciar la carga de datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargaSalkantay);

// Variables globales
let trenMachu = {};
let sliderMachu = 0;
let vistaCardsM = 3;
let isAnimating = false;

// Cargar los datos del JSON
async function cargaTrenMachu() {
    try {
        const response = await fetch('trenmachupicchu.json');
        trenMachu = await response.json();
        initCarousel();
    } catch (error) {
        console.error('Error cargando los datos de tours en tren:', error);
    }
}

// Inicializar el carrusel
function initCarousel() {
    renderTrainCards();
    setupCarouselControls();
    updateIndicators();
    
    // Configurar responsive
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Renderizar las tarjetas de tour
function renderTrainCards() {
    const container = document.getElementById('train-carousel');
    container.innerHTML = '';
    const template = document.getElementById('train-card-template');
    
    trenMachu.tours.forEach((tour, index) => {
        const card = template.content.cloneNode(true);
        
        // Llenar los datos de la tarjeta
        const img = card.querySelector('.tour-card-image');
        img.src = tour.image;
        img.alt = tour.alt;
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://placehold.co/400x288/CCCCCC/333333?text=Imagen+No+Disp.';
        };
        
        card.querySelector('.tour-location').textContent = tour.location;
        card.querySelector('.tour-title').textContent = tour.title;
        card.querySelector('.tour-pricem').textContent = `Desde US$${tour.price}`;
        card.querySelector('.tour-description').textContent = `Duración: ${tour.durationText}. ${tour.description}`;
        
        // Configurar evento de "Leer Más"
        const readMoreBtn = card.querySelector('.read-more-button');
        readMoreBtn.addEventListener('click', (e) => handleReadMore(e, index));
        
        container.appendChild(card);
    });
}

// Configurar controles del carrusel
function setupCarouselControls() {
    const prevBtn = document.querySelector('.carousel-button-prev');
    const nextBtn = document.querySelector('.carousel-button-next');
    
    prevBtn.addEventListener('click', () => {
        if (!isAnimating) slideTrainCarousel(-1);
    });
    nextBtn.addEventListener('click', () => {
        if (!isAnimating) slideTrainCarousel(1);
    });
}

// Mover el carrusel con transición suave
function slideTrainCarousel(direction) {
    if (isAnimating) return;
    
    isAnimating = true;
    const carousel = document.getElementById('train-carousel');
    const cardWidth = carousel.querySelector('.tour-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 16;
    
    // Calcular el nuevo slide
    const newSlide = sliderMachu + direction;
    const maxSlides = Math.ceil(trenMachu.tours.length / vistaCardsM) - 1;
    
    // Validar límites
    if (newSlide < 0 || newSlide > maxSlides) {
        isAnimating = false;
        return;
    }
    
    sliderMachu = newSlide;
    
    // Aplicar la animación
    carousel.style.scrollBehavior = 'smooth';
    carousel.scrollTo({
        left: sliderMachu * (cardWidth + gap) * vistaCardsM,
        behavior: 'smooth'
    });
    
    // Actualizar indicadores después de la animación
    setTimeout(() => {
        updateIndicators();
        carousel.style.scrollBehavior = 'auto';
        isAnimating = false;
    }, 500); // Tiempo que dura la animación (debe coincidir con CSS)
}

// Actualizar indicadores
function updateIndicators() {
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const maxSlides = Math.ceil(trenMachu.tours.length / vistaCardsM);
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < maxSlides; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator' + (i === sliderMachu ? ' active' : '');
        indicator.setAttribute('aria-label', `Ir a grupo ${i + 1}`);
        indicator.addEventListener('click', () => {
            if (!isAnimating) goToSlide(i);
        });
        indicatorsContainer.appendChild(indicator);
    }
}

// Ir a slide específico con animación
function goToSlide(slideIndex) {
    if (isAnimating) return;
    
    isAnimating = true;
    sliderMachu = slideIndex;
    const carousel = document.getElementById('train-carousel');
    const cardWidth = carousel.querySelector('.tour-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 16;
    
    carousel.style.scrollBehavior = 'smooth';
    carousel.scrollTo({
        left: sliderMachu * (cardWidth + gap) * vistaCardsM,
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        updateIndicators();
        carousel.style.scrollBehavior = 'auto';
        isAnimating = false;
    }, 500);
}

// Manejar evento "Leer Más"
function handleReadMore(event, index) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Ver más detalles del tour:', trenMachu.tours[index].title);
    // Aquí puedes implementar la lógica para mostrar más detalles
}

// Manejar redimensionamiento
function handleResize() {
    const isMobile = window.innerWidth < 768;
    vistaCardsM = isMobile ? trenMachu.config.vistaCardsMMobile : trenMachu.config.vistaCardsMDesktop;
    updateIndicators();
    updateCarousel();
}

// Actualizar carrusel (sin animación)
function updateCarousel() {
    const carousel = document.getElementById('train-carousel');
    const cardWidth = carousel.querySelector('.tour-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 16;
    
    carousel.scrollTo({
        left: sliderMachu * (cardWidth + gap) * vistaCardsM,
        behavior: 'auto'
    });
}

// Iniciar la carga de datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargaTrenMachu);

// Hacer funciones accesibles globalmente para los botones HTML
window.slideTrainCarousel = slideTrainCarousel;
window.goToSlide = goToSlide;
window.handleReadMore = handleReadMore;

// configuraciuon para un dia 

// Variables globales
let oneDayToursData = [];

// Cargar los datos del JSON
async function loadOneDayTours() {
    try {
        const response = await fetch('undia.json');
        oneDayToursData = await response.json();
        renderOneDayTourCards();
    } catch (error) {
        console.error('Error cargando los datos de tours de un día:', error);
    }
}

// Renderizar las tarjetas de tour
function renderOneDayTourCards() {
    const container = document.getElementById('one-day-tours-cards-container');
    container.innerHTML = '';
    const template = document.getElementById('one-day-tour-card-template');
    
    oneDayToursData.forEach(tour => {
        const card = template.content.cloneNode(true);
        
        // Llenar los datos de la tarjeta
        const img = card.querySelector('img');
        img.src = tour.image;
        img.alt = tour.alt;
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://placehold.co/400x288/CCCCCC/333333?text=Imagen+No+Disp.';
        };
        
        // Configurar atributos de accesibilidad
        card.querySelector('.one-day-tour-card-wrapper').setAttribute('aria-label', `Ver detalles del tour ${tour.title}`);
        
        // Llenar información del tour
        card.querySelector('.tour-title').textContent = tour.title;
        card.querySelector('.tour-description').textContent = tour.description;
        card.querySelector('.price-value').textContent = tour.price;
        card.querySelector('.tour-duration').textContent = tour.duration;
        card.querySelector('.tour-location').textContent = tour.location;
        
        // Configurar evento de "Ver Detalles"
        const detailsBtn = card.querySelector('button');
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showTourDetails(tour.id);
        });
        
        // Configurar evento de clic en toda la tarjeta
        const cardWrapper = card.querySelector('.one-day-tour-card-wrapper');
        cardWrapper.addEventListener('click', () => showTourDetails(tour.id));
        cardWrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showTourDetails(tour.id);
            }
        });
        
        container.appendChild(card);
    });
}

// Mostrar detalles del tour (simulado)
function showTourDetails(tourId) {
    const tour = oneDayToursData.find(t => t.id === tourId);
    console.log('Mostrando detalles del tour:', tour.title);
    // Aquí puedes implementar la lógica para mostrar un modal o redirigir a una página de detalles
}

// Iniciar la carga de datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadOneDayTours);


//configuracion para los paquetes

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Cargar datos del JSON
    const response = await fetch('peru-paquetes.json');
    if (!response.ok) throw new Error('Error al cargar los datos');
    
    const data = await response.json();
    
    // 2. Actualizar la sección
    updateSectionContent(data.section);
    
    // 3. Generar tarjetas
    renderTourCards(data.tours);
    
    // 4. Configurar eventos
    setupEventListeners();
    
  } catch (error) {
    console.error('Error:', error);
    showErrorUI();
  }
});

// Función para actualizar el contenido de la sección
function updateSectionContent(sectionData) {
  const titleElement = document.getElementById('section-title');
  const descElement = document.getElementById('section-description');
  
  if (titleElement) titleElement.textContent = sectionData.title;
  if (descElement) descElement.textContent = sectionData.description;
}

// Función para renderizar las tarjetas
function renderTourCards(tours) {
  const container = document.getElementById('tours-container');
  const template = document.getElementById('tour-card-template');
  
  if (!container || !template) return;
  
  container.innerHTML = ''; // Limpiar contenedor
  
  tours.forEach(tour => {
    const card = template.content.cloneNode(true);
    
    // Llenar datos
    const img = card.querySelector('.tour-image');
    if (img) {
      img.src = tour.image;
      img.alt = tour.alt || 'Imagen del tour';
      img.onerror = () => img.src = 'https://via.placeholder.com/400x225?text=Imagen+no+disponible';
    }
    
    setTextContent(card, '.tour-title', tour.title);
    setTextContent(card, '.tour-description', tour.description);
    setTextContent(card, '.price-value', tour.price);
    setTextContent(card, '.tour-duration', tour.duration);
    setTextContent(card, '.tour-location', tour.location);
    
    // Botón de detalles
    const detailsBtn = card.querySelector('.tour-details-btn');
    if (detailsBtn) {
      detailsBtn.addEventListener('click', () => showTourDetails(tour));
    }
    
    container.appendChild(card);
  });
}

// Función auxiliar para establecer contenido de texto
function setTextContent(parent, selector, text) {
  const element = parent.querySelector(selector);
  if (element) element.textContent = text;
}

// Función para mostrar detalles del tour
function showTourDetails(tour) {
  console.log('Mostrando detalles para:', tour.title);
  // Implementar lógica para modal o redirección
  // Ejemplo: window.location.href = `/tour-detalle?id=${tour.id}`;
}

// Función para configurar eventos
function setupEventListeners() {
  const seeMoreBtn = document.getElementById('see-more-btn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
      console.log('Ver más destinos...');
      // Implementar lógica adicional
    });
  }
}

// Función para mostrar error en UI
function showErrorUI() {
  const container = document.getElementById('tours-container');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-red-500 font-medium">No se pudieron cargar los paquetes. Por favor intente nuevamente más tarde.</p>
        <button class="mt-4 px-6 py-2 bg-[#004351] text-white rounded-lg hover:bg-[#003040] transition-colors" onclick="window.location.reload()">
          Reintentar
        </button>
      </div>
    `;
  }
}


// configuracion para amazonas

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Cargar datos del JSON
    const response = await fetch('amazonas.json');
    if (!response.ok) throw new Error('Error al cargar los tours');
    
    const toursData = await response.json();
    
    // Configurar descripción de la sección
    const sectionDescription = `La selva amazónica del Perú es una de las zonas con <strong class="amazona-highlight-orange">mayor diversidad biológica</strong> del planeta. 
      Es tan grande la variedad de especies entre flora y fauna que se estima que la mayor parte de ellas sigue sin ser descubierta. 
      La madre selva Amazónica aún cuida celosamente al hermoso jaguar que se puede ver en programas de 7 a más días, aves, lobos de ríos, anacondas, tortugas y más podrás ver en programas de 2, 3 o 4 días. 
      <strong class="amazona-highlight-blue">Elige el programa de tu preferencia</strong> y sumérgete en una experiencia inolvidable.`;
    
    document.getElementById('amazona-section-description').innerHTML = sectionDescription;
    
    // Renderizar tarjetas
    renderAmazonaCards(toursData);
    
    // Configurar eventos
    setupAmazonaEvents();
    
  } catch (error) {
    console.error('Error:', error);
    showAmazonaError();
  }
});

function renderAmazonaCards(tours) {
  const container = document.getElementById('amazona-cards-container');
  const template = document.getElementById('amazona-card-template');
  
  container.innerHTML = ''; // Limpiar contenedor
  
  tours.forEach((tour, index) => {
    const card = template.content.cloneNode(true);
    const cardElement = card.querySelector('.amazona-tour-card');
    
    // Configurar animación
    cardElement.style.animationDelay = `${index * 0.1}s`;
    
    // Llenar datos de la tarjeta
    const img = card.querySelector('.amazona-tour-card-image');
    img.src = tour.image;
    img.alt = tour.alt;
    img.onerror = () => img.src = 'https://placehold.co/400x350/CCCCCC/333333?text=Imagen+No+Disp.';
    
    card.querySelector('.amazona-tour-location').textContent = `Duración: ${tour.duration}`;
    card.querySelector('.amazona-tour-title').textContent = tour.title;
    card.querySelector('.amazona-tour-price').textContent = `Desde US$${tour.price}`;
    card.querySelector('.amazona-tour-long-description').textContent = tour.longDescription;
    
    // Configurar botón
    const detailsBtn = card.querySelector('.amazona-read-more-button');
    detailsBtn.addEventListener('click', (e) => handleReadMore(e, tour));
    
    container.appendChild(card);
  });
}

function setupAmazonaEvents() {
  // Botón "Explorar Más Destinos"
  document.getElementById('amazona-navigate-button').addEventListener('click', () => {
    console.log('Navegar a más destinos...');
    // Implementar lógica de navegación
  });
}

function handleReadMore(event, tour) {
  event.preventDefault();
  console.log('Ver detalles del tour:', tour.title);
  // Implementar lógica para mostrar detalles (modal, página, etc.)
}

function showAmazonaError() {
  const container = document.getElementById('amazona-cards-container');
  container.innerHTML = `
    <div class="col-span-full text-center py-12">
      <p class="text-red-500 font-medium">No se pudieron cargar los tours. Por favor intente nuevamente.</p>
      <button class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" 
              onclick="window.location.reload()">
        Reintentar
      </button>
    </div>
  `;
}


// configuracion para destinos peru 

// Variables globales
let destinos = [];

// Cargar datos desde JSON
async function cargarDestinos() {
    try {
        const respuesta = await fetch('./destinos.json');
        if (!respuesta.ok) throw new Error('Error al cargar destinos');
        destinos = await respuesta.json();
        renderizarDestinos();
    } catch (error) {
        console.error('Error:', error);
        mostrarError();
    }
}

// Renderizar tarjetas de destinos
function renderizarDestinos() {
    const contenedor = document.getElementById('destinos-container');
    if (!contenedor) return;

    // Obtener template y limpiar contenedor
    const template = contenedor.querySelector('.destino-template');
    contenedor.innerHTML = '';
    if (template) contenedor.appendChild(template);

    // Generar tarjetas para cada destino
    destinos.forEach(destino => {
        if (!template) return;

        const tarjeta = template.cloneNode(true);
        tarjeta.classList.remove('hidden', 'destino-template');
        
        // Llenar datos
        tarjeta.querySelector('.destino-img').src = destino.imagen;
        tarjeta.querySelector('.destino-img').alt = destino.alt;
        tarjeta.querySelector('.destino-titulo').textContent = destino.titulo;
        tarjeta.querySelector('.destino-descripcion').textContent = destino.descripcion;
        tarjeta.querySelector('.destino-precio').textContent = destino.precio;
        tarjeta.querySelector('.destino-duracion').textContent = destino.duracion;
        tarjeta.querySelector('.destino-ubicacion').textContent = destino.ubicacion;

        // Configurar eventos
        const btnDetalles = tarjeta.querySelector('.destino-btn-detalles');
        if (btnDetalles) {
            btnDetalles.addEventListener('click', (e) => {
                e.stopPropagation();
                mostrarDetalles(destino.id);
            });
        }

        // Configurar accesibilidad
        const cardWrapper = tarjeta.querySelector('.destino-card');
        if (cardWrapper) {
            cardWrapper.setAttribute('aria-label', `Ver detalles del tour ${destino.titulo}`);
            cardWrapper.addEventListener('click', () => mostrarDetalles(destino.id));
            cardWrapper.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    mostrarDetalles(destino.id);
                }
            });
        }

        // Manejar error en imagen
        const img = tarjeta.querySelector('.destino-img');
        if (img) {
            img.onerror = function() {
                this.onerror = null;
                this.src = 'https://placehold.co/400x225?text=Imagen+No+Disponible';
            };
        }

        contenedor.appendChild(tarjeta);
    });
}

// Mostrar detalles del destino
function mostrarDetalles(id) {
    const destino = destinos.find(d => d.id === id);
    if (destino) {
        console.log('Mostrando detalles para:', destino.titulo);
        // Aquí iría la lógica para mostrar un modal o redireccionar
    }
}

// Configurar eventos
function configurarEventos() {
    const btnVerMas = document.getElementById('btn-ver-mas');
    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            console.log('Cargando más destinos...');
            // Lógica para cargar más destinos
        });
    }
}

// Mostrar mensaje de error
function mostrarError() {
    const contenedor = document.getElementById('destinos-container');
    if (contenedor) {
        contenedor.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-500 font-medium">Error al cargar los destinos. Intente nuevamente.</p>
                <button class="mt-4 px-6 py-2 bg-[#004351] text-white rounded-lg hover:bg-[#003040] transition-colors" onclick="location.reload()">
                    Reintentar
                </button>
            </div>
        `;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarDestinos();
    configurarEventos();
});