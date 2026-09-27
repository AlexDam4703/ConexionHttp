package com.example.catalogo_videojuegos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.catalogo_videojuegos.model.Videojuego;
import com.example.catalogo_videojuegos.repository.VideojuegoRepository;

@Service
public class VideojuegoService {

    @Autowired
    private VideojuegoRepository videojuegoRepository;

    // Obtener todos los videojuegos
    public List<Videojuego> obtenerTodos() {
        return videojuegoRepository.findAll();
    }

    // Obtener un videojuego por su ID
    public Optional<Videojuego> obtenerPorId(Long id) {
        return videojuegoRepository.findById(id);
    }

    // Guardar o actualizar un videojuego
    public Videojuego guardar(Videojuego videojuego) {
        return videojuegoRepository.save(videojuego);
    }

    // Eliminar un videojuego por ID
    public void eliminar(Long id) {
        videojuegoRepository.deleteById(id);
    }
}