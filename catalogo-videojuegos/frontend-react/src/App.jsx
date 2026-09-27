import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api/videojuegos';

function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [form, setForm] = useState({ titulo: '', genero: '', precio: '' });

  // 1. Obtener juegos de la API de Spring Boot
  const cargarJuegos = async () => {
    try {
      const respuesta = await axios.get(API_URL);
      setVideojuegos(respuesta.data);
    } catch (error) {
      console.error('Error al conectar con la API de Spring Boot:', error);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // 2. Guardar un juego en MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoJuego = {
        titulo: form.titulo,
        genero: form.genero,
        plataforma: 'PC',
        precio: parseFloat(form.precio)
      };
      await axios.post(API_URL, nuevoJuego);
      setForm({ titulo: '', genero: '', precio: '' });
      cargarJuegos();
    } catch (error) {
      console.error('Error al guardar el videojuego:', error);
    }
  };

  // 3. Eliminar juego de MySQL
  const handleEliminar = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      cargarJuegos();
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error);
    }
  };

  // 4. Filtro en tiempo real
  const juegosFiltrados = videojuegos.filter((juego) =>
    (juego.titulo && juego.titulo.toLowerCase().includes(busqueda.toLowerCase())) ||
    (juego.genero && juego.genero.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="container">
      <header>
        <h1>Catálogo de Videojuegos (React)</h1>
        <p>Gestión y consulta dinámica del inventario</p>
      </header>

      <main>
        <section>
          <h2>Buscar Videojuego</h2>
          <label htmlFor="busqueda">Filtrar por nombre o género:</label>
          <input
            id="busqueda"
            type="text"
            placeholder="Ej. Zelda, Elden Ring..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </section>

        <section>
          <h2>Añadir Nuevo Videojuego</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre del juego:</label>
              <input
                type="text"
                required
                placeholder="Nombre del juego"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
            </div>
            <div>
              <label>Género:</label>
              <input
                type="text"
                required
                placeholder="Ej. RPG, Acción"
                value={form.genero}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              />
            </div>
            <div>
              <label>Precio (€):</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="59.99"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
              />
            </div>
            <button type="submit">Agregar Al Catálogo</button>
          </form>
        </section>

        <section>
          <h2>Juegos en la Lista</h2>
          <div className="contenedor-juegos">
            {juegosFiltrados.length === 0 ? (
              <p>No se encontraron videojuegos en el catálogo.</p>
            ) : (
              juegosFiltrados.map(({ id, titulo, genero, plataforma, precio }) => (
                <article key={id} className="tarjeta-juego">
                  <h3>{titulo}</h3>
                  <p><strong>Género:</strong> {genero}</p>
                  <p><strong>Plataforma:</strong> {plataforma || 'PC'}</p>
                  <p><strong>Precio:</strong> {precio} €</p>
                  <button className="btn-eliminar" onClick={() => handleEliminar(id)}>
                    Eliminar
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;