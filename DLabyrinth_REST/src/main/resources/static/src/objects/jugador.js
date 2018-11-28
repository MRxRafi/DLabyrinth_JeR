/* VARIABLES DE ENTRADA
    - x e y: posición de spawn del jugador en el mundo
    - sprsheet: hoja de sprites para animar al personaje
    - id_player: identificador del jugador dentro del juego. Antes se
    usaba la posición en el array de jugadores.
*/
var otherPlayer;
function Jugador(x, y, sprsheet, id_player) {
    this.id = id_player;
    var disparado = false;
    
    //Sprite del personaje y asignación de las animaciones a variables
    this.sprite = game.add.sprite(x, y, sprsheet);
    playerGroup.add(this.sprite);
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

    this.points = 0;

    var keydownMove;

    //Consumir comida
    this.consume = function () {
        if (this.food > 0) {
            this.lifePoints = Math.min(this.lifePoints + 1, 3);
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

  //SI ES EL JUGADOR 1, COMENZAMOS EL TIMER DEL SERVIDOR (MapController)
    if(this.id === 1 && DLabyrinth.player.id === 1) { startTimer(); }
    
    this.punch = function () {
        switch (this.facing) {
            case 0:
                this.collisionArea.x = this.sprite.x;
                this.collisionArea.y = this.sprite.y;
                this.collisionArea.width = this.sprite.width;
                this.collisionArea.height = this.punchRange;
                this.sprite.animations.play('punchUp', 20, false);
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
        for (var i = 0; i < players.length; i++) {
            if (this.id != players[i].id) {
                if (game.physics.arcade.collide(this.collisionArea, players[i].sprite)) {
                    players[i].lifePoints -= this.punchDamage;
                    console.log('hit');
                }
            }
        }
    }

    /*
        Esta función se encarga de asignar las teclas al usuario (movimiento, acción, etc)
    */
    this.createInputs = function () {
    	if (this.id === DLabyrinth.player.id) {
            //Asignamos teclas a variables
            this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
            this.qKey.onDown.add(changeWeaponFunc, this, 0, this.id-1);
            this.zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
            this.zKey.onDown.add(consumeFood, this);
            this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.xKey.onDown.add(punchFunc1);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	}
    }

    /*
        Esta función se encarga de actualizar las teclas del usuario y realizar la acción
        asociada a la tecla en caso de haber sido pulsada.
    */
    this.updateInputs = function () {
        keydownMove = false;
        if (this.id === DLabyrinth.player.id){
            if (this.aKey.isDown) {
                this.sprite.body.velocity.x = -230;
                keydownMove = true;
            }
            if (this.dKey.isDown) {
                this.sprite.body.velocity.x = 230;
                keydownMove = true;
            }
            if (this.wKey.isDown) {
                this.up = true;
                this.sprite.body.velocity.y = -230;
                keydownMove = true;
            }
            if (this.sKey.isDown) {
                this.down = true;
                this.sprite.body.velocity.y = 230;
                keydownMove = true;
            }
            //Quitamos velocidad en caso de que no estén las teclas pulsadas
            if (!this.aKey.isDown && !this.dKey.isDown) { this.sprite.body.velocity.x = 0; }
            if (!this.wKey.isDown && !this.sKey.isDown) { this.sprite.body.velocity.y = 0; }

            if (this.xKey.isDown) {
                keydownMove = true;
            }
            if (this.spaceKey.isDown) {
            	if (orbes[this.id-1].weapons[0].ammo > 0) {
                	//Al disparar debemos enviar al servidor que hemos disparado
                	/* INFORMACIÓN A ENVIAR
                	 * 1. ID del jugador que disparó
                	 * 2. Dirección del disparo
                	 */
                	if(!disparado){
                		var bala = {
                    			idJug: this.id,
                    			directionX: game.input.mousePointer.position.x + game.camera.x,
                    			directionY: game.input.mousePointer.position.y + game.camera.y
                    	}
                		//console.log(bala.directionX + " / " + bala.directionY);
                    	//Ajax Put
                		createBala(bala);
                		disparado = true;
                		setTimeout(function(){ disparado = false; },orbes[this.id-1].weapons[0].weapon.fireRate);
                	}

                	
                	
                	//Disparamos en el juego
                    orbes[this.id-1].weapons[0].weapon.fireAtPointer(game.input.mousePointer);
                }
            }

            if (this.aKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { this.left = true; }
            if (this.dKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { this.right = true; }
        }
        
        
        //if(keydownMove){
        	//Actualizamos posiciones y velcidad en servidor
        	if(this.id === DLabyrinth.player.id){
        		DLabyrinth.player.positionX = this.sprite.x;
        		DLabyrinth.player.positionY = this.sprite.y;
        		DLabyrinth.player.velX = this.sprite.body.velocity.x;
        		DLabyrinth.player.velY = this.sprite.body.velocity.y;
        		updatePlayer(DLabyrinth.player);
        	}
        //}
        
        var otherId;
        if(this.id === 1 && DLabyrinth.player.id === 1) { otherId = 2; }
        if(this.id === 2 && DLabyrinth.player.id === 2) { otherId = 1; }
        if((this.id === 1 && DLabyrinth.player.id === 1)||(this.id === 2 && DLabyrinth.player.id === 2)){
        	getPlayer(function(player){
            	otherPlayer = player;
            }, otherId);
        }
        
        if(otherPlayer != undefined && players[otherPlayer.id - 1] != undefined){
        	
        	players[otherPlayer.id - 1].sprite.x = otherPlayer.positionX;
        	players[otherPlayer.id - 1].sprite.y = otherPlayer.positionY;
        	
        	players[otherPlayer.id - 1].sprite.body.velocity.x = otherPlayer.velX;
        	players[otherPlayer.id - 1].sprite.body.velocity.y = otherPlayer.velY;
        }
    }

    this.updateAnimations = function () {
        if (this.sprite.body.velocity.y < 0) { this.sprite.animations.play('walkUp', 30, true); this.facing = 0; }
        else if (this.sprite.body.velocity.y > 0) { this.sprite.animations.play('walkDown', 30, true); this.facing = 1; }
        else if (this.sprite.body.velocity.x < 0) { this.sprite.animations.play('walkLeft', 30, true); this.facing = 2; }
        else if (this.sprite.body.velocity.x > 0) { this.sprite.animations.play('walkRight', 30, true); this.facing = 3; }
        this.up = this.down = this.right = this.left = false; //Reiniciamos variables

        //Paramos animación si no hay ninguna tecla pulsada
        if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
            this.sprite.animations.stop('walkUp', true);
            this.sprite.animations.stop('walkDown', true);
            this.sprite.animations.stop('walkLeft', true);
            this.sprite.animations.stop('walkRight', true);
        }


        //Movimiento del orbe 
        if (this.hasOrb) {
            orbes[this.id - 1].sprite.body.velocity.x = (this.sprite.x - orbes[this.id - 1].sprite.x - 30) * 5;
            orbes[this.id - 1].sprite.body.velocity.y = (this.sprite.y - orbes[this.id - 1].sprite.y - 30) * 5;
        }
    }

    this.checkLifePoints = function(){
        if(this.lifePoints <= 0){
            var toRemove = playerGroup.getIndex(this.sprite);
            if(toRemove === 0){
                //Eliminamos al jugador 0 del grupo de jugadores
                //playerGroup.remove(toRemove);
            	deletePlayer(toRemove+1);
                game.state.start('endingState');
            }else{
            	/*
                if(this.hasOrb){
                    orbes[toRemove].sprite.destroy();
                    orbes.splice(toRemove, 1);
                }
                //Eliminamos al jugador 1 del grupo de jugadores
                playerGroup.remove(toRemove);
                this.sprite.destroy();
                players.splice(toRemove,1);
               */
            	deletePlayer(toRemove+1);
                game.state.start('endingState');
            }
        }
    }

    //Activamos físicas arcade para el personaje
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;


    this.sprite.body.setSize(this.sprite.width / 2 + 10, this.sprite.height / 2, this.sprite.width / 2 - 13, this.sprite.height / 2);
}
