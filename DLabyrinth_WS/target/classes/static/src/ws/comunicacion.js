/*	Antes de cerrar la página, comprobamos en qué estado de Phaser
 *  se encuentra el juego actualmente.
 *  Si se encuentra en matching o level, debemos eliminar del servidor
 *  su correspondiente usuario.
 */
window.onbeforeunload = function(){
    if(game.state.current === 'matchingState'){
    	if(DLabyrinth.user != undefined){ deleteUser(DLabyrinth.user.id); delete DLabyrinth.user; }
    }
    if(game.state.current === 'levelState'){
    	if(DLabyrinth.user != undefined && DLabyrinth.jugador != undefined){
    		deleteUser(DLabyrinth.user.id); delete DLabyrinth.user;
    		deletePlayer(DLabyrinth.jugador.id); delete DLabyrinth.jugador;
    	}
    }
}

// ////////////////////////////WEBSOCKETS/////////////////////////////////////

var connection;
function openWSConnection(){
	connection = new WebSocket('ws://' + window.location.host + '/dlabyrinth');
	connection.data = { type:undefined, actualPlayer:undefined, players:undefined, items: undefined, startedTimer:false, map:undefined };
	connection.data.players = new Array();
	
	connection.onopen = function (event) {
        console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.');
	}
	connection.onerror = function (error) {
	    console.log('[DEBUG-WS] Ha ocurrido un error: ' + error)
	}
	
	// Un monitor de eventos que atiende una llamada cuando la conexión del
	// WebSocket cambia a un estado CERRADO (CLOSED). El monitor recibe un
	// CloseEvent llamado "cerrado".
	connection.onclose = function (event) {
	        console.log('[DEBUG-WS] Se ha cerrado la conexion.')
	}
	connection.onmessage = function (message) {
	    //console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data);
	    var msg = JSON.parse(message.data);

	    //console.log('INFO RECIBIDA ' + msg.type);

	    switch (msg.type) {
	        case "PLAYER_CREATED":
	            console.log('@@@@@@ PLAYER CREATED @@@@@')
	            console.log('id: ' + msg.players[msg.players.length-1].id)
	            
	            DLabyrinth.player.id = msg.players[msg.players.length-1].id;
	            n_jugadores = msg.players.length;
	            
	            break
	        case "GAME_COMPLETE":
	            console.log('##### GAME IS COMPLETE #####')
	            break
	        case "UPDATE_STATE":
	            console.log('!!!!! GAME SENDS UPDATE !!!!!');
		            var id;
		            if(currentPlayer.id == 1){id = 1;}else{id = 0;}
		            
		            if(msg.players[id]){
		            	players[id].sprite.x = msg.players[id].positionX;
						players[id].sprite.y = msg.players[id].positionY;
						players[id].lifePoints = msg.players[id].lifePoints;
						players[id].shield = msg.players[id].shield;
						players[id].punched = msg.players[id].punched;
						if(players[id].sprite.body){
							players[id].sprite.body.velocity.x = msg.players[id].velX;
							players[id].sprite.body.velocity.y = msg.players[id].velY;
						}
						
						players[id].win = msg.players[id].win;
		            }
					
					DLabyrinth.map = msg.map;
					
					if(msg.items){
			        	loadItems(msg.items);
			        	sendItems = false;
					}
			    	shoot(msg.balas);

	            break;
	            
	        case "MATCHING_STATE":
	        	n_jugadores = msg.players.length;
	        	break;
	        case "ENDING_STATE":
	        	//Cerrar Conexión
	        	connection.close();
	    }
	}
}

function createPlayerWS(){
	connection.data.type = 'JOIN'
	connection.send(JSON.stringify(connection.data));
}
function updateStateWS(){
	connection.data.type = 'UPDATE';
	connection.data.actualPlayer = DLabyrinth.player;
	connection.data.sendItems = sendItems;
	connection.data.bala = DLabyrinth.bala;
	connection.send(JSON.stringify(connection.data));
	
	//Una vez mandada la bala, se reinicia para que no la siga mandando
	DLabyrinth.bala.idJug = undefined;
	DLabyrinth.bala.directionX = undefined;
	DLabyrinth.bala.directionY= undefined;
	
	if(DLabyrinth.player){
		if(DLabyrinth.player.punched = true){ DLabyrinth.player.punched = false; }
	}
}
function updateMatchingWS(){
	connection.data.type = 'MATCHING';

	connection.send(JSON.stringify(connection.data));
}
function sendItemsWS(wt, wp, at, ap, sp, fp){
	connection.data.type = "ITEMS";
	connection.data.items = {weaponTypes: wt, weaponPos:wp, ammoTypes:at, ammoPos: ap, shieldPos: sp, foodPos: fp};
	connection.send(JSON.stringify(connection.data));
	console.log("[DEBUG-WS] Items enviados");
	sendItems = true;
}

function closeConnection(){
	connection.data.type = "ENDING";
	connection.data.actualPlayer = DLabyrinth.player;
	connection.send(JSON.stringify(connection.data));
}


// //////////////////////////////////////////////////////////////////////////
