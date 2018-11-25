DLabyrinth.menuState = function(game){
  
}
DLabyrinth.menuState.prototype = {


    preload: function() {

    },

    create: function() {
      //Creamos el menú con las imagenes 
  	    var image1, image2, image3, image4, image5;
           
	    game.add.tileSprite(0, 0, 800, 600, 'background');

        image1 = game.add.sprite(260, 140, 'jugar');
        image2 = game.add.sprite(260, 240, 'opciones');
        image3 = game.add.sprite(260, 340, 'stats');
        image4 = game.add.sprite(260, 440, 'salirM');
        image5 = game.add.sprite(100, 25, 'titulo');

	
	//Añadimos que las imagenes se puedan pulsar y que avancen de escena
        image1.inputEnabled = true;
        image2.inputEnabled = true;
        image3.inputEnabled = true;
        image4.inputEnabled = true;
	
  
        image1.events.onInputDown.add(this.avanzar1, this);
        image2.events.onInputDown.add(this.avanzar2, this);
	image4.events.onInputDown.add(this.avanzar3, this);
    
    },

    update: function() {
 
    },
   //Avanzamos a estado de matchmaking
   avanzar1: function() {

        this.game.state.start('matchingState');
      
    },
    //Entrar en el estado de opciones
    avanzar2: function() {

        this.game.state.start('optionState');
      
    },
    //Al pulsar exit vamos al ending state, para que se vea en caso de fallo	
    avanzar3: function() {

        this.game.state.start('endingState');
      
    },
	  

}
