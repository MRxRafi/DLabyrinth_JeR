/*	Antes de cerrar la página, comprobamos en qué estado de Phaser
 *  se encuentra el juego actualmente.
 *  Si se encuentra en matching o level, debemos eliminar del servidor
 *  su correspondiente usuario.
 */
window.onbeforeunload = function(){
    if(game.state.current === 'matchingState' || game.state.current === 'levelState'){
    	if(DLabyrinth.user != undefined){ deleteUser(DLabyrinth.user.id); delete DLabyrinth.user; }
    }
}

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
        console.log("Player created: " + JSON.stringify(user));
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