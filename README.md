# DLabyrinth_Royale_JeR
**Documento de Diseño del Juego:**

**CONCEPTO**  
**Título:** DLabyrinth_Royale.  
**Estudio/Diseñadores:**  RAM Studios - Adrián Poza Guillermo, Manuel Martín Rodríguez, Rafael Tomé Ruiz  
**Plataforma:** PC  
**Sinopsis de Jugabilidad y Contenido:** Supervivencia. Tu personaje aparece en un mapa predefinido con nada encima. Debe sobrevivir a los demás jugadores.  
**Categoría:** Battle Royale de vista cenital.  
**Mecánica:** Supervivencia en un mapa 2D. El jugador deberá coger armas repartidas por el mapa y ser el último personaje en pie.  
**Tecnología:** Navegador web (Javascript), teclado y un ordenador de gama baja-media.  
**Público:** Personas competitivas.  
**Versión del documento:** 1.3 (26-09-2018) (Añadido Matchmaking y chat)  
**VISIÓN GENERAL DEL JUEGO:** DLabyrinth es un trepidante juego de battle royale que pondrá a prueba la capacidad de supervivencia del jugador en un entorno en 2D en forma de laberinto. Cada jugador deberá eliminar a sus contrincantes y tratar de ser el último superviviente. La munición y recursos son limitados y deben usarse con cierta estrategia para ganar ventaja.  

**MECÁNICA DEL JUEGO**  
**Mecánicas generales:** Nuestro perosnaje podrá moverse, recoger armas y comida del suelo y meterlas en el inventario y recoger cápsulas de escudo y utilizarlas (¨no se pueden almacenar). También se pueden ultilizar las armas, como apuñalar con el cuchillo o disparar con las armas de fuego.
EL juego implementa un radio de visión. Nuestro personaje solo podrá ver lo que hay en un circulo predefinido alrededor del el.
Cogiendo una linterna del mapa podremos aumentar este rango de visón mientras la llevemos en el inventario.
Las armas tienen un rango limitado dependiendo del tipo de arma.
Si eres golpeado por un proyectil el juego te indica la dirección por la que venía ese proyectil.  
![Error al Cargar](/Assests/diagrama_juego.png)  
**Cámara:** Cámara de vista cenital. Juego en 2D. La cámara se desplazará en función del movimiento del personaje manejado por el usuario.  
**Periféricos:** Teclado.  
**Controles:** W-Avanzar, S-Retroceder, A-Girar antihorario, D-Girar Horario, Spacebar- Disparar, E-Recoger cosas del suelo, Q-Cambiar entre las armas disponibles.  
**Puntuación:** La puntuación inicial será 0. En cada ronda de la partida se sumarán los puntos correspondientes a tu posición según los jugadores que hayas aniquilado. Al final de la partida se mostrará un Ladder Board. 
**Match-Making:** EL juego incorpora un sistema de búsqueda por región, para minimizar el ping. El juego tiene un sistema de puntuación interna y empareja a los usuarios dentro de un abanico, desde las puntuaciones mas bajas hasta las mas altas (en una partida no podrán coincidir los 8 mejores jugadores o los 8 peores, por ejemplo).  
**Chat interno:** El juego incorpora un chat tanto en el lobby como en la propia partida. Los jugadores eliminados no podrá utilizar el chat.  
**Guardar/Cargar:** Al ser un juego multijugador en tiempo real no se pueden guardar ni cargar partidas.

**FLUJO DE JUEGO:** Al abrir el juego se nos presenta el menú principal. En él el jugador podrá elegir entre varias opciones como modificar los controles, el sonido, visitar los créditos y salir de la aplicación así como comenzar una partida.
Al escoger comenzar partida el jugador será colocado en un "lobby". Deberá esperar a que este se llene de otros jugadores para poder comenzar.
Al empezar la partida jugable nuestro personaje aparecerá en una zona aleatoria de un mapa aleatorio elegido previamente. Comenzaremos con un cuchillo en nuestro inventario, con la vida completa y el medidor de escudos a 0. A partir de aquí nuestro objetivo será ser los ultimos supervivientes de la partida. Para ello tenemos la opción de eliminar a los jugadores enemigos. 
El jugador podra recoger armas que aparecen aleatoriamente en el mapa, munición para las armas, asi como comida para recuperar puntos de salud y cápsulas energéticas, que rellenaran nuestro nivel de escudo hasta alcanzar el tope. En nuestro inventario podremos almacenar hasta dos armas de fuego además del cuchillo inicial así como 2 unidades de comida. Las cápsulas de escudo no son almacenables.
Golpear a otros jugadores con algún arma les provocará daños dependiendo del arma utilizada. Si los puntos de vida alcanzan el 0 el personaje morirá. AL morir el jugador tiene la opción de seguir viendo la partida hasta finalizar la ronda.
Cuando solo quede un jugador en pie la ronda terminará, se mostrará una pantalla con las puntuaciones tras lo cual comenzará la nueva ronda. Tras la tercera ronda, se acaba la partida y aparecen los nombre de los jugadores en la tres primeras posiciones. Se vuelve al menú principal.

**ESTADOS DEL JUEGO:**  El juego dispondrá de un menú inicial con las siguientes opciones: Batalla (online), Opciones, Créditos y Salir. Dentro del juego se podrá expandir un menú (tecla escape) con la opción de salir de la batalla.  

![Error al Cargar](/Assests/Untitled_Diagram.png)  

![Error al Cargar](/Assests/menu_principal(2).png)  

![Error al Cargar](/Assests/opciones.png)  

![Error al Cargar](/Assests/menu_pausa.png)  

![Error al Cargar](/Assests/final_ronda.png)  


**INTERFACES:** Estilo 2D basado en sprites. Diseño y temática de color todavía por decidir  
**Nombre de la Pantalla:** Menú principal.  
**Descripción de la Pantalla:** Permite empezar una nueva partida, configurar las opciones del juego, mirar los controles, consultar los créditos o bien salir del juego.  
**Estados de la pantalla:** Al iniciar el juego se entra a esta pantalla.  

**Nombre de la Pantalla:** Opciones.  
**Descripción de la pantalla:** Se podrá configurar si quitar o no el sonido y posiblemente algunas opciones gráficas.  
**Estado de la pantalla:** Al pulsar en Opciones desde el menú principal se accede a este submenú. Tiene la opción de volver al menú principal.  

**Nombre de la pantalla:** Salir  
**Descripción de la pantalla:** Si le das a “Ok” el juego te mandará a la pantalla principal (menú de inicio) y te desconectaras de la partida actual.  
**Estado de la pantalla:** Se accede pulsando “Esc” en el teclado una vez dentro de una partida.  
**Nombre de la pantalla:** Controles  
**Descripción de la pantalla:** Muestra una imagen de los controles.  
**Estado de la pantalla:** Se accede al pulsar en “Controles” en el menú principal.  
**NIVELES:** Solo hay un nivel, el mapa en el que se desarrolla la batalla. Hay más de una temática para el mapa, pero sólo cambia su forma y el aspecto visual.  
**Título del Nivel:** Labyrinth.  
**Encuentro:** No hay ningún tutorial, se aprende palmando. Al nivel se accede al escoger la opción de Jugar del menú principal.  
**Objetivos:** El jugador debe ser el último jugador vivo al final de la partida. Al terminarla se mostrará un mensaje de victoria y se volverá al menú principal  
**Enemigos:** El resto de jugadores en el laberinto son los enemigos. Se trata de un todos contra todos. Cada jugador dispondrá de un personaje para diferenciar entre cada usuario.  
**Items:** Pueden recogerse por el laberinto diferentes objetos y recursos: munición, vida, armas.  
**Música y Efectos de Sonido:** Efectos de disparos para las diferentes armas, recogida de objetos y melodía de victoria.  
**Referencias de BGM y SFX:** Sonidos de libre distribución descargados a través de la web.  
**PROGRESO DEL JUEGO:** Se entra al juego y aparece el menú principal. Si se elige comenzar una partida se nos incluirá en un “lobby” hasta que alcancemos el número necesario de jugadores para comenzar la partida. Cuando alguno de estos jugadores gane la partida terminará.  
**PERSONAJES:** Tu avatar de jugador. (Por definir cuántos personajes habrá)  
*Personaje de ejemplo:*  
![Error al cargar](/Assests/personajes/esqueleto_con_corbata_recortado.png)  
**ENEMIGOS:** El avatar del resto de jugadores. (Un máximo de 8 jugadores, es decir, 7 enemigos)  
**ARMAS:** Metralleta, Pistola, Bazooka, Rifle láser, minas. Aparecen aleatoriamente en ciertos puntos del mapa. La metralleta, pistola y bazooka tienen un rango corto-medio de disparo (un par de cuadros más allá del rango de visión). El rifle láser tiene rango largo, el disparo aguanta 5 cuadros más allá del rango de visión. Las minas se colocan por el mapa y sólo son visibles por el jugador que las colocó (cuidado al pasar por encima porque también le explotan a él).  
  *Daño de las armas:* Metralleta: un corazón (o escudo) por cada ráfaga. Pistola: un corazón (o uno de escudo) por disparo. Bazooka: dos corazones (o escudos) por disparo. Mina: dos corazones (o escudos) por mina pisada.  
**ITEMS:** Botiquín de primeros auxilios, linterna, baterías para escudo portátil.  
  *Arbustos en los mapas:* los jugadores podrán esconderse dentro de los arbustos que están repartidos por el mapa, de manera que no serán visibles a ojo de otro usuario a no ser que disparen, se vuelvan a mover o les alcance un disparo.  
**LOGROS:** Posiblemente a añadir en futuras versiones.  
**MÚSICA Y SONIDOS:** La música y/o sonidos que se usarán en el juego, nombre, descripción junto con un número de referencia. Si es música de fondo, la referencia debe de empezar con una ‘M’ seguida de un número en secuencia. Si es un efecto de sonido, empezar con ‘S’. (A añadir en futuras versiones)  
**IMÁGENES DE CONCEPTO:** Concept Art - A añadir en futuras versiones  
  
**DETALLES DE PRODUCCIÓN**  
**Fecha de Inicio:** 26/09/2018  
**Fecha de Terminación:** ¿Cuándo termina la etapa de Producción del proyecto?  
**Presupuesto:** Pagamos por venir a clase.  

**EJEMPLOS DEL JUEGO:**  
*Contenido del mapa:*
![Error al cargar](/Assests/tiles3.png)

*Mapa:*
![Error al cargar](/Assests/underdwell-level-1.png)


**Integrantes del grupo:**  
*Rafael Tomé Ruiz   r.tome.2016@alumnos.urjc.es   MRxRafi - Programador  
Adrián Poza Guillermo   a.poza.2016@alumnos.urjc.es    apozag - Diseñador y programador  
Manuel Martín Rodriguez   m.martinrodr.2016@alumnos.urjc.es    Astarhel - Programador*  
  
**Link al tablero Trello:**  
https://trello.com/b/uw2mn1GI/juegos-en-red
