var DLabyrinth = {
    
}

DLabyrinth.bootState = function(game){

}

DLabyrinth.bootState.prototype = {

    preload: function(){
        game.physics.startSystem("Phaser.Physics.ARCADE");
    },

    create: function(){
        game.state.start('preloadState');
    },

    update: function(){

    }
}