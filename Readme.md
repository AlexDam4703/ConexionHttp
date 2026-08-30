# Proyecto 1: Arquitectura Cliente-Servidor HTTP en Java

Este proyecto consiste en una aplicación distribuida básica desarrollada en Java nativo, donde se implementa la comunicación entre un servidor HTTP y un cliente mediante solicitudes y respuestas JSON.

## 📋 Descripción del Proyecto

La aplicación simula un catálogo de videojuegos en red:
- **Servidor:** Expone un endpoint HTTP (`/api/juegos`) escuchando en el puerto local `8080`.
- **Cliente:** Realiza peticiones HTTP GET al servidor, procesa los códigos de estado devueltos y muestra las respuestas JSON en consola.

## 🛠️ Tecnologías Utilizadas

- **Lenguaje:** Java (JDK 11 o superior)
- **IDE:** Eclipse IDE
- **Librerías del Servidor:** `com.sun.net.httpserver` (servidor HTTP nativo)
- **Librerías del Cliente:** `java.net.http` (`HttpClient`, `HttpRequest`, `HttpResponse`)
- **Formato de datos:** JSON (application/json)

## 🚀 Arquitectura y Funcionamiento

### 1. Servidor (`Servidor.java`)
- Inicializa un servidor en `http://localhost:8080`.
- Registra el contexto `/api/juegos` vinculado a un manejador (`JuegosHandler`).
- **Casos de prueba manejados:**
  - **Ruta válida (`/api/juegos`):** Devuelve un código **200 OK** con la lista de juegos en formato JSON.
  - **Ruta no encontrada (`/api/juegos/ruta-falsa`):** Devuelve un código **404 Not Found** con un objeto JSON indicando el error.

### 2. Cliente (`Cliente.java`)
- Hace uso de `HttpClient` y la API `HttpRequest` con el patrón *Builder*.
- Realiza dos pruebas secuenciales:
  1. Consulta a `/api/juegos` comprobando la recepción del código `200 OK` y el payload de datos.
  2. Consulta a `/api/juegos/ruta-falsa` comprobando el manejo del código `404 Not Found`.

## ⚙️ Instrucciones de Ejecución

1. Clonar el repositorio.
2. Abrir el proyecto en **Eclipse IDE**.
3. Ejecutar la clase `Servidor.java` (Run as -> Java Application).
4. Mientras el servidor está en ejecución, ejecutar la clase `Cliente.java` (Run as -> Java Application).
5. Observar las respuestas obtenidas en la consola de Eclipse.

---
*Proyecto académico desarrollado para la asignatura de Desarrollo de Software.*