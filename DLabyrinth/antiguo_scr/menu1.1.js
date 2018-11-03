DLabyrinth.menuState = function(game){
  
}
DLabyrinth.menuState.prototype = {



    preload: function() {
        
        game.load.image('jugar', 'assets/jugarmenu.png');
        game.load.image('opciones', 'assets/opciones.png');
        game.load.image('stats', 'assets/puntosmenu.png');
        game.load.image('salir', 'assets/exitmenu.png');

    },

    create: function() {
        
        game.stage.backgroundColor = "#4488AA";

        var image1 = game.add.sprite(-120, 100, 'jugar');
        var image2 = game.add.sprite(-120, 90, 'opciones');
        var image3 = game.add.sprite(-120, 60, 'stats');
        var image4 = game.add.sprite(-120, 50, 'salir');

        image1.inputEnabled = true;
        image2.inputEnabled = true;
        image3.inputEnabled = true;
        image4.inputEnabled = true;

        image1.input.onDown.add(listener, this);

        //game.state.start('levelState');

    },

    update: function() {
      
    },

    listener: function() {

        this.game.state.start('levelState');
      
    },






}