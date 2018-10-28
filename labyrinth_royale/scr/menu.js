DLabyrinth.menuState = function(game){

}

DLabyrinth.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
        var image1,image2,image3,image4,image5;
        game.stage.backgroundColor = "#4488AA";

        image1 = game.add.sprite(260, 140, 'jugar');
        image2 = game.add.sprite(260, 240, 'opciones');
        image3 = game.add.sprite(260, 340, 'stats');
        image4 = game.add.sprite(260, 440, 'salirM');
        image5 = game.add.sprite(100, 25, 'titulo');

        image1.inputEnabled = true;
        image2.inputEnabled = true;
        image3.inputEnabled = true;
        image4.inputEnabled = true;
  
        image1.events.onInputDown.add(this.avanzar1, this);
        image2.events.onInputDown.add(this.avanzar2, this);
        image4.events.onInputDown.add(this.exit, this);
    },

    update: function() {
        

    },

    avanzar1: function() {

        this.game.state.start('levelState');
      
    },

    avanzar2: function() {

        this.game.state.start('optionState');
      
    },

    exit: function(){
        this.game.state.start('endingState');
    }
}