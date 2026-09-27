// Variable global para mantener el estado local de los videojuegos
let videojuegos = [];

// Elementos del DOM
const contenedorJuegos = document.getElementById('contenedor-juegos');
const formJuego = document.getElementById('form-juego');
const inputBusqueda = document.getElementById('input-busqueda');

// URL Base del Backend Spring Boot
const API_URL = 'http://localhost:8080/api/videojuegos';

// --- 1. Obtener todos los juegos desde el Backend (GET) ---
async function cargarDesdeBackend() {
    try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
            videojuegos = await respuesta.json();
            renderizarJuegos(videojuegos);
        } else {
            console.error('Error al obtener los datos del servidor');
        }
    } catch (error) {
        console.error('Servidor Java no detectado:', error);
        contenedorJuegos.innerHTML = '<p>Error al conectar con el servidor.</p>';
    }
}

// --- 2. Renderizar Tarjetas en el DOM ---
const renderizarJuegos = (lista) => {
    contenedorJuegos.innerHTML = '';

    if (lista.length === 0) {
        contenedorJuegos.innerHTML = '<p>No se encontraron videojuegos en el catálogo.</p>';
        return;
    }

    lista.forEach(({ id, titulo, genero, plataforma, precio }) => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-juego');
        
        tarjeta.innerHTML = `
            <h3>${titulo}</h3>
            <p><strong>Género:</strong> ${genero}</p>
            <p><strong>Plataforma:</strong> ${plataforma || 'PC'}</p>
            <p><strong>Precio:</strong> ${precio} €</p>
            <button class="btn-eliminar" onclick="eliminarJuego(${id})">Eliminar</button>
        `;

        contenedorJuegos.appendChild(tarjeta);
    });
};

// --- 3. Guardar un Nuevo Juego en la Base de Datos (POST) ---
formJuego.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = document.getElementById('nombre').value;
    const genero = document.getElementById('genero').value;
    const precio = parseFloat(document.getElementById('precio').value);

    const nuevoJuego = {
        titulo: titulo,
        genero: genero,
        plataforma: "PC", // Valor por defecto
        precio: precio
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoJuego)
        });

        if (respuesta.ok) {
            // Recargamos la lista desde la base de datos
            cargarDesdeBackend();
            formJuego.reset();
        } else {
            alert('Error al guardar el videojuego');
        }
    } catch (error) {
        console.error('Error en la petición POST:', error);
    }
});

// --- 4. Filtrar Búsqueda en Tiempo Real ---
inputBusqueda.addEventListener('input', (event) => {
    const texto = event.target.value.toLowerCase();
    
    const juegosFiltrados = videojuegos.filter(juego => 
        (juego.titulo && juego.titulo.toLowerCase().includes(texto)) ||
        (juego.genero && juego.genero.toLowerCase().includes(texto))
    );

    renderizarJuegos(juegosFiltrados);
});

// --- 5. Eliminar un Juego de la Base de Datos (DELETE) ---
async function eliminarJuego(id) {
    if (!confirm('¿Seguro que deseas eliminar este videojuego?')) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            cargarDesdeBackend();
        } else {
            alert('Error al eliminar el videojuego');
        }
    } catch (error) {
        console.error('Error en la petición DELETE:', error);
    }
}

// Inicializar la aplicación cargando desde Spring Boot
cargarDesdeBackend();