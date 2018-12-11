DLabyrinth.menuState = function(game){
  
}

//Variables generales para poder usarlas en create y update
var  image1, image2, image3, image4, image5;

DLabyrinth.menuState.prototype = {


    preload: function() {

    },

    create: function() {
        
	    game.add.tileSprite(0, 0, 800, 600, 'background');

        image1 = game.add.sprite(260, 140, 'jugar');
        image2 = game.add.sprite(260, 240, 'opciones');
        image3 = game.add.sprite(260, 340, 'stats');
        image4 = game.add.sprite(260, 440, 'salirM');
        image5 = game.add.sprite(100, 25, 'titulo');

	image1.alpha = 0.75;
        image2.alpha = 0.75;
        image3.alpha = 0.75;
        image4.alpha = 0.75;

        image1.inputEnabled = true;
        image2.inputEnabled = true;
        image3.inputEnabled = true;
        image4.inputEnabled = true;
 
        image1.events.onInputDown.add(this.avanzar1, this);
        image2.events.onInputDown.add(this.avanzar2, this);
        image4.events.onInputDown.add(this.avanzar3, this);

    
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

     if (image2.input.pointerOver())
    {
        image2.alpha = 1;
        
    }
    else
    {
        image2.alpha = 0.75;
    
    }

     if (image3.input.pointerOver())
    {
        image3.alpha = 1;
        
    }
    else
    {
        image3.alpha = 0.75;
    
    }

     if (image4.input.pointerOver())
    {
        image4.alpha = 1;
        
    }
    else
    {
        image4.alpha = 0.75;
    
    }
	    
    },

   avanzar1: function() {

        this.game.state.start('matchingState');
      
    },

    avanzar2: function() {

        this.game.state.start('optionState');
      
    },
  //Al pulsar exit vamos al ending state, para que se vea en caso de fallo	
    avanzar3: function() {

        this.game.state.start('endingState');
      
},
	  

}
