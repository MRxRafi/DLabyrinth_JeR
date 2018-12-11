DLabyrinth.optionState = function(game){
    
}

var image1

DLabyrinth.optionState.prototype = {

    preload: function() {
        
    },

    create: function() {
        
        game.add.tileSprite(0, 0, 800, 600, 'background');

        image1 = game.add.sprite(680, 550, 'salirO');
        
        image1.alpha = 0.75;

        image1.inputEnabled = true;

        image1.events.onInputDown.add(this.avanzar1, this);
        
      //Añadimos el texto a mostrar con el estilo
    	var  text = game.add.text(game.world.centerX, game.world.centerY, "En Proceso");
        text.anchor.setTo(0.5);

        text.font = 'Press Start 2P';
        text.fontSize = 60;

        //Efecto de gradiente en el texto, empieza en un color y acaba en otro
    	var   grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#F8F8FF');   
        grd.addColorStop(1, '#808080');
        text.fill = grd;
        //Ponemos bordes a las letras y sombra
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    },

    update: function() {
        
          if (image1.input.pointerOver())
    {
        image1.alpha = 1;
        
    }
    else
    {
        image1.alpha = 0.75;
    
    }
        
    },
    avanzar1: function() {

        this.game.state.start('menuState');
      
    }
}
