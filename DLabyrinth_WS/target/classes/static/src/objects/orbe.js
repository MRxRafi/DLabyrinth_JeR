//Funcion de creacion del orbe. Necesitamos el spritesheet para el movimiento y el jugador al que pertenece (pl)
function Orbe(sprsheet, pl){
    //Separación del orbe
    this.offsetX = 20;
    this.offsetY = 20;

    //Añadimos orbe cerca del jugador correspondiente
    this.sprite = game.add.sprite(pl.sprite.x - this.offsetX, pl.sprite.y - this.offsetY ,sprsheet);
    //this.sprite.scale.setTo(0.05);
    this.sprite.anchor.setTo(0.5);

    this.weapons = [new Weapon(), new Weapon()];
    for(var i = 0; i <= 1; i++){
        this.weapons[i].weapon = game.add.weapon(30, 'bullet');
        this.weapons[i].weapon.trackSprite(this.sprite, 0, 0);
        this.weapons[i].weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapons[i].weapon.bulletSpeed = 700;
        this.weapons[i].weapon.onFire.add(function(){shotAudio.play();});
        this.weapons[i].empty = true;
    }
    //Funcion para intercambiar armas
    this.switch = function(){
    	if(!this.weapons[1].empty){
	        var a = this.weapons[0];
	        this.weapons[0] = this.weapons[1];
	        this.weapons[1] = a;
	        switchAudio.play();
    	}
    }
    //Funcion para asignar el arma al orbe.
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
        this.weapons[i].weapon.onFire.add(function(){shotAudio.play();});
    }
    //Funcion para poner municion al arma
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

function Weapon(){
    this.empty;
    this.weapon;
    this.damage;
    this.ammo;
    this.type;
}
