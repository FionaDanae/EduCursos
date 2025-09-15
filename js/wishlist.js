// Obtener wishlist desde localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Guardar wishlist en localStorage
function guardarWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function mostrarWishlist() {
    const contenedor = document.getElementById('wishlist-container');
    if (!contenedor) return;

    if (wishlist.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    No tienes cursos en tu wishlist.
                </div>
            </div>
        `;
        return;
    }

    let html = '';
    wishlist.forEach(curso => {
        console.log('Rendering wishlist item image:', curso.imagen);
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card course-card h-100">
                    <div class="position-relative">
                        <img src="${curso.imagen.startsWith('assets/') ? curso.imagen : 'assets/img/' + curso.imagen}" class="card-img-top" alt="${curso.titulo}"
                            onerror="this.src='https://via.placeholder.com/300x200?text=Curso'">
                        <span class="badge badge-modalidad bg-${getModalidadColor(curso.modalidad)}">${curso.modalidad}</span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${curso.titulo}</h5>
                        <p class="card-text text-muted">${curso.descripcion}</p>
                        <p class="card-text">${curso.precio}</p>
                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-primary" onclick="window.location.href='inscripciones.html'">
                                <i class="fas fa-user-plus"></i> Inscribirse
                            </button>
                            <button class="btn btn-danger" onclick="removerDeWishlist(${curso.id})">
                                <i class="fas fa-trash"></i> Remover
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    actualizarContadorWishlist();
}

function removerDeWishlist(cursoId) {
    wishlist = wishlist.filter(curso => curso.id !== cursoId);
    guardarWishlist();
    mostrarWishlist();
}

function actualizarContadorWishlist() {
    const contador = document.getElementById('wishlist-count');
    if (contador) {
        contador.textContent = wishlist.length;
        contador.style.display = wishlist.length > 0 ? 'inline' : 'none';
    }
}

function getModalidadColor(modalidad) {
    return modalidad.toLowerCase() === 'online' ? 'info' : 'dark';
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    mostrarWishlist();
});
