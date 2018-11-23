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
 * ADMINISTRACIÓN PETICIONES USUARIO
 */
function createUser(callback, user) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.72:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("User created: " + JSON.stringify(user));
        callback(user);
    })
}

function numberUsers(callback){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080/users',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (numUsers) {
        console.log("Info Received" + JSON.stringify(numUsers));
        callback(numUsers);
    })
}

function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.72:8080/users/' + userId
    }).done(function (user) {
        console.log("Deleted user " + userId)
    })
}

/*
 * ADMINISTRACIÓN PETICIONES JUGADOR
 */

function createPlayer(callback, player) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.72:8080/players',
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        console.log("Player created: " + JSON.stringify(player));
        callback(player);
    })
}

function numberPlayers(callback){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080/players',
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (numPlayers) {
        console.log("Info Received" + JSON.stringify(numPlayers));
        callback(numPlayers);
    })
}

function getPlayer(callback, id){
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.72:8080/players/' + id,
        //data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        console.log("Info Received" + JSON.stringify(player));
        callback(player);
    })
}

function updatePlayer(player) {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.1.72:8080/players/' + player.id,
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        console.log("Updated item: " + JSON.stringify(player))
    })
}

function deletePlayer(playerId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.72:8080/players/' + playerId
    }).done(function (player) {
        console.log("Deleted player " + playerId)
    })
}