DLabyrinth.menuState = function(game){
  
}
DLabyrinth.menuState.prototype = {


    preload: function() {

 
        game.load.image('jugar', 'assets/buttons/jugarmenu.png');
        game.load.image('opciones', 'assets/buttons/opciones.png');
        game.load.image('stats', 'assets/buttons/puntosmenu.png');
        game.load.image('salir', 'assets/buttons/exitmenu.png');
        game.load.image('titulo', 'assets/buttons/titulo.png');
	game.load.image('background', 'assets/buttons/background.png');
	

    },

    create: function() {
      
  	 var image1, image2, image3, image4, image5;
           
	game.add.tileSprite(0, 0, 800, 600, 'background');

        image1 = game.add.sprite(260, 140, 'jugar');
        image2 = game.add.sprite(260, 240, 'opciones');
        image3 = game.add.sprite(260, 340, 'stats');
        image4 = game.add.sprite(260, 440, 'salir');
        image5 = game.add.sprite(100, 25, 'titulo');

	

        image1.inputEnabled = true;
        image2.inputEnabled = true;
        image3.inputEnabled = true;
        image4.inputEnabled = true;

	
	button.onInputOver.add(over, this);
 	button.onInputOut.add(out, this);
	
  
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
