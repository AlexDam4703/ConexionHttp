import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('Renderiza el título principal del catálogo de videojuegos', () => {
  render(<App />);
  const tituloElemento = screen.getByText(/Catálogo de Videojuegos \(React\)/i);
  expect(tituloElemento).toBeDefined();
});

test('Muestra el formulario para añadir un nuevo videojuego', () => {
  render(<App />);
  const botonAgregar = screen.getByText(/Agregar Al Catálogo/i);
  expect(botonAgregar).toBeDefined();
});