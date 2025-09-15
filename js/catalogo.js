const cursos = [
    {
        id: 1,
        titulo: "Fundamentos de HTML5 y CSS3",
        descripcion: "Aprende las bases del desarrollo web moderno con HTML5 y CSS3",
        duracion: "40 horas",
        modalidad: "Online",
        nivel: "Básico",
        etiquetas: ["HTML", "CSS", "Web"],
        imagen: "assets/img/htmlcss.jpg",
        precio: "$99",
        instructor: "Ana Torres",
        objetivos: [
            "Dominar la estructura semántica de HTML5",
            "Aplicar estilos avanzados con CSS3",
            "Crear layouts responsivos",
            "Implementar animaciones y transiciones"
        ],
        requisitos: ["Conocimientos básicos de computación", "Navegador web actualizado"],
        programa: [
            {
                modulo: "Módulo 1: Introducción a HTML5",
                contenido: ["Estructura básica", "Etiquetas semánticas", "Formularios avanzados"]
            },
            {
                modulo: "Módulo 2: CSS3 Fundamentals",
                contenido: ["Selectores avanzados", "Flexbox", "Grid Layout"]
            },
            {
                modulo: "Módulo 3: Responsive Design",
                contenido: ["Media queries", "Mobile first", "Frameworks CSS"]
            }
        ]
    },
    {
        id: 2,
        titulo: "JavaScript Moderno ES6+",
        descripcion: "Domina JavaScript moderno y sus últimas características",
        duracion: "60 horas",
        modalidad: "Presencial",
        nivel: "Intermedio",
        etiquetas: ["JavaScript", "ES6", "Programming"],
        imagen: "assets/img/java.jpg",
        precio: "$149",
        instructor: "Carlos Mendez",
        objetivos: [
            "Dominar ES6+ y sus características",
            "Programación asíncrona con async/await",
            "Manipulación del DOM",
            "Desarrollo de aplicaciones interactivas"
        ],
        requisitos: ["Conocimientos básicos de HTML y CSS", "Lógica de programación básica"],
        programa: [
            {
                modulo: "Módulo 1: ES6+ Features",
                contenido: ["Arrow functions", "Destructuring", "Template literals"]
            },
            {
                modulo: "Módulo 2: Programación Asíncrona",
                contenido: ["Promises", "Async/Await", "Fetch API"]
            },
            {
                modulo: "Módulo 3: DOM y Eventos",
                contenido: ["Manipulación del DOM", "Event handling", "Local Storage"]
            }
        ]
    },
    {
        id: 3,
        titulo: "React.js para Principiantes",
        descripcion: "Construye aplicaciones web modernas con React.js",
        duracion: "80 horas",
        modalidad: "Online",
        nivel: "Intermedio",
        etiquetas: ["React", "JavaScript", "Frontend"],
        imagen: "assets/img/react.jpg",
        precio: "$199",
        instructor: "María González",
        objetivos: [
            "Crear componentes reutilizables",
            "Manejar estado con hooks",
            "Routing con React Router",
            "Integración con APIs"
        ],
        requisitos: ["JavaScript intermedio", "Conocimientos de ES6+"],
        programa: [
            {
                modulo: "Módulo 1: Fundamentos de React",
                contenido: ["Componentes", "JSX", "Props y State"]
            },
            {
                modulo: "Módulo 2: Hooks y Estado",
                contenido: ["useState", "useEffect", "Custom hooks"]
            },
            {
                modulo: "Módulo 3: Aplicaciones Completas",
                contenido: ["React Router", "Context API", "Deployment"]
            }
        ]
    },
    {
        id: 4,
        titulo: "Diseño UX/UI con Figma",
        descripcion: "Aprende a diseñar interfaces de usuario atractivas y funcionales",
        duracion: "50 horas",
        modalidad: "Online",
        nivel: "Básico",
        etiquetas: ["UX", "UI", "Design", "Figma"],
        imagen: "assets/img/uxui.jpg",
        precio: "$129",
        instructor: "Laura Pérez",
        objetivos: [
            "Principios de diseño UX/UI",
            "Prototipado con Figma",
            "Design systems",
            "Usabilidad y accesibilidad"
        ],
        requisitos: ["Creatividad", "Conocimientos básicos de diseño"],
        programa: [
            {
                modulo: "Módulo 1: Fundamentos UX",
                contenido: ["Research", "User personas", "Journey mapping"]
            },
            {
                modulo: "Módulo 2: Diseño UI",
                contenido: ["Principios visuales", "Tipografía", "Color theory"]
            },
            {
                modulo: "Módulo 3: Herramientas",
                contenido: ["Figma avanzado", "Prototyping", "Handoff"]
            }
        ]
    },
    {
        id: 5,
        titulo: "Node.js y Express",
        descripcion: "Desarrollo backend con Node.js y Express framework",
        duracion: "70 horas",
        modalidad: "Presencial",
        nivel: "Avanzado",
        etiquetas: ["Node.js", "Express", "Backend", "JavaScript"],
        imagen: "assets/img/node.jpg",
        precio: "$179",
        instructor: "Roberto Silva",
        objetivos: [
            "Desarrollo de APIs REST",
            "Autenticación y autorización",
            "Base de datos con MongoDB",
            "Deployment y escalabilidad"
        ],
        requisitos: ["JavaScript avanzado", "Conocimientos de bases de datos"],
        programa: [
            {
                modulo: "Módulo 1: Node.js Fundamentals",
                contenido: ["Event loop", "Modules", "File system"]
            },
            {
                modulo: "Módulo 2: Express Framework",
                contenido: ["Routing", "Middleware", "Error handling"]
            },
            {
                modulo: "Módulo 3: APIs y Databases",
                contenido: ["REST APIs", "MongoDB", "Authentication"]
            }
        ]
    },
    {
        id: 6,
        titulo: "Python para Data Science",
        descripcion: "Análisis de datos y machine learning con Python",
        duracion: "90 horas",
        modalidad: "Online",
        nivel: "Intermedio",
        etiquetas: ["Python", "Data Science", "ML", "Analytics"],
        imagen: "assets/img/python.jpg",
        precio: "$249",
        instructor: "Dr. Elena Ruiz",
        objetivos: [
            "Análisis exploratorio de datos",
            "Visualización con matplotlib y seaborn",
            "Machine learning con scikit-learn",
            "Proyectos reales de data science"
        ],
        requisitos: ["Matemáticas básicas", "Lógica de programación"],
        programa: [
            {
                modulo: "Módulo 1: Python Basics",
                contenido: ["Sintaxis", "Pandas", "NumPy"]
            },
            {
                modulo: "Módulo 2: Data Analysis",
                contenido: ["EDA", "Data cleaning", "Statistics"]
            },
            {
                modulo: "Módulo 3: Machine Learning",
                contenido: ["Supervised learning", "Unsupervised learning", "Model evaluation"]
            }
        ]
    },
    {
        id: 7,
        titulo: "Vue.js 3 Composition API",
        descripcion: "Framework progresivo para aplicaciones web modernas",
        duracion: "65 horas",
        modalidad: "Online",
        nivel: "Intermedio",
        etiquetas: ["Vue.js", "JavaScript", "Frontend", "SPA"],
        imagen: "assets/img/vue.jpg",
        precio: "$169",
        instructor: "Diego Morales",
        objetivos: [
            "Composition API de Vue 3",
            "Gestión de estado con Pinia",
            "Vue Router para SPAs",
            "Testing con Vue Test Utils"
        ],
        requisitos: ["JavaScript ES6+", "Conceptos de SPA"],
        programa: [
            {
                modulo: "Módulo 1: Vue 3 Basics",
                contenido: ["Reactivity", "Components", "Directives"]
            },
            {
                modulo: "Módulo 2: Composition API",
                contenido: ["setup()", "Composables", "Lifecycle"]
            },
            {
                modulo: "Módulo 3: Ecosystem",
                contenido: ["Vue Router", "Pinia", "Testing"]
            }
        ]
    },
    {
        id: 8,
        titulo: "DevOps con Docker y Kubernetes",
        descripcion: "Containerización y orquestación para aplicaciones modernas",
        duracion: "85 horas",
        modalidad: "Presencial",
        nivel: "Avanzado",
        etiquetas: ["DevOps", "Docker", "Kubernetes", "Cloud"],
        imagen: "assets/img/devops.jpg",
        precio: "$299",
        instructor: "Ing. Patricia López",
        objetivos: [
            "Containerización con Docker",
            "Orquestación con Kubernetes",
            "CI/CD pipelines",
            "Monitoring y logging"
        ],
        requisitos: ["Linux básico", "Experiencia en desarrollo"],
        programa: [
            {
                modulo: "Módulo 1: Docker Fundamentals",
                contenido: ["Containers", "Images", "Docker Compose"]
            },
            {
                modulo: "Módulo 2: Kubernetes",
                contenido: ["Pods", "Services", "Deployments"]
            },
            {
                modulo: "Módulo 3: DevOps Practices",
                contenido: ["CI/CD", "Monitoring", "Security"]
            }
        ]
    },
    {
        id: 9,
        titulo: "Cybersecurity Fundamentals",
        descripcion: "Fundamentos de seguridad informática y ethical hacking",
        duracion: "75 horas",
        modalidad: "Online",
        nivel: "Intermedio",
        etiquetas: ["Security", "Hacking", "Network", "Pentesting"],
        imagen: "assets/img/cybersecurity.jpg",
        precio: "$219",
        instructor: "Hacker Ético Juan Vega",
        objetivos: [
            "Fundamentos de ciberseguridad",
            "Técnicas de pentesting",
            "Análisis de vulnerabilidades",
            "Incident response"
        ],
        requisitos: ["Redes básicas", "Sistemas operativos"],
        programa: [
            {
                modulo: "Módulo 1: Security Basics",
                contenido: ["CIA Triad", "Threat modeling", "Risk assessment"]
            },
            {
                modulo: "Módulo 2: Ethical Hacking",
                contenido: ["Reconnaissance", "Scanning", "Exploitation"]
            },
            {
                modulo: "Módulo 3: Defense",
                contenido: ["Incident response", "Forensics", "Compliance"]
            }
        ]
    },
    {
        id: 10,
        titulo: "Mobile App Development con Flutter",
        descripcion: "Desarrollo de aplicaciones móviles multiplataforma",
        duracion: "95 horas",
        modalidad: "Online",
        nivel: "Intermedio",
        etiquetas: ["Flutter", "Dart", "Mobile", "Cross-platform"],
        imagen: "assets/img/flutter.jpg",
        precio: "$259",
        instructor: "Mónica Herrera",
        objetivos: [
            "Desarrollo con Flutter y Dart",
            "UI/UX para móviles",
            "Integración con APIs",
            "Publicación en stores"
        ],
        requisitos: ["Programación orientada a objetos", "Conceptos de mobile"],
        programa: [
            {
                modulo: "Módulo 1: Flutter Basics",
                contenido: ["Dart language", "Widgets", "Layouts"]
            },
            {
                modulo: "Módulo 2: Advanced Features",
                contenido: ["State management", "Navigation", "Animations"]
            },
            {
                modulo: "Módulo 3: Production",
                contenido: ["Testing", "Performance", "Deployment"]
            }
        ]
    }
];

// Variables globales
let cursosActuales = [...cursos];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    try {
        console.log('Starting mostrarCursos');
        mostrarCursos(cursosActuales);
        console.log('mostrarCursos completed');

        console.log('Starting configurarFiltros');
        configurarFiltros();
        console.log('configurarFiltros completed');

        console.log('Starting configurarBusqueda');
        configurarBusqueda();
        console.log('configurarBusqueda completed');

        console.log('Starting actualizarContadorWishlist');
        actualizarContadorWishlist();
        console.log('actualizarContadorWishlist completed');

        const loading = document.querySelector('.loading');
        if (loading) {
            console.log('Hiding loading spinner');
            loading.style.display = 'none';
        } else {
            console.log('Loading spinner element not found');
        }

        const contador = document.getElementById('contador-resultados');
        if (contador) {
            contador.textContent = `${cursosActuales.length} curso(s) encontrado(s)`;
        }
    } catch (error) {
        console.error('Error al inicializar la página:', error);
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.style.display = 'none';
        }
        const contenedor = document.getElementById('cursos-container');
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle"></i>
                        Error al cargar los cursos. Por favor, recarga la página.
                    </div>
                </div>
            `;
        }
    }
});

function mostrarCursos(listaCursos) {
    const contenedor = document.getElementById('cursos-container');
    if (!contenedor) return;

    let html = '';

    if (listaCursos.length === 0) {
        html = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    No se encontraron cursos que coincidan con los filtros aplicados.
                </div>
            </div>
        `;
    } else {
        listaCursos.forEach(curso => {
            const estaEnWishlist = wishlist.some(item => item.id === curso.id);
            const cardHTML = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card course-card h-100">
                        <div class="position-relative">
                        <img src="${curso.imagen}" class="card-img-top" alt="${curso.titulo}"
                            onerror="this.src='https://via.placeholder.com/300x200?text=Placeholder'">
                            <span class="badge badge-level bg-${getNivelColor(curso.nivel)}">${curso.nivel}</span>
                            <span class="badge badge-modalidad bg-${getModalidadColor(curso.modalidad)}">${curso.modalidad}</span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${curso.titulo}</h5>
                            <p class="card-text text-muted">${curso.descripcion}</p>
                            <div class="mb-2">
                                ${curso.etiquetas.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                            </div>
                            <div class="course-info mb-3">
                                <small class="text-muted">
                                    <i class="fas fa-clock"></i> ${curso.duracion} |
                                    <i class="fas fa-user"></i> ${curso.instructor} |
                                    <i class="fas fa-dollar-sign"></i> ${curso.precio}
                                </small>
                            </div>
                            <div class="mt-auto">
                                <div class="d-grid gap-2">
                                    <a href="curso_detalle.html?id=${curso.id}" class="btn btn-primary">
                                        <i class="fas fa-eye"></i> Ver Detalle
                                    </a>
                                    <button class="btn wishlist-btn ${estaEnWishlist ? 'added' : ''}"
                                            onclick="toggleWishlist(${curso.id})">
                                        <i class="fas fa-heart"></i>
                                        ${estaEnWishlist ? 'En Wishlist' : 'Agregar a Wishlist'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            html += cardHTML;
        });
    }

    contenedor.innerHTML = html;
}

function getNivelColor(nivel) {
    switch(nivel.toLowerCase()) {
        case 'básico': return 'success';
        case 'intermedio': return 'warning';
        case 'avanzado': return 'danger';
        default: return 'secondary';
    }
}

function getModalidadColor(modalidad) {
    return modalidad.toLowerCase() === 'online' ? 'info' : 'dark';
}

function configurarFiltros() {
    const filtrosEtiquetas = document.querySelectorAll('.filter-btn');
    filtrosEtiquetas.forEach(btn => {
        btn.addEventListener('click', function() {
            const etiqueta = this.dataset.filter;
            
            this.classList.toggle('active');
            
            aplicarFiltros();
        });
    });
    
    const filtroNivel = document.getElementById('filtro-nivel');
    if (filtroNivel) {
        filtroNivel.addEventListener('change', aplicarFiltros);
    }
    
    const filtroModalidad = document.getElementById('filtro-modalidad');
    if (filtroModalidad) {
        filtroModalidad.addEventListener('change', aplicarFiltros);
    }
}

function configurarBusqueda() {
    const campoBusqueda = document.getElementById('busqueda');
    if (campoBusqueda) {
        campoBusqueda.addEventListener('input', function() {
            aplicarFiltros();
        });
    }
}

function aplicarFiltros() {
    let cursosFiltrados = [...cursos];
    
    const textoBusqueda = document.getElementById('busqueda')?.value.toLowerCase() || '';
    if (textoBusqueda) {
        cursosFiltrados = cursosFiltrados.filter(curso => 
            curso.titulo.toLowerCase().includes(textoBusqueda) ||
            curso.descripcion.toLowerCase().includes(textoBusqueda) ||
            curso.instructor.toLowerCase().includes(textoBusqueda)
        );
    }
    
    const etiquetasActivas = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.filter);
    
    if (etiquetasActivas.length > 0) {
        cursosFiltrados = cursosFiltrados.filter(curso => 
            etiquetasActivas.some(etiqueta => 
                curso.etiquetas.some(tag => tag.toLowerCase() === etiqueta.toLowerCase())
            )
        );
    }
    
    // Filtro por nivel
    const nivelSeleccionado = document.getElementById('filtro-nivel')?.value;
    if (nivelSeleccionado && nivelSeleccionado !== 'todos') {
        cursosFiltrados = cursosFiltrados.filter(curso => 
            curso.nivel.toLowerCase() === nivelSeleccionado.toLowerCase()
        );
    }
    
    // Filtro por modalidad
    const modalidadSeleccionada = document.getElementById('filtro-modalidad')?.value;
    if (modalidadSeleccionada && modalidadSeleccionada !== 'todas') {
        cursosFiltrados = cursosFiltrados.filter(curso => 
            curso.modalidad.toLowerCase() === modalidadSeleccionada.toLowerCase()
        );
    }
    
    cursosActuales = cursosFiltrados;
    mostrarCursos(cursosActuales);
    
    const contador = document.getElementById('contador-resultados');
    if (contador) {
        contador.textContent = `${cursosFiltrados.length} curso(s) encontrado(s)`;
    }
}

function limpiarFiltros() {
    const campoBusqueda = document.getElementById('busqueda');
    if (campoBusqueda) campoBusqueda.value = '';
    
    document.querySelectorAll('.filter-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const filtroNivel = document.getElementById('filtro-nivel');
    if (filtroNivel) filtroNivel.value = 'todos';
    
    const filtroModalidad = document.getElementById('filtro-modalidad');
    if (filtroModalidad) filtroModalidad.value = 'todas';
    
    cursosActuales = [...cursos];
    mostrarCursos(cursosActuales);
    
    const contador = document.getElementById('contador-resultados');
    if (contador) {
        contador.textContent = `${cursos.length} curso(s) encontrado(s)`;
    }
}

// Toggle wishlist
function toggleWishlist(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) return;
    
    const indiceExistente = wishlist.findIndex(item => item.id === cursoId);
    
    if (indiceExistente > -1) {
        wishlist.splice(indiceExistente, 1);
        mostrarNotificacion('Curso removido de la wishlist', 'info');
    } else {
        wishlist.push({
            id: curso.id,
            titulo: curso.titulo,
            descripcion: curso.descripcion,
            modalidad: curso.modalidad,
            precio: curso.precio,
            imagen: curso.imagen,
            fechaAgregado: new Date().toISOString()
        });
        mostrarNotificacion('Curso agregado a la wishlist', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Actualizar UI
    actualizarContadorWishlist();
    mostrarCursos(cursosActuales);
}

function actualizarContadorWishlist() {
    const contador = document.getElementById('wishlist-count');
    if (contador) {
        contador.textContent = wishlist.length;
        contador.style.display = wishlist.length > 0 ? 'inline' : 'none';
    }
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    notificacion.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notificacion.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notificacion);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 3000);
}

// Modificar o agregar esta función
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('curso_detalle.html')) {
        cargarDetalleCurso();
    }
});

function cargarDetalleCurso() {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');
    
    if (!cursoId) {
        mostrarError('No se especificó un curso');
        return;
    }

    const curso = cursos.find(c => c.id == cursoId);
    if (!curso) {
        mostrarError('Curso no encontrado');
        return;
    }

    // Actualizar la descripción
    document.getElementById('course-description').textContent = curso.descripcion;
    
    // Actualizar objetivos
    document.getElementById('course-objectives').innerHTML = curso.objetivos
        .map(objetivo => `<li><i class="fas fa-check text-success me-2"></i>${objetivo}</li>`)
        .join('');
    
    // Actualizar requisitos
    document.getElementById('course-requirements').innerHTML = curso.requisitos
        .map(requisito => `<li><i class="fas fa-circle text-primary me-2"></i>${requisito}</li>`)
        .join('');
    
    // Actualizar programa
    document.getElementById('course-program').innerHTML = curso.programa
        .map((modulo, index) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#modulo${index}">
                        ${modulo.modulo}
                    </button>
                </h2>
                <div id="modulo${index}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <ul class="list-unstyled">
                            ${modulo.contenido.map(tema => 
                                `<li><i class="fas fa-angle-right me-2"></i>${tema}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');

    // Mostrar la información general del curso
    document.getElementById('course-header').innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <h1 class="mb-3">${curso.titulo}</h1>
                <p class="lead">${curso.descripcion}</p>
                <div class="d-flex align-items-center mb-3">
                    <div class="me-4">
                        <h5 class="mb-0">Instructor</h5>
                        <p class="mb-0">${curso.instructor}</p>
                    </div>
                    <div class="me-4">
                        <h5 class="mb-0">Precio</h5>
                        <p class="mb-0">${curso.precio}</p>
                    </div>
                    <div>
                        <h5 class="mb-0">Duración</h5>
                        <p class="mb-0">${curso.duracion}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <span class="badge bg-primary me-2">${curso.modalidad}</span>
                    <span class="badge bg-secondary me-2">${curso.nivel}</span>
                    ${curso.etiquetas.map(tag => 
                        `<span class="badge bg-info me-2">${tag}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="col-md-4">
                <img src="${curso.imagen}" class="img-fluid rounded" alt="${curso.titulo}">
            </div>
        </div>
    `;

    const wishlistBtn = document.getElementById('wishlist-detail-btn');
    if (wishlistBtn) {
        const estaEnWishlist = wishlist.some(item => item.id === curso.id);
        actualizarBotonWishlist(wishlistBtn, estaEnWishlist);
        
        wishlistBtn.onclick = () => {
            toggleWishlist(curso.id);
            const estaEnWishlist = wishlist.some(item => item.id === curso.id);
            actualizarBotonWishlist(wishlistBtn, estaEnWishlist);
        };
    }

    document.getElementById('course-content').style.display = 'block';
    document.querySelector('.spinner-border')?.closest('.text-center')?.remove();
}

function actualizarBotonWishlist(boton, estaEnWishlist) {
    if (estaEnWishlist) {
        boton.classList.remove('btn-outline-warning');
        boton.classList.add('btn-warning');
        boton.innerHTML = '<i class="fas fa-heart"></i> En Wishlist';
    } else {
        boton.classList.add('btn-outline-warning');
        boton.classList.remove('btn-warning');
        boton.innerHTML = '<i class="fas fa-heart"></i> Agregar a Wishlist';
    }
}

// Exportar funciones para uso global
window.cursos = cursos;
window.toggleWishlist = toggleWishlist;
window.limpiarFiltros = limpiarFiltros;
window.mostrarNotificacion = mostrarNotificacion;