DLabyrinth.levelState = function(game){

}
var players;
var orbes;
var weaponItems;
var ammoItems;
var lifeItems;
var shieldItems;
var foodItems;
var interfaz;
var map, layer;
var temp, boolUpdate;
var damage_spr;
var vision_spr;
var first_visible; // Es true cuando acaba de hacerse visible una capa de bloqueo. En la iteración posterior se vuelve false
var map_handler; //Objeto que maneja las habitacioens a cerrar

DLabyrinth.levelState.prototype = {
    preload: function() {

    },


    create: function() {
        //Sprite background
        //this.bg = game.add.tileSprite(0, 0, 1920, 1920, 'bg');

        //Límites del mundo para la cámara
        game.world.setBounds(0, 0, 3200, 3200);

        //Campo de vision del jugador
        

         //Conjuntos de objetos del juego
         players = new Array();
         orbes = new Array();
         weaponItems = new Array();
         ammoItems = new Array();
         lifeItems = new Array();
         shieldItems = new Array();
         foodItems = new Array();
 
         layer = new Array();

        //Mapa
        //HAY QUE USAR JSON PARA MULTIPLES CAPAS
        map = game.add.tilemap('mapa');
        map.addTilesetImage('map_tiles', 'tiles');
        
	    
        layer[0] = map.createLayer('Suelo');
        layer[1] = map.createLayer('Paredes');
        layer[2] = map.createLayer('Cierres');
        layer[3] = map.createLayer('Adornos1');
        layer[4] = map.createLayer('Adornos2');;
        layer[5] = map.createLayer('Adornos3');
        for(i = 1; i < 11; i++){
            layer[5 + i] = map.createLayer('bloqueo' + i);
            layer[5 + i].visible = false;

        }
        first_visible = false;
 
        map_handler = new MapHandler(layer);

        //Activamos colisiones para paredes y adornos
        map.setCollisionBetween(1, 300, true, layer[1]);
        map.setCollisionByExclusion([129,250], true, layer[3]);
        map.setCollisionByExclusion([129,205,252], true, layer[4]);
        map.setCollisionBetween(1, 300, true, layer[5]);


        temp = setInterval(miniMapUpdate, 400); //Temporizador para mejorar fps (actualiza el minimapa)

         //Creamos los jugador
         players.push( new Jugador(300, 300, 'spriteSheet'));
         players.push( new Jugador(500, 300, 'spriteSheet2'));
        
         damage_spr = game.add.sprite(0, 0, 'damage');
         damage_spr.scale.setTo(0.1);
         damage_spr.anchor.setTo(0, 0.5);
         //damage_spr.fixedToCamera = true;
         damage_spr.visible = false;

        //Asignamos teclas a variables
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.qKey.onDown.add(changeWeaponFunc1, this);
        this.zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.zKey.onDown.add(consumeFood, this);
		this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.xKey.onDown.add(punchFunc1);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.tKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
        this.fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	    this.rKey.onDown.add(changeWeaponFunc2, this);

       
	/////////////////////////// INTERFAZ ///////////////////////////
        interfaz = new Interface();
        interfaz.createInterface();
        /////////////////////////// FIN INTERFAZ ///////////////////////////

       generateItems();

        //La cámara sigue al jugador
        game.camera.follow(players[0].sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
       
    },

    update: function() {
        var keydownMove = [false, false];

        //KEYCONTROLLERS
        //////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////     PLAYER 1        //////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////
        if (this.aKey.isDown){
            players[0].sprite.body.velocity.x = -230;
            //players[0].sprite.x -= 5;
            keydownMove[0] = true;
        }
        if (this.dKey.isDown){
            players[0].sprite.body.velocity.x = 230;
            keydownMove[0] = true;
        }
        if (this.wKey.isDown){
            players[0].up = true;
            players[0].sprite.body.velocity.y = -230;
            keydownMove[0] = true;
        }
        if (this.sKey.isDown){
            players[0].down = true; 
            players[0].sprite.body.velocity.y = 230;
            keydownMove[0] = true;
        }
        //Quitamos velocidad en caso de que no estén las teclas pulsadas
        if(!this.aKey.isDown && !this.dKey.isDown){ players[0].sprite.body.velocity.x = 0; }
        if(!this.wKey.isDown && !this.sKey.isDown){ players[0].sprite.body.velocity.y = 0; }

        if(this.xKey.isDown){
            keydownMove[0] = true;
        }
        if(fireButton.isDown){
            if(players[0].hasOrb){
                if(orbes[0].weapons[0].ammo > 0){
                    orbes[0].weapons[0].weapon.fireAtPointer(game.input.mousePointer);
                }
            }
        }

        if(this.aKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { players[0].left = true; }
        if(this.dKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { players[0].right = true; }

        //////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////     PLAYER 2        //////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////
		if(players[1]){
        if (this.fKey.isDown){
            players[1].sprite.body.velocity.x = -230;
            keydownMove[1] = true;
        } 
        if (this.hKey.isDown){
            players[1].sprite.body.velocity.x = 230;
            keydownMove[1] = true;
        }
        if (this.tKey.isDown){
            players[1].up = true;
            players[1].sprite.body.velocity.y = -230;
            keydownMove[1] = true;
        }
        if (this.gKey.isDown){
            players[1].down = true; 
            players[1].sprite.body.velocity.y = 230;
            keydownMove[1] = true;
        } 
       
        //Quitamos velocidad en caso de que no estén las teclas pulsadas
        if(!this.fKey.isDown && !this.hKey.isDown){ players[1].sprite.body.velocity.x = 0; }
        if(!this.tKey.isDown && !this.gKey.isDown){ players[1].sprite.body.velocity.y = 0; }

        if(fireButton.isDown){
            if(players[1].hasOrb){
                if(orbes[1].weapons[0].ammo > 0){
                    orbes[1].weapons[0].weapon.fireAtPointer(game.input.mousePointer);
                }
            }
        }

        if(this.fKey.isDown && !this.tKey.isDown && !this.gKey.isDown) { players[1].left = true; }
        if(this.hKey.isDown && !this.tKey.isDown && !this.gKey.isDown) { players[1].right = true; }
		}

        ////////////////////////////////////////////////////////////////////////////////
        //
        /////////////////////////////////////////////////////////////////

        //Hacemos la animacion pertinente según lo obtenido anteriormente PARA AMBOS JUGADORES
        for(var j = 0; j < players.length; j++){
            if(players[j].up) { players[j].sprite.animations.play('walkUp', 30, true); players[j].facing = 0; }
            if(players[j].down) { players[j].sprite.animations.play('walkDown', 30, true); players[j].facing = 1; }
            if(players[j].left) { players[j].sprite.animations.play('walkLeft', 30, true); players[j].facing = 2; }
            if(players[j].right) { players[j].sprite.animations.play('walkRight', 30, true); players[j].facing = 3; }
            players[j].up = players[j].down = players[j].right = players[j].left = false; //Reiniciamos variables

            //Paramos animación si no hay ninguna tecla pulsada PARA AMBOS JUGADORES
            if(!keydownMove[j]){ 
                players[j].sprite.animations.stop('walkUp', true);
                players[j].sprite.animations.stop('walkDown', true);
                players[j].sprite.animations.stop('walkLeft', true);
                players[j].sprite.animations.stop('walkRight', true);
            }
        }


        //Movimiento del orbe PARA AMBOS JUGADORES
        for(var j = 0; j < players.length; j++){
            if(players[j].hasOrb){
                orbes[j].sprite.body.velocity.x = (players[j].sprite.x - orbes[j].sprite.x - 30)*5;
                orbes[j].sprite.body.velocity.y = (players[j].sprite.y - orbes[j].sprite.y - 30)*5;
            }
        }
        
        this.checkCollisions(); // Chequeamos colisiones jugadores-objetos

	/////////////////////////// INTERFAZ ///////////////////////////
        interfaz.updateInterface(players[0], orbes);
        /////////////////////////// FIN INTERFAZ ///////////////////////////
	    
        //Administración de lo que sucede si algún jugador se queda sin vida
        for(var i = 0; i < players.length; i++){
            if(players[i].lifePoints <= 0){
                if(i == 0){
                    game.state.start('endingState');
                }else{
                    if(players[i].hasOrb){
                        orbes[i].sprite.destroy();
                        orbes.splice(i, 1);
                    }
		            players[i].sprite.destroy();
                    players.splice(i,1);
                   
                    game.state.start('endingState');
                }
            }
        }

    },

    checkCollisions : function(){
        //Colision con el mapa
        for(i = 0; i < players.length; i++){
            for(j = 1; j < layer.length; j++){
                if(j != 2 && j < 6){
                    game.physics.arcade.collide(players[i].sprite, layer[j]);
                } else if (j >= 6){
                    //Qué pasa si el usuario estaba dentro cuando se cierra
                    if(layer[j].visible){
                        var tile = map.getTileWorldXY( players[i].sprite.x, players[i].sprite.y, 32, 32, layer[j]);

                        if(tile != null && first_visible) { players[i].lifePoints = 0; }

                        if(i === players.length - 1) { first_visible = false; }
                        game.physics.arcade.collide(players[i].sprite, layer[j]);
                    }
                }
            }
        }

        var i = 0;
        //recoger armas
        weaponItems.forEach(function(o){
            for(var j = 0; j < players.length; j++){
                if(game.physics.arcade.collide(players[j].sprite, o.sprite)){
                    if(!players[j].hasOrb){
                        orbes[j] = new Orbe('orb', players[j]);
                        players[j].hasOrb = true;
                    }
                    orbes[j].setWeapon(o);
                    o.sprite.destroy();
                    weaponItems.splice(i, 1);
                }
                i++;
            }
        });
        i = 0;
        //recoger munición
        ammoItems.forEach(function(o){
            for(var j = 0; j < players.length; j++){
                if(game.physics.arcade.collide(players[j].sprite, o.sprite)){
                    if(!players[j].hasOrb){
                    //////////////////////////////////////////////////////////////////
                    //mostrar por pantalla: recoge un arma para usar municion
                    //////////////////////////////////////////////////////////////////
                    }else{
                        if(orbes[j].setAmmo(o)){ 
                        o.sprite.destroy();
                        ammoItems.splice(i, 1);
                        }
                    }
            }
            i++;
        }
        });

        //recoger escudo
        i = 0;
        shieldItems.forEach(function(s){
            for(var j = 0; j < players.length; j++){
                if(game.physics.arcade.collide(players[j].sprite, s.sprite)){
                   
                    players[j].shield = 3;
                    shieldItems[i].sprite.destroy();
                    shieldItems.splice(i, 1);
                    players[j].changedShield = true;
                }
                
            }
            i++;
        });

        //recoger comida
        i = 0;
        foodItems.forEach(function(f){
            for(var j = 0; j < players.length; j++){
                if(players[j].food <=3){
                    if(game.physics.arcade.collide(players[j].sprite, f.sprite)){
                        players[j].food++;
                        foodItems[i].sprite.destroy();
                        foodItems.splice(i, 1);
                    }
                
                }
            }
            i++;
        });



        //Colision con balas
        for(var j = 0; j < players.length; j++){
            if(players[j].hasOrb){
                orbes[j].weapons[0].weapon.bullets.forEach(function(b){
                    //Colisión bala con jugador
                   for(var i = 0; i < players.length; i++){
                        if(j != i){
                            if(game.physics.arcade.collide(players[i].sprite, b)){
                                if(players[i].shield > 0){
                                    players[i].shield -= orbes[j].weapons[0].damage;
                                    if(i==0){players[0].changedShield = true;}

                                }else{
                                    players[i].lifePoints -= orbes[j].weapons[0].damage;
                                    if(i==0){players[0].changedLife = true;}
                                }
                                if(i === 0){ drawDamageDirection(b); }
                                b.kill();
                            }
                        }
                    }

                    //Colisión bala con pared
                    for(i = 1; i < 6; i++){
                        if(i != 2){

                            if(game.physics.arcade.collide(b, layer[i])){
                                //Animación de Explosion

                                b.kill();
                            }
                        }
                    }
				});
                }
            
        }
        
    }
}

//Constructores
function Jugador(x, y, sprsheet,orb){
    //Sprite del personaje y asignación de las animaciones a variables
    this.sprite = game.add.sprite(x, y, sprsheet);
    this.leftAnimation = this.sprite.animations.add('walkLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    this.upAnimation = this.sprite.animations.add('walkUp', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
    this.downAnimation = this.sprite.animations.add('walkDown', [20, 21, 22, 23, 24, 25, 26, 27, 28]);
    this.rightAnimation = this.sprite.animations.add('walkRight', [30, 31, 32, 33, 34, 35, 36, 37, 38]);
	this.punchUpAnimation = this.sprite.animations.add('punchUp', [40, 41, 42, 43, 44, 45]);
    this.punchLeftAnimation = this.sprite.animations.add('punchLeft', [50, 51, 52, 53, 54, 55]);
    this.punchRightAnimation = this.sprite.animations.add('punchRight', [60, 61, 62, 63, 64, 65]);
    this.punchDownAnimation = this.sprite.animations.add('punchDown', [70, 71, 72, 73, 74, 75]);

    this.up = false; /* Estas variables sirven para administrar que animación debe ir y si está o no activada */
    this.down = false;/* Por defecto, todas desactivadas */
    this.left = false;
    this.right = false;
    this.sprite.animations.play('upAnimation', 30, true);

    this.hasOrb = false;
    
    //Aquí es donde meteremos la vida, comida..   
    this.lifePoints = 3;
    this.changedLife = false;

    //Escudo
    this.shield = 0;
    this.changedShield = false;

    //Comida
    this.food = 1;
    //Consumir comida
    this.consume = function(){
        if(this.food > 0){
            this.lifePoints = Math.min(this.lifePoints+1, 3);
            this.changedLife = true;
            this.food--;
        }
    }
	
    this.facing = 0;

    this.punchDamage = 0.5;
    this.punchRange = 30;
    this.collisionArea = game.add.sprite(0, 0, 'orb');
    this.collisionArea.alpha = 0;
    game.physics.enable(this.collisionArea, Phaser.Physics.ARCADE);
    this.punch = function(){
        switch(this.facing){
            case 0:
                this.collisionArea.x = this.sprite.x;
                this.collisionArea.y = this.sprite.y;
                this.collisionArea.width = this.sprite.width;
                this.collisionArea.height = this.punchRange;
                this.sprite.animations.play('punchUp',20, false);
                break;
            case 1:
                this.collisionArea.x = this.sprite.x;
                this.collisionArea.y = this.sprite.y + this.sprite.height;
                this.collisionArea.width = this.sprite.width;
                this.collisionArea.height = this.punchRange;
                this.sprite.animations.play('punchDown', 20, false);
                break;
            case 2:
                this.collisionArea.x = this.sprite.x - this.punchRange;
                this.collisionArea.y = this.sprite.y;
                this.collisionArea.width = this.punchRange;
                this.collisionArea.height = this.sprite.height;
                this.sprite.animations.play('punchLeft', 20, false);
                break;
            case 3:
                this.collisionArea.x = this.sprite.x + this.sprite.width;
                this.collisionArea.y = this.sprite.y;
                this.collisionArea.width = this.punchRange;
                this.collisionArea.height = this.sprite.height;
                this.sprite.animations.play('punchRight', 20, false);
                break;
        }
       for(var i = 0;i < players.length; i++){
            if(players[i] != this){
                if(game.physics.arcade.collide(this.collisionArea, players[i].sprite)){
                    players[i].lifePoints -= this.punchDamage;
                    console.log('hit');
                }
            }
        }
    }

    this.points = 0;

    //Activamos físicas arcade para el personaje
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE); 
    this.sprite.body.immovable = true;   
}

function Orbe(sprsheet, pl){
    //Separación del orbe
    this.offsetX = 20;
    this.offsetY = 20;

    //Añadimos orbe cerca del jugador correspondiente
    this.sprite = game.add.sprite(pl.sprite.x - this.offsetX, pl.sprite.y - this.offsetY ,sprsheet);
    this.sprite.scale.setTo(0.05);
    this.sprite.anchor.setTo(0.5);

    this.weapons = [new Weapon(), new Weapon()];
    for(var i = 0; i <= 1; i++){
        this.weapons[i].weapon = game.add.weapon(30, 'bullet');
        this.weapons[i].weapon.trackSprite(this.sprite, 0, 0);
        this.weapons[i].weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapons[i].weapon.bulletSpeed = 700;
        this.weapons[i].empty = true;
    }

    this.switch = function(){
        var a = this.weapons[0];
        this.weapons[0] = this.weapons[1];
        this.weapons[1] = a;
        //this.weapons[0].weapon.onFire.add(function(){this.weapons[0].ammo -= 1;}, this);
    }
    this.setWeapon = function(w){
        var i = 0;
        if(!this.weapons[0].empty && this.weapons[1].empty){
            i = 1;
        }
        if(!this.weapons[0].empty && !this.weapons[1].empty){
            this.weapons[0].weapon.destroy();
            this.weapons[0].weapon = game.add.weapon(30, 'bullet');
            this.weapons[0].weapon.trackSprite(this.sprite, 0, 0);
            this.weapons[0].weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
            this.weapons[0].weapon.bulletSpeed = 700;
        }
        this.weapons[i].weapon.fireRate = w.fireRate;
        this.weapons[i].damage = w.damage;
        this.weapons[i].ammo = w.bullets;
        this.weapons[i].type = w.type;
        this.weapons[i].empty = false;
        this.weapons[i].weapon.onFire.add(function(){this.weapons[0].ammo -= 1;}, this);
    }
    this.setAmmo = function(a){
        for(var i = 0; i <=1; i++){
            if(this.weapons[i].type == a.type){
                this.weapons[i].ammo += a.ammo;
                /////////////////////////////
                //Mostrar por pantalla : "munición de + weapons[i].type" + " + " + a.ammo"
                /////////////////////////////
                return true;
            }
        }
        return false;
    }
     //Activamos físicas arcade para el orbe.
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

function WeaponItem(x, y, spr, d, fr, b, type) {
    this.sprite = game.add.sprite(x, y, spr);
    this.damage = d;
    this.fireRate = fr;
    this.bullets = b;
    this.type = type;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;


}
function AmmoItem(x, y, spr, a, type){
    this.sprite = game.add.sprite(x, y, spr);
    this.type = type;
    this.ammo = a;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;

}
function ShieldItem(x, y){
    this.sprite = game.add.sprite(x, y, 'shield');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;

}
function FoodItem(x, y, spr){
    this.sprite = game.add.sprite(x, y, spr);
    switch(Math.floor(Math.random()*4)){
        case 0:
            this.sprite.frame = 0;
            break;
        case 1:
            this.sprite.frame = 1;
            break;
        case 2:
            this.sprite.frame = 2;
            break;
        case 3:
            this.sprite.frame = 3;
            break;
    }
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
}
function Weapon(){
    this.empty;
    this.weapon;
    this.damage;
    this.ammo;
    this.type;
}

function Interface(){
    var iGroup = game.add.group(); //Grupo de sprite de la interfaz

    var vision_spr;
    var oneH, halfH; //Corazones
    var shield; //Escudo
    var weapons; //Armas
    var municion; //Municion
    var comida; //Comida
    var puntuacion; //Puntuacion
    var temporizador, temp; //Timer de la partida

    this.createInterface = function(){

        ////////////CAMPO DE VISION///////////////
        vision_spr = game.add.sprite(0,0,'vision');
        vision_spr.anchor.setTo(0.5);
        iGroup.add(vision_spr);
        //////////FIN CAMPO DE VISION/////////////

        /////////////// VIDA ///////////////
        //Creamos los sprites de la vida (al principio siempre 3 corazones)
        oneH = [game.add.sprite(35, 15, 'oneL'), game.add.sprite(35+20, 15, 'oneL'), game.add.sprite(35+40, 15, 'oneL')];
        for(i = 0; i < oneH.length; i++){
            oneH[i].fixedToCamera = true;
            oneH[i].scale.setTo(0.1);
            iGroup.add(oneH[i]);
        }
        oneH[0].cameraOffset.setTo(15, 15);
        oneH[1].cameraOffset.setTo(15+40, 15);
        oneH[2].cameraOffset.setTo(15+80, 15);

        //Creamos los sprites de medio corazón y los hacemos invisibles al principio
        halfH = [game.add.sprite(35, 15, 'halfL'), game.add.sprite(35+20, 15, 'halfL'), game.add.sprite(35+40, 15, 'halfL')]
        for(i = 0; i < halfH.length; i++){
            halfH[i].fixedToCamera = true;
            halfH[i].scale.setTo(0.1);
            halfH[i].visible = false;
            iGroup.add(halfH[i]);
        }
        halfH[0].cameraOffset.setTo(15, 15);
        halfH[1].cameraOffset.setTo(15+40, 15);
        halfH[2].cameraOffset.setTo(15+80, 15);
        /////////////// FIN VIDA ///////////////

        /////////////// ESCUDO ///////////////
        shield = [game.add.sprite(0, 0, 'shield1'), game.add.sprite(0, 0, 'shield2'), game.add.sprite(0, 0, 'shield3')];
        for(i = 0; i < shield.length; i++){
            shield[i].fixedToCamera = true;
            shield[i].scale.setTo(0.2);
            shield[i].visible = false; //Inicialmente sin escudo
            iGroup.add(shield[i]);
        }
        shield[0].cameraOffset.setTo(-135, -70);
        shield[1].cameraOffset.setTo(-135+40, -70);
        shield[2].cameraOffset.setTo(-135+80, -70);
        /////////////// FIN ESCUDO ///////////////

        /////////////// ARMAS ///////////////
        weapons = [game.add.sprite(0, 0, 'pistol'), game.add.sprite(0, 0, 'pistol'), game.add.sprite(0, 0, 'ak-47'), game.add.sprite(0, 0, 'ak-47')];
        for(i = 0; i < weapons.length; i++){
            weapons[i].fixedToCamera = true;
            //weapons[i].scale.setTo(0.2);
            weapons[i].visible = false; //Inicialmente sin armas
            iGroup.add(weapons[i]);
        }
        weapons[0].cameraOffset.setTo(35, 600-100);
        weapons[2].cameraOffset.setTo(35, 600-100);
        weapons[1].cameraOffset.setTo(35+60, 600-100);
        weapons[3].cameraOffset.setTo(35+60, 600-100);
        /////////////// FIN ARMAS ///////////////

        /////////////// MUNICION ///////////////
        text = "Municion:  ";
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        municion = game.add.text(game.world.centerX-60, 0, text, style);
        municion.fixedToCamera = true;
        municion.cameraOffset.setTo(625, 350);
        iGroup.add(municion);
        /////////////// FIN MUNICION ///////////////

        /////////////// COMIDA ///////////////
        text = "Comida:  ";
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        comida = game.add.text(game.world.centerX-60, 0, text, style);
        comida.fixedToCamera = true;
        comida.cameraOffset.setTo(625, 300);
        iGroup.add(comida);
        /////////////// FIN COMIDA ///////////////

        /////////////// PUNTUACIÓN ///////////////
        text = "Puntuacion:  ";
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        puntuacion = game.add.text(game.world.centerX-60, 0, text, style);
        puntuacion.fixedToCamera = true;
        puntuacion.cameraOffset.setTo(625, 25);
        iGroup.add(puntuacion);
        /////////////// FIN PUNTUACIÓN ///////////////

        /////////////// MINIMAPA ///////////////
        // MINIMAPA SACADO DE http://www.html5gamedevs.com/topic/14182-creating-a-mini-map-in-phaser/  POR EL USUARIO "sanojian"
        //Modificado a nuestro gusto
        // Parte del mapa estático
        //Dimensiones del mapa: 3200 x 3200
        //Dimensiones de cada tile: 32 x 32 -> Total del mapa 100 x 100
        //Dimensiones del minimapa: 200 x 200 -> Cada hueco del mapa ocupa 8 pixeles
        //Dividido en 4 cuadrantes el minimapa, depende de donde estés cambia a uno u otro
        
        //static bmd
        miniMapBmd = game.add.bitmapData(25*8, 25*8);
        miniMapBmd.ctx.globalAlpha=0.6; //Transparencia
        miniMap = game.add.sprite(625, 350, miniMapBmd);
        miniMap.fixedToCamera = true;
        miniMap.cameraOffset.setTo(590, 390);
        iGroup.add(miniMap);
        // dynamic bmd where I draw mobile stuff like friends and enemies
        game.miniMapOverlayBmd = game.add.bitmapData(25*8, 25*8);
        game.miniMapOverlay = game.add.sprite(miniMap.x, miniMap.y, game.miniMapOverlayBmd);
        game.miniMapOverlay.fixedToCamera = true;
        game.miniMapOverlay.cameraOffset.setTo(590, 390);
        iGroup.add(game.miniMapOverlay);
        /////////////// FIN MINIMAPA ///////////////

        /////////////// TEMPORIZADOR ///////////////
        text = "0:00";
        style = { font: "25px Times New Roman", fill: "#FFFFFF", align: "left" };
        temporizador = game.add.text(game.world.centerX, 60, text, style);
        temporizador.fixedToCamera = true;
        temporizador.cameraOffset.setTo(400, 60);
        iGroup.add(temporizador);

        /////////////// FIN TEMPORIZADOR ///////////////
    }

    this.updateInterface = function(player, orbe){ 
        
        vision_spr.x = players[0].sprite.x;
        vision_spr.y = players[0].sprite.y;

        /////////////// VIDA ///////////////
        //Hacemos visible las vidas que le quedan al jugador
        if(players[0].changedLife && players[0].lifePoints > 0){
            //Ocultamos los medios corazones
            for(i = 0; i < 3; i++){ halfH[i].visible = false; }

            for(i = 0; i < players[0].lifePoints; i++){ 
                oneH[i].visible = true;
            }
            for(i = 2; i > players[0].lifePoints-1; i--){ 
                oneH[i].visible = false;
            }
            if (players[0].lifePoints > 2.5){ oneH[2].visible = true; }
                if (players[0].lifePoints <= 2 && players[0].lifePoints > 1.5){ oneH[1].visible = true;  }
                if (players[0].lifePoints <= 1 && players[0].lifePoints > 0.5){ oneH[0].visible = true;  }

            //Si la vida no es entera dibujamos corazon partido
            if((players[0].lifePoints > 0 && players[0].lifePoints <= 0.5) || (players[0].lifePoints > 1 && player.lifePoints <= 1.5) || (player.lifePoints > 2 && player.lifePoints <= 2.5)){
                if(i>=-1){halfH[i+1].visible = true;}
            }
            players[0].changedLife = false;
        }
        /////////////// FIN VIDA ///////////////

        /////////////// ESCUDO ///////////////
        if(players[0].changedShield){
            for(i = 0; i < 3; i++){ 
                shield[i].visible = false;
            }
            if (players[0].shield > 2){ shield[2].visible = true; }
            else if (players[0].shield <= 2 && players[0].shield > 1){ shield[1].visible = true; console.log('2'); }
            else if (players[0].shield <= 1 && players[0].shield > 0){ shield[0].visible = true; console.log('1'); }
            players[0].changedShield = false;
        }
        /////////////// FIN ESCUDO ///////////////

        /////////////// ARMAS ///////////////
        //Si existe el orbe del personaje miramos si tiene armas
        if(orbe[0] != null){ //Si las tiene mostramos sprite
            if(!orbe[0].weapons[0].empty){
                if(orbe[0].weapons[0].type === 'pistola') {weapons[0].visible = true;} else { weapons[0].visible = false; }
                if(orbe[0].weapons[0].type === 'metralleta') {weapons[2].visible = true;} else { weapons[2].visible = false; }
            } else { weapons[0].visible = false; weapons[2].visible = false; }
            if(!orbe[0].weapons[1].empty){
                if(orbe[0].weapons[1].type === 'pistola') {weapons[1].visible = true;} else { weapons[1].visible = false; }
                if(orbe[0].weapons[1].type === 'metralleta') {weapons[3].visible = true;} else { weapons[3].visible = false; }
            } else { weapons[1].visible = false; weapons[3].visible = false;}
        }
        /////////////// FIN ARMAS ///////////////

        /////////////// MUNICION ///////////////
        if(orbe[0] != null){
            municion.destroy();

            text = "Municion:  " + orbe[0].weapons[0].ammo;
            style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
            municion = game.add.text(game.world.centerX-60, 0, text, style);
            municion.fixedToCamera = true;
            municion.cameraOffset.setTo(625, 350);
        }
        iGroup.add(municion);

        /////////////// FIN MUNICION ///////////////

        /////////////// COMIDA ///////////////
        comida.destroy();
        text = "Comida:  " + players[0].food;
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        comida = game.add.text(game.world.centerX-60, 0, text, style);
        comida.fixedToCamera = true;
        comida.cameraOffset.setTo(625, 300);
        iGroup.add(comida);
        /////////////// FIN COMIDA ///////////////

        /////////////// PUNTUACIÓN ///////////////
        puntuacion.destroy();
        text = "Puntuacion:  " + players[0].points;
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        puntuacion = game.add.text(game.world.centerX-60, 0, text, style);
        puntuacion.fixedToCamera = true;
        puntuacion.cameraOffset.setTo(625, 25);
        iGroup.add(puntuacion);
        /////////////// FIN PUNTUACIÓN ///////////////

        /////////////// MINIMAPA ///////////////
        //Según donde esté el jugador actualizamos el mapa:
        // g_game.miniMapSize is the pixel size in the minimap
        // iterate my map layers
        miniMapBmd.ctx.clearRect(0, 0, miniMap.width, miniMap.height);
        var x, y, min_x, min_y; //Cuadrante en el que se encuentra el jugador
        /* Distribucion de cuadrantes tomando el mapa como referencia:
            { 0,  1,  2,  3, 
              4,  5,  6,  7, 
              8,  9,  10, 11,
              12, 13, 14, 15
            }
        */
        if(Math.floor(players[0].sprite.x / 32) < 25){ //El jugador se encuentra entre los cuadrantes 0, 4, 8, 12
            if(Math.floor(players[0].sprite.y / 32) < 25){ min_x = 0; min_y = 0; x=25; y=25; }//Cuadrante 0
            if(Math.floor(players[0].sprite.y / 32) >= 25 && Math.floor(players[0].sprite.y / 32) < 50){ min_x = 0; min_y = 25; x=25; y=50; }//Cuadrante 4
            if(Math.floor(players[0].sprite.y / 32) >= 50 && Math.floor(players[0].sprite.y / 32) < 75){ min_x = 0; min_y = 50; x=25; y=75; }//Cuadrante 8
            if(Math.floor(players[0].sprite.y / 32) >= 75){ min_x = 0; min_y = 75; x=25; y=100; }//Cuadrante 12

        } else if (Math.floor(players[0].sprite.x / 32) >= 25 && Math.floor(players[0].sprite.x / 32) < 50){ //El jugador se encuentra entre los cuadrantes 1, 5, 9, 13
            if(Math.floor(players[0].sprite.y / 32) < 25){ min_x = 25; min_y = 0; x=50; y=25; }//Cuadrante 1
            if(Math.floor(players[0].sprite.y / 32) >= 25 && Math.floor(players[0].sprite.y / 32) < 50){ min_x = 25; min_y = 25; x=50; y=50; }//Cuadrante 5
            if(Math.floor(players[0].sprite.y / 32) >= 50 && Math.floor(players[0].sprite.y / 32) < 75){ min_x = 25; min_y = 50; x=50; y=75; }//Cuadrante 9
            if(Math.floor(players[0].sprite.y / 32) >= 75){ min_x = 25; min_y = 75; x=50; y=100; }//Cuadrante 13

        } else if (Math.floor(players[0].sprite.x / 32) >= 50 && Math.floor(players[0].sprite.x / 32) < 75){ //El jugador se encuentra entre los cuadrantes 2, 6, 10, 14
            if(Math.floor(players[0].sprite.y / 32) < 25){ min_x = 50; min_y = 0; x=75; y=25; }//Cuadrante 2
            if(Math.floor(players[0].sprite.y / 32) >= 25 && Math.floor(players[0].sprite.y / 32) < 50){ min_x = 50; min_y = 25; x=75; y=50; }//Cuadrante 6
            if(Math.floor(players[0].sprite.y / 32) >= 50 && Math.floor(players[0].sprite.y / 32) < 75){ min_x = 50; min_y = 50; x=75; y=75; }//Cuadrante 10
            if(Math.floor(players[0].sprite.y / 32) >= 75){ min_x = 50; min_y = 75; x=75; y=100; }//Cuadrante 14

        } else if (Math.floor(players[0].sprite.x / 32) >= 75){ //El jugador se encuentra entre los cuadrantes 3, 7, 11, 15
            if(Math.floor(players[0].sprite.y / 32) < 25){ min_x = 75; min_y = 0; x=100; y=25; }//Cuadrante 3
            if(Math.floor(players[0].sprite.y / 32) >= 25 && Math.floor(players[0].sprite.y / 32) < 50){ min_x = 75; min_y = 25; x=100; y=100; }//Cuadrante 7
            if(Math.floor(players[0].sprite.y / 32) >= 50 && Math.floor(players[0].sprite.y / 32) < 75){ min_x = 75; min_y = 50; x=100; y=75; }//Cuadrante 11
            if(Math.floor(players[0].sprite.y / 32) >= 75){ min_x = 75; min_y = 75; x=100; y=100; }//Cuadrante 15
        }

        if(boolUpdate){
            for (l=0; l< layer.length; l++) { // l < g_game.tileMap.layers.length
                for (fy = min_y; fy < y; fy++) { // y < g_game.tileMap.layers.height
                    for (fx = min_x; fx < x; fx++) { // x < g_game.tileMap.width
                        var tile = map.getTile(fx, fy, l);
                        //console.log(tile); 
                        if(layer[l].visible && tile){
                            if (tile.layer.name === "Suelo" ) {
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#A9D0F5';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            }else if((tile.layer.name === "Adornos1") || (tile.layer.name === "Adornos2") || (tile.layer.name === "Adornos3") ){
                                //console.log(tile);
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#01DFD7';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            }else if(tile.layer.name === "Cierres"){
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#610B21';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                                
                            } else if(tile.layer.name === "Paredes"){
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#08298A';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);

                                
                            } 
                            for(i = 1; i <= 11; i++){
                                if(tile.layer.name === "bloqueo" + i){
                                    // fill a pixel in the minimap
                                    miniMapBmd.ctx.fillStyle = '#8E2008';
                                    miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                                }
                            }
                            
                        }
                        if(!layer[l].visible && tile && map_handler.next === l){
                            // fill a pixel in the minimap
                            miniMapBmd.ctx.fillStyle = '#D19C04';
                            miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                        }
                        if(l >= layer.length-1){
                            //Draw the lines of the rectangles
                            miniMapBmd.ctx.beginPath();
                            miniMapBmd.ctx.lineWidth="0.5";
                            miniMapBmd.ctx.strokeStyle="black";
                            miniMapBmd.ctx.rect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            miniMapBmd.ctx.stroke();
                        }
                    }
                }
            }
            miniMapBmd.dirty = true; //Sirve para que se actualice correctamente el minimapa
            boolUpdate = false;
        }


        //Aquí es donde actualizamos dinámicamente los objetos que se mueven
        game.miniMapOverlayBmd.context.clearRect(0, 0, game.miniMapOverlay.width, game.miniMapOverlay.height);

        //Dibujamos al jugador
        game.miniMapOverlayBmd.rect(Math.floor((players[0].sprite.x / 32) - min_x) * 8, Math.floor((players[0].sprite.y / 32) - min_y) * 8, 8, 8, 'green');
	//Dibujamos enemigo (Sujeto a cambios, como que solo aparezca en el radio de visión)
        game.miniMapOverlayBmd.rect(Math.floor((players[1].sprite.x / 32) - min_x) * 8, Math.floor((players[1].sprite.y / 32) - min_y) * 8, 8, 8, 'red');
        game.miniMapOverlayBmd.dirty = true; //Sirve para que se actualice correctamente el minimapa
        /////////////// FIN MINIMAPA ///////////////

        //////////// DAÑO ///////////////
        if(damage_spr.visible){ 
            damage_spr.x = players[0].sprite.x + (players[0].sprite.width/2); 
            damage_spr.y = players[0].sprite.y + (players[0].sprite.height/2); 
            //damage_spr.angle = result;
        }
        //////////// FIN DAÑO ///////////////

        /////////////// TEMPORIZADOR ///////////////
        temporizador.destroy();
        if(temp === undefined){ temp = new timeController(); }
        if(temp != undefined){
            time = temp.getTime();
            text = time[0] + ":" + time[1];
        } else { text = "0:00" }
       
        //text = time;
        style = { font: "25px Times New Roman", fill: "#FFFFFF", align: "left" };
        temporizador = game.add.text(0, 0, text, style);
        temporizador.fixedToCamera = true;
        temporizador.cameraOffset.setTo(400, 60);
        iGroup.add(temporizador);
        /////////////// FIN TEMPORIZADOR ///////////////

        game.world.bringToTop(iGroup);    
    }
}

function changeWeaponFunc1(){
    if(players[0].hasOrb){
        orbes[0].switch();
    }
}
function changeWeaponFunc2(){
    if(players[1].hasOrb){
        orbes[1].switch();
    }
}
function consumeFood(){
    players[0].consume();
}
function punchFunc1(){
    players[0].punch();
}
function miniMapUpdate(){
    boolUpdate = true;
}
function drawDamageDirection(b){
    //Cálculo de la dirección de la bala y su rotación
    var y = (b.y - (players[0].sprite.y + players[0].sprite.height/2));
    var x = (b.x - (players[0].sprite.x + players[0].sprite.width/2));
    
    var h = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    var rad_result = Math.asin(y / h);
    var result = ((rad_result * 180) / Math.PI);
    
    if(x < 0){
         result += 180;
         if(y < 0) { result -= 2*(result - 180); }
         if(y >= 0) {result += 2*(180-result); }
    } 
    //Hacer visible el sprite
    damage_spr.visible = true;

    damage_spr.angle = result;

    deleteSpr = function(){
        damage_spr.visible = false;
    }
    setTimeout(deleteSpr,1000);
}

function generateItems(){
  
    //Armas
    for(var i = 0; i < 5; i++){
        switch(Math.floor(Math.random()*2)){
            case 0:
                var w = new WeaponItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200), 'pistol', 1, 500, 10, 'pistola');
                break;
            case 1:
                var w = new WeaponItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200),'ak-47', 0.25, 200, 30, 'metralleta');
                break;
        }
        while(map.getTileWorldXY(w.sprite.x, w.sprite.y, 32, 32, layer[0]) === null){
            w.sprite.x = Math.floor(Math.random()*2800 + 200);
            w.sprite.y = Math.floor(Math.random()*2800 + 200);
            console.log('out');
        }
        weaponItems.push(w);
    }
    
    //Munición
    for(var i = 0; i < 6; i++){
        switch(Math.floor(Math.random()*2)){
            case 0:
                var a = new AmmoItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200), 'pistol_ammo',10, 'pistola');
                break;
            case 1:
                var a = new AmmoItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200),'ak47_ammo',30, 'metralleta');
                break;
        }
        while(map.getTileWorldXY(a.sprite.x, a.sprite.y, 32, 32, layer[0]) === null){
            a.sprite.x = Math.floor(Math.random()*2800 + 200);
            a.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        ammoItems.push(a);
    }
    //Escudo
    for(var i = 0; i < 4; i ++){
        var s = new ShieldItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200));
        while(map.getTileWorldXY(s.sprite.x, s.sprite.y, 32, 32, layer[0]) === null){
            s.sprite.x = Math.floor(Math.random()*2800 + 200);
            s.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        shieldItems.push(s);
    }
    //Comida
    for(var i = 0; i < 8; i++){
        var f = new FoodItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200),'food');
        while(map.getTileWorldXY(f.sprite.x, f.sprite.y, 32, 32, layer[0]) === null){
            f.sprite.x = Math.floor(Math.random()*2800 + 200);
            f.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        foodItems.push(f);
    }
}

//Temporizador del mapa
function timeController(){
    var randomTime = generateRandomInteger(10000,20000);
    that = this;

    //setTimeout(this.destroy,randomTime);
    this.getTime = function(){
        var calcTime;
        var remaining = this.timer.getTimeLeft();
        var s = Math.floor(remaining /1000)%60;
        var m = Math.floor(Math.floor(remaining /1000)/60);
        calcTime = [m,s];
        return calcTime;
    }
    restartTime = function(){
        //Cada vez que se resetea el reloj debemos enviar una señal para que
        // el mapa se vaya cerrando. Si no queda más por cerrar no se crea ningún temporizador
        that.timer.pause();
        map_handler.closed();
        if(map_handler.phase != 0){
            randomTime = generateRandomInteger(10000,20000);
            var newTimer = new Timer(this.restartTime,randomTime);
            that.timer = newTimer;
            map_handler.nextRoom();
        }
        //El recolector de basura se encargará de eliminar el Timer que ha quedado sin variable
    }
    this.timer = new Timer(restartTime,randomTime);
}

// Temporizador extraído de https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout por el usuario "super"
function Timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.getStateRunning = function() {
        return running
    }

    this.start()
}

//Extraído de https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript por "Faiz Mohamed Haneef"
function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
  }

function MapHandler(layer){
    //Fase 1: layer.length - 5 - 5 hasta layer.length - 5 (5 capas distintas a bloqueo y otras 5 de otras fases)
    this.phase = 1;
    this.next = generateRandomInteger(layer.length - 10, layer.length - 6);

    this.closed = function(){
        layer[this.next].visible = true;

        //Activamos colisiones del layer
        map.setCollisionBetween(5, 7, true, layer[this.next]);
        map.setCollisionBetween(21, 23, true, layer[this.next]);
        map.setCollisionBetween(37, 39, true, layer[this.next]);
        first_visible = true;
    }
    this.nextRoom = function(){
        this.phase = checkPhase();
        if(this.phase === 1) { this.next = generateRandomInteger(layer.length - 10, layer.length - 6); }
        if(this.phase === 2) { this.next = generateRandomInteger(layer.length - 5, layer.length - 3); }
        if(this.phase === 3) { this.next = 14; }
        if(this.phase === 0) { this.next = 15; }
        if(layer[this.next].visible && this.phase != 0){ this.nextRoom(); }
    }
    checkPhase = function(){
        var checkNum = 0;
        for(i = layer.length - 10; i < layer.length ; i++){ // Fase 1
            if(layer[i].visible) { checkNum ++; }
        }
        if(checkNum < 5) { return 1; }
        if(checkNum >= 5 && checkNum < 8) { return 2; }
        if(checkNum === 8) { return 3; }
        if(checkNum > 8){ return 0; }
    }

}