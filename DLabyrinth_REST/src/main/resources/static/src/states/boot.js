var DLabyrinth = {
		
}

DLabyrinth.bootState = function(game){

}

DLabyrinth.bootState.prototype = {

    preload: function(){
        game.physics.startSystem("Phaser.Physics.ARCADE");
        game.load.image('bar', 'assets/loading/bar.png');
      //Cargamos la fuente antes de iniciar todo lo demas, si no no aparecerá cambiada en el preload    
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create: function(){
        game.state.start('preloadState');
    },

    update: function(){

    }
}