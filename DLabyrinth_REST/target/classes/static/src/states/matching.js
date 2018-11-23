DLabyrinth.matchingState = function(game){
    
}

//var user;
var n_jugadores;
DLabyrinth.matchingState.prototype = {

    preload: function() {
    },

    create: function() {
        text = "Esperando jugadores..\nJugadores en lobby: "
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
        spr_text = game.add.text(game.world.centerX-100, 50, text, style);
        
        
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
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
        n_jugadores = game.add.text(game.world.centerX+80, 78, text, style);
        
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('levelState'); }
        });
        
        /*
        numberUsers(function(numero_usuarios){
        	if(numero_usuarios > 3 && DLabyrinth.user != undefined) { deleteUser(numero_usuarios); delete DLabyrinth.user; }
        });*/
    }
}

