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

DLabyrinth.levelState.prototype = {
    preload: function() {
        //Assets a cargar
        game.load.spritesheet('spriteSheet', 'assets/spriteSheets/spriteSheet1.png', 30, 49, 40);
        game.load.image('orb', 'assets/props/orb.png');
        game.load.image('bg', 'assets/tiles/debug.png');
        game.load.image('bullet', 'assets/props/bullet.png');

        //Vidas y escudo
        game.load.image('halfL', 'assets/props/life/half.png');
        game.load.image('oneL', 'assets/props/life/one.png');
        game.load.image('shield', 'assets/props/shield/shield.png');

        //Armas
        game.load.image('pistol', 'assets/props/pistol.png');
        game.load.image('machineGun', 'assets/props/ak-47.png');
    },


    create: function() {
        //Sprite background
        this.bg = game.add.tileSprite(0, 0, 1920, 1920, 'bg');

        //Límites del mundo para la cámara
        game.world.setBounds(0, 0, 1920, 1920);

         //Conjuntos de objetos del juego
         players = new Array();
         orbes = new Array();
         weaponItems = new Array();
         ammoItems = new Array();
         lifeItems = new Array();
         shieldItems = new Array();
         foodItems = new Array();
 
         //Creamos los jugador
         players.push( new Jugador(300, 300, 'spriteSheet'));
         players.push( new Jugador(500, 300, 'spriteSheet'));
     

        //Asignamos teclas a variables
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.qKey.onDown.add(changeWeaponFunc1, this);
        this.zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.zKey.onDown.add(players[0].consume);
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
	
        //Armas por el mapa
        //var g = new WeaponItem(500, 500, 'orb', 1, 500, 10, 'pistola');
        var h = new WeaponItem(100, 100,'bullet', 0.25, 200, 30, 'metralleta');
        //weaponItems.push(g);
        weaponItems.push(h);

        //Munición por el mapa
        var a = new AmmoItem(100, 500, 'bullet', 30, 'metralleta');
        ammoItems.push(a);

        //Escudo por el mapa
        var s = new ShieldItem(300, 500);
        shieldItems.push(s);

        //Comida por el mapa
        var f = new FoodItem(500, 500);
        foodItems.push(f);

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
        if(this.zKey.isDown){
            players[0].consume();
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
        
        this.checkCollisions(); // Chequeamos colisiones jugadores-objetos

	/////////////////////////// INTERFAZ ///////////////////////////
        interfaz.updateInterface(players[0], orbes);
        /////////////////////////// FIN INTERFAZ ///////////////////////////
	    
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

        //recoger escudo
        i = 0;
        shieldItems.forEach(function(s){
            for(var j = 0; j < players.length; j++){
                if(game.physics.arcade.collide(players[j].sprite, s.sprite)){
                   
                    players[j].shield = 3;
                    shieldItems[i].sprite.destroy();
                    shieldItems.splice(i, 1);
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
                                b.destroy();
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
    
    //Aquí es donde meteremos la vida, comida..   
    this.lifePoints = 3;

    //Escudo
    this.shield = 0;

    //Comida
    this.food = 0;
    //Consumir comida
    this.consume = function(){
        if(this.food > 0){
            this.lifePoints = Math.min(this.lifePoints+1, 3);
            changedLife = true;
            this.food--;
        }
    }

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
function ShieldItem(x, y){
    this.sprite = game.add.sprite(x, y, 'shield');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}
function FoodItem(x, y){
    this.sprite = game.add.sprite(x, y, 'shield');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}
function Weapon(){
    this.empty;
    this.weapon;
    this.damage;
    this.ammo;
    this.type;
}

/* Para crear la interfaz necesitamos la siguiente información:
    -Vidas del jugador
    -Escudo del jugador
    -Armas del jugador
    -Munición del arma actual
    -Posición actual del jugador (minimapa)
    -Comida que tiene el jugador
    -Puntuación del jugador. */
function Interface(){
    var iGroup = game.add.group(); //Grupo de sprite de la interfaz

    var oneH, halfH; //Corazones
    var shield; //Escudo
    var weapons; //Armas
    var municion; //Municion
    var comida; //Comida
    var puntuacion; //Puntuacion

    this.createInterface = function(){
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
        shield = [game.add.sprite(0, 0, 'shield'), game.add.sprite(0, 0, 'shield'), game.add.sprite(0, 0, 'shield')];
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
        weapons = [game.add.sprite(0, 0, 'pistol'), game.add.sprite(0, 0, 'pistol')];
        for(i = 0; i < weapons.length; i++){
            weapons[i].fixedToCamera = true;
            weapons[i].scale.setTo(0.2);
            weapons[i].visible = false; //Inicialmente sin armas
            iGroup.add(weapons[i]);
        }
        weapons[0].cameraOffset.setTo(35, 600-100);
        weapons[1].cameraOffset.setTo(35+60, 600-100);
        /////////////// FIN ARMAS ///////////////

        /////////////// MUNICION ///////////////
        text = "Municion:  ";
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        municion = game.add.text(game.world.centerX-60, 0, text, style);
        municion.fixedToCamera = true;
        municion.cameraOffset.setTo(625, 400);
        
        /////////////// FIN MUNICION ///////////////

        /////////////// COMIDA ///////////////
        text = "Comida:  ";
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        comida = game.add.text(game.world.centerX-60, 0, text, style);
        comida.fixedToCamera = true;
        comida.cameraOffset.setTo(625, 350);
        /////////////// FIN COMIDA ///////////////

        /////////////// PUNTUACIÓN ///////////////
        text = "Puntuacion:  ";
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        puntuacion = game.add.text(game.world.centerX-60, 0, text, style);
        puntuacion.fixedToCamera = true;
        puntuacion.cameraOffset.setTo(625, 25);
        /////////////// FIN PUNTUACIÓN ///////////////

        /////////////// MINIMAPA ///////////////
        /////////////// FIN MINIMAPA ///////////////

    }

    this.updateInterface = function(player, orbe){ 
        /////////////// VIDA ///////////////
        //Hacemos visible las vidas que le quedan al jugador
        if(player.changedLife && player.lifePoints > 0){
            //Ocultamos los medios corazones
            for(i = 0; i < 3; i++){ halfH[i].visible = false; }

            for(i = 0; i < player.lifePoints; i++){ 
                oneH[i].visible = true;
            }
            for(i = 2; i > player.lifePoints-1; i--){ 
                oneH[i].visible = false;
            }
            if (player.lifePoints > 2.5){ oneH[2].visible = true; }
                if (player.lifePoints <= 2 && player.lifePoints > 1.5){ oneH[1].visible = true;  }
                if (player.lifePoints <= 1 && player.lifePoints > 0.5){ oneH[0].visible = true;  }

            //Si la vida no es entera dibujamos corazon partido
            if((player.lifePoints > 0 && player.lifePoints <= 0.5) || (player.lifePoints > 1 && player.lifePoints <= 1.5) || (player.lifePoints > 2 && player.lifePoints <= 2.5)){
                if(i>=-1){halfH[i+1].visible = true;}
            }
            player.changedLife = false;
        }
        /////////////// FIN VIDA ///////////////

        /////////////// ESCUDO ///////////////
        /////////////// FIN ESCUDO ///////////////

        /////////////// ARMAS ///////////////
        //Si existe el orbe del personaje miramos si tiene armas
        if(orbe[0] != null){ //Si las tiene mostramos sprite
            if(!orbe[0].weapons[0].empty){
                weapons[0].visible = true;
            } else { weapons[0].visible = false; }
            if(!orbe[0].weapons[1].empty){
                weapons[1].visible = true;
            } else { weapons[1].visible = false; }
        }
        /////////////// FIN ARMAS ///////////////

        /////////////// MUNICION ///////////////
        if(orbe[0] != null){
            municion.destroy();

            text = "Municion:  " + orbe[0].weapons[0].ammo;
            style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
            municion = game.add.text(game.world.centerX-60, 0, text, style);
            municion.fixedToCamera = true;
            municion.cameraOffset.setTo(625, 400);
            
        }
        /////////////// FIN MUNICION ///////////////

        /////////////// COMIDA ///////////////
        comida.destroy();
        text = "Comida:  " + players[0].food;
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "left" };
        comida = game.add.text(game.world.centerX-60, 0, text, style);
        comida.fixedToCamera = true;
        comida.cameraOffset.setTo(625, 350);
        /////////////// FIN COMIDA ///////////////

        /////////////// PUNTUACIÓN ///////////////
        /////////////// FIN PUNTUACIÓN ///////////////

        /////////////// MINIMAPA ///////////////
        /////////////// FIN MINIMAPA ///////////////

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

/*
// MINIMAPA SACADO DE http://www.html5gamedevs.com/topic/14182-creating-a-mini-map-in-phaser/  POR EL USUARIO "sanojian"
//CREATE
// the static mapvar
miniMapBmd = game.add.bitmapData(g_game.tileMap.width*g_game.miniMapSize, g_game.tileMap.height*g_game.miniMapSize);
// g_game.miniMapSize is the pixel size in the minimap
// iterate my map layers
for (l=0; l<g_game.tileMap.layers.length; l++) {
    for (y = 0; y < g_game.tileMap.height; y++) {
        for (x = 0; x < g_game.tileMap.width; x++) { 
            var tile = g_game.tileMap.getTile(x, y, l);
            if (tile && g_game.tileMap.layers[l].name == 'Ground') {
                // fill a pixel in the minimap
                miniMapBmd.ctx.fillStyle = '#bc8d6b';
                miniMapBmd.ctx.fillRect(x * g_game.miniMapSize, y * g_game.miniMapSize, g_game.miniMapSize, g_game.miniMapSize);
            } //else if(){} //... other types of tiles
        }
    }
}
g_game.miniMap = this.game.add.sprite(x, y, miniMapBmd);
// dynamic bmd where I draw mobile stuff like friends and enemies
g_game.miniMapOverlay = this.game.add.bitmapData(g_game.tileMap.width*g_game.miniMapSize, g_game.tileMap.height*g_game.miniMapSize);
this.game.add.sprite(g_game.miniMap.x, g_game.miniMap.y, g_game.miniMapOverlay);
//UPDATE
g_game.miniMapOverlay.context.clearRect(0, 0, g_game.miniMapOverlay.width, g_game.miniMapOverlay.height);
g_game.soldiers.forEach(function(soldier)
{
    g_game.miniMapOverlay.rect(Math.floor(soldier.x / TILE_SIZE) * g_game.miniMapSize, Math.floor(soldier.y / TILE_SIZE) * g_game.miniMapSize, g_game.miniMapSize, g_game.miniMapSize, color);
});
g_game.miniMapOverlay.dirty = true; 
*/
