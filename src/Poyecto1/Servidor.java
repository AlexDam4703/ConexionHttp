package Poyecto1;
import com.sun.net.httpserver.HttpExchange; // recibe y entrega paquete
import com.sun.net.httpserver.HttpHandler; // interfaz
import com.sun.net.httpserver.HttpServer; // servidor de http
import java.io.IOException; // uso de excepciones.
import java.io.OutputStream; //Escritura de json
import java.net.InetSocketAddress; //Direccion donde debe escuchar

public class Servidor {

	public static void main(String[] args) throws IOException {
		// 1. Crear servidor en el puerto 8080
		HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

		// 2. Ruta base de los juegos
		server.createContext("/api/juegos", new JuegosHandler());

		// 3. Arrancar el servidor
		server.start();
		System.out.println("Servidor HTTP iniciado en http://localhost:8080");
	}

	static class JuegosHandler implements HttpHandler {
		public void handle(HttpExchange exchange) throws IOException {
			String metodo = exchange.getRequestMethod();
			String path = exchange.getRequestURI().getPath();

			System.out.println("Petición recibida -> Método: " + metodo + " | Ruta: " + path);

			if ("GET".equals(metodo)) {

				// Respuesta valida (200 OK)
				if (path.equals("/api/juegos")) {
					// Cambiamos "titulo" por "nombre" para que encaje con app.js y agregamos "precio"
					String jsonResponse = "[\n"
							+ "  {\"id\": 1, \"nombre\": \"Satisfactory\", \"genero\": \"Automatizacion\", \"precio\": 38.99},\n"
							+ "  {\"id\": 2, \"nombre\": \"Kingdom Come: Deliverance II\", \"genero\": \"RPG\", \"precio\": 59.99},\n"
							+ "  {\"id\": 3, \"nombre\": \"Astroneer\", \"genero\": \"Supervivencia\", \"precio\": 29.99}\n" + "]";

					exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8"); //tipo que se envia
					
					// --- LÍNEA AÑADIDA PARA PERMITIR CONEXIÓN DESDE EL FRONTEND (CORS) ---
					exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");

					byte[] bytes = jsonResponse.getBytes("UTF-8");
					exchange.sendResponseHeaders(200, bytes.length); //200 ok, enviado

					OutputStream os = exchange.getResponseBody();
					os.write(bytes); //escribe el vector json
					os.close();
				}
				// Ruta no encontrada (404 Not Found)
				else {
					enviarRespuesta404(exchange);
				}

			} else {
				enviarRespuesta404(exchange);
			}
		}

		private void enviarRespuesta404(HttpExchange exchange) throws IOException {
			String jsonError = "{\"error\": \"Juego no encontrado\", \"codigo\": 404}";

			exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
			
			// --- TAMBIÉN EN EL 404 POR SEGURIDAD ---
			exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");

			byte[] bytes = jsonError.getBytes("UTF-8");
			exchange.sendResponseHeaders(404, bytes.length);

			OutputStream os = exchange.getResponseBody();
			os.write(bytes);
			os.close();
		}
	}
}