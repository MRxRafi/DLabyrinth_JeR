DLabyrinth.matchingState = function(game){
    
}

//var user;
var text_jugadores;
var n_jugadores;
DLabyrinth.matchingState.prototype = {

    preload: function() {
    },

    create: function() {
    	game.add.tileSprite(0, 0, 800, 600, 'background');
        
        text = "Esperando jugadores..\nJugadores en lobby: ";
        style = { font: "20px Press Start 2P", fill: "#FFFFFF", align: "center" };
        spr_text = game.add.text(game.world.centerX-150, 50, text, style);
        
        
        if (DLabyrinth.player != undefined) {
            createPlayer( function(playerId){
            	//DLabyrinth.player.id = playerId;
            }, DLabyrinth.player);
            
            //CUANDO AÑADAMOS WS A TODO: QUITAR FUNCIONES AJAX
        } 
        n_jugadores = 0;
        createPlayerWS();
    },

    update: function() {
        if(text_jugadores){text_jugadores.destroy();}
        /*
        numberPlayers(function(numero_usuarios){
        	text = numero_usuarios;
        });
        */
        
        style = { font: "20px Press Start 2P", fill: "#FFFFFF", align: "center" };
        text_jugadores = game.add.text(game.world.centerX+30, 105, n_jugadores, style);
        
        if(n_jugadores === 2){ game.state.start('levelState'); }
        updateMatchingWS();
        /*
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('levelState'); }
        });*/
        
        /*
        numberUsers(function(numero_usuarios){
        	if(numero_usuarios > 3 && DLabyrinth.user != undefined) { deleteUser(numero_usuarios); delete DLabyrinth.user; }
        });*/
    }
}

