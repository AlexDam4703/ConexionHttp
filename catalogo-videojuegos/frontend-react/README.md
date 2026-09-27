# Catálogo de Videojuegos

Sistema de gestión de inventario de videojuegos desarrollado con una arquitectura desacoplada: **Spring Boot** en el Back End y **React (Vite)** en el Front End, con persistencia relacional en **MySQL**.

## Integrantes
* **Estudiante:** Manuel Alejandro Villegas Grajales
* **Asignatura:** Desarrollo de Software 2

---

## Arquitectura del Proyecto

El repositorio está estructurado de la siguiente forma:

* `/src`: Código fuente del Back End en Java (Spring Boot, Spring Data JPA).
* `/frontend-react`: Aplicación de Front End desarrollada en React + Vite.
* `/src/main/resources/static`: Interfaz estática previa (Vanilla JS).

---

## Tecnologías Utilizadas

* **Back End:** Java 17, Spring Boot 3.4.x, Spring Data JPA, Hibernate, Maven.
* **Base de Datos:** MySQL (XAMPP).
* **Front End:** React, Vite, Axios, CSS3.
* **Pruebas Automatizadas:** Vitest, React Testing Library.

---

## Guía de Instalación y Ejecución

### 1. Base de Datos (MySQL)
1. Iniciar el módulo MySQL en **XAMPP**.
2. Crear la base de datos vacía llamada `videojuegos` desde phpMyAdmin.

### 2. Back End (Spring Boot)
1. Importar el proyecto en Eclipse como **Existing Maven Project**.
2. Verificar las credenciales en `src/main/resources/application.properties`.
3. Ejecutar la clase principal `CatalogoVideojuegosApplication.java`.
4. El servidor REST estará disponible en `http://localhost:8080/api/videojuegos`.

### 3. Front End (React)
1. Abrir una terminal en la carpeta `frontend-react/`.
2. Instalar dependencias si es necesario:
   ```bash
   npm install