# El mapa de Bernardo

Un juego de combinar fichas (match-3) que recorre los lugares turísticos de Mendoza siguiendo una búsqueda del tesoro: dos nietos, dos mitades de un mapa y un secreto que sus abuelos, Bernardo y Roberto, escondieron hace cincuenta años.

**Jugar:** https://robertozapata-has.github.io/el-mapa-de-bernardo/

Se puede instalar en el celular con el botón "Instalar en el celular" de la portada (en iPhone: Compartir → Agregar a inicio). Una vez instalado, funciona sin internet.

## Capítulos

100 niveles en 25 lugares y 4 actos, con 4 niveles por lugar.

| # | Lugar | Objeto |
|---|---|---|
| | **Acto 1 · La ciudad** | |
| Prólogo | Córdoba | La gorra de oficial |
| 1 | El olivo de Bernardo, Maipú | El cuaderno de Bernardo |
| 2 | Ruinas de San Francisco | El mapa completo |
| 3 | Plaza Independencia | La moneda agujereada |
| 4 | Parque y Lago | La entrada de la Vendimia |
| 5 | Cerro de la Gloria | Primer fragmento |
| 6 | Bodega en Chacras de Coria | El corcho de la barrica 1974 |
| | **Acto 2 · La cordillera** | |
| 7 | Villavicencio | Segundo fragmento |
| 8 | Termas de Cacheuta | El termo de Roberto |
| 9 | Potrerillos | Tercer fragmento |
| 10 | Uspallata, las Bóvedas | La nota de Octavio |
| 11 | El Trasandino | El boleto del Trasandino |
| 12 | Laguna de Horcones, Aconcagua | La brújula de Roberto |
| 13 | Cristo Redentor | Cuarto fragmento |
| | **Acto 3 · El valle** | |
| 14 | Manzano Histórico | La foto de los tres hijos |
| 15 | Laguna del Diamante | La piedra que flota |
| 16 | Valle de Uco | Quinto fragmento |
| 17 | Cañón del Atuel | Sexto fragmento |
| 18 | Los Reyunos | La servilleta del acuerdo |
| | **Acto 4 · El origen** | |
| 19 | Caverna de las Brujas | El farol de minero |
| 20 | Castillos de Pincheira | La herradura vieja |
| 21 | Laguna de Llancanelo | La pluma de flamenco |
| 22 | La Payunia (la carta) | La Llave del Agua |
| 23 | Lagunas de Guanacache | La balsa de totora |
| Epílogo | El olivo, otra vez | La foto de los dos abuelos |

## Cómo está hecho

- `index.html`: todo el juego. El tablero usa [Phaser 3](https://phaser.io/) (desde cdnjs); los diálogos, el mapa y la carta son HTML y CSS.
- `img/`: fondos, personajes, fichas, la Llave y sus fragmentos.
- La lógica del tablero (combinaciones, fichas especiales, caída) está en el bloque `<script id="logic">`, separada del dibujo.
- El sonido se genera en el navegador con Web Audio, sin archivos: la guitarra usa síntesis de cuerda pulsada.
- El progreso se guarda en el navegador de cada jugador.
- `manifest.webmanifest`, `sw.js` e `icons/`: lo que hace falta para instalarlo como app y jugar sin conexión. Si cambiás imágenes o el juego, subí la versión en `VERSION` dentro de `sw.js` para que los celulares bajen lo nuevo.

## Niveles

Cada lugar tiene 4 niveles:

1. **Juntar fichas.** Empieza con la escena de llegada.
2. **El obstáculo del lugar:** suelo para limpiar (tierra seca, arena, nieve, polvo, ceniza) o piedras para romper.
3. **Lo nuevo de cada acto:**
   - Acto 1, **alambre de viña:** fichas atadas que no se mueven ni caen; se sueltan al juntarlas.
   - Acto 2, **barriles y niebla:** los barriles aguantan 3 golpes y sueltan monedas; la niebla tapa casillas hasta que rompés algo al lado.
   - Acto 3, **maleza:** no se mueve y, si en una jugada no rompés ninguna, crece sobre una ficha vecina.
   - Acto 4, **acequias:** el agua entra por arriba y corre por donde no hay tierra; hay que abrirle camino hasta abajo.
4. **Bajar la cajita de Bernardo** hasta la fila de abajo. Al ganarlo se consigue el objeto del lugar y sigue la historia.

Cada 10 niveles hay uno **especial**, con menos jugadas, una barra de carrera y 100 monedas de premio la primera vez: contra el reloj (10), contra Octavio (20, 30 y 70), el agua que sube (40), viento blanco (50), de noche (60), se apaga la linterna (80), armar la Llave (90). El 100 es el último: hacer correr el agua al pie del olivo.

Los niveles están en la constante `LEVELS` dentro de `index.html`. El progreso de quienes ya jugaban se conserva.

## Tableros con forma y niveles largos

- Algunos niveles tienen tableros con forma (rombo, cruz, copa, escalera, con ventanas...). Están en `SHAPES`, dentro de la lógica del tablero; en cada nivel se eligen con `shape`.
- Los niveles largos tienen 2 o 3 pantallas hacia abajo o al costado (`screens` y `dir` en el nivel). Al empezar se ve el tablero entero y después la cámara baja a la primera pantalla; al limpiar los obstáculos de una pantalla, pasa a la siguiente.

## Sonido y caras

- Cada acto tiene su música, en tono mayor: guitarra y quena en la ciudad, el tren con armónica en la cordillera, marimba de chacarera en el valle y quena en el origen. La melodía cambia en cada lugar.
- Las fichas suenan distinto según el acto (en la cordillera, a tren). El Volcán explota, el Cóndor chilla y el Zonda sopla.
- En los diálogos, el nieto, la nieta, Octavio y doña Rosa cambian de cara (feliz, sorpresa, serio o normal) según lo que dicen. Se puede forzar una cara escribiendo, por ejemplo, `S('nieta:serio', ...)`.

## Perfil

Al tocar JUGAR por primera vez, el juego pregunta el nombre, cómo festejarte ("¡Qué genio!", "¡Qué genia!" o "¡Qué crack!") y la edad. El nombre aparece en los festejos y en la portada. La edad queda guardada para el día que el juego tenga publicidad: a los menores de 13 no se les puede mostrar publicidad personalizada. Todo se guarda solo en el celular y se cambia desde Opciones → Tu perfil.

## Boosters

| Cómo se arma | Booster | Qué hace |
|---|---|---|
| 4 en línea | Zonda | Barre una fila o una columna |
| Cuadrado de 4 | Cóndor | Rompe su cruz y vuela a una ficha que falte para el objetivo |
| Forma de L o T | Volcán | Explota y rompe todo alrededor |
| 5 en línea | La Llave | Se lleva todas las fichas de un color |

Se activan tocándolos o deslizándolos. Dos boosters juntos se combinan: Zonda + Zonda hace una cruz, Zonda + Volcán barre tres filas y tres columnas, Volcán + Volcán hace una explosión enorme, el Cóndor lleva en las patas al otro booster, la Llave convierte todo un color en el otro booster, y dos Llaves limpian el tablero. Las jugadas que sobran al ganar se vuelven Zondas.

## Pantalla principal y escenas

- El mapa es la pantalla principal y tiene un dibujo por acto (`mapa_ciudad`, `mapa_ruta7`, `mapa_valle` y `mapa_sur`). Cada lugar es un punto sobre el dibujo, con el siguiente marcado con "Jugar". Abajo están el Mercado, la Mochila y el Premio del día.
- Los diálogos muestran una ilustración de la escena cuando existe la imagen `img/esc_*.jpg` correspondiente (si falta, el diálogo se ve igual que antes).
- Los boosters tienen efectos grandes que se salen del tablero: zoom al armarlos, el Cóndor que despega fuera de la pantalla, la erupción del Volcán y la Llave con rayos.

## Vidas, monedas y mercado

- 5 vidas. Se pierde una al no pasar un nivel (o al salir a mitad de partida) y se recupera una cada 30 minutos.
- Monedas: 25 por nivel ganado + 5 por cada jugada que sobra, y el premio del día.
- Mercado: llenar vidas, boosters para empezar el nivel (Zonda, Volcán, Llave) y herramientas (Pala, Tijera de podar, Guante de cosecha).
- Al quedarte sin jugadas podés comprar +5 jugadas.

---

En memoria de Bernardo y de Roberto.
