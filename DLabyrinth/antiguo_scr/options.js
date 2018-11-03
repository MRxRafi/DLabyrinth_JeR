DLabyrinth.optionState = function(game){
    var image1;
}
DLabyrinth.optionState.prototype = {

    preload: function() {
        game.load.image('salir', 'assets/exitmenu2.png');
    },

    create: function() {
        
        game.stage.backgroundColor = "#4488AA";

        image1 = game.add.sprite(680, 550, 'salir');

        image1.inputEnabled = true;

        image1.events.onInputDown.add(this.avanzar1, this);
    },

    update: function() {
       
        
    },

    
   avanzar1: function() {

    this.game.state.start('menuState');
  
},

}