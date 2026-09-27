package com.example.catalogo_videojuegos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.catalogo_videojuegos.model.Videojuego;

@Repository
public interface VideojuegoRepository extends JpaRepository<Videojuego, Long> {
}