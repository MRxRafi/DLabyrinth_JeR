DLabyrinth.levelState = function (game) {

}
var updateTemp;
var players;
var currentPlayer;
var orbes;
var cargado;
var weaponItems;
var ammoItems;
var shieldItems;
var foodItems;
var interfaz;
var map, layer;
var temp, boolUpdate;
var damage_spr;
var vision_spr;
var sendItems;
var first_visible; // Es true cuando acaba de hacerse visible una capa de bloqueo. En la iteración posterior se vuelve false
var map_handler; //Objeto que maneja las habitacioens a cerrar
var playerGroup; //Grupo para los personajes (ordenar su profundidad para que aparezcan detras o delante)
var itemsGroup; //Grupo para los items para que siempre aparezcan detrás del personaje

//audio
var shotAudio;
var pickupAudio;
var eatAudio;
var switchAudio;
var gameplayAudio;
var shieldAudio;
var hitAudio;

DLabyrinth.levelState.prototype = {
    preload: function () {

    },

    create: function () {
    	//botones del ratón
    	game.input.mouse.capture = true;

    	//Audio
    	shotAudio = game.add.audio('shot');
    	pickupAudio = game.add.audio('pickup');
    	eatAudio = game.add.audio('eat');
    	switchAudio = game.add.audio('switch');
    	shieldAudio = game.add.audio('shield');
    	hitAudio = game.add.audio('hit');
    	
    	gameplayAudio = game.add.audio('gameplay');;
    	gameplayAudio.loopFull(),
    	
        //Límites del mundo para la cámara
        game.world.setBounds(0, 0, 3200, 3200);
        //game.stage.backgroundColor = "#71706F";

        //Conjuntos de objetos del juego
        players = new Array();
        orbes = new Array();
        weaponItems = new Array();
        ammoItems = new Array();
        shieldItems = new Array();
        foodItems = new Array();

        //Mapa
        map = new Mapa();
        map.createMap();

        first_visible = false;
        sendItems  = false;
        //map_handler = new MapHandler(map, map.layers);

        temp = setInterval(miniMapUpdate, 400); //Temporizador para mejorar fps (actualiza el minimapa)

        //Creamos los jugador
        playerGroup = game.add.group();
        players.push(new Jugador(300, 300, 'spriteSheet', 1));
        players.push(new Jugador(1000, 300, 'spriteSheet2', 2));

        //Variables que subiremos al servidor y leerá el otro usuario
        DLabyrinth.player.positionX = players[DLabyrinth.player.id-1].sprite.x,
        DLabyrinth.player.positionY = players[DLabyrinth.player.id-1].sprite.y,
        DLabyrinth.player.velX = players[DLabyrinth.player.id-1].sprite.body.velocity.x,
        DLabyrinth.player.velY = players[DLabyrinth.player.id-1].sprite.body.velocity.y
        
        //Inputs players
        players[0].createInputs();
        players[1].createInputs();

        damage_spr = game.add.sprite(0, 0, 'damage');
        damage_spr.scale.setTo(0.1);
        damage_spr.anchor.setTo(0, 0.5);
        damage_spr.visible = false;

        /////////////////////////// INTERFAZ ///////////////////////////
        interfaz = new Interface();
        interfaz.createInterface();
        /////////////////////////// FIN INTERFAZ ///////////////////////////

        //Se busca a nuestro jugador en el array
        for (var i = 0; i < players.length; i++){
            if(players[i].id === DLabyrinth.player.id){
                currentPlayer = players[i];
            }
        }
        
        //El cliente correspondiente al jugador 0 genera los items cuya info se manda al servidor
        itemsGroup = game.add.group();
        cargado = false;
        if(currentPlayer.id === 1){
        	generateItems();
        }
        
        //La cámara sigue al jugador
        game.camera.follow(currentPlayer.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        updateTemp = setInterval(updateStateWS, 17);

    },

    update: function () {
    	if(weaponItems[0] === undefined && !cargado){
    		sendItems = true;
    		
        }

        players[currentPlayer.id-1].updateInputs();

        //Actualizamos eventos de teclado y animaciones de los personajes
        for (var i = 0; i < players.length; i++) {
            players[i].updateAnimations();
            players[i].checkLifePoints();
            players[i].checkOtherWin();
        }
                
        map.update();
        checkCollisions(); // Chequeamos colisiones jugadores-objetos

        
        playerGroup.sort('y', Phaser.Group.SORT_ASCENDING);
        game.world.bringToTop(playerGroup);
        /////////////////////////// INTERFAZ ///////////////////////////
        interfaz.updateInterface(currentPlayer, orbes);
        /////////////////////////// FIN INTERFAZ ///////////////////////////

    },


}
