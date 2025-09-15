/**
 * Taller de Filosofía en Contexto de Encierro
 * Scripts principales
 */

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });

    // Manejar el menú responsive
    setupMobileMenu();

    // Inicializar los filtros de la galería
    setupGalleryFilters();

    // Inicializar el slider de testimonios
    setupTestimonialSlider();

    // Manejar header sticky con efecto de reducción al scroll
    setupStickyHeader();
});

/**
 * Configura el menú móvil para dispositivos pequeños
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    if (!menuToggle || !mainMenu) return;
    
    menuToggle.addEventListener('click', function() {
        // Alternar la clase active en el menú
        mainMenu.classList.toggle('active');
        
        // Animar las barras del botón hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        
        if (mainMenu.classList.contains('active')) {
            // Transformar a X
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            // Restaurar a hamburguesa
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace (para navegación de una página)
    const menuLinks = mainMenu.querySelectorAll('a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.click(); // Simular clic en el botón para cerrar el menú
            }
        });
    });
}

/**
 * Configura los filtros para la galería multimedia
 */
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase active al botón actual
            this.classList.add('active');
            
            // Obtener el valor del filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Mostrar u ocultar elementos según el filtro
            galleryItems.forEach(item => {
                if (filterValue === 'todos') {
                    // Mostrar todos los elementos con animación suave
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else if (item.classList.contains(filterValue)) {
                    // Mostrar elementos que coincidan con el filtro
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Ocultar elementos que no coincidan con el filtro
                    item.style.opacity = 0;
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Activar el primer filtro por defecto
    filterButtons[0].click();
}

/**
 * Configura el slider de testimonios con navegación por puntos
 */
function setupTestimonialSlider() {
    const testimonioItems = document.querySelectorAll('.testimonio-item');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonioItems.length === 0 || dots.length === 0) return;
    
    // Variable para almacenar el índice actual
    let currentIndex = 0;
    
    // Función para mostrar un testimonio específico
    function showTestimonio(index) {
        // Ocultar todos los testimonios
        testimonioItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Desactivar todos los puntos
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el testimonio correspondiente al índice
        testimonioItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Actualizar el índice actual
        currentIndex = index;
    }
    
    // Configurar clic en los puntos de navegación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonio(index);
        });
    });
    
    // Cambio automático cada 5 segundos
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonioItems.length;
        showTestimonio(nextIndex);
    }, 5000);
    
    // Mostrar el primer testimonio por defecto
    showTestimonio(0);
}

/**
 * Configura el header sticky con efecto de reducción al hacer scroll
 */
function setupStickyHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    // Función para ajustar el header basado en la posición de scroll
    function adjustHeader() {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Listener para el evento de scroll
    window.addEventListener('scroll', adjustHeader);
    
    // Llamada inicial para configurar correctamente el header
    adjustHeader();
}

/**
 * Efecto de parallax para la sección hero
 */
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Efecto parallax suave
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
});