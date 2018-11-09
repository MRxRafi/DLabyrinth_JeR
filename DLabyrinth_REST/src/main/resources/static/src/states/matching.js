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
        
        var un = prompt("Enter an username", "user1");
        
        DLabyrinth.user = {
        		username: un
        };
        
        if (DLabyrinth.user != undefined) {
            createUser( function(userId){
            	DLabyrinth.user.id = userId;
            }, DLabyrinth.user);
        } 
    },

    update: function() {
        if(n_jugadores){n_jugadores.destroy();}
        numberUsers(function(numero_usuarios){
        	text = numero_usuarios;
        });
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
        n_jugadores = game.add.text(game.world.centerX+80, 78, text, style);
        
        /*
        numberUsers(function(numero_usuarios){
        	if(numero_usuarios > 3 && DLabyrinth.user != undefined) { deleteUser(numero_usuarios); delete DLabyrinth.user; }
        });*/
    }
}

