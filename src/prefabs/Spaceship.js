// Rocket prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

      this.points = pointValue; //store points
      this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
    }

    update(){
        //move speedship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
        
        
    }

    reset(){
        this.x = game.config.width;
    }

}