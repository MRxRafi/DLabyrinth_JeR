DLabyrinth.menuState = function(game){
   var image1;
   var image2;
   var image3;
   var image4;
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

        image1 = game.add.sprite(260, 140, 'jugar');
        image2 = game.add.sprite(260, 240, 'opciones');
        image3 = game.add.sprite(260, 340, 'stats');
        image4 = game.add.sprite(260, 440, 'salir');

        image1.inputEnabled = true;
        image2.inputEnabled = true;
        image3.inputEnabled = true;
        image4.inputEnabled = true;
  
        image1.events.onInputDown.add(this.avanzar1, this);
        image2.events.onInputDown.add(this.avanzar2, this);

    
    },

    update: function() {

        
    },

   avanzar1: function() {

        this.game.state.start('levelState');
      
    },

    avanzar2: function() {

        this.game.state.start('optionState');
      
    },






}