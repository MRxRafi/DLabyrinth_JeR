var DLabyrinth = {}

DLabyrinth.bootState = function(game){

}

DLabyrinth.bootState.prototype = {

    preload: function(){
        game.physics.startSystem("Phaser.Physics.ARCADE");
        game.load.image('bar', 'assets/loading/bar.png');
    },

    create: function(){
        game.state.start('preloadState');
    },

    update: function(){

    }
}