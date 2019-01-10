DLabyrinth.matchingState = function(game){
    
}

//var user;
var text_jugadores;
var n_jugadores;
DLabyrinth.matchingState.prototype = {

    preload: function() {
    },

    create: function() {
    	menuAudio.play();
    	game.add.tileSprite(0, 0, 800, 600, 'background');
        
        text = "Esperando jugadores..\nJugadores en lobby: ";
        style = { font: "20px Press Start 2P", fill: "#FFFFFF", align: "center" };
        spr_text = game.add.text(game.camera.width/2-150, 50, text, style);
        
        n_jugadores = 0;
        createPlayerWS();
    },

    update: function() {
        if(text_jugadores){text_jugadores.destroy();}
        
        style = { font: "20px Press Start 2P", fill: "#FFFFFF", align: "center" };
        text_jugadores = game.add.text(game.camera.width/2+30, 105, n_jugadores, style);
        
        if(n_jugadores === 2){ 
        	menuAudio.stop();
        	game.state.start('levelState'); 
        }
        updateMatchingWS();

    }
}

