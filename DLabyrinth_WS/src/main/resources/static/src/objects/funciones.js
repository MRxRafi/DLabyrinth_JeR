//Funcion de cambio de arma. Utiliza el ID del jugador y la tecla para activarlo.
function changeWeaponFunc(key ,id_player){
    if(players[id_player].hasOrb){
        orbes[id_player].switch();
    }
}

function consumeFood(){
    players[currentPlayer.id-1].consume();
    DLabyrinth.player.lifePoints = players[currentPlayer.id-1].lifePoints;
}

function punchFunc1(){
	//punchPlayer(currentPlayer.id);
	DLabyrinth.player.punched = true;
    players[currentPlayer.id-1].punch();
}

//Funcion para dibujar la direccion del daño. El dato entrante, b , es el sprite de la bala que colisiona con el jugador.
function drawDamageDirection(b){
    //Cálculo de la dirección de la bala y su rotación
    var y = (b.y - (players[currentPlayer.id-1].sprite.y + players[currentPlayer.id-1].sprite.height/2));
    var x = (b.x - (players[currentPlayer.id-1].sprite.x + players[currentPlayer.id-1].sprite.width/2));
    
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
function clearItems(){
	for(var i = 0; i < weaponItems.length; i++){
		weaponItems[i].sprite.destroy();
		weaponItems[i] = null;
	}
	for(var i = 0; i < ammoItems.length; i++){
		ammoItems[i].sprite.destroy();
		ammoItems[i] = null;
	}
	for(var i = 0; i < shieldItems.length; i++){
		shieldItems[i].sprite.destroy();
		shieldItems[i] = null;
	}
	for(var i = 0; i < foodItems.length; i++){
		foodItems[i].sprite.destroy();
		foodItems[i] = null;
	}
	console.log("Items cleared")
	
}

//Funcion para generar todos los items de manera aleatoria en el mapa. Si su sprite cae en un zona inaccesible se borra.
function generateItems(){
  
    /////////////////////////////////////////ARMAS/////////////////////////////////
    for(var i = 0; i < 5; i++){
        switch(Math.floor(Math.random()*2)){
            case 0:
                var w = new WeaponItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200), 'pistol', 1, 500, 10, 'pistola');
                break;
            case 1:
                var w = new WeaponItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200),'ak-47', 0.25, 200, 30, 'metralleta');
                break;
        }
        while(map.tileMap.getTileWorldXY(w.sprite.x, w.sprite.y, 32, 32, map.layers[0]) === null){
            w.sprite.x = Math.floor(Math.random()*2800 + 200);
            w.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        itemsGroup.add(w.sprite);
        weaponItems.push(w);
    }
    
    //////////////////////////////////////////FIN ARMAS//////////////////////////////////
    
    ////////////////////////////////////////MUNICION/////////////////////////////////////
    for(var i = 0; i < 6; i++){
        switch(Math.floor(Math.random()*2)){
            case 0:
                var a = new AmmoItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200), 'pistol_ammo',10, 'pistola');
                break;
            case 1:
                var a = new AmmoItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200),'ak47_ammo',30, 'metralleta');
                break;
        }
        while(map.tileMap.getTileWorldXY(a.sprite.x, a.sprite.y, 32, 32, map.layers[0]) === null){
            a.sprite.x = Math.floor(Math.random()*2800 + 200);
            a.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        itemsGroup.add(a.sprite);
        ammoItems.push(a);
    }
    
    
    //////////////////////////////////////FIN MUNICION///////////////////////////////////////
    
    /////////////////////////////////////ESCUDO//////////////////////////////////////////////
    for(var i = 0; i < 4; i ++){
        var s = new ShieldItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200));
        while(map.tileMap.getTileWorldXY(s.sprite.x, s.sprite.y, 32, 32, map.layers[0]) === null){
            s.sprite.x = Math.floor(Math.random()*2800 + 200);
            s.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        itemsGroup.add(s.sprite);
        shieldItems.push(s);
    }
    //Comida
    for(var i = 0; i < 8; i++){
        var f = new FoodItem(Math.floor(Math.random()*2800 + 200), Math.floor(Math.random()*2800 + 200),'food');
        while(map.tileMap.getTileWorldXY(f.sprite.x, f.sprite.y, 32, 32, map.layers[0]) === null){
            f.sprite.x = Math.floor(Math.random()*2800 + 200);
            f.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        itemsGroup.add(f.sprite);
        foodItems.push(f);
    }
    
    //Por último, mandamos la info de los items al servidor
    //Para weapon y ammo se manda u array para el tipo y otro para las posiciones. Para el resto de los items solo se mandan las posiciones
    var weaponPos = new Array();
    var weaponType = new Array();
    var ammoPos = new Array();
    var ammoType = new Array();
    var foodPos = new Array();
    var shieldPos = new Array();
    
    for (var i = 0; i < 5; i++){
    	weaponPos[i] = new Array();
    }
    for (var i = 0; i < 6; i++){
        ammoPos[i] = new Array();
    }
   
    for (var i = 0; i < 4; i++){

        shieldPos[i] = new Array();
    }
    for (var i = 0; i < 8; i++){
        foodPos[i] = new Array();
    }
    for (var i = 0; i < 5; i++){
    	weaponType[i] =weaponItems[i].type;
    	weaponPos[i][0] = weaponItems[i].sprite.x;
    	weaponPos[i][1] = weaponItems[i].sprite.y;
    }
    
    for(var i = 0; i < 6; i++){
    	ammoType[i] = ammoItems[i].type;
    	ammoPos[i][0] = ammoItems[i].sprite.x;
    	ammoPos[i][1] = ammoItems[i].sprite.y;
    }
   
    for(var i = 0; i < 4; i++){
    	shieldPos[i][0] = shieldItems[i].sprite.x;
    	shieldPos[i][1] = shieldItems[i].sprite.y;
    }
    
    for(var i = 0; i < 8; i++){
    	foodPos[i][0] = foodItems[i].sprite.x;
    	foodPos[i][1] = foodItems[i].sprite.y;
    }
    sendItemsWS(weaponType, weaponPos, ammoType, ammoPos, shieldPos, foodPos);

    clearItems();
}

function loadItems(items){
	//console.log(isItemsDone(function(done){return done;}));
	/*
	while(!isItemsDone(function(done){return done;})){
		console.log('esperando Items');
	}
	*/
	
	//cargamos weapons
	var wt = items.weaponTypes;
	for(var i = 0; i < wt.length; i++){
		var w;
		if(wt[i] == "pistola"){
			w = new WeaponItem(0, 0, 'pistol', 1, 500, 10, 'pistola');
		}else if(wt[i] == "metralleta"){
			w = new WeaponItem(0, 0,'ak-47', 0.25, 200, 30, 'metralleta');
		}
		
		weaponItems[i] = w;
	}
	
	var wp = items.weaponPos;
	for(var i = 0; i < wp.length; i++){
		if(weaponItems[i] != null){
			weaponItems[i].sprite.x = wp[i][0];
			weaponItems[i].sprite.y = wp[i][1];
		}
	}
	if(weaponItems[0] != null){ cargado = true}
	
	//cargamos ammo
	var at = items.ammoTypes;
	for(var i = 0; i < wt.length; i++){
		var a;
		if(at[i] == "pistola"){
			a = new AmmoItem(0, 0, 'pistol_ammo', 10, 'pistola');
		}else if(at[i] == "metralleta"){
			a = new AmmoItem(0, 0,'ak47_ammo', 30, 'metralleta');
		}
		
		ammoItems[i] = a;
	}
	
	var ap = items.ammoPos;
	for(var i = 0; i < wp.length; i++){
		if(ammoItems[i] != null){
			ammoItems[i].sprite.x = ap[i][0];
			ammoItems[i].sprite.y = ap[i][1];
		}
	}
	
	//cargamos shields
	var sp = items.shieldPos;
	for(var i = 0; i < sp.length; i++){
		if((sp[i][0] != 0 || sp[i][1] != 0) && sp[i].length > 0){
			shieldItems[i] = new ShieldItem(sp[i][0], sp[i][1]);
		}
	}
	
	//cargamos food
	var fp = items.foodPos;
	for(var i = 0; i < fp.length; i++){
		if((fp[i][0] != 0 || fp[i][1] != 0) && fp[i].length > 0){
			foodItems[i] = new FoodItem(fp[i][0], fp[i][1], 'food');
		}
	}
	console.log("Items loaded");

}

function miniMapUpdate(){
    boolUpdate = true;
}

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
}

function checkCollisions(){
    //Colision con el mapa
    for(i = 0; i < players.length; i++){
        for(j = 1; j < map.layers.length; j++){
            if(j != 2 && j < 6){
                game.physics.arcade.collide(players[i].sprite,map.layers[j]);
            } else if (j >= 6){
                //Qué pasa si el usuario estaba dentro cuando se cierra
                if(map.layers[j].visible){
                    var tile = map.tileMap.getTileWorldXY( players[i].sprite.x, players[i].sprite.y, 32, 32, map.layers[j]);

                    if(tile != null && first_visible) { players[i].lifePoints = 0; }

                    if(i === players.length - 1) { first_visible = false; }
                    game.physics.arcade.collide(players[i].sprite, map.layers[j]);
                }
            }
        }
    }

    var i = 0;
    //recoger armas
    weaponItems.forEach(function(o){
    	if(o != null){
    		for(var j = 0; j < players.length; j++){
                if(game.physics.arcade.collide(players[j].sprite, o.sprite)){
                    if(!players[j].hasOrb){
                        orbes[j] = new Orbe('orb', players[j]);
                        players[j].hasOrb = true;
                        
                        /* PROBLEMA DE SINCRONIZACION
                        if(DLabyrinth.player.id === j+1){
                        	DLabyrinth.player.hasOrb = true;
                        }*/
                    }
                    orbes[j].setWeapon(o);
                    o.sprite.destroy();
                    weaponItems.splice(i, 1);
                }
                i++;
            }
    	}
        
    });
    i = 0;
    //recoger munición
    ammoItems.forEach(function(o){
    	if(o != null){
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
        
    }
    });

    //recoger escudo
    i = 0;
    shieldItems.forEach(function(s){
    	if(s != null){
    		for(var j = 0; j < players.length; j++){
                if(game.physics.arcade.collide(players[j].sprite, s.sprite)){
                   
                    players[j].shield = 3;
                    shieldItems[i].sprite.destroy();
                    shieldItems.splice(i, 1);
                    players[j].changedShield = true;
                }
                
            }
            i++;
    	}
        
    });

    //recoger comida
    i = 0;
    foodItems.forEach(function(f){
    	if(f != null){
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
    	}
        
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
                                if(players[i].id === DLabyrinth.player.id) { DLabyrinth.player.shield = players[i].shield; players[i].changedShield = true;}
                                //if(i==0){players[0].changedShield = true;}

                            }else{
                                players[i].lifePoints -= orbes[j].weapons[0].damage;
                                if(players[i].id === DLabyrinth.player.id) { DLabyrinth.player.lifePoints = players[i].lifePoints; players[i].changedLife = true;}
                                //if(i==0){players[0].changedLife = true;}
                            }
                            if(i === currentPlayer.id-1){ drawDamageDirection(b); }
                            b.kill();
                        }
                    }
                }

                //Colisión bala con pared
                for(i = 1; i < 6; i++){
                    if(i != 2){

                        if(game.physics.arcade.collide(b, map.layers[i])){
                            //Animación de Explosion

                            b.kill();
                        }
                    }
                }
            });
            }
        
    }
    
}

//Lee las balas que ha lanzado el otro cliente (del servidor) y las pinta en el cliente actual
function loadOtherBullets(id){
	if(id === DLabyrinth.player.id){
		var otherId;
		if(id === 1) { otherId = 2; } else { otherId = 1; }
		//Ajax get
		getBalas(function(balas){
			if(balas){
				//Pintamos las balas
				
				for(i = 0; i < balas.length; i++){
					if(balas[i] != null){
						orbes[otherId-1].weapons[0].weapon.fireAtXY(balas[i].directionX, balas[i].directionY);
					}
					
				}
				
			}
			
		}, otherId);
	}
}

