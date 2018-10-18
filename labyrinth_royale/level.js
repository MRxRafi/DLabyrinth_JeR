DLabyrinth.levelState = function(game){

}
var players;
var orbes;
var weaponItems;
var ammoItems;
var lifeItems;

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
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.tKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
        this.fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);


        //Conjuntos de objetos del juego
        players = new Array();
        orbes = new Array();
        weaponItems = new Array();
        ammoItems = new Array();
        lifeItems = new Array();

        //Creamos los jugador
        players.push( new Jugador(300, 300, 'spriteSheet'));
        players.push( new Jugador(500, 300, 'spriteSheet'));

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

        //Armas por el mapa
        //var g = new WeaponItem(500, 500, 'orb', 1, 500, 10, 'pistola');
        var h = new WeaponItem(100, 100,'bullet', 0.25, 200, 30, 'metralleta');
        //weaponItems.push(g);
        weaponItems.push(h);

        //Munición por el mapa
        var a = new AmmoItem(100, 500, 'bullet', 30, 'metralleta');
        ammoItems.push(a);

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
            players[0].sprite.x -= 5;
            keydownMove[0] = true;
        } 
        if (this.dKey.isDown){
            players[0].sprite.x += 5;
            keydownMove[0] = true;
        }
        if (this.wKey.isDown){
            players[0].up = true;
            players[0].sprite.y -= 5;
            keydownMove[0] = true;
        }
        if (this.sKey.isDown){
            players[0].down = true; 
            players[0].sprite.y +=5;
            keydownMove[0] = true;
        } 
        if (this.qKey.isDown){
            if(players[0].hasOrb){
                orbes[0].switch();
            }
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
            players[1].sprite.x -= 5;
            keydownMove[1] = true;
        } 
        if (this.hKey.isDown){
            players[1].sprite.x += 5;
            keydownMove[1] = true;
        }
        if (this.tKey.isDown){
            players[1].up = true;
            players[1].sprite.y -= 5;
            keydownMove[1] = true;
        }
        if (this.gKey.isDown){
            players[1].down = true; 
            players[1].sprite.y +=5;
            keydownMove[1] = true;
        } 
        if (this.rKey.isDown){
            if(players[1].hasOrb){
                orbes[1].switch();
            }
        } 
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
            if(players[j].up) { players[j].sprite.animations.play('walkUp', 30, true); }
            if(players[j].down) { players[j].sprite.animations.play('walkDown', 30, true); }
            if(players[j].left) { players[j].sprite.animations.play('walkLeft', 30, true); }
            if(players[j].right) { players[j].sprite.animations.play('walkRight', 30, true); }
            players[j].up = players[j].down = players[j].right = players[j].left = false; //Reiniciamos variables

            //Paramos animación si no hay ninguna tecla pulsada PARA AMBOS JUGADORES
            if(!keydownMove[j]){ 
                players[j].sprite.animations.stop(null, true);
            }
        }

        //Movimiento del orbe PARA AMBOS JUGADORES
        for(var j = 0; j < players.length; j++){
            if(players[j].hasOrb){
                orbes[j].sprite.body.velocity.x = (players[j].sprite.x - orbes[j].sprite.x - 30)*5;
                orbes[j].sprite.body.velocity.y = (players[j].sprite.y - orbes[j].sprite.y - 30)*5;
            }
        }

        //Hacemos visible las vidas que le quedan al jugador
        if(changedLife && players[0].lifePoints >= 0.5){
            //Ocultamos los medios corazones
            for(i = 0; i < 3; i++){ halfH[i].visible = false; }
        
            for(i = 0; i < players[0].lifePoints; i++){ 
                oneH[i].visible = true;
            }
            for(i = 2; i > players[0].lifePoints-1; i--){ 
                oneH[i].visible = false;
            }
            //Si la vida no es entera dibujamos corazon partido
            if(players[0].lifePoints != 1 || players[0].lifePoints != 2 || players[0].lifePoints != 3){
                if(i!=3 && i>=0){halfH[i+1].visible = true;}
            }
            changedLife = false;
        }
        
        this.checkCollisions(); // Chequeamos colisiones jugadores-objetos

        //Administración de lo que sucede si algún jugador se queda sin vida
        for(var i = 0; i < players.length; i++){
            if(players[i].lifePoints <= 0){
                if(i == 0){
                    this.create();
                    //game.state.start('menuState');
                }else{
                    if(players[i].hasOrb){
						orbes[i].sprite.destroy();
						orbes.splice(i, 1);
                        
                    }
					players[i].sprite.destroy();
                    players.splice(i,1);
                   
                    this.create();
                }
            }
        }

    },

    checkCollisions : function(){
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

        //Colision con balas
        for(var j = 0; j < players.length; j++){
            if(players[j].hasOrb){
                orbes[j].weapons[0].weapon.bullets.forEach(function(b){
                   for(var i = 0; i < players.length; i++){
                        if(j != i){
                            if(game.physics.arcade.collide(players[i].sprite, b)){
                                players[i].lifePoints -= orbes[j].weapons[0].damage
                                b.destroy();
								if(i==0){changedLife = true;}
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

    this.up = false; /* Estas variables sirven para administrar que animación debe ir y si está o no activada */
    this.down = false;/* Por defecto, todas desactivadas */
    this.left = false;
    this.right = false;
    this.sprite.animations.play('upAnimation', 30, true);

    this.hasOrb = false;
    
     //Aquí es donde meteremos la vida, munición, armas..    
     this.lifePoints = 3;

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

}
function AmmoItem(x, y, spr, a, type){
    this.sprite = game.add.sprite(x, y, spr);
    this.type = type;
    this.ammo = a;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}
function Weapon(){
    this.empty;
    this.weapon;
    this.damage;
    this.ammo;
    this.type;
}
