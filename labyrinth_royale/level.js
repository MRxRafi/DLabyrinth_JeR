DLabyrinth.levelState = function(game){

}
var drawnObject1, drawnObject2;
var width, height, c1, c2;
var vx, vy;

DLabyrinth.levelState.prototype = {
    preload: function() {
        
    },

    create: function() {

        //Rectangulo
        width = 75;
        height = 75;

        c1 = this.game.add.bitmapData(width, height);
        c1.ctx.beginPath();
        c1.ctx.rect(0, 0, width, height);
        c1.ctx.fillStyle = '#ffffff';
        c1.ctx.fill();

        c2 = this.game.add.bitmapData(width, height);
        c2.ctx.beginPath();
        c2.ctx.rect(0, 0, width, height);
        c2.ctx.fillStyle = '#00FFFF';
        c2.ctx.fill();
        drawnObject1 = game.add.sprite(game.world.centerX, game.world.centerY, c1);
        drawnObject2 = game.add.sprite(game.world.centerX, game.world.centerY, c2);
        //drawnObject.anchor.setTo(0.5, 0.5);

        //  Register the keys.
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
    },

    update: function() {
        vx = 0;
        vy = 0;
        if(this.wKey.isDown && vy == 0){
            drawnObject1.visible = true;
            vy = -1;
            drawnObject2.visible = false;
        }
        if(this.sKey.isDown && vy == 0){
            drawnObject1.visible = true;
            vy = 1;
            drawnObject2.visible = false;
        }
        if(this.aKey.isDown && vx == 0){
            drawnObject1.visible = false;
            vx = -1;
            drawnObject2.visible = true;
        }
        if(this.dKey.isDown && vx == 0){
            drawnObject1.visible = false;
            vx = 1;
            drawnObject2.visible = true;
        }
        drawnObject1.x += vx;
        drawnObject1.y += vy;
        drawnObject2.x += vx;
        drawnObject2.y += vy;
        //vx = 0;
        //vy = 0;
        

    }
}
