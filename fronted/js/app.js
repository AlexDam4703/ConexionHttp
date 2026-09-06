// --- 1. Estructura de Datos Inicial (Arreglo con objetos) ---
// Sirve como datos de respaldo (mock data) si el backend en Java no está activo
let videojuegos = [
    { id: 1, nombre: "The Legend of Zelda: Tears of the Kingdom", genero: "Aventura", precio: 69.99 },
    { id: 2, nombre: "Elden Ring", genero: "RPG", precio: 59.99 },
    { id: 3, nombre: "God of War Ragnarök", genero: "Acción", precio: 79.99 }
];

// --- 2. Selección de Elementos del DOM ---
const contenedorJuegos = document.getElementById('contenedor-juegos');
const formJuego = document.getElementById('form-juego');
const inputBusqueda = document.getElementById('input-busqueda');

// --- 3. Intento de Integración con el Backend Java (Práctica 1) ---
// Si el servidor Java está corriendo localmente, descarga sus datos. Si no, usa los locales.
async function cargarDesdeBackend() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/juegos');
        if (respuesta.ok) {
            const datos = await respuesta.json();
            if (Array.isArray(datos) && datos.length > 0) {
                videojuegos = datos;
            }
        }
    } catch (error) {
        console.log('Servidor Java no detectado en local. Usando datos de respaldo para el sitio publicado.');
    } finally {
        renderizarJuegos(videojuegos);
    }
}

// --- 4. Función para Renderizar/Dibujar las Tarjetas en el DOM ---
// Usa JS Moderno: Arrow Functions, Template Literals y Destructuring
const renderizarJuegos = (lista) => {
    // Limpiamos el contenedor antes de dibujar
    contenedorJuegos.innerHTML = '';

    if (lista.length === 0) {
        contenedorJuegos.innerHTML = '<p>No se encontraron videojuegos en el catálogo.</p>';
        return;
    }

    // Recorremos la lista y creamos el HTML dinámico
    lista.forEach(({ id, nombre, genero, precio }) => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-juego');
        
        tarjeta.innerHTML = `
            <h3>${nombre}</h3>
            <p><strong>Género:</strong> ${genero}</p>
            <p><strong>Precio:</strong> ${precio} €</p>
            <button class="btn-eliminar" onclick="eliminarJuego(${id})">Eliminar</button>
        `;

        contenedorJuegos.appendChild(tarjeta);
    });
};

// --- 5. Evento 1: Agregar un Nuevo Juego desde el Formulario ---
formJuego.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const nombre = document.getElementById('nombre').value;
    const genero = document.getElementById('genero').value;
    const precio = parseFloat(document.getElementById('precio').value);

    // Creamos el nuevo objeto
    const nuevoJuego = {
        id: Date.now(), // ID único basado en la fecha/hora
        nombre,
        genero,
        precio
    };

    // Añadimos al arreglo
    videojuegos.push(nuevoJuego);

    // Volvemos a renderizar y limpiamos el formulario
    renderizarJuegos(videojuegos);
    formJuego.reset();
});

// --- 6. Evento 2: Filtrar / Búsqueda en Tiempo Real ---
inputBusqueda.addEventListener('input', (event) => {
    const texto = event.target.value.toLowerCase();
    
    // JS Moderno: Uso del método filter()
    const juegosFiltrados = videojuegos.filter(juego => 
        juego.nombre.toLowerCase().includes(texto) ||
        juego.genero.toLowerCase().includes(texto)
    );

    renderizarJuegos(juegosFiltrados);
});

// --- 7. Evento 3: Eliminar un Juego del DOM y del Arreglo ---
function eliminarJuego(id) {
    videojuegos = videojuegos.filter(juego => juego.id !== id);
    renderizarJuegos(videojuegos);
}

// Inicializamos la aplicación
cargarDesdeBackend();