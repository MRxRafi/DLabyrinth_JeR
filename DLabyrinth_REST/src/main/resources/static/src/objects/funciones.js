
function changeWeaponFunc(key ,id_player){
    if(players[id_player].hasOrb){
        orbes[id_player].switch();
    }
}

function consumeFood(){
    players[0].consume();
}

function punchFunc1(){
    players[0].punch();
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
        while(map.tileMap.getTileWorldXY(w.sprite.x, w.sprite.y, 32, 32, map.layers[0]) === null){
            w.sprite.x = Math.floor(Math.random()*2800 + 200);
            w.sprite.y = Math.floor(Math.random()*2800 + 200);
            console.log('out');
        }
        itemsGroup.add(w.sprite);
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
        while(map.tileMap.getTileWorldXY(a.sprite.x, a.sprite.y, 32, 32, map.layers[0]) === null){
            a.sprite.x = Math.floor(Math.random()*2800 + 200);
            a.sprite.y = Math.floor(Math.random()*2800 + 200);
        }
        itemsGroup.add(a.sprite);
        ammoItems.push(a);
    }
    //Escudo
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
}

function miniMapUpdate(){
    boolUpdate = true;
}

//Extraído de https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript por "Faiz Mohamed Haneef"
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