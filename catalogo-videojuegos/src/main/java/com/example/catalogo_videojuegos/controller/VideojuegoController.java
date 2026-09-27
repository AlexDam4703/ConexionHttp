package com.example.catalogo_videojuegos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.catalogo_videojuegos.model.Videojuego;
import com.example.catalogo_videojuegos.service.VideojuegoService;

@RestController
@RequestMapping("/api/videojuegos")
@CrossOrigin(origins = "*")
public class VideojuegoController {

    @Autowired
    private VideojuegoService videojuegoService;

    // GET: Obtener todos los videojuegos -> http://localhost:8080/api/videojuegos
    @GetMapping
    public List<Videojuego> obtenerTodos() {
        return videojuegoService.obtenerTodos();
    }

    // GET: Obtener un videojuego por ID -> http://localhost:8080/api/videojuegos/1
    @GetMapping("/{id}")
    public ResponseEntity<Videojuego> obtenerPorId(@PathVariable Long id) {
        return videojuegoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Guardar un nuevo videojuego
    @PostMapping
    public Videojuego guardar(@RequestBody Videojuego videojuego) {
        return videojuegoService.guardar(videojuego);
    }

    // PUT: Actualizar un videojuego existente
    @PutMapping("/{id}")
    public ResponseEntity<Videojuego> actualizar(@PathVariable Long id, @RequestBody Videojuego videojuegoDetalles) {
        return videojuegoService.obtenerPorId(id)
                .map(videojuego -> {
                    videojuego.setTitulo(videojuegoDetalles.getTitulo());
                    videojuego.setGenero(videojuegoDetalles.getGenero());
                    videojuego.setPlataforma(videojuegoDetalles.getPlataforma());
                    videojuego.setPrecio(videojuegoDetalles.getPrecio());
                    Videojuego actualizado = videojuegoService.guardar(videojuego);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Eliminar un videojuego por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (videojuegoService.obtenerPorId(id).isPresent()) {
            videojuegoService.eliminar(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}