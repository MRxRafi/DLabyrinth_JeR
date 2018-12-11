function Mapa(){
    this.tileMap;
    this.layers = new Array();

    this.createMap = function(){
        this.tileMap = game.add.tilemap('mapa');
        this.tileMap.addTilesetImage('map_tiles', 'tiles');
            
        this.layers[0] = this.tileMap.createLayer('Suelo');
        this.layers[1] = this.tileMap.createLayer('Paredes');
        this.layers[2] = this.tileMap.createLayer('Cierres');
        this.layers[3] = this.tileMap.createLayer('Adornos1');
        this.layers[4] = this.tileMap.createLayer('Adornos2');
        this.layers[5] = this.tileMap.createLayer('Adornos3');

        for(i = 1; i < 11; i++){
            this.layers[5 + i] = this.tileMap.createLayer('bloqueo' + i);
            this.layers[5 + i].visible = false;

        }

        //Activamos colisiones para paredes y adornos
        this.tileMap.setCollisionBetween(1, 300, true, this.layers[1]);
        this.tileMap.setCollisionByExclusion([129,250], true, this.layers[3]);
        this.tileMap.setCollisionByExclusion([129,205,252], true, this.layers[4]);
        this.tileMap.setCollisionBetween(1, 300, true, this.layers[5]);
    }
    
    this.update = function(){
    	if(DLabyrinth.map != undefined){
    		var habitaciones = DLabyrinth.map.closedRooms;
    		for(i = 6; i < 15; i++){
    			if(habitaciones[i-5] && !this.layers[i].visible){
    				this.closeZone(i);
    			}
    		}
    	}
    }
    
    this.closeZone = function(zone){
    	this.layers[zone].visible = true;
    	//Activamos colisiones del layer
        this.tileMap.setCollision(161, true, this.layers[zone]);
        this.tileMap.setCollision(131, true, this.layers[zone]);
        this.tileMap.setCollision(165, true, this.layers[zone]);
        first_visible = true;
    }
    
}

/*
function MapHandler(map, layer){
    //Fase 1: layer.length - 5 - 5 hasta layer.length - 5 (5 capas distintas a bloqueo y otras 5 de otras fases)
    this.phase = 1; //Lo recibo del exterior
    this.next = generateRandomInteger(layer.length - 10, layer.length - 6); //Lo recibo del exterior

    this.closed = function(){
        layer[this.next].visible = true;

        //Activamos colisiones del layer
        map.tileMap.setCollisionBetween(5, 7, true, layer[this.next]);
        map.tileMap.setCollisionBetween(21, 23, true, layer[this.next]);
        map.tileMap.setCollisionBetween(37, 39, true, layer[this.next]);
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

//Temporizador del mapa
function timeController(){
    var randomTime = generateRandomInteger(100000,200000);
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
            randomTime = generateRandomInteger(100000,200000);
            var newTimer = new Timer(this.restartTime,randomTime);
            that.timer = newTimer;
            map_handler.nextRoom();
        }
        //El recolector de basura se encargará de eliminar el Timer que ha quedado sin variable
    }
    this.timer = new Timer(restartTime,randomTime);
}*/
