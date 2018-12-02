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

/*
 * ADMINISTRACIÓN PETICIONES JUGADOR
 */

function createPlayer(callback, player) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.72:8080//players',
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        //console.log("Player created: " + JSON.stringify(player));
        callback(player);
    })
}

function numberPlayers(callback){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080//players',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (numPlayers) {
        //console.log("Info Received" + JSON.stringify(numPlayers));
        callback(numPlayers);
    })
}

function getPlayer(callback, id){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080//players/' + id,
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        //console.log("Info Received" + JSON.stringify(player));
        callback(player);
    })
}

function updatePlayer(player) {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.1.72:8080//players/' + player.id,
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        //console.log("Updated item: " + JSON.stringify(player))
    })
}

function deletePlayer(playerId) {
	console.log('deleted player ' + playerId);
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.72:8080//players/' + playerId
    }).done(function (player) {
        //console.log("Deleted player " + playerId)
    })
}

function punchPlayer(playerId){
	console.log('punched ' + playerId);
	 $.ajax({
		method: "POST",
        url: 'http://192.168.1.72:8080//players/punch/' + playerId,
	 });
}
function hasPunchedPlayer(callback, playerId){
	 $.ajax({
		 method: "GET",
	     url: 'http://192.168.1.72:8080//players/punch/' + playerId,
	     //processData: false,
	     /*
         headers: {
             "Content-Type": "application/json"
         }
         */
	 }).done(function(p){
		 console.log('punched other player: ' + p);
		 callback(p, playerId);
	 });
}

/*
 * ADMINISTRACIÓN PETICIONES BALA
 */
function createBala(bala) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.72:8080//balas',
        data: JSON.stringify(bala),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (bala) {
        console.log("Bala created: " + JSON.stringify(bala));
        //callback(bala);
    })
}

function getBalas(callback, id){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080//balas/' + id,
        //data: JSON.stringify(jug),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (balas) {
        //console.log("Info Received" + JSON.stringify(balas));
        callback(balas);
    })
}

/*
 * ADMINISTRACIÓN PETICIONES MAPA
 */
function startTimer() {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.1.72:8080//map/',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        console.log("Timer Started")
    })
}

function getMapHandler(callback){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080//map/',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (map) {
        //console.log("Info Received" + JSON.stringify(map));
        callback(map);
    })
}

/*
* ADMINISTRACION PETICIONES ITEMS
*/

function setWeaponItemType(weaponTypes){
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.72:8080//items/weaponType',
		data: JSON.stringify(weaponTypes),
		processdata: false,
		
		headers: {
           "Content-Type": "application/json"
        }
	        
	})
}
function getWeaponItemType(callback){
	$.ajax({
		method: "GET",
        url: 'http://192.168.1.72:8080//items/weaponType',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
	}).done(function(items){
		callback(items);
	})
}

function setWeaponItemPos(weaponPos){
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.72:8080//items/weaponPos',
		data: JSON.stringify(weaponPos),
		processdata: false,
		headers: {
           "Content-Type": "application/json"
	    }
	})
}

function getWeaponItemPos(callback){
	$.ajax({
		method: "GET",
        url: 'http://192.168.1.72:8080//items/weaponPos',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
	}).done(function(items){
		callback(items);
	})
}

function setAmmoItemType(ammoType){
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.72:8080//items/ammoType',
		data: JSON.stringify(ammoType),
		processdata: false,
		headers: {
           "Content-Type": "application/json"
	    }
	})
}
function getAmmoItemType(callback){
	$.ajax({
		method: "GET",
        url: 'http://192.168.1.72:8080//items/ammoType',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
	}).done(function(items){
		callback(items);
	})
}

function setAmmoItemPos(ammoPos){
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.72:8080//items/ammoPos',
		data: JSON.stringify(ammoPos),
		processdata: false,
		headers: {
           "Content-Type": "application/json"
	    }
	})
}
function getAmmoItemPos(callback){
	$.ajax({
		method: "GET",
        url: 'http://192.168.1.72:8080//items/ammoPos',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
	}).done(function(items){
		callback(items);
	})
}

function setShieldItemPos(shieldPos){
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.72:8080//items/shieldPos',
		data: JSON.stringify(shieldPos),
		processdata: false,
		headers: {
           "Content-Type": "application/json"
	    }
	})
}
function getShieldItemPos(callback){
	$.ajax({
		method: "GET",
        url: 'http://192.168.1.72:8080//items/shieldPos',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
	}).done(function(items){
		callback(items);
	})
}
function setFoodItemPos(foodPos){
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.72:8080//items/foodPos',
		data: JSON.stringify(foodPos),
		processdata: false,
		headers: {
           "Content-Type": "application/json"
	    }
	})
}
function getFoodItemPos(callback){
	$.ajax({
		method: "GET",
        url: 'http://192.168.1.72:8080//items/foodPos',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
	}).done(function(items){
		callback(items);
	})
}
