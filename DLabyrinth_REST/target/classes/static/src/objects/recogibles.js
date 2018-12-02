//se crean todos los items que se pueden recoger. Se les informa de su posicion, sprite, daño, municion, etc, dependiendo
//del tipo de item que sean.

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
