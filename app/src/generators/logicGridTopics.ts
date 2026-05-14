/**
 * Banco de categorías y elementos para generar puzzles Logic Grid.
 * Cada categoría tiene un mínimo de 5 elementos (suficiente para hard 4x4).
 */
export interface Topic {
  name: string;
  items: string[];
}

export const TOPICS: Topic[] = [
  { name: 'Persona',     items: ['Ana', 'Bob', 'Carlos', 'Diana', 'Elena'] },
  { name: 'Profesión',   items: ['Médico', 'Profesor', 'Ingeniero', 'Artista', 'Cocinero'] },
  { name: 'Ciudad',      items: ['Madrid', 'París', 'Roma', 'Berlín', 'Londres'] },
  { name: 'Color',       items: ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Morado'] },
  { name: 'Deporte',     items: ['Fútbol', 'Tenis', 'Natación', 'Ciclismo', 'Boxeo'] },
  { name: 'Mascota',     items: ['Perro', 'Gato', 'Pez', 'Conejo', 'Tortuga'] },
  { name: 'Día',         items: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] },
  { name: 'Bebida',      items: ['Café', 'Té', 'Agua', 'Zumo', 'Cerveza'] },
];
