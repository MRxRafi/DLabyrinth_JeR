DLabyrinth.optionState = function(game){
    
}
DLabyrinth.optionState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.stage.backgroundColor = "#4488AA";

        var image1 = game.add.sprite(680, 550, 'salirO');

        image1.inputEnabled = true;

        image1.events.onInputDown.add(this.avanzar1, this);
    },

    update: function() {
        //game.state.start(menuState);
        
    },
    avanzar1: function() {

        this.game.state.start('menuState');
      
    }
}