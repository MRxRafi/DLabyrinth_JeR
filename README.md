# DLabyrinth_Royale_JeR
**Documento de Diseño del Juego:**
~~~
CONCEPTO  
~~~
**Título:** DLabyrinth_Royale.  
**Estudio/Diseñadores:**  RAM Studios - Adrián Poza Guillermo, Manuel Martín Rodríguez, Rafael Tomé Ruiz  
**Plataforma:** PC  
**Sinopsis de Jugabilidad y Contenido:** Supervivencia. Tu personaje aparece en un mapa predefinido sin armas. Debe sobrevivir a los demás jugadores.  
**Categoría:** Battle Royale de vista cenital.  
**Mecánica:** Supervivencia en un mapa 2D. El jugador deberá coger armas repartidas por el mapa y ser el último personaje en pie.  
**Tecnología:** Navegador web (Javascript), teclado y un ordenador de gama baja-media.  
**Público:** Personas competitivas.  
**Versión del documento:** 1.4.1 (03-11-2018) Cambiada la ruta de las imágenes  
**VISIÓN GENERAL DEL JUEGO:** DLabyrinth es un trepidante juego de battle royale que pondrá a prueba la capacidad de supervivencia del jugador en un entorno en 2D en forma de laberinto. Cada jugador deberá eliminar a sus contrincantes y tratar de ser el último superviviente. La munición y recursos son limitados y deben usarse con cierta estrategia para ganar ventaja.  
  
 ~~~
MECÁNICA DEL JUEGO  
~~~
**Mecánicas generales:** Nuestro personaje podrá moverse, recoger módulos de armas y comida del suelo y meterlas en el inventario y recoger cápsulas de escudo y utilizarlas (no se pueden almacenar). También se pueden ultilizar los módulos de armas, como utilizar los módulos con un orbe que orbita alrededor del jugador. Inicialmente, el jugador sólo dispone de sus propios puños para hacer frente al resto de usuarios.  
EL juego implementa un radio de visión. Nuestro personaje solo podrá ver lo que hay en un circulo predefinido alrededor del el.
Cogiendo una linterna del mapa podremos aumentar este rango de visón mientras la llevemos en el inventario.  
Las armas tienen un rango limitado dependiendo del tipo de arma.  
El personaje en sí no es el que lleva las armas; por armas nos referimos a módulos que se insertan en un orbe que pertenece al personaje. Éste orbe es el que dispara.  
Si eres golpeado por un proyectil el juego te indica la dirección por la que venía ese proyectil.  
El jugador dispone de un pequeño minimapa.  
Para prevenir que los jugadores se aburran y no se encuentren en el mapa, cada cierto tiempo se cerrarán zonas del mapa. Primera fase: 1 minuto y medio (se da el aviso de que hay habitaciones que están por cerrarse y se mostrarán en el minimapa). Segunda fase: 1 minuto (se cierra una cuarta parte aproximadamente de las habitaciones). Tercera fase: 2 minutos (se cierra otro tercio de las habitaciones). Cuarta y última fase: 1 minuto y medio (se cierran todas las habitaciones y sólo quedan los pasillos principales).
![Error al Cargar](/DLabyrinth/antiguo_assets/diagrama_juego1.png)  
**Cámara:** Cámara de vista cenital. Juego en 2D. La cámara se desplazará en función del movimiento del personaje manejado por el usuario.  
**Periféricos:** Teclado.  
**Controles:** W-Arriba, S-Abajo, A-Izquierda, D-Derecha, Spacebar- Disparar, E-Recoger cosas del suelo, Q-Cambiar entre las armas disponibles.  
**Puntuación:** La puntuación inicial será 0. En cada ronda de la partida se sumarán los puntos correspondientes a tu posición según los jugadores que hayas aniquilado. Al final de la partida se mostrará un Ladder Board.  
**Match-Making:** EL juego incorpora un sistema de búsqueda por región, para minimizar el ping. El juego tiene un sistema de puntuación interna y empareja a los usuarios dentro de un abanico, desde las puntuaciones mas bajas hasta las mas altas (en una partida no podrán coincidir los 8 mejores jugadores o los 8 peores, por ejemplo).  
**Chat interno:** El juego incorpora un chat tanto en el lobby como en la propia partida. Los jugadores eliminados no podrá utilizar el chat.  
**Guardar/Cargar:** Al ser un juego multijugador en tiempo real no se pueden guardar ni cargar partidas.
  
~~~
FLUJO DE JUEGO:  
~~~
Al abrir el juego se nos presenta el menú principal. En él el jugador podrá elegir entre varias opciones como ver los controles, el sonido, visitar los créditos y salir de la aplicación así como comenzar una partida.
Al escoger comenzar partida el jugador será colocado en un "lobby". Deberá esperar a que este se llene de otros jugadores para poder comenzar.
Al empezar la partida jugable nuestro personaje aparecerá en una zona aleatoria de un mapa aleatorio elegido previamente. Comenzaremos con los puños, con la vida completa y el medidor de escudos a 0. A partir de aquí nuestro objetivo será ser los ultimos supervivientes de la partida. Para ello tenemos la opción de eliminar a los jugadores enemigos. 
El jugador podra recoger los módulos de armas que aparecen aleatoriamente en el mapa, munición para las armas, asi como comida para recuperar puntos de salud y cápsulas energéticas, que rellenaran nuestro nivel de escudo hasta alcanzar el tope. En nuestro inventario podremos almacenar hasta dos módulos de armas de fuego además de los propios puños del personaje así como 2 unidades de comida. Las cápsulas de escudo no son almacenables.
Golpear a otros jugadores con algún arma les provocará daños dependiendo del arma utilizada. Si los puntos de vida alcanzan el 0 el personaje morirá. AL morir el jugador tiene la opción de seguir viendo la partida hasta finalizar la ronda.
Cuando solo quede un jugador en pie la ronda terminará, se mostrará una pantalla con las puntuaciones tras lo cual comenzará la nueva ronda. Tras la tercera ronda, se acaba la partida y aparecen los nombre de los jugadores en la tres primeras posiciones. Se vuelve al menú principal.  

~~~
INTERFACES:
~~~
Estilo 2D basado en sprites. Diseño y temática de color todavía por decidir  
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

~~~
DIAGRAMAS DE LAS INTERFACES:
~~~
El juego dispondrá de un menú inicial con las siguientes opciones: Batalla (online), Opciones, Créditos y Salir. Dentro del juego se podrá expandir un menú (tecla escape) con la opción de salir de la batalla.  

![Error al Cargar](/DLabyrinth/antiguo_assets/Untitled_Diagram2.png)  
![Error al Cargar](/DLabyrinth/antiguo_assets/menu_principal(2).png)  
![Error al Cargar](/DLabyrinth/antiguo_assets/opciones.png)  
![Error al Cargar](/DLabyrinth/antiguo_assets/menu_pausa.png)  
![Error al Cargar](/DLabyrinth/antiguo_assets/final_ronda.png)  

~~~
DIAGRAMA DE CLASES DE API REST
~~~
Esta es la relación de las clases de nuestro API REST.

![Error al Cargar](/DLabyrinth/antiguo_assets/diagrama_clases.png)
~~~
ESTADOS DEL JUEGO  
~~~

1. **Boot:** Inicia físicas principales del juego  
2. **Preload:** Carga assets del juego
![Error al Cargar](/DLabyrinth/antiguo_assets/Loading_state.png)  
3. **Menu:** Estado intermedio en el que hay 4 botones:  
  -*Jugar* te manda a matchingState.  
  -*Opciones* te manda a optionState.  
  -*Stats* te manda a statsState.  
  -*Salir* te manda a endingState.  
  ![Error al Cargar](/DLabyrinth/antiguo_assets/Pantalla_Menu.png)  
4. **Opciones:** puedes mirar los controles del juego y algunas opciones de sonido. Se puede volver al menuState pulsando sobre "Volver al menú principal".  
![Error al Cargar](/DLabyrinth/antiguo_assets/Pantalla_Opciones.png)  
5. **Stats:** aparecen puntuaciones de la partida anterior (todavía por decidir) 
6. **Jugar:** en matchingState se espera a que el emparejador encuentre los jugadores. Después, si ha sido satisfactorio, te manda al levelState.  
7. **Matching** busca jugadores, cuando encuentra los necesarios comienza el levelState.
![Error al Cargar](/DLabyrinth/antiguo_assets/Pantalla_Matchmaking.png)  
8. **Partida** partida jugable.
![Error al Cargar](/DLabyrinth/antiguo_assets/Pantalla_Partida.png)  
9. **Salir:** agradecimientos por jugar, y se cierra la aplicación.  
![Error al Cargar](/DLabyrinth/antiguo_assets/Pantalla_ending.png)  

~~~
NIVELES:
~~~
Solo hay un nivel, el mapa en el que se desarrolla la batalla. Hay más de una temática para el mapa, pero sólo cambia su forma y el aspecto visual.  
**Título del Nivel:** Labyrinth.  
**Encuentro:** No hay ningún tutorial, se aprende palmando. Al nivel se accede al escoger la opción de Jugar del menú principal.  
**Objetivos:** El jugador debe ser el último jugador vivo al final de la partida. Al terminarla se mostrará un mensaje de victoria y se volverá al menú principal  
**Items:** Pueden recogerse por el laberinto diferentes objetos y recursos: munición, vida, módulos de armas.  
  
~~~
SONIDO:
~~~
**Música y Efectos de Sonido:** Efectos de disparos para las diferentes armas, recogida de objetos y melodía de victoria.  
**Referencias de BGM y SFX:** Sonidos de libre distribución descargados a través de la web.  
  
~~~
PROGRESO DEL JUEGO:
~~~
Se entra al juego y aparece el menú principal. Si se elige comenzar una partida se nos incluirá en un “lobby” hasta que alcancemos el número necesario de jugadores para comenzar la partida. Cuando alguno de estos jugadores gane la partida terminará.  

~~~
PERSONAJES:
~~~
Tu avatar de jugador. (Por definir cuántos personajes habrá, mínimo 8 para diferenciar entre los usuarios)  
*Personaje de ejemplo:*  
![Error al cargar](/DLabyrinth/antiguo_assets/personajes/esqueleto_con_corbata_recortado.png)  
**Enemigos:** El avatar del resto de jugadores. (Un máximo de 8 jugadores, es decir, 7 enemigos)  
~~~
ARMAS:
~~~
Metralleta, Pistola, Bazooka, Rifle láser, minas. Aparecen aleatoriamente en ciertos puntos del mapa. La metralleta, pistola y bazooka tienen un rango corto-medio de disparo (un par de cuadros más allá del rango de visión). El rifle láser tiene rango largo, el disparo aguanta 5 cuadros más allá del rango de visión. Las minas se colocan por el mapa y sólo son visibles por el jugador que las colocó (cuidado al pasar por encima porque también le explotan a él).  
Las armas descritas anteriormente son módulos que se incorporan al orbe que pertenece al personaje.
  *Daño de las armas:* Puños: un cuarto de corazón (se visualiza solo cada vez que le quitas medio corazón). Metralleta: un corazón (o escudo) por cada ráfaga. Pistola: un corazón (o uno de escudo) por disparo. Bazooka: dos corazones (o escudos) por disparo. Mina: dos corazones (o escudos) por mina pisada.  
  
~~~
ITEMS:
~~~
Botiquín de primeros auxilios, linterna, baterías para escudo portátil.  
  *Rendijas en los mapas:* los jugadores podrán esconderse dentro de las rendijas que están repartidos por el mapa, de manera que no serán visibles a ojo de otro usuario a no ser que disparen, se vuelvan a mover o les alcance un disparo.  
  
~~~
IMÁGENES DE CONCEPTO:
~~~
Concept Art - A añadir en futuras versiones  
  
~~~
DETALLES DE PRODUCCIÓN
~~~
**Fecha de Inicio:** 26/09/2018  
**Fecha de Finalización:** ¿Cuándo termina la etapa de Producción del proyecto?  

~~~
EJEMPLOS DEL JUEGO:
~~~
*Contenido del mapa:*
![Error al cargar](/DLabyrinth/antiguo_assets/tiles3.png)

*Mapa:*
![Error al cargar](/DLabyrinth/antiguo_assets/underdwell-level-1.png)


~~~
Integrantes del grupo:
~~~
*Rafael Tomé Ruiz   r.tome.2016@alumnos.urjc.es   MRxRafi - Programador  
Adrián Poza Guillermo   a.poza.2016@alumnos.urjc.es    apozag - Diseñador y programador  
Manuel Martín Rodriguez   m.martinrodr.2016@alumnos.urjc.es    Astarhel - Programador*  
  
**Link al tablero Trello:**  
https://trello.com/b/uw2mn1GI/juegos-en-red
