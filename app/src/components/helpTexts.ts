/**
 * Textos de ayuda mostrados al pulsar el botón ? en cada juego.
 * Cada puzzle pasa estos textos al GameHeader.
 */

export const HELP = {
  pyramid: {
    title: 'Cómo jugar a Pirámide',
    body: `Cada celda de la pirámide es la suma de las dos celdas inmediatamente debajo.

Algunas celdas ya están dadas. Tu trabajo es deducir las que faltan.

Ejemplo:
       20
      8   12
    3   5   7
  1   2   3   4

Aquí 8 = 3+5, 12 = 5+7, 20 = 8+12.

Toca una celda vacía y usa el teclado para introducir el número.`,
  },

  'logic-grid': {
    title: 'Cómo jugar a Quién es Quién',
    body: `Cada persona se asocia con exactamente UN elemento de cada categoría (deporte, ciudad, etc.).

Tu trabajo: usar las pistas para deducir las asociaciones correctas.

Ejemplo:
Pista: "Ana NO practica fútbol"
Si solo hay 2 deportes (fútbol y tenis), entonces Ana practica tenis.

Usa la tabla "Tu respuesta" (arriba) para marcar tus conclusiones finales — eso es lo que valida el puzzle.

Las tablas auxiliares de abajo te sirven como cuaderno: marca ✓ o ✗ en cada cruce para no perderte.`,
  },

  kakuro: {
    title: 'Cómo jugar a Kakuro',
    body: `Es como un crucigrama, pero con números 1-9.

Cada celda blanca debe contener un dígito.

Las celdas con número diagonal indican la SUMA de los dígitos en su run:
• Número arriba-derecha → suma de las celdas a su DERECHA
• Número abajo-izquierda → suma de las celdas DEBAJO

Reglas:
• No puedes repetir el mismo dígito dentro de un run.
• La suma de cada run debe coincidir.

Ejemplo: si la pista es 7 y el run tiene 2 celdas, las opciones son 1+6, 2+5, 3+4 (sin repetir).`,
  },

  nonogram: {
    title: 'Cómo jugar al Nonograma',
    body: `Pinta las celdas correctas para revelar el dibujo oculto.

Los números en cada fila/columna indican los grupos consecutivos de celdas pintadas, en ese orden.

Ejemplo (fila):
Pista "3 1" → 3 celdas pintadas, al menos 1 vacía, 1 celda pintada.
Posible: ■■■_■__ o _■■■_■_ o __■■■_■

Toca una celda para alternar: vacío → pintado → marcado con × → vacío.

Usa la × para descartar celdas que sabes que están vacías y no perderte.`,
  },

  lanzarrayos: {
    title: 'Cómo jugar a Lanzarrayos',
    body: `Cada cápsula morada tiene un número: el TOTAL de celdas que debe cubrir su rayo (incluida la propia cápsula).

Tu trabajo: para cada cápsula, elegir la dirección del rayo (↑ ↓ ← →) y su longitud.

Reglas:
• Los rayos no se pueden cruzar ni superponer.
• Los rayos no pueden pasar por encima de otra cápsula.
• Cada rayo se extiende en línea recta.

Toca una cápsula para seleccionarla, luego usa los controles de dirección y longitud que aparecen debajo.

Ejemplo: cápsula con número 3 → su rayo cubre 2 celdas más allá de la cápsula (cápsula + 2 = 3).`,
  },

  cruzex: {
    title: 'Cómo jugar a Crúzex',
    body: `Crucigrama numérico: coloca los dígitos 1-9 en el grid.

Reglas:
• Cada fila/columna sin celda negra forma un "run".
• Dentro de un mismo run, no puedes repetir dígitos.

La lista de abajo te da los números (multidígito) que aparecen completos en algún run. Te ayuda a deducir qué dígitos van juntos.

Ejemplo: si en la lista está "537" y hay un run horizontal de 3 celdas en algún sitio, podría ir ahí (pero ¡cuidado con los cruces!).

Toca una celda blanca, usa el teclado para poner el dígito.`,
  },

  clasificaciones: {
    title: 'Cómo jugar a Clasificaciones',
    body: `Tienes la tabla final de una mini-liga de fútbol (G=ganados, E=empatados, P=perdidos, F=goles a favor, C=goles en contra, Pts=puntos).

Tu trabajo: deducir el resultado exacto de cada partido para que cuadre con la tabla.

Recuerda:
• Victoria = 3 puntos, empate = 1, derrota = 0.
• Suma de goles a favor de todos los equipos = suma de goles en contra.
• Suma G+E+P de cada equipo = partidos jugados.

Toca un partido para abrir el editor y elegir los goles (0-5) de cada equipo.`,
  },

  goteo: {
    title: 'Cómo jugar a Goteo',
    body: `Cada columna contiene una letra correcta + algunas distractoras.

Tu trabajo: elegir UNA letra de cada columna para reconstruir la frase oculta.

Toca una letra para seleccionarla (toca de nuevo para deseleccionar).

La frase resultante aparece arriba según vas eligiendo. Cuando todas las letras coinciden con la frase original, ¡has resuelto!

Pista: muchas frases son refranes o expresiones populares en español.`,
  },

  sudoku: {
    title: 'Cómo jugar al Sudoku',
    body: `Rellena el grid de modo que cada FILA, COLUMNA y CAJA contenga todos los dígitos sin repetirse.

Sudoku Clásico (9×9): dígitos 1-9.
Sudoku Mini (6×6): dígitos 1-6, cajas de 2×3.

Variantes:
• Sudoku X: además, las dos diagonales principales tampoco pueden repetir dígitos.
• Sudoku Hyper: tiene 4 cajas extra marcadas en colores; en cada una tampoco se repite ningún dígito.

Las celdas grises son fijas, las blancas son tuyas.

Toca una celda y usa el teclado para introducir el número. Si te equivocas, pulsa "Comprobar" para ver dónde fallaste.`,
  },
} as const;
