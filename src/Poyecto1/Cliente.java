package Poyecto1;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Cliente {

    public static void main(String[] args) {
        // Crear el cliente HTTP
        HttpClient client = HttpClient.newHttpClient();

        System.out.println("=== PRUEBA 1: Solicitud a ruta existente (Esperado: 200 OK) ===");
        hacerSolicitud(client, "http://localhost:8080/api/juegos");

        System.out.println("\n=== PRUEBA 2: Solicitud a ruta inexistente (Esperado: 404 Not Found) ===");
        hacerSolicitud(client, "http://localhost:8080/api/juegos/rutaFalsa");
    }

    private static void hacerSolicitud(HttpClient client, String url) {
        try {
            // Construir la petición HTTP GET
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            // Enviar la petición y recibir la respuesta del servidor
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Imprimir los detalles recibidos
            System.out.println("URL consultada: " + url);
            System.out.println("Código HTTP recibido: " + response.statusCode());
            System.out.println("Formato (Content-Type): " + response.headers().firstValue("Content-Type").orElse("N/A"));
            System.out.println("Respuesta del servidor (JSON):\n" + response.body());

        } catch (Exception e) {
            System.err.println("Error en la comunicación: " + e.getMessage());
        }
    }
}