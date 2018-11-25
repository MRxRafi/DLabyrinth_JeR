DLabyrinth.endingState = function(game){

}
var spaceKey;
DLabyrinth.endingState.prototype = {
    preload: function(){

    },

    create : function(){
    	//Añadimos fondo
		game.add.tileSprite(0, 0, 800, 600, 'background');
		//Texto con estilo
		var text = game.add.text(game.world.centerX, game.world.centerY, "Gracias por jugar \n \n Pulse 'Space' \n \n para volver al menú");
        text.anchor.setTo(0.5);

        text.font = 'Press Start 2P';
        text.fontSize = 35;

		//Efecto de gradiente
        var grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#F8F8FF');   
        grd.addColorStop(1, '#808080');
        text.fill = grd;
		//Efecto de sombra
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
		
		//Añadimos el input de nuestra tecla
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

	//función que cambia de estado al pulsar la tecla seleccionada
    update : function(){
        if(spaceKey.isDown) { game.state.start('menuState'); }
    },

}