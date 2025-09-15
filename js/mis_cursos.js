(function() {
    'use strict';
    let inscripciones = [];
    let wishlist = [];
    let graficoChart = null;
    
    if (window.misCursosModule) {
        console.log("Limpiando instancia anterior del módulo");
        window.misCursosModule = null;
    }
    
    // Inicialización
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Cargando página Mis Cursos...");
        
        cargarDatos();
        cargarInscripciones();
        crearGraficoInscripciones();
        actualizarEstadisticas();
        actualizarContadorWishlist();
        
        const filtroEstado = document.getElementById('filtro-estado');
        const buscarCurso = document.getElementById('buscar-curso');
        
        if (filtroEstado) {
            filtroEstado.addEventListener('change', cargarInscripciones);
        }
        
        if (buscarCurso) {
            buscarCurso.addEventListener('input', cargarInscripciones);
        }
        
        console.log("Inscripciones cargadas:", inscripciones.length);
    });
    
    // Cargar datos desde localStorage
    function cargarDatos() {
        // Verificar qué hay en localStorage
        console.log("=== DEBUG: Verificando localStorage ===");
        console.log("Keys disponibles:", Object.keys(localStorage));
        
        const posiblesKeys = [
            'inscripciones', 
            'cursos_inscritos', 
            'mis_cursos', 
            'registros',
            'user_courses',
            'coursesData'
        ];
        
        let datosEncontrados = null;
        let keyEncontrada = null;
        
        posiblesKeys.forEach(key => {
            const datos = localStorage.getItem(key);
            if (datos) {
                console.log(`Datos encontrados en '${key}':`, datos.substring(0, 100) + '...');
                try {
                    const parsed = JSON.parse(datos);
                    console.log(`Datos parseados de '${key}':`, parsed);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        datosEncontrados = parsed;
                        keyEncontrada = key;
                    }
                } catch (e) {
                    console.log(`Error parseando '${key}':`, e);
                }
            }
        });
        
        // Cargar inscripciones
        if (datosEncontrados) {
            inscripciones = datosEncontrados;
            console.log(`Inscripciones cargadas desde '${keyEncontrada}':`, inscripciones.length);
        } else {
            try {
                inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || [];
            } catch (e) {
                console.log("Error cargando inscripciones:", e);
                inscripciones = [];
            }
            console.log("Cargando desde 'inscripciones' estándar:", inscripciones.length);
        }
        
        // Cargar wishlist de forma segura
        try {
            wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
            console.log("Error cargando wishlist:", e);
            wishlist = [];
        }
        
        console.log("=== RESULTADO FINAL ===");
        console.log("Inscripciones encontradas:", inscripciones.length);
        console.log("Datos de inscripciones:", inscripciones);
        console.log("Wishlist:", wishlist.length);
    }
    
    // Cargar inscripciones en la tabla
    function cargarInscripciones() {
        console.log("Cargando tabla de inscripciones...");
        const tbody = document.getElementById('tabla-body') || 
                      document.querySelector('#tabla-inscripciones tbody') ||
                      document.getElementById('inscripciones-tbody');
        
        if (!tbody) {
            console.error("No se encontró el tbody de la tabla");
            return;
        }
        
        console.log("Tbody encontrado, limpiando contenido...");
        tbody.innerHTML = '';
        
        if (inscripciones.length === 0) {
            console.log("No hay inscripciones, mostrando mensaje vacío");
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-4">
                        <div class="text-muted">
                            <i class="fas fa-graduation-cap fa-3x mb-3"></i>
                            <h5>No tienes inscripciones aún</h5>
                            <p>¡Explora nuestro catálogo y comienza tu aprendizaje!</p>
                            <a href="inscripciones.html" class="btn btn-primary">
                                <i class="fas fa-plus"></i> Nueva Inscripción
                            </a>
                        </div>
                    </td>
                </tr>
            `;
            
            const contador = document.getElementById('contador-tabla');
            if (contador) contador.textContent = '0 registros';
            
            return;
        }
        
        console.log(`Creando filas para ${inscripciones.length} inscripciones`);
        
        let inscripcionesFiltradas = [...inscripciones];
        
        const filtroEstado = document.getElementById('filtro-estado');
        if (filtroEstado && filtroEstado.value !== 'todos') {
            const estadoFiltro = filtroEstado.value === 'registrado' ? 'Registrado' : 'Cancelada';
            inscripcionesFiltradas = inscripcionesFiltradas.filter(i => i.estado === estadoFiltro);
        }
        
        const buscarCurso = document.getElementById('buscar-curso');
        if (buscarCurso && buscarCurso.value.trim()) {
            const termino = buscarCurso.value.toLowerCase();
            inscripcionesFiltradas = inscripcionesFiltradas.filter(i => 
                i.nombre.toLowerCase().includes(termino) ||
                (i.cursoTitulo && i.cursoTitulo.toLowerCase().includes(termino)) ||
                i.email.toLowerCase().includes(termino)
            );
        }
        
        if (inscripcionesFiltradas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-4">
                        <div class="text-muted">
                            <i class="fas fa-search fa-2x mb-2"></i>
                            <h6>No se encontraron inscripciones con los filtros aplicados</h6>
                            <button class="btn btn-sm btn-outline-primary" onclick="misCursosModule.limpiarFiltros()">
                                Limpiar filtros
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            
            const contador = document.getElementById('contador-tabla');
            if (contador) contador.textContent = '0 registros';
            return;
        }
        
        inscripcionesFiltradas.forEach((inscripcion, index) => {
            console.log(`Procesando inscripción ${index + 1}:`, inscripcion);
            
            const indiceOriginal = inscripciones.findIndex(i => i.id === inscripcion.id);
            
            const fila = document.createElement('tr');
            fila.className = 'fade-in';
            fila.innerHTML = `
                <td>
                    <strong>#${inscripcion.id}</strong>
                    <br>
                    <small class="text-muted">${new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</small>
                </td>
                <td>
                    <strong>${inscripcion.nombre}</strong>
                </td>
                <td>
                    <small class="text-muted">${inscripcion.email}</small>
                </td>
                <td>
                    <div>
                        <strong>${inscripcion.cursoTitulo || `Curso ID: ${inscripcion.cursoId}`}</strong>
                        ${inscripcion.cursoPrecio ? `<br><small class="text-success">${inscripcion.cursoPrecio}</small>` : ''}
                    </div>
                </td>
                <td>
                    <span class="badge bg-${getModalidadColor(inscripcion.modalidad)}">
                        <i class="fas fa-${getModalidadIcon(inscripcion.modalidad)}"></i>
                        ${capitalizeFirst(inscripcion.modalidad)}
                    </span>
                </td>
                <td>
                    <span class="badge bg-${getEstadoColor(inscripcion.estado)}">
                        <i class="fas fa-${getEstadoIcon(inscripcion.estado)}"></i>
                        ${inscripcion.estado}
                    </span>
                </td>
                <td>
                    <small class="text-muted">${new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</small>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        ${inscripcion.estado === 'Registrado' ? `
                            <button class="btn btn-sm btn-outline-danger" 
                                    onclick="misCursosModule.confirmarCancelacion(${indiceOriginal})" 
                                    title="Cancelar inscripción">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                        <button class="btn btn-sm btn-outline-info" 
                                onclick="misCursosModule.verDetalleInscripcion(${indiceOriginal})" 
                                title="Ver detalles">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(fila);
        });
        
        const contador = document.getElementById('contador-tabla');
        if (contador) {
            contador.textContent = `${inscripcionesFiltradas.length} registro${inscripcionesFiltradas.length !== 1 ? 's' : ''}`;
            if (inscripcionesFiltradas.length !== inscripciones.length) {
                contador.textContent += ` de ${inscripciones.length}`;
            }
        }
        
        console.log("Tabla cargada exitosamente");
    }
    
    function capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function confirmarCancelacion(index) {
        const inscripcion = inscripciones[index];
        
        if (confirm(`¿Estás seguro de que deseas cancelar tu inscripción al curso "${inscripcion.cursoTitulo || 'Curso seleccionado'}"?\n\nEsta acción no se puede deshacer.`)) {
            cancelarInscripcion(index);
        }
    }
    
    function getModalidadColor(modalidad) {
        if (!modalidad) return 'secondary';
        const modalidadLower = modalidad.toLowerCase();
        switch(modalidadLower) {
            case 'online': return 'info';
            case 'presencial': return 'dark';
            case 'hibrida': return 'warning';
            default: return 'secondary';
        }
    }
    
    function getModalidadIcon(modalidad) {
        if (!modalidad) return 'question';
        const modalidadLower = modalidad.toLowerCase();
        switch(modalidadLower) {
            case 'online': return 'laptop';
            case 'presencial': return 'building';
            case 'hibrida': return 'globe';
            default: return 'question';
        }
    }
    
    function getEstadoColor(estado) {
        switch(estado) {
            case 'Registrado': return 'success';
            case 'Cancelada': return 'danger';
            case 'Completado': return 'primary';
            case 'En Progreso': return 'warning';
            default: return 'secondary';
        }
    }
    
    function getEstadoIcon(estado) {
        switch(estado) {
            case 'Registrado': return 'check-circle';
            case 'Cancelada': return 'times-circle';
            case 'Completado': return 'graduation-cap';
            case 'En Progreso': return 'clock';
            default: return 'question-circle';
        }
    }
    
    function cancelarInscripcion(index) {
        console.log(`Cancelando inscripción ${index}`);
        
        const inscripcion = inscripciones[index];
        
        inscripciones[index].estado = 'Cancelada';
        inscripciones[index].fechaCancelacion = new Date().toISOString();
        
        localStorage.setItem('inscripciones', JSON.stringify(inscripciones));
        
        console.log("Inscripción cancelada y guardada");
        
        // Actualizar UI
        cargarInscripciones();
        crearGraficoInscripciones();
        actualizarEstadisticas();
        actualizarResumen();
        
        mostrarNotificacion('Inscripción cancelada exitosamente', 'info');
    }
    
    function verDetalleInscripcion(index) {
        const inscripcion = inscripciones[index];
        console.log("Mostrando detalles de inscripción:", inscripcion);
        
        // Obtener información completa del curso desde el catálogo
        const cursos = JSON.parse(localStorage.getItem('cursos')) || window.cursos || [];
        const cursoCompleto = cursos.find(c => c.id == inscripcion.cursoId);
        
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-info-circle"></i> Detalle de Inscripción #${inscripcion.id}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" onclick="this.closest('.modal').remove()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="text-center mb-3">
                                    <img src="${cursoCompleto?.imagen || 'assets/img/default-course.jpg'}" 
                                         class="img-fluid rounded" alt="${inscripcion.cursoTitulo}">
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <h6><i class="fas fa-user"></i> Información del Estudiante</h6>
                                        <table class="table table-sm">
                                            <tr><td><strong>Nombre:</strong></td><td>${inscripcion.nombre}</td></tr>
                                            <tr><td><strong>Email:</strong></td><td>${inscripcion.email}</td></tr>
                                            <tr><td><strong>Teléfono:</strong></td><td>${inscripcion.telefono || 'No proporcionado'}</td></tr>
                                            <tr><td><strong>Modalidad:</strong></td><td>
                                                <span class="badge bg-${getModalidadColor(inscripcion.modalidad)}">
                                                    ${capitalizeFirst(inscripcion.modalidad)}
                                                </span>
                                            </td></tr>
                                            <tr><td><strong>Estado:</strong></td><td>
                                                <span class="badge bg-${getEstadoColor(inscripcion.estado)}">
                                                    ${inscripcion.estado}
                                                </span>
                                            </td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <h4 class="mb-3">${cursoCompleto?.titulo || inscripcion.cursoTitulo}</h4>
                                <p class="text-muted">${cursoCompleto?.descripcion || 'Descripción no disponible'}</p>
                                
                                ${cursoCompleto ? `
                                    <div class="row mb-4">
                                        <div class="col-md-6">
                                            <h6><i class="fas fa-bullseye"></i> Objetivos del Curso</h6>
                                            <ul class="list-unstyled">
                                                ${cursoCompleto.objetivos?.map(obj => 
                                                    `<li><i class="fas fa-check text-success me-2"></i>${obj}</li>`
                                                ).join('') || 'No disponible'}
                                            </ul>
                                        </div>
                                        <div class="col-md-6">
                                            <h6><i class="fas fa-clipboard-check"></i> Requisitos</h6>
                                            <ul class="list-unstyled">
                                                ${cursoCompleto.requisitos?.map(req => 
                                                    `<li><i class="fas fa-circle text-primary me-2"></i>${req}</li>`
                                                ).join('') || 'No disponible'}
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <h6><i class="fas fa-book"></i> Programa del Curso</h6>
                                    <div class="accordion mb-4">
                                        ${cursoCompleto.programa?.map((modulo, idx) => `
                                            <div class="accordion-item">
                                                <h2 class="accordion-header">
                                                    <button class="accordion-button collapsed" type="button" 
                                                            data-bs-toggle="collapse" data-bs-target="#modulo${idx}">
                                                        ${modulo.titulo}
                                                    </button>
                                                </h2>
                                                <div id="modulo${idx}" class="accordion-collapse collapse">
                                                    <div class="accordion-body">
                                                        <ul class="list-unstyled mb-0">
                                                            ${modulo.temas.map(tema => 
                                                                `<li><i class="fas fa-angle-right me-2"></i>${tema}</li>`
                                                            ).join('')}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('') || '<p class="text-muted">Programa no disponible</p>'}
                                    </div>
                                ` : ''}
                                
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p><strong><i class="fas fa-calendar"></i> Fecha Inscripción:</strong><br>
                                                ${new Date(inscripcion.fechaInscripcion).toLocaleString()}</p>
                                            </div>
                                            ${inscripcion.fechaCancelacion ? `
                                                <div class="col-md-6">
                                                    <p><strong><i class="fas fa-times-circle"></i> Fecha Cancelación:</strong><br>
                                                    ${new Date(inscripcion.fechaCancelacion).toLocaleString()}</p>
                                                </div>
                                            ` : ''}
                                        </div>
                                        ${inscripcion.comentarios ? `
                                            <p><strong><i class="fas fa-comment"></i> Comentarios:</strong><br>
                                            ${inscripcion.comentarios}</p>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                        ${inscripcion.estado === 'Registrado' ? `
                            <button type="button" class="btn btn-danger" 
                                    onclick="this.closest('.modal').remove(); 
                                             setTimeout(() => misCursosModule.confirmarCancelacion(${index}), 100);">
                                <i class="fas fa-ban"></i> Cancelar Inscripción
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    function crearGraficoInscripciones() {
        const canvas = document.getElementById('grafico-inscripciones');
        const noDataDiv = document.getElementById('no-data-chart');
        
        if (!canvas) {
            console.log("No se encontró el canvas del gráfico");
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        if (inscripciones.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('No hay inscripciones para mostrar', canvas.width / 2, canvas.height / 2);
            
            if (noDataDiv) {
                noDataDiv.style.display = 'block';
                canvas.style.display = 'none';
            }
            return;
        }
        
        if (noDataDiv) {
            noDataDiv.style.display = 'none';
            canvas.style.display = 'block';
        }
        
        const contadorCursos = {};
        inscripciones.forEach(inscripcion => {
            const titulo = inscripcion.cursoTitulo || `Curso ${inscripcion.cursoId}`;
            contadorCursos[titulo] = (contadorCursos[titulo] || 0) + 1;
        });
        
        const labels = Object.keys(contadorCursos);
        const datos = Object.values(contadorCursos);
        
        const canvasContainer = canvas.parentElement;
        const containerWidth = canvasContainer.offsetWidth;
        const containerHeight = Math.max(500, containerWidth * 0.6);

        const dpr = window.devicePixelRatio || 1;
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = containerHeight + 'px';
        
        ctx.scale(dpr, dpr);
        
        const padding = 60;
        const bottomPadding = 120; 
        const maxValor = Math.max(...datos);
        const numBarras = labels.length;
        
        const availableWidth = containerWidth - (padding * 2);
        const barSpacing = 15;
        const maxBarWidth = Math.min(80, (availableWidth - (barSpacing * (numBarras - 1))) / numBarras);
        const barWidth = Math.max(40, maxBarWidth);
        
        const totalWidth = (barWidth + barSpacing) * numBarras - barSpacing + (padding * 2);
        
        if (totalWidth > containerWidth) {
            canvas.width = totalWidth * dpr;
            canvas.style.width = totalWidth + 'px';
            ctx.scale(dpr, dpr);
        }
        
        const chartHeight = containerHeight - padding - bottomPadding;
        
        const colores = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
        ];
        
        ctx.clearRect(0, 0, totalWidth, containerHeight);
        
        function truncateText(text, maxLength) {
            if (text.length <= maxLength) return text;
            
            const truncated = text.substring(0, maxLength);
            const lastSpace = truncated.lastIndexOf(' ');
            const lastDash = truncated.lastIndexOf('-');
            const cutPoint = Math.max(lastSpace, lastDash);
            
            if (cutPoint > maxLength * 0.7) {
                return text.substring(0, cutPoint) + '...';
            }
            
            return truncated + '...';
        }
        
        function wrapText(text, maxWidth, fontSize) {
            const words = text.split(' ');
            const lines = [];
            let currentLine = words[0];
            
            ctx.font = `${fontSize}px Arial`;
            
            for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const width = ctx.measureText(currentLine + " " + word).width;
                if (width < maxWidth) {
                    currentLine += " " + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
            return lines;
        }
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(padding, padding, totalWidth - padding * 2, chartHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        
        const gridLines = 5;
        for (let i = 0; i <= gridLines; i++) {
            const y = padding + (chartHeight / gridLines) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(totalWidth - padding, y);
            ctx.stroke();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            const value = Math.round((maxValor / gridLines) * (gridLines - i));
            ctx.fillText(value, padding - 10, y + 4);
        }
        
        datos.forEach((valor, index) => {
            const barHeight = (valor / maxValor) * chartHeight;
            const x = padding + index * (barWidth + barSpacing);
            const y = padding + chartHeight - barHeight;
            
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, colores[index % colores.length]);
            gradient.addColorStop(1, colores[index % colores.length] + '80');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            ctx.strokeStyle = colores[index % colores.length];
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, barWidth, barHeight);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(valor, x + barWidth / 2, y - 8);
            
            const label = labels[index];
            const maxLabelWidth = barWidth + 20;
            const lines = wrapText(label, maxLabelWidth, 10);
            
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            
            lines.forEach((line, lineIndex) => {
                const textY = containerHeight - bottomPadding + 20 + (lineIndex * 12);
                ctx.fillText(line, x + barWidth / 2, textY);
            });
        });
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Inscripciones por Curso', totalWidth / 2, 30);
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        ctx.lineTo(totalWidth - padding, padding + chartHeight);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.stroke();
    }
    
    function actualizarEstadisticas() {
        console.log("Actualizando estadísticas...");
        
        const totalElement = document.getElementById('total-inscripciones');
        if (totalElement) {
            totalElement.textContent = inscripciones.length;
        }
        
        const activasElement = document.getElementById('cursos-activos') || document.getElementById('inscripciones-activas');
        if (activasElement) {
            const activas = inscripciones.filter(i => i.estado === 'Registrado').length;
            activasElement.textContent = activas;
        }
        
        const canceladasElement = document.getElementById('cursos-cancelados') || document.getElementById('inscripciones-canceladas');
        if (canceladasElement) {
            const canceladas = inscripciones.filter(i => i.estado === 'Cancelada').length;
            canceladasElement.textContent = canceladas;
        }
        
        const cursosElement = document.getElementById('cursos-unicos');
        if (cursosElement) {
            const cursosUnicos = new Set(inscripciones.map(i => i.cursoId)).size;
            cursosElement.textContent = cursosUnicos;
        }
        
        console.log(`Estadísticas: ${inscripciones.length} total, ${inscripciones.filter(i => i.estado === 'Registrado').length} activas`);
        
        actualizarResumen();
    }
    
    function actualizarResumen() {
        const cursoPopular = document.getElementById('curso-popular');
        if (cursoPopular && inscripciones.length > 0) {
            const contadorCursos = {};
            inscripciones.forEach(i => {
                const titulo = i.cursoTitulo || `Curso ${i.cursoId}`;
                contadorCursos[titulo] = (contadorCursos[titulo] || 0) + 1;
            });
            
            const cursoMasPopular = Object.keys(contadorCursos).reduce((a, b) => 
                contadorCursos[a] > contadorCursos[b] ? a : b
            );
            cursoPopular.textContent = cursoMasPopular;
        }
        
        const modalidadPreferida = document.getElementById('modalidad-preferida');
        if (modalidadPreferida && inscripciones.length > 0) {
            const contadorModalidades = {};
            inscripciones.forEach(i => {
                contadorModalidades[i.modalidad] = (contadorModalidades[i.modalidad] || 0) + 1;
            });
            
            const modalidadMasUsada = Object.keys(contadorModalidades).reduce((a, b) => 
                contadorModalidades[a] > contadorModalidades[b] ? a : b
            );
            modalidadPreferida.textContent = capitalizeFirst(modalidadMasUsada);
        }
        
        const ultimaInscripcion = document.getElementById('ultima-inscripcion');
        if (ultimaInscripcion && inscripciones.length > 0) {
            const ultima = inscripciones.reduce((a, b) => 
                new Date(a.fechaInscripcion) > new Date(b.fechaInscripcion) ? a : b
            );
            ultimaInscripcion.textContent = new Date(ultima.fechaInscripcion).toLocaleDateString();
        }
        
        const tasaCancelacion = document.getElementById('tasa-cancelacion');
        if (tasaCancelacion && inscripciones.length > 0) {
            const canceladas = inscripciones.filter(i => i.estado === 'Cancelada').length;
            const tasa = Math.round((canceladas / inscripciones.length) * 100);
            tasaCancelacion.textContent = `${tasa}%`;
        }
    }
    
    function exportarInscripciones() {
        if (inscripciones.length === 0) {
            mostrarNotificacion('No hay inscripciones para exportar', 'warning');
            return;
        }
        
        let contenido = 'EduCursos - Registro de Inscripciones\n';
        contenido += '=====================================\n\n';
        contenido += `Fecha de exportación: ${new Date().toLocaleString()}\n`;
        contenido += `Total de inscripciones: ${inscripciones.length}\n\n`;
        
        inscripciones.forEach((inscripcion, index) => {
            contenido += `${index + 1}. Inscripción #${inscripcion.id}\n`;
            contenido += `   Alumno: ${inscripcion.nombre}\n`;
            contenido += `   Email: ${inscripcion.email}\n`;
            contenido += `   Teléfono: ${inscripcion.telefono || 'No proporcionado'}\n`;
            contenido += `   Curso: ${inscripcion.cursoTitulo || 'No disponible'}\n`;
            contenido += `   Modalidad: ${inscripcion.modalidad}\n`;
            contenido += `   Estado: ${inscripcion.estado}\n`;
            contenido += `   Experiencia: ${inscripcion.experiencia || 'No especificada'}\n`;
            contenido += `   Fecha de inscripción: ${new Date(inscripcion.fechaInscripcion).toLocaleString()}\n`;
            
            if (inscripcion.fechaCancelacion) {
                contenido += `   Fecha de cancelación: ${new Date(inscripcion.fechaCancelacion).toLocaleString()}\n`;
            }
            
            if (inscripcion.comentarios) {
                contenido += `   Comentarios: ${inscripcion.comentarios}\n`;
            }
            
            contenido += '\n' + '-'.repeat(50) + '\n\n';
        });
        
        const activas = inscripciones.filter(i => i.estado === 'Registrado').length;
        const canceladas = inscripciones.filter(i => i.estado === 'Cancelada').length;
        const cursosUnicos = new Set(inscripciones.map(i => i.cursoId)).size;
        
        contenido += 'ESTADÍSTICAS\n';
        contenido += '============\n';
        contenido += `Total de inscripciones: ${inscripciones.length}\n`;
        contenido += `Inscripciones activas: ${activas}\n`;
        contenido += `Inscripciones canceladas: ${canceladas}\n`;
        contenido += `Cursos únicos: ${cursosUnicos}\n`;
        
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `inscripciones_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        mostrarNotificacion('Archivo de inscripciones descargado exitosamente', 'success');
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
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.remove();
            }
        }, 3000);
    }
    
    function limpiarFiltros() {
        const filtroEstado = document.getElementById('filtro-estado');
        const buscarCurso = document.getElementById('buscar-curso');
        
        if (filtroEstado) filtroEstado.value = 'todos';
        if (buscarCurso) buscarCurso.value = '';
        
        cargarInscripciones();
        mostrarNotificacion('Filtros limpiados correctamente', 'info');
    }
    
    function actualizarDatos() {
        console.log("Actualizando datos manualmente...");
        
        const btn = event.target;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualizando...';
        btn.disabled = true;
        
        setTimeout(() => {
            cargarDatos();
            cargarInscripciones();
            actualizarEstadisticas();
            crearGraficoInscripciones();
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            mostrarNotificacion('Datos actualizados correctamente', 'success');
        }, 1000);
    }
    
    function exportarTXT() {
        exportarInscripciones();
    }
    
    window.misCursosModule = {
        // Funciones públicas
        cancelarInscripcion: cancelarInscripcion,
        verDetalleInscripcion: verDetalleInscripcion,
        confirmarCancelacion: confirmarCancelacion,
        exportarInscripciones: exportarInscripciones,
        limpiarFiltros: limpiarFiltros,
        actualizarDatos: actualizarDatos,
        exportarTXT: exportarTXT,
        
        // Funciones auxiliares también disponibles
        cargarInscripciones: cargarInscripciones,
        actualizarEstadisticas: actualizarEstadisticas,
        crearGraficoInscripciones: crearGraficoInscripciones,
        
        // Getters para acceso de solo lectura a los datos
        getInscripciones: () => [...inscripciones], // Copia para evitar modificaciones externas
        getWishlist: () => [...wishlist],
        
        // Método para reinicializar el módulo
        reinicializar: () => {
            inscripciones = [];
            wishlist = [];
            cargarDatos();
            cargarInscripciones();
            actualizarEstadisticas();
            crearGraficoInscripciones();
            actualizarContadorWishlist();
        }
    };
    

    if (!window.cancelarInscripcion) {
        window.cancelarInscripcion = (index) => misCursosModule.cancelarInscripcion(index);
    }
    if (!window.verDetalleInscripcion) {
        window.verDetalleInscripcion = (index) => misCursosModule.verDetalleInscripcion(index);
    }
    if (!window.confirmarCancelacion) {
        window.confirmarCancelacion = (index) => misCursosModule.confirmarCancelacion(index);
    }
    if (!window.exportarInscripciones) {
        window.exportarInscripciones = () => misCursosModule.exportarInscripciones();
    }
    if (!window.limpiarFiltros) {
        window.limpiarFiltros = () => misCursosModule.limpiarFiltros();
    }
    if (!window.actualizarDatos) {
        window.actualizarDatos = () => misCursosModule.actualizarDatos();
    }
    if (!window.exportarTXT) {
        window.exportarTXT = () => misCursosModule.exportarTXT();
    }
    
    console.log("Módulo misCursos inicializado correctamente");
    
})();