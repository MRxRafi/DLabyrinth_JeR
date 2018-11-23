DLabyrinth.endingState = function(game){

}
var jKey;
DLabyrinth.endingState.prototype = {
    preload: function(){

    },

    create : function(){
        text = "GRACIAS POR JUGAR \n PULSE 'J' PARA VOLVER AL MENU";
        style = { font: "35px Times New Roman", fill: "#000000", align: "center" };
        gracias = game.add.text(100, 200, text, style);

        jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
    },

    update : function(){
        if(jKey.isDown) { game.state.start('menuState'); }
    },

}