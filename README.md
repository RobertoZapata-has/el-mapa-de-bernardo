# El mapa de Bernardo

Un juego de combinar fichas (match-3) que recorre los lugares turísticos de Mendoza siguiendo una búsqueda del tesoro: dos nietos, dos mitades de un mapa y un secreto que sus abuelos, Bernardo y Roberto, escondieron hace cincuenta años.

**Jugar:** https://robertozapata-has.github.io/el-mapa-de-bernardo/

## Capítulos

| # | Lugar | Objeto |
|---|---|---|
| Prólogo | Córdoba | La gorra de oficial |
| 1 | La finca de Bernardo, Maipú | El cuaderno de Bernardo |
| 2 | Ruinas de San Francisco | El mapa completo |
| 3 | Cerro de la Gloria | Primer fragmento |
| 4 | Villavicencio | Segundo fragmento |
| 5 | Potrerillos | Tercer fragmento |
| 6 | El Trasandino, Puente del Inca | El boleto del Trasandino |
| 7 | Cristo Redentor | Cuarto fragmento |
| 8 | Valle de Uco | Quinto fragmento |
| 9 | Cañón del Atuel | Sexto fragmento |
| Final | La Payunia, Malargüe | La Llave del Agua |

## Cómo está hecho

- `index.html`: todo el juego. El tablero usa [Phaser 3](https://phaser.io/) (desde cdnjs); los diálogos, el mapa y la carta son HTML y CSS.
- `img/`: fondos, personajes, fichas, la Llave y sus fragmentos.
- La lógica del tablero (combinaciones, fichas especiales, caída) está en el bloque `<script id="logic">`, separada del dibujo.
- El sonido se genera en el navegador con Web Audio, sin archivos: la guitarra usa síntesis de cuerda pulsada.
- El progreso se guarda en el navegador de cada jugador.

## Fichas especiales

- **4 en línea:** ficha rayada que limpia una fila o una columna.
- **En forma de L o T:** ficha que limpia fila y columna.
- **5 en línea:** la Llave. Intercambiala con cualquier ficha y se lleva todas las de ese tipo.

---

En memoria de Bernardo y de Roberto.
