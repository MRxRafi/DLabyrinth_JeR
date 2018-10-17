DLabyrinth.levelState = function(game){

}
var player, orbe;
var objects = new Array();
var oneH, halfH;
var changedLife;
DLabyrinth.levelState.prototype = {
    preload: function() {
        //Assets a cargar
        game.load.spritesheet('spriteSheet', 'assets/spriteSheets/spriteSheet1.png', 30, 49, 40);
        game.load.image('orb', 'assets/props/orb.png');
        game.load.image('bg', 'assets/tiles/debug.png');
        game.load.image('bullet', 'assets/props/bullet.png');

        //Vidas
        game.load.image('halfL', 'assets/props/life/half.png');
        game.load.image('oneL', 'assets/props/life/one.png');

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
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //Creamos el jugador y el orbe
        player = new Jugador('spriteSheet');
        orbe = new Orbe('orb', player);

        //Creamos los sprites de la vida (al principio siempre 3 corazones)
        oneH = [game.add.sprite(35, 15, 'oneL'), game.add.sprite(35+20, 15, 'oneL'), game.add.sprite(35+40, 15, 'oneL')];
        for(i = 0; i < 3; i++){
            oneH[i].fixedToCamera = true;
            oneH[i].scale.setTo(0.1);
        }
        oneH[0].cameraOffset.setTo(15, 15);
        oneH[1].cameraOffset.setTo(15+40, 15);
        oneH[2].cameraOffset.setTo(15+80, 15);

        //Creamos los sprites de medio corazón y los hacemos invisibles al principio
        halfH = [game.add.sprite(35, 15, 'halfL'), game.add.sprite(35+20, 15, 'halfL'), game.add.sprite(35+40, 15, 'halfL')]
        for(i = 0; i < 3; i++){
            halfH[i].fixedToCamera = true;
            halfH[i].scale.setTo(0.1);
            halfH[i].visible = false;
        }
        halfH[0].cameraOffset.setTo(15, 15);
        halfH[1].cameraOffset.setTo(15+40, 15);
        halfH[2].cameraOffset.setTo(15+80, 15);

        changedLife = false;

        var g = new Gun(500, 500, 'orb', 10, 500, 10);
        objects.push(g);

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
        if(fireButton.isDown){
            if(orbe.weapons[0].ammo > 0){
            orbe.weapons[0].weapon.fireAtPointer(game.input.mousePointer);
            orbe.weapons[0].weapon.ammo--;
            }
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
        game.physics.arcade.accelerationFromRotation(orbe.sprite.rotation, 300, orbe.sprite.body.acceleration);
        
        //Actualizacion vida personajes
        if(changedLife && player.lifePoints >= 0.5){
            //Ocultamos los medios corazones
            for(i = 0; i < 3; i++){ halfH[i].visible = false; }
        
            for(i = 0; i < player.lifePoints; i++){ 
                oneH[i].visible = true;
            }
            for(i = 2; i > player.lifePoints-1; i--){ 
                oneH[i].visible = false;
            }
            //Si la vida no es entera dibujamos corazon partido
            if(player.lifePoints != 1 || player.lifePoints != 2 || player.lifePoints != 3){
                if(i!=3 && i>=0){halfH[i+1].visible = true;}
            }
            changedLife = false;
        }
        /*
        if(changedLife){
            player.lifeSprite.destroy();
            if(player.lifePoints === 3){ //Manejamos el sprite 
                player.lifeSprite = game.add.image(player.sprite.x - 300,player.sprite.y - 250,'threeL');
                player.lifeSprite.fixedToCamera = true;
                player.lifeSprite.cameraOffset.setTo(35, 15);
                player.lifeSprite.scale.setTo(0.1);
            } else if (player.lifePoints === 2.5) {
                player.lifeSprite = game.add.image(player.sprite.x - 300,player.sprite.y - 250,'twoHL');
                player.lifeSprite.fixedToCamera = true;
                player.lifeSprite.cameraOffset.setTo(35, 15);
                player.lifeSprite.scale.setTo(0.1);
            } else if (player.lifePoints === 2){
                player.lifeSprite = game.add.image(player.sprite.x - 300,player.sprite.y - 250,'twoL');
                player.lifeSprite.fixedToCamera = true;
                player.lifeSprite.cameraOffset.setTo(35, 15);
                player.lifeSprite.scale.setTo(0.1);
            } else if(player.lifePoints === 1.5) {
                player.lifeSprite = game.add.image(player.sprite.x - 300,player.sprite.y - 250,'oneHL');
                player.lifeSprite.fixedToCamera = true;
                player.lifeSprite.cameraOffset.setTo(35, 15);
                player.lifeSprite.scale.setTo(0.1);
            } else if(player.lifePoints === 1) {
                player.lifeSprite = game.add.image(player.sprite.x - 300,player.sprite.y - 250,'oneL');
                player.lifeSprite.fixedToCamera = true;
                player.lifeSprite.cameraOffset.setTo(35, 15);
                player.lifeSprite.scale.setTo(0.1);
            } else if(player.lifePoints === 0.5){
                player.lifeSprite = game.add.image(player.sprite.x - 300,player.sprite.y - 250,'halfL');
                player.lifeSprite.fixedToCamera = true;
                player.lifeSprite.cameraOffset.setTo(35, 15);
                player.lifeSprite.scale.setTo(0.1);
            }
            changedLife = false;
        }*/

        this.checkCollisions();
    },
    checkCollisions : function(){
        var i = 0;
        objects.forEach(function(o){
            if(game.physics.arcade.collide(player.sprite, o.sprite)){
                orbe.setWeapon(o);
                o.sprite.destroy();
                objects.splice(i, 1);
            }
            i++;
        });
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

    //Aquí es donde meteremos la vida, munición, armas..    
    this.lifePoints = 3;
    /*
    this.lifeSprite = game.add.image( game.camera.x + 50, game.camera.y + 20,'threeL');
    this.lifeSprite.fixedToCamera = true;
    this.lifeSprite.cameraOffset.setTo(35, 15);
    this.lifeSprite.scale.setTo(0.1);
    */
    //Activamos físicas arcade para el personaje
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    
}

function Orbe(sprsheet, pl){
    //Separación del orbe
    this.offsetX = 20;
    this.offsetY = 20;

    //Añadimos orbe cerca del jugador correspondiente
    this.sprite = game.add.sprite(pl.sprite.x - this.offsetX, pl.sprite.y - this.offsetY ,sprsheet);
    this.sprite.scale.setTo(0.05);
    this.sprite.anchor.setTo(0.5);

    this.weapons = [new Weapon(), new Weapon()];//game.add.weapon(30, 'bullet'), game.add.weapon(30, 'bullet')];
    this.weapons[0].weapon = game.add.weapon(30, 'bullet');
    this.weapons[1].weapon = game.add.weapon(30, 'bullet');
    this.weapons[0].weapon.trackSprite(this.sprite, 0, 0);
    this.weapons[1].weapon.trackSprite(this.sprite, 0, 0);
    this.weapons[0].weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapons[1].weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapons[0].weapon.bulletSpeed = 700;
    this.weapons[1].weapon.bulletSpeed = 700;

    this.switch = function(){
        var a = weapons[0];
        this.weapons[0] = weapons[1];
        this.weapons[1] = a;
    }
    this.setWeapon = function(w){
        this.weapons[0].weapon.fireRate = w.fireRate;
        this.weapons[0].damage = w.damage;
        this.weapons[0].ammo = w.bullets;
    }

     //Activamos físicas arcade para el orbe.
     game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

function Gun(x, y, spr, d, fr, b) {
    this.damage = d;
    this.sprite = game.add.sprite(x, y, spr);
    this.fireRate = fr;
    this.bullets = b;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

}
function Weapon(){
    this.weapon;
    this.damage;
    this.ammo;
}
