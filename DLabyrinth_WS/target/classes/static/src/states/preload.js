DLabyrinth.preloadState = function(game){

}

WebFontConfig = {
	    
	    google: {
	      families: ['Press Start 2P']
	    }

	};

DLabyrinth.preloadState.prototype = {
    preload: function() {
    	//Ejecutar en 2º plano
        game.stage.disableVisibilityChange=true;
    	
    	//LOADING TEXT
    	game.add.text(game.world.centerX - 140, 220, "Loading", { font: "40px Press Start 2P", fill: "#FFFFFF", align: "left" });

        //PROGRESS BAR
        var preloadBar = game.add.sprite(100, 400, 'bar');
        preloadBar.width = 600;
        preloadBar.anchor.setTo(0, 0.5);
        game.load.setPreloadSprite(preloadBar);

        //ASSETS MENÚ//
        game.load.image('jugar', 'assets/buttons/jugarmenu.png');
        game.load.image('opciones', 'assets/buttons/opciones.png');
        game.load.image('stats', 'assets/buttons/puntosmenu.png');
        game.load.image('salirM', 'assets/buttons/exitmenu.png');
        game.load.image('titulo', 'assets/buttons/titulo.png');
        game.load.image('background', 'assets/buttons/background.png');
        
        //ASSETS OPTIONS//
        game.load.image('salirO', 'assets/buttons/exitmenu2.png');

        //ASSETS LEVEL//
        game.load.spritesheet('spriteSheet', 'assets/spriteSheets/spriteSheet2.png', 30, 49, 80);
        game.load.spritesheet('spriteSheet2', 'assets/spriteSheets/spriteSheet3.png', 30, 49, 80);
        game.load.spritesheet('food', 'assets/props/food_spriteSheet.png', 28, 28, 4)
        game.load.image('orb', 'assets/props/orb.png');
        game.load.image('bg', 'assets/tiles/debug.png');
        game.load.image('bullet', 'assets/props/bullet.png');
        game.load.image('damage', 'assets/props/damage.png');
        game.load.image('vision', 'assets/vision.png');
        game.load.image('shield', 'assets/props/shield/shield.png');
        //Mapa
        game.load.tilemap('mapa', 'assets/map/MapaTiled.Json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/map/tiles.png');
        game.load.image('shield1', 'assets/interfazEscudo/shield1.png');
        game.load.image('shield2', 'assets/interfazEscudo/shield2.png');
        game.load.image('shield3', 'assets/interfazEscudo/shield3.png');
        //Vidas y escudo
        game.load.image('halfL', 'assets/props/life/half.png');
        game.load.image('oneL', 'assets/props/life/one.png');
        //Armas
        game.load.image('pistol', 'assets/props/pistol.png');
        game.load.image('ak-47', 'assets/props/ak-47.png');
        //Munición
        game.load.image('pistol_ammo', 'assets/props/ammo/pistol_ammo.png');
        game.load.image('ak47_ammo', 'assets/props/ammo/ak_ammo.png');
    },

    create: function() {
    	//Creamos algunas variables globales para comunicarnos con el servidor
    	DLabyrinth.player = { id:undefined, positionX:undefined, positionY:undefined, velX:undefined,
    			velY:undefined, win: false, lifePoints: undefined, shield: undefined, punched: false, hasOrb: undefined };
    	DLabyrinth.map;
    	
    	DLabyrinth.items = { weaponTypes:undefined, weaponPos:undefined, ammoTypes:undefined,
    			ammoPos:undefined, foodPos:undefined, shieldPos:undefined }
    	DLabyrinth.items.weaponTypes = new Array();
    	DLabyrinth.items.weaponPos = new Array();
    	DLabyrinth.items.ammoTypes = new Array();
    	DLabyrinth.items.ammoPos = new Array();
    	DLabyrinth.items.foodPos = new Array();
    	DLabyrinth.items.shieldPos = new Array();
	    
    	DLabyrinth.bala = {idJug: this.id, directionX:undefined, directionY:undefined};
	    
    	//Abrimos conexión WS
    	openWSConnection();
    	
    	//Pasamos al siguiente estado
       game.state.start('menuState');
    },

    update: function() {

    }
}
