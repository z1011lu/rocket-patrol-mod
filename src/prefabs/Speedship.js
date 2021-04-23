// Rocket prefab
class Speedship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

      this.points = pointValue + 20; //store points
      this.moveSpeed = game.settings.spaceshipSpeed + 3; //pixels per fram e
      //this.flipX();
    }

    update(){
        //move speedship right
        this.x += this.moveSpeed;
        //wrap around from right edge to left edge
        if(this.x >= game.config.width){
            this.reset();
        }
        
        
    }

    reset(){
        this.x = 0 - this.width;//game.config.width;
    }

}