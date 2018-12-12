function Interface() {
    var iGroup = game.add.group(); // Grupo de sprite de la interfaz

    var vision_spr;
    var oneH, halfH; // Corazones
    var shield; // Escudo
    var weapons; // Armas
    var municion; // Municion
    var comida; // Comida
    var puntuacion; // Puntuacion
    var temporizador, temp; // Timer de la partida

    this.createInterface = function () {
    	

        // //////////CAMPO DE VISION///////////////
        vision_spr = game.add.sprite(0, 0, 'vision');
        vision_spr.anchor.setTo(0.5);
        iGroup.add(vision_spr);
        // ////////FIN CAMPO DE VISION/////////////

        // ///////////// VIDA ///////////////
        // Creamos los sprites de la vida (al principio siempre 3 corazones)
        oneH = [game.add.sprite(35, 15, 'oneL'), game.add.sprite(35 + 20, 15, 'oneL'), game.add.sprite(35 + 40, 15, 'oneL')];
        for (i = 0; i < oneH.length; i++) {
            oneH[i].fixedToCamera = true;
            oneH[i].scale.setTo(0.1);
            iGroup.add(oneH[i]);
        }
        oneH[0].cameraOffset.setTo(15, 15);
        oneH[1].cameraOffset.setTo(15 + 40, 15);
        oneH[2].cameraOffset.setTo(15 + 80, 15);

        // Creamos los sprites de medio corazón y los hacemos invisibles al
		// principio
        halfH = [game.add.sprite(35, 15, 'halfL'), game.add.sprite(35 + 20, 15, 'halfL'), game.add.sprite(35 + 40, 15, 'halfL')]
        for (i = 0; i < halfH.length; i++) {
            halfH[i].fixedToCamera = true;
            halfH[i].scale.setTo(0.1);
            halfH[i].visible = false;
            iGroup.add(halfH[i]);
        }
        halfH[0].cameraOffset.setTo(15, 15);
        halfH[1].cameraOffset.setTo(15 + 40, 15);
        halfH[2].cameraOffset.setTo(15 + 80, 15);
        // ///////////// FIN VIDA ///////////////

        // ///////////// ESCUDO ///////////////
        shield = [game.add.sprite(0, 0, 'shield1'), game.add.sprite(0, 0, 'shield2'), game.add.sprite(0, 0, 'shield3')];
        for (i = 0; i < shield.length; i++) {
            shield[i].fixedToCamera = true;
            shield[i].scale.setTo(0.2);
            shield[i].visible = false; // Inicialmente sin escudo
            iGroup.add(shield[i]);
        }
        shield[0].cameraOffset.setTo(-135, -70);
        shield[1].cameraOffset.setTo(-135 + 40, -70);
        shield[2].cameraOffset.setTo(-135 + 80, -70);
        // ///////////// FIN ESCUDO ///////////////

        // ///////////// ARMAS ///////////////
        weapons = [game.add.sprite(0, 0, 'pistol'), game.add.sprite(0, 0, 'pistol'), game.add.sprite(0, 0, 'ak-47'), game.add.sprite(0, 0, 'ak-47')];
        for (i = 0; i < weapons.length; i++) {
            weapons[i].fixedToCamera = true;
            // weapons[i].scale.setTo(0.2);
            weapons[i].visible = false; // Inicialmente sin armas
            iGroup.add(weapons[i]);
        }
        weapons[0].cameraOffset.setTo(35, 600 - 100);
        weapons[2].cameraOffset.setTo(35, 600 - 100);
        weapons[1].cameraOffset.setTo(35 + 60, 600 - 100);
        weapons[3].cameraOffset.setTo(35 + 60, 600 - 100);
        // ///////////// FIN ARMAS ///////////////

        // ///////////// MUNICION ///////////////
        text = "Municion:  ";
        style = { font: "12px Press Start 2P", fill: "#FFFFFF", align: "left" };
        municion = game.add.text(game.world.centerX - 60, 0, text, style);
        municion.fixedToCamera = true;
        municion.cameraOffset.setTo(625, 350);
        iGroup.add(municion);
        // ///////////// FIN MUNICION ///////////////

        // ///////////// COMIDA ///////////////
        text = "Comida:  ";
        style = { font: "12px Press Start 2P", fill: "#FFFFFF", align: "left" };
        comida = game.add.text(game.world.centerX - 60, 0, text, style);
        comida.fixedToCamera = true;
        comida.cameraOffset.setTo(625, 300);
        iGroup.add(comida);
        // ///////////// FIN COMIDA ///////////////

        // ///////////// PUNTUACIÓN ///////////////
        text = "Puntuacion:  ";
        style = { font: "12px Press Start 2P", fill: "#FFFFFF", align: "left" };
        puntuacion = game.add.text(game.world.centerX - 60, 0, text, style);
        puntuacion.fixedToCamera = true;
        puntuacion.cameraOffset.setTo(625, 25);
        iGroup.add(puntuacion);
        // ///////////// FIN PUNTUACIÓN ///////////////

        // ///////////// MINIMAPA ///////////////
        // MINIMAPA SACADO DE
		// http://www.html5gamedevs.com/topic/14182-creating-a-mini-map-in-phaser/
		// POR EL USUARIO "sanojian"
        // Modificado a nuestro gusto
        // Parte del mapa estático
        // Dimensiones del mapa: 3200 x 3200
        // Dimensiones de cada tile: 32 x 32 -> Total del mapa 100 x 100
        // Dimensiones del minimapa: 200 x 200 -> Cada hueco del mapa ocupa 8
		// pixeles
        // Dividido en 4 cuadrantes el minimapa, depende de donde estés cambia a
		// uno u otro

        // static bmd
        miniMapBmd = game.add.bitmapData(25 * 8, 25 * 8);
        miniMapBmd.ctx.globalAlpha = 0.6; // Transparencia
        miniMap = game.add.sprite(625, 350, miniMapBmd);
        miniMap.fixedToCamera = true;
        miniMap.cameraOffset.setTo(590, 390);
        iGroup.add(miniMap);
        // dynamic bmd where I draw mobile stuff like friends and enemies
        game.miniMapOverlayBmd = game.add.bitmapData(25 * 8, 25 * 8);
        game.miniMapOverlay = game.add.sprite(miniMap.x, miniMap.y, game.miniMapOverlayBmd);
        game.miniMapOverlay.fixedToCamera = true;
        game.miniMapOverlay.cameraOffset.setTo(590, 390);
        iGroup.add(game.miniMapOverlay);
        // ///////////// FIN MINIMAPA ///////////////

        // ///////////// TEMPORIZADOR ///////////////
        text = "0:00";
        style = { font: "15px Press Start 2P", fill: "#FFFFFF", align: "left" };
        temporizador = game.add.text(game.world.centerX, 60, text, style);
        temporizador.fixedToCamera = true;
        temporizador.cameraOffset.setTo(400, 60);
        iGroup.add(temporizador);

        // ///////////// FIN TEMPORIZADOR ///////////////
    }

    this.updateInterface = function (player, orbe) {

        vision_spr.x =player.sprite.x;
        vision_spr.y =player.sprite.y;

        // ///////////// VIDA ///////////////
        // Hacemos visible las vidas que le quedan al jugador
        if (player.changedLife && player.lifePoints > 0) {
            // Ocultamos los medios corazones
            for (i = 0; i < 3; i++) { halfH[i].visible = false; }

            for (i = 0; i <player.lifePoints; i++) {
                oneH[i].visible = true;
            }
            for (i = 2; i >player.lifePoints - 1; i--) {
                oneH[i].visible = false;
            }
            if (player.lifePoints > 2.5) { oneH[2].visible = true; }
            if (player.lifePoints <= 2 &&player.lifePoints > 1.5) { oneH[1].visible = true; }
            if (player.lifePoints <= 1 &&player.lifePoints > 0.5) { oneH[0].visible = true; }

            // Si la vida no es entera dibujamos corazon partido
            if ((player.lifePoints > 0 &&player.lifePoints <= 0.5) || (player.lifePoints > 1 && player.lifePoints <= 1.5) || (player.lifePoints > 2 && player.lifePoints <= 2.5)) {
                if (i >= -1) { halfH[i + 1].visible = true; }
            }
           player.changedLife = false;
        }
        // ///////////// FIN VIDA ///////////////

        // ///////////// ESCUDO ///////////////
        if (player.changedShield) {
            for (i = 0; i < 3; i++) {
                shield[i].visible = false;
            }
            if (player.shield > 2) { shield[2].visible = true; }
            else if (player.shield <= 2 &&player.shield > 1) { shield[1].visible = true; console.log('2'); }
            else if (player.shield <= 1 &&player.shield > 0) { shield[0].visible = true; console.log('1'); }
           player.changedShield = false;
        }
        // ///////////// FIN ESCUDO ///////////////

     // ///////////// ARMAS ///////////////
        // Si existe el orbe del personaje miramos si tiene armas
        if (orbe[player.id-1] != null && (player.id === DLabyrinth.player.id)) { // Si las tiene mostramos sprite
            if (!orbe[player.id-1].weapons[0].empty) {
                if (orbe[player.id-1].weapons[0].type === 'pistola') { weapons[0].visible = true; } else { weapons[0].visible = false; }
                if (orbe[player.id-1].weapons[0].type === 'metralleta') { weapons[2].visible = true; } else { weapons[2].visible = false; }
            } else { weapons[0].visible = false; weapons[2].visible = false; }
            if (!orbe[player.id-1].weapons[1].empty) {
                if (orbe[player.id-1].weapons[1].type === 'pistola') { weapons[1].visible = true; } else { weapons[1].visible = false; }
                if (orbe[player.id-1].weapons[1].type === 'metralleta') { weapons[3].visible = true; } else { weapons[3].visible = false; }
            } else { weapons[1].visible = false; weapons[3].visible = false; }
        }
        // ///////////// FIN ARMAS ///////////////

        // ///////////// MUNICION ///////////////
        if (orbe[player.id-1] != null && (player.id === DLabyrinth.player.id)) {
            municion.destroy();

            text = "Municion:  " + orbe[player.id-1].weapons[0].ammo;
            style = { font: "12px Press Start 2P", fill: "#FFFFFF", align: "left" };
            municion = game.add.text(game.world.centerX - 60, 0, text, style);
            municion.fixedToCamera = true;
            municion.cameraOffset.setTo(625, 350);
        }
        iGroup.add(municion);

        // ///////////// FIN MUNICION ///////////////

        // ///////////// COMIDA ///////////////
        comida.destroy();
        text = "Comida:  " +player.food;
        style = { font: "12px Press Start 2P", fill: "#FFFFFF", align: "left" };
        comida = game.add.text(game.world.centerX - 60, 0, text, style);
        comida.fixedToCamera = true;
        comida.cameraOffset.setTo(625, 300);
        iGroup.add(comida);
        // ///////////// FIN COMIDA ///////////////

        // ///////////// PUNTUACIÓN ///////////////
        puntuacion.destroy();
        text = "Puntuacion:  " +player.points;
        style = { font: "12px Press Start 2P", fill: "#FFFFFF", align: "left" };
        puntuacion = game.add.text(game.world.centerX - 60, 0, text, style);
        puntuacion.fixedToCamera = true;
        puntuacion.cameraOffset.setTo(625, 25);
        iGroup.add(puntuacion);
        // ///////////// FIN PUNTUACIÓN ///////////////

        // ///////////// MINIMAPA ///////////////
        // Según donde esté el jugador actualizamos el mapa:
        // g_game.miniMapSize is the pixel size in the minimap
        // iterate my map layers
        miniMapBmd.ctx.clearRect(0, 0, miniMap.width, miniMap.height);
        var x, y, min_x, min_y; // Cuadrante en el que se encuentra el jugador
        /*
		 * Distribucion de cuadrantes tomando el mapa como referencia: { 0, 1,
		 * 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 }
		 */
        if (player) {
            if (Math.floor(player.sprite.x / 32) < 25) { // El jugador se
																// encuentra
																// entre los
																// cuadrantes 0,
																// 4, 8, 12
                if (Math.floor(player.sprite.y / 32) < 25) { min_x = 0; min_y = 0; x = 25; y = 25; }// Cuadrante
																											// 0
                if (Math.floor(player.sprite.y / 32) >= 25 && Math.floor(player.sprite.y / 32) < 50) { min_x = 0; min_y = 25; x = 25; y = 50; }// Cuadrante
																																								// 4
                if (Math.floor(player.sprite.y / 32) >= 50 && Math.floor(player.sprite.y / 32) < 75) { min_x = 0; min_y = 50; x = 25; y = 75; }// Cuadrante
																																								// 8
                if (Math.floor(player.sprite.y / 32) >= 75) { min_x = 0; min_y = 75; x = 25; y = 100; }// Cuadrante
																												// 12

            } else if (Math.floor(player.sprite.x / 32) >= 25 && Math.floor(player.sprite.x / 32) < 50) { // El
																														// jugador
																														// se
																														// encuentra
																														// entre
																														// los
																														// cuadrantes
																														// 1,
																														// 5,
																														// 9,
																														// 13
                if (Math.floor(player.sprite.y / 32) < 25) { min_x = 25; min_y = 0; x = 50; y = 25; }// Cuadrante
																											// 1
                if (Math.floor(player.sprite.y / 32) >= 25 && Math.floor(player.sprite.y / 32) < 50) { min_x = 25; min_y = 25; x = 50; y = 50; }// Cuadrante
																																								// 5
                if (Math.floor(player.sprite.y / 32) >= 50 && Math.floor(player.sprite.y / 32) < 75) { min_x = 25; min_y = 50; x = 50; y = 75; }// Cuadrante
																																								// 9
                if (Math.floor(player.sprite.y / 32) >= 75) { min_x = 25; min_y = 75; x = 50; y = 100; }// Cuadrante
																												// 13

            } else if (Math.floor(player.sprite.x / 32) >= 50 && Math.floor(player.sprite.x / 32) < 75) { // El
																														// jugador
																														// se
																														// encuentra
																														// entre
																														// los
																														// cuadrantes
																														// 2,
																														// 6,
																														// 10,
																														// 14
                if (Math.floor(player.sprite.y / 32) < 25) { min_x = 50; min_y = 0; x = 75; y = 25; }// Cuadrante
																											// 2
                if (Math.floor(player.sprite.y / 32) >= 25 && Math.floor(player.sprite.y / 32) < 50) { min_x = 50; min_y = 25; x = 75; y = 50; }// Cuadrante
																																								// 6
                if (Math.floor(player.sprite.y / 32) >= 50 && Math.floor(player.sprite.y / 32) < 75) { min_x = 50; min_y = 50; x = 75; y = 75; }// Cuadrante
																																								// 10
                if (Math.floor(player.sprite.y / 32) >= 75) { min_x = 50; min_y = 75; x = 75; y = 100; }// Cuadrante
																												// 14

            } else if (Math.floor(player.sprite.x / 32) >= 75) { // El
																		// jugador
																		// se
																		// encuentra
																		// entre
																		// los
																		// cuadrantes
																		// 3, 7,
																		// 11,
																		// 15
                if (Math.floor(player.sprite.y / 32) < 25) { min_x = 75; min_y = 0; x = 100; y = 25; }// Cuadrante
																												// 3
                if (Math.floor(player.sprite.y / 32) >= 25 && Math.floor(player.sprite.y / 32) < 50) { min_x = 75; min_y = 25; x = 100; y = 100; }// Cuadrante
																																								// 7
                if (Math.floor(player.sprite.y / 32) >= 50 && Math.floor(player.sprite.y / 32) < 75) { min_x = 75; min_y = 50; x = 100; y = 75; }// Cuadrante
																																								// 11
                if (Math.floor(player.sprite.y / 32) >= 75) { min_x = 75; min_y = 75; x = 100; y = 100; }// Cuadrante
																												// 15
            }
        }
        if (boolUpdate) {
            for (l = 0; l < map.layers.length; l++) { // l <
														// g_game.tileMap.layers.length
                for (fy = min_y; fy < y; fy++) { // y <
													// g_game.tileMap.layers.height
                    for (fx = min_x; fx < x; fx++) { // x <
														// g_game.tileMap.width
                        var tile = map.tileMap.getTile(fx, fy, l);
                        // console.log(tile);
                        if (map.layers[l].visible && tile) {
                            if (tile.layer.name === "Suelo") {
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#A9D0F5';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            } else if ((tile.layer.name === "Adornos1") || (tile.layer.name === "Adornos2") || (tile.layer.name === "Adornos3")) {
                                // console.log(tile);
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#01DFD7';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            } else if (tile.layer.name === "Cierres") {
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#610B21';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);

                            } else if (tile.layer.name === "Paredes") {
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#08298A';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);


                            }
                            for (i = 1; i <= 11; i++) {
                                if (tile.layer.name === "bloqueo" + i) {
                                    // fill a pixel in the minimap
                                    miniMapBmd.ctx.fillStyle = '#8E2008';
                                    miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                                }
                            }

                        }
                        if(DLabyrinth.map != undefined){
                        	if (!map.layers[l].visible && tile && ((DLabyrinth.map.nextRoom + 5) === l)) {
                                // fill a pixel in the minimap
                                miniMapBmd.ctx.fillStyle = '#D19C04';
                                miniMapBmd.ctx.fillRect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            }
                        }
                        
                        if (l >= map.layers.length - 1) {
                            // Draw the lines of the rectangles
                            miniMapBmd.ctx.beginPath();
                            miniMapBmd.ctx.lineWidth = "0.5";
                            miniMapBmd.ctx.strokeStyle = "black";
                            miniMapBmd.ctx.rect((fx - min_x) * 8, (fy - min_y) * 8, 8, 8);
                            miniMapBmd.ctx.stroke();
                        }
                    }
                }
            }
            miniMapBmd.dirty = true; // Sirve para que se actualice
										// correctamente el minimapa
            boolUpdate = false;
        }


        // Aquí es donde actualizamos dinámicamente los objetos que se mueven
        game.miniMapOverlayBmd.context.clearRect(0, 0, game.miniMapOverlay.width, game.miniMapOverlay.height);

        // Dibujamos al jugador
        if (player) {
            game.miniMapOverlayBmd.rect(Math.floor((player.sprite.x / 32) - min_x) * 8, Math.floor((player.sprite.y / 32) - min_y) * 8, 8, 8, 'green');
        }
        // Dibujamos enemigo (Sujeto a cambios, como que solo aparezca en el
		// radio de visión)
        for(var i = 0; i < players.length; i++){
	        if (players[i].id != player.id) {
	            game.miniMapOverlayBmd.rect(Math.floor((players[i].sprite.x / 32) - min_x) * 8, Math.floor((players[i].sprite.y / 32) - min_y) * 8, 8, 8, 'red');
	        }
        }
        game.miniMapOverlayBmd.dirty = true; // Sirve para que se actualice
												// correctamente el minimapa
        // ///////////// FIN MINIMAPA ///////////////

        // ////////// DAÑO ///////////////
        if (damage_spr.visible && player) {
            damage_spr.x =player.sprite.x + (player.sprite.width / 2);
            damage_spr.y =player.sprite.y + (player.sprite.height / 2);
            // damage_spr.angle = result;
        }
        // ////////// FIN DAÑO ///////////////

        // ///////////// TEMPORIZADOR ///////////////
        //Ahora no necesitamos ningún temporizador en los clientes
        var time;
        temporizador.destroy();
        /*
        getMapHandler(function(timeHandler){
        	DLabyrinth.map = timeHandler;
        });*/
        if (DLabyrinth.map != undefined) {
            time = DLabyrinth.map.timeLeftOnline;
            text = time[0] + ":" + time[1];
        } else { text = "0:00" }
        
        // text = time;
        style = { font: "15px Press Start 2P", fill: "#FFFFFF", align: "left" };
        temporizador = game.add.text(0, 0, text, style);
        temporizador.fixedToCamera = true;
        temporizador.cameraOffset.setTo(400, 60);
        iGroup.add(temporizador);
        // ///////////// FIN TEMPORIZADOR ///////////////

        game.world.bringToTop(iGroup);
    }
}