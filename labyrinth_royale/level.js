DLabyrinth.levelState = function(game){

}
var player, orbe;

DLabyrinth.levelState.prototype = {
    preload: function() {
        //Assets a cargar
        game.load.spritesheet('spriteSheet', 'assets/spriteSheets/spriteSheet1.png', 30, 49, 40);
        game.load.image('orb', 'assets/props/orb.png');
        game.load.image('bg', 'assets/tiles/debug.png');
    },

    create: function() {
        //Sprite background
        this.bg = game.add.tileSprite(0, 0, 1920, 1920, 'bg');

        //Límites del mundo para la cámara
        game.world.setBounds(0, 0, 1920, 1920);

        //Asignamos teclas a variables
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Creamos el jugador y el orbe
        player = new Jugador('spriteSheet');
        orbe = new Orbe('orb', player);

        //La cámara sigue al jugador
        game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
       
    },

    update: function() {
        //Animación personaje
        var keydown = false;
        if (this.aKey.isDown){
            player.sprite.x -= 5;
            keydown = true;
        } 
        if (this.dKey.isDown){
            player.sprite.x += 5;
            keydown = true;
        }
        if (this.wKey.isDown){
            player.up = true;
            player.sprite.y -= 5;
            keydown = true;
        }
        if (this.sKey.isDown){
            player.down = true;
            player.sprite.y +=5;
            keydown = true;
        }
        if(this.aKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { player.left = true; }
        if(this.dKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { player.right = true; }

        //Hacemos la animacion pertinente según lo obtenido anteriormente
        if(player.up){ player.sprite.animations.play('walkUp', 30, true); }
        if(player.down) { player.sprite.animations.play('walkDown', 30, true); }
        if(player.left) { player.sprite.animations.play('walkLeft', 30, true); }
        if(player.right) { player.sprite.animations.play('walkRight', 30, true); }
        player.up = player.down = player.right = player.left = false;

        //Paramos animación si no hay ninguna tecla pulsada
        if(!keydown){ 
            player.sprite.animations.stop(null, true);
        }
        orbe.sprite.body.velocity.x = (player.sprite.x - orbe.sprite.x - 30)*5;
        orbe.sprite.body.velocity.y = (player.sprite.y - orbe.sprite.y - 30)*5;
        
    }
}

//Constructores
function Jugador(sprsheet){
    //Sprite del personaje y asignación de las animaciones a variables
    this.sprite = game.add.sprite(300, 300, sprsheet);
    this.leftAnimation = this.sprite.animations.add('walkLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    this.upAnimation = this.sprite.animations.add('walkUp', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
    this.downAnimation = this.sprite.animations.add('walkDown', [20, 21, 22, 23, 24, 25, 26, 27, 28]);
    this.rightAnimation = this.sprite.animations.add('walkRight', [30, 31, 32, 33, 34, 35, 36, 37, 38]);

    this.up = false; /* Estas variables sirven para administrar que animación debe ir y si está o no activada */
    this.down = false;/* Por defecto, todas desactivadas */
    this.left = false;
    this.right = false;
    this.sprite.animations.play('upAnimation', 30, true);

    //Activamos físicas arcade para el personaje
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    //Aquí es donde meteremos la vida, munición, armas..
    
}

function Orbe(sprsheet, pl){
    //Separación del orbe
    this.offsetX = 20;
    this.offsetY = 20;

    //Añadimos orbe cerca del jugador correspondiente
    this.sprite = game.add.sprite(pl.sprite.x - this.offsetX, pl.sprite.y - this.offsetY ,sprsheet);
    this.sprite.scale.setTo(0.05);

     //Activamos físicas arcade para el orbe.
     game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}
