DLabyrinth.levelState = function(game){

}
var up, down, left, right; //Animacion

DLabyrinth.levelState.prototype = {
    preload: function() {
        game.load.spritesheet('spriteSheet', 'assets/spriteSheets/spriteSheet1.png', 30, 49, 40);
        game.load.image('orb', 'assets/props/orb.png');
        game.load.image('bg', 'assets/tiles/debug.png');
    },

    create: function() {
        
        //Separación del orbe
        this.orbOffsetX = 20;
        this.orbOffestY = 20;

        //Sprite background
        this.bg = game.add.tileSprite(0, 0, 1920, 1920, 'bg');

        //Límites del mundo para la cámara
        game.world.setBounds(0, 0, 1920, 1920);

        //Sprite del personaje y asignación de las animaciones a variables
        this.player = game.add.sprite(300, 300, 'spriteSheet');
        this.walkLeft = this.player.animations.add('walkLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.walkUp = this.player.animations.add('walkUp', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
        this.walkDown = this.player.animations.add('walkDown', [20, 21, 22, 23, 24, 25, 26, 27, 28]);
        this.walkRight = this.player.animations.add('walkRight', [30, 31, 32, 33, 34, 35, 36, 37, 38]);
        up = false; /* Estas variables sirven para administrar que animación debe ir y si está o no activada */
        down = false;
        left = false;
        right = false;
        //up = down = left = right = false;
        this.player.animations.play('walkUp', 30, true);

        //Asignamos teclas a variables
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Añadimos orbe cerca del jugador
        this.orb = game.add.sprite(this.player.x - this.orbOffsetX, this.player.y - this.orbOffsetY ,'orb');
        this.orb.scale.setTo(0.05);
        
        //Activamos físicas arcade para el orbe y le asignamos posición.
        game.physics.enable(this.orb, Phaser.Physics.ARCADE);
        this.orb.x = 300;
        this.orb.y = 300;

        //Activamos físicas arcade para el personaje
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        //La cámara sigue al jugador
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
       
    },

    update: function() {

        //Animación personaje
        var keydown = false;
        if (this.aKey.isDown){
            //this.player.animations.play('walkLeft', 30, true)
            this.player.x -= 5;
            keydown = true;
        } 
        if (this.dKey.isDown){
            //this.player.animations.play('walkRight', 30, true)
            this.player.x += 5;
            keydown = true;
        }
        if (this.wKey.isDown){
            up = true;
            //this.player.animations.play('walkUp', 30, true)
            this.player.y -= 5;
            keydown = true;
        }
        if (this.sKey.isDown){
            down = true;
            //this.player.animations.play('walkDown', 30, true)
            this.player.y +=5;
            keydown = true;
        }
        if(this.aKey.isDown && !this.wKey.isDown && !this.sKey.isDown) {
            left = true;
        }
        if(this.dKey.isDown && !this.wKey.isDown && !this.sKey.isDown) {
            right = true;
        }

        //Hacemos la animacion pertinente según lo obtenido anteriormente
        if(up){ this.player.animations.play('walkUp', 30, true); }
        if(down) { this.player.animations.play('walkDown', 30, true); }
        if(left) { this.player.animations.play('walkLeft', 30, true); }
        if(right) { this.player.animations.play('walkRight', 30, true); }
        up = down = right = left = false;

        //Paramos animación si no hay ninguna tecla pulsada
        if(!keydown){ 
            this.player.animations.stop(null, true);
        }
        this.orb.body.velocity.x = (this.player.x - this.orb.x - 30)*5;
        this.orb.body.velocity.y = (this.player.y - this.orb.y - 30)*5;
        
    }
}

