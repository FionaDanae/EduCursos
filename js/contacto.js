let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

document.addEventListener('DOMContentLoaded', function() {
    configurarFormulario();
    actualizarContadorWishlist();
});

function configurarFormulario() {
    const formulario = document.getElementById('form-contacto');
    if (!formulario) return;
    
    const campos = formulario.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => limpiarError(campo));
    });
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        procesarContacto();
    });
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    let esValido = true;
    let mensaje = '';
    
    limpiarError(campo);
    
    switch(campo.id) {
        case 'nombre':
            if (!valor) {
                esValido = false;
                mensaje = 'El nombre es obligatorio';
            } else if (valor.length < 2) {
                esValido = false;
                mensaje = 'El nombre debe tener al menos 2 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                esValido = false;
                mensaje = 'El nombre solo puede contener letras y espacios';
            }
            break;
            
        case 'email':
            if (!valor) {
                esValido = false;
                mensaje = 'El email es obligatorio';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                esValido = false;
                mensaje = 'Ingresa un email válido';
            }
            break;
            
        case 'mensaje':
            if (!valor) {
                esValido = false;
                mensaje = 'El mensaje es obligatorio';
            } else if (valor.length < 10) {
                esValido = false;
                mensaje = 'El mensaje debe tener al menos 10 caracteres';
            } else if (valor.length > 1000) {
                esValido = false;
                mensaje = 'El mensaje no puede exceder 1000 caracteres';
            }
            break;
    }
    
    if (!esValido) {
        mostrarError(campo, mensaje);
    }
    
    return esValido;
}

function mostrarError(campo, mensaje) {
    campo.classList.add('is-invalid');
    
    // Buscar o crear elemento de error
    let errorElement = campo.parentNode.querySelector('.invalid-feedback');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        campo.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = mensaje;
}

// Limpiar error de campo
function limpiarError(campo) {
    campo.classList.remove('is-invalid');
    const errorElement = campo.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

// Procesar formulario de contacto
function procesarContacto() {
    const formulario = document.getElementById('form-contacto');
    const formData = new FormData(formulario);
    
    // Validar todos los campos
    const campos = formulario.querySelectorAll('input[required], textarea[required]');
    let formularioValido = true;
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            formularioValido = false;
        }
    });
    
    if (!formularioValido) {
        mostrarNotificacion('Por favor corrige los errores en el formulario', 'danger');
        return;
    }
    
    // Obtener datos del formulario
    const datosContacto = {
        id: Date.now(),
        nombre: formData.get('nombre').trim(),
        email: formData.get('email').trim(),
        mensaje: formData.get('mensaje').trim(),
        fecha: new Date().toISOString(),
        estado: 'Enviado'
    };
    
    // Simular envío (en una aplicación real, aquí se enviaría al servidor)
    mostrarLoading(true);
    
    setTimeout(() => {
        // Guardar en localStorage para demostración
        let mensajes = JSON.parse(localStorage.getItem('mensajes_contacto')) || [];
        mensajes.push(datosContacto);
        localStorage.setItem('mensajes_contacto', JSON.stringify(mensajes));
        
        mostrarLoading(false);
        mostrarConfirmacionEnvio(datosContacto);
        
        // Limpiar formulario
        formulario.reset();
        
        // Limpiar errores
        formulario.querySelectorAll('.is-invalid').forEach(campo => {
            limpiarError(campo);
        });
        
        // Actualizar contador de caracteres si existe
        const contador = document.getElementById('contador-caracteres');
        if (contador) {
            contador.textContent = '0/1000';
        }
    }, 2000); // Simular delay de red
}

// Mostrar/ocultar loading
function mostrarLoading(mostrar) {
    const btnEnviar = document.querySelector('button[type="submit"]');
    const loading = document.getElementById('loading-contacto');
    
    if (mostrar) {
        if (btnEnviar) {
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        }
        if (loading) {
            loading.style.display = 'block';
        }
    } else {
        if (btnEnviar) {
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        }
        if (loading) {
            loading.style.display = 'none';
        }
    }
}

// Mostrar confirmación de envío
function mostrarConfirmacionEnvio(datos) {
    // Mostrar modal de confirmación
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle"></i> ¡Mensaje Enviado!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="mb-4">
                        <i class="fas fa-envelope fa-4x text-success mb-3"></i>
                        <h4>¡Gracias por contactarnos, ${datos.nombre}!</h4>
                        <p class="lead">Tu mensaje ha sido enviado exitosamente.</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h6><i class="fas fa-info-circle"></i> ¿Qué sigue?</h6>
                        <ul class="list-unstyled mb-0">
                            <li><i class="fas fa-clock"></i> Responderemos en un plazo máximo de 24 horas</li>
                            <li><i class="fas fa-envelope"></i> Recibirás la respuesta en: <strong>${datos.email}</strong></li>
                            <li><i class="fas fa-phone"></i> Para consultas urgentes, llama al: <strong>(555) 123-4567</strong></li>
                        </ul>
                    </div>
                    
                    <div class="text-muted small">
                        <strong>ID de referencia:</strong> #${datos.id}<br>
                        <strong>Fecha:</strong> ${new Date(datos.fecha).toLocaleString()}
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="index.html" class="btn btn-primary">
                        <i class="fas fa-home"></i> Ir al Catálogo
                    </a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Remover modal del DOM cuando se cierre
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
    
    // También mostrar notificación
    mostrarNotificacion('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
}

// Contador de caracteres para el textarea
function configurarContadorCaracteres() {
    const textarea = document.getElementById('mensaje');
    const contador = document.getElementById('contador-caracteres');
    
    if (textarea && contador) {
        textarea.addEventListener('input', function() {
            const longitud = this.value.length;
            contador.textContent = `${longitud}/1000`;
            
            // Cambiar color según la longitud
            if (longitud > 900) {
                contador.className = 'text-danger small';
            } else if (longitud > 700) {
                contador.className = 'text-warning small';
            } else {
                contador.className = 'text-muted small';
            }
        });
    }
}

// Actualizar contador de wishlist
function actualizarContadorWishlist() {
    const contador = document.getElementById('wishlist-count');
    if (contador) {
        contador.textContent = wishlist.length;
        contador.style.display = wishlist.length > 0 ? 'inline' : 'none';
    }
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    notificacion.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notificacion.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 3000);
}

// Inicializar contador de caracteres cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    configurarContadorCaracteres();
});

// Exportar funciones
window.procesarContacto = procesarContacto;