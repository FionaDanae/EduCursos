console.log("Archivo inscripciones.js cargado");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado");
    
    const formulario = document.getElementById('inscripcion-form');
    const botonInscribirse = formulario ? formulario.querySelector('button[type="submit"]') : null;
    
    console.log("Formulario encontrado:", formulario);
    console.log("Botón encontrado:", botonInscribirse);
    
    if (formulario && botonInscribirse) {
        botonInscribirse.disabled = true;
        botonInscribirse.innerHTML = '<i class="fas fa-user-plus"></i> Completa todos los campos';
        
        const camposObligatorios = [
            'nombre',
            'email', 
            'curso',
            'modalidad',
            'terminos'
        ];
        
        function validarFormularioCompleto() {
            let todosCompletos = true;
            
            camposObligatorios.forEach(campoId => {
                const campo = document.getElementById(campoId);
                if (campo) {
                    if (campo.type === 'checkbox') {
                        if (!campo.checked) todosCompletos = false;
                    } else {
                        if (!campo.value.trim()) todosCompletos = false;
                    }
                }
            });
            
            console.log("Validación completa:", todosCompletos);
            
            if (todosCompletos) {
                botonInscribirse.disabled = false;
                botonInscribirse.className = 'btn btn-success btn-lg';
                botonInscribirse.innerHTML = '<i class="fas fa-user-plus"></i> Inscribirse';
            } else {
                botonInscribirse.disabled = true;
                botonInscribirse.className = 'btn btn-secondary btn-lg';
                botonInscribirse.innerHTML = '<i class="fas fa-user-plus"></i> Completa todos los campos';
            }
        }
        
        camposObligatorios.forEach(campoId => {
            const campo = document.getElementById(campoId);
            if (campo) {
                const evento = campo.type === 'checkbox' ? 'change' : 'input';
                campo.addEventListener(evento, validarFormularioCompleto);
                campo.addEventListener('blur', validarFormularioCompleto);
            }
        });
        
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Formulario enviado");
            
            botonInscribirse.disabled = true;
            botonInscribirse.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const curso = document.getElementById('curso').value;
            const modalidad = document.getElementById('modalidad').value;
            const terminos = document.getElementById('terminos').checked;
            const telefono = document.getElementById('telefono').value.trim();
            const edad = document.getElementById('edad').value;
            const experiencia = document.getElementById('experiencia').value;
            const comentarios = document.getElementById('comentarios').value.trim();
            const newsletter = document.getElementById('newsletter').checked;
            
            console.log("Datos del formulario:", {nombre, email, curso, modalidad, terminos});
            
            if (!nombre || !email || !curso || !modalidad || !terminos) {
                alert("Por favor completa todos los campos obligatorios y acepta los términos");
                botonInscribirse.disabled = false;
                botonInscribirse.innerHTML = '<i class="fas fa-user-plus"></i> Inscribirse';
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor ingresa un email válido");
                botonInscribirse.disabled = false;
                botonInscribirse.innerHTML = '<i class="fas fa-user-plus"></i> Inscribirse';
                return;
            }
            
            // Crear inscripción
            const inscripcion = {
                id: Date.now(),
                nombre: nombre,
                email: email,
                telefono: telefono,
                edad: edad,
                cursoId: parseInt(curso),
                modalidad: modalidad,
                experiencia: experiencia,
                comentarios: comentarios,
                newsletter: newsletter,
                fechaInscripcion: new Date().toISOString(),
                estado: 'Registrado'
            };
            
            // Obtener info del curso de la wishlist
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const cursoInfo = wishlist.find(c => c.id == curso);
            if (cursoInfo) {
                inscripcion.cursoTitulo = cursoInfo.titulo;
                inscripcion.cursoPrecio = cursoInfo.precio;
            }
            
            console.log("Inscripción creada:", inscripcion);
            
            // Verificar si ya está inscrito
            let inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || [];
            const yaInscrito = inscripciones.some(i => 
                i.email === email && 
                i.cursoId === inscripcion.cursoId &&
                i.estado !== 'Cancelada'
            );
            
            if (yaInscrito) {
                alert("Ya estás inscrito en este curso");
                botonInscribirse.disabled = false;
                botonInscribirse.innerHTML = '<i class="fas fa-user-plus"></i> Inscribirse';
                return;
            }
            
            // Guardar en localStorage
            inscripciones.push(inscripcion);
            localStorage.setItem('inscripciones', JSON.stringify(inscripciones));
            
            console.log("Inscripción guardada. Total inscripciones:", inscripciones.length);
            
            eliminarDeWishlistDespuesDeInscripcion(inscripcion.cursoId);
            mostrarModalConfirmacion(inscripcion);
            
            formulario.reset();
            const comentariosCount = document.getElementById('comentarios-count');
            if (comentariosCount) comentariosCount.textContent = '0';
            
            // Resetear botón
            setTimeout(() => {
                validarFormularioCompleto();
            }, 100);
            
            console.log("Formulario limpiado");
        });
    } else {
        console.error("No se encontró el formulario o el botón");
    }
    
    mostrarWishlistBasica();
    
    // Contador de comentarios
    const comentarios = document.getElementById('comentarios');
    if (comentarios) {
        comentarios.addEventListener('input', function() {
            const count = this.value.length;
            const countElement = document.getElementById('comentarios-count');
            if (countElement) {
                countElement.textContent = count;
            }
            
            if (count > 450) {
                this.classList.add('border-warning');
            } else {
                this.classList.remove('border-warning');
            }
        });
    }
});

function eliminarDeWishlistDespuesDeInscripcion(cursoId) {
    try {
        console.log("Verificando si curso está en wishlist para eliminarlo...");
        console.log("Curso ID a eliminar:", cursoId);
        
        // Cargar wishlist actual
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        console.log("Wishlist antes de eliminar:", wishlist.length, "cursos");
        
        // Encontrar el curso en la wishlist
        const indiceEnWishlist = wishlist.findIndex(curso => 
            curso.id == cursoId || 
            parseInt(curso.id) === parseInt(cursoId)
        );
        
        if (indiceEnWishlist !== -1) {
            const cursoEliminado = wishlist[indiceEnWishlist];
            
            wishlist.splice(indiceEnWishlist, 1);
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            
            console.log("Curso eliminado de wishlist:", cursoEliminado.titulo);
            console.log("Wishlist después de eliminar:", wishlist.length, "cursos");
            
            actualizarInterfazWishlist();
            
            mostrarNotificacion(
                `El curso "${cursoEliminado.titulo}" se eliminó automáticamente de tu lista de deseos`, 
                'info'
            );
            
            return true;
        } else {
            console.log("El curso no estaba en la wishlist");
            return false;
        }
        
    } catch (error) {
        console.error("Error al eliminar curso de wishlist:", error);
        return false;
    }
}

function actualizarInterfazWishlist() {
    const cursoSelect = document.getElementById('curso');
    if (cursoSelect) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        cursoSelect.innerHTML = '<option value="">Selecciona un curso de tu wishlist</option>';
        
        wishlist.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id;
            option.textContent = curso.titulo;
            cursoSelect.appendChild(option);
        });
        
        console.log("Select de cursos actualizado");
    }
    
    const wishlistItems = document.getElementById('wishlist-items');
    const wishlistEmpty = document.getElementById('wishlist-empty');
    
    if (wishlistItems && wishlistEmpty) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        if (wishlist.length === 0) {
            wishlistEmpty.style.display = 'block';
            wishlistItems.style.display = 'none';
        } else {
            wishlistEmpty.style.display = 'none';
            wishlistItems.style.display = 'block';
            wishlistItems.innerHTML = '';
            
            wishlist.forEach(curso => {
                const item = document.createElement('div');
                item.className = 'list-group-item d-flex justify-content-between align-items-center';
                item.innerHTML = `
                    <div>
                        <h6 class="mb-1">${curso.titulo}</h6>
                        <p class="mb-1 small text-muted">${curso.descripcion || 'Sin descripción'}</p>
                    </div>
                    <span class="badge bg-primary rounded-pill">${curso.precio || 'Gratis'}</span>
                `;
                wishlistItems.appendChild(item);
            });
        }
    }
    
    actualizarContadorWishlist();
}

function actualizarContadorWishlist() {
    try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        const contadores = [
            document.getElementById('wishlist-count'),
            document.getElementById('wishlist-counter'),
            document.querySelector('.wishlist-count'),
            document.querySelector('[data-wishlist-count]')
        ];
        
        contadores.forEach(contador => {
            if (contador) {
                contador.textContent = wishlist.length;
                contador.style.display = wishlist.length > 0 ? 'inline' : 'none';
            }
        });
        
        console.log("Contador wishlist actualizado:", wishlist.length);
        
        if (window.misCursosModule && typeof window.misCursosModule.actualizarContadorWishlist === 'function') {
            window.misCursosModule.actualizarContadorWishlist();
        }
        
    } catch (error) {
        console.error('Error actualizando contador wishlist:', error);
    }
}

function mostrarModalConfirmacion(inscripcion) {
    // Crear modal dinámicamente
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle"></i> ¡Inscripción Exitosa!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" onclick="cerrarModal(this)"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <i class="fas fa-graduation-cap fa-4x text-success mb-3"></i>
                        <h4 class="text-dark">¡Felicidades ${inscripcion.nombre}!</h4>
                        <p class="lead text-dark">Te has inscrito exitosamente al curso:</p>
                        <h5 class="text-primary">${inscripcion.cursoTitulo || 'Curso Seleccionado'}</h5>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="text-dark"><i class="fas fa-user"></i> Datos del Estudiante:</h6>
                            <ul class="list-unstyled text-dark">
                                <li><strong>Nombre:</strong> ${inscripcion.nombre}</li>
                                <li><strong>Email:</strong> ${inscripcion.email}</li>
                                <li><strong>Modalidad:</strong> ${inscripcion.modalidad}</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-dark"><i class="fas fa-info-circle"></i> Información del Curso:</h6>
                            <ul class="list-unstyled text-dark">
                                <li><strong>ID Inscripción:</strong> #${inscripcion.id}</li>
                                <li><strong>Fecha:</strong> ${new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</li>
                                <li><strong>Estado:</strong> <span class="badge bg-success">${inscripcion.estado}</span></li>
                            </ul>
                        </div>
                    </div>
                    
                    ${inscripcion.comentarios ? `
                        <div class="mt-3">
                            <h6 class="text-dark"><i class="fas fa-comment"></i> Comentarios:</h6>
                            <p class="text-dark">${inscripcion.comentarios}</p>
                        </div>
                    ` : ''}
                    
                    <div class="alert alert-info mt-3">
                        <i class="fas fa-envelope"></i>
                        <strong>Próximos pasos:</strong> Recibirás un email de confirmación con los detalles del curso y las instrucciones para comenzar.
                    </div>
                    
                    <div class="alert alert-success mt-2">
                        <i class="fas fa-heart"></i>
                        <strong>¡Genial!</strong> El curso se eliminó automáticamente de tu lista de deseos.
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="mis_cursos.html" class="btn btn-primary">
                        <i class="fas fa-list"></i> Ver Mis Cursos
                    </a>
                    <a href="index.html" class="btn btn-secondary">
                        <i class="fas fa-search"></i> Explorar Más Cursos
                    </a>
                    <button type="button" class="btn btn-outline-secondary" onclick="cerrarModal(this)">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    window.cerrarModal = function(btn) {
        const modal = btn.closest('.modal');
        modal.remove();
    };
    
    setTimeout(() => {
        mostrarNotificacion('¡Inscripción realizada correctamente!', 'success');
    }, 500);
}

function mostrarWishlistBasica() {
    console.log("Cargando wishlist...");
    
    const cursoSelect = document.getElementById('curso');
    const wishlistItems = document.getElementById('wishlist-items');
    const wishlistEmpty = document.getElementById('wishlist-empty');
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    console.log("Wishlist obtenida:", wishlist);
    
    // Llenar el select de cursos
    if (cursoSelect) {
        cursoSelect.innerHTML = '<option value="">Selecciona un curso de tu wishlist</option>';
        
        wishlist.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id;
            option.textContent = curso.titulo;
            cursoSelect.appendChild(option);
        });
        
        console.log("Cursos agregados al select:", wishlist.length);
    }
    
    // Mostrar wishlist visual
    if (wishlistItems && wishlistEmpty) {
        if (wishlist.length === 0) {
            wishlistEmpty.style.display = 'block';
            wishlistItems.style.display = 'none';
        } else {
            wishlistEmpty.style.display = 'none';
            wishlistItems.style.display = 'block';
            wishlistItems.innerHTML = '';
            
            wishlist.forEach(curso => {
                const item = document.createElement('div');
                item.className = 'list-group-item d-flex justify-content-between align-items-center';
                item.innerHTML = `
                    <div>
                        <h6 class="mb-1">${curso.titulo}</h6>
                        <p class="mb-1 small text-muted">${curso.descripcion || 'Sin descripción'}</p>
                    </div>
                    <span class="badge bg-primary rounded-pill">${curso.precio || 'Gratis'}</span>
                `;
                wishlistItems.appendChild(item);
            });
        }
    }
    
    actualizarContadorWishlist();
}

function limpiarFormulario() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
        const formulario = document.getElementById('inscripcion-form');
        if (formulario) {
            formulario.reset();
            const comentariosCount = document.getElementById('comentarios-count');
            if (comentariosCount) comentariosCount.textContent = '0';
            
            setTimeout(() => {
                const event = new Event('input');
                document.getElementById('nombre').dispatchEvent(event);
            }, 100);
        }
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

window.eliminarDeWishlistDespuesDeInscripcion = eliminarDeWishlistDespuesDeInscripcion;
window.actualizarContadorWishlist = actualizarContadorWishlist;