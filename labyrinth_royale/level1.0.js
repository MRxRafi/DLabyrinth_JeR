DLabyrinth.levelState = function(game){

}

    var upKey;
    var downKey;
    var leftKey;
    var rightKey;

    var sprite;
    var bullets;
    
    var fireRate = 100;
    var nextFire = 0;

Dlabyrinth.levelState.prototype = {
    preload: function() {
        
        game.load.image('arrow', 'assets/arrow.png'); //cambiar por personaje
        game.load.image('bullet', 'asset/bullet.png'); //Cambiar por imagen de bala a usar

    },

    


    create: function() {

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    game.stage.backgroundColor = '#313131'; //Cambiar por el mapa a usar

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
       
    },

    update: function() {

        if (upKey.isDown)
    {
        sprite.y--;
    }
    else if (downKey.isDown)
    {
        sprite.y++;
    }

    if (leftKey.isDown)
    {
        sprite.x--;
    }
    else if (rightKey.isDown)
    {
        sprite.x++;
    }


        sprite.rotation = game.physics.arcade.angleToPointer(sprite);

        if (game.input.activePointer.isDown)
        {
            fire();
        }    

    }
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

var inputHandler = function(){

}

var collideHandler = function(){

}