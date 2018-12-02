DLabyrinth.matchingState = function(game){
    
}

//var user;
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
            	DLabyrinth.player.id = playerId;
            }, DLabyrinth.player);
        } 
    },

    update: function() {
        if(n_jugadores){n_jugadores.destroy();}
        numberPlayers(function(numero_usuarios){
        	text = numero_usuarios;
        });
        style = { font: "20px Press Start 2P", fill: "#FFFFFF", align: "center" };
        n_jugadores = game.add.text(game.world.centerX+30, 105, text, style);
        
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('levelState'); }
        });
        
        /*
        numberUsers(function(numero_usuarios){
        	if(numero_usuarios > 3 && DLabyrinth.user != undefined) { deleteUser(numero_usuarios); delete DLabyrinth.user; }
        });*/
    }
}

