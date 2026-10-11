# El mapa de Bernardo

Un juego de combinar fichas (match-3) que recorre los lugares turísticos de Mendoza siguiendo una búsqueda del tesoro: dos nietos, dos mitades de un mapa y un secreto que sus abuelos, Bernardo y Roberto, escondieron hace cincuenta años.

**Jugar:** https://robertozapata-has.github.io/el-mapa-de-bernardo/

Se puede instalar en el celular con el botón "Instalar en el celular" de la portada (en iPhone: Compartir → Agregar a inicio). Una vez instalado, funciona sin internet.

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
- `manifest.webmanifest`, `sw.js` e `icons/`: lo que hace falta para instalarlo como app y jugar sin conexión. Si cambiás imágenes o el juego, subí la versión en `VERSION` dentro de `sw.js` para que los celulares bajen lo nuevo.

## Niveles

Cada lugar tiene 3 niveles (33 en total):

1. **Juntar fichas.** Empieza con la escena de llegada.
2. **El obstáculo del lugar:** suelo para limpiar (tierra seca, arena, nieve, polvo, ceniza) o piedras para romper (ladrillos, piedras, hielo, piedras volcánicas; algunas necesitan dos golpes).
3. **Bajar la cajita de Bernardo** hasta la fila de abajo. Al ganarlo se consigue el objeto del lugar y sigue la historia.

Los niveles están en la constante `LEVELS` dentro de `index.html`.

## Boosters

| Cómo se arma | Booster | Qué hace |
|---|---|---|
| 4 en línea | Zonda | Barre una fila o una columna |
| Cuadrado de 4 | Cóndor | Rompe su cruz y vuela a una ficha que falte para el objetivo |
| Forma de L o T | Volcán | Explota y rompe todo alrededor |
| 5 en línea | La Llave | Se lleva todas las fichas de un color |

Se activan tocándolos o deslizándolos. Dos boosters juntos se combinan: Zonda + Zonda hace una cruz, Zonda + Volcán barre tres filas y tres columnas, Volcán + Volcán hace una explosión enorme, el Cóndor lleva en las patas al otro booster, la Llave convierte todo un color en el otro booster, y dos Llaves limpian el tablero. Las jugadas que sobran al ganar se vuelven Zondas.

## Pantalla principal y escenas

- El mapa de Mendoza es la pantalla principal: cada lugar es un punto sobre el dibujo, con el siguiente capítulo marcado con "Jugar". Abajo están el Mercado, la Mochila y el Premio del día.
- Los diálogos muestran una ilustración de la escena cuando existe la imagen `img/esc_*.jpg` correspondiente (si falta, el diálogo se ve igual que antes).
- Los boosters tienen efectos grandes que se salen del tablero: zoom al armarlos, el Cóndor que despega fuera de la pantalla, la erupción del Volcán y la Llave con rayos.

## Vidas, monedas y mercado

- 5 vidas. Se pierde una al no pasar un nivel (o al salir a mitad de partida) y se recupera una cada 30 minutos.
- Monedas: 25 por nivel ganado + 5 por cada jugada que sobra, y el premio del día.
- Mercado: llenar vidas, boosters para empezar el nivel (Zonda, Volcán, Llave) y herramientas (Pala, Tijera de podar, Guante de cosecha).
- Al quedarte sin jugadas podés comprar +5 jugadas.

---

En memoria de Bernardo y de Roberto.
