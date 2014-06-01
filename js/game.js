
//This is where you can change the speed of the aliens.

var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 15; this.dy = 15;
  this.hit = 8; this.lastHit = 8;
  this.speed = 2;

  this.draw = function() {};

//This is tue function that if you win the first level, it takes you to the next.
  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

//This increases the speed of the aliens as you start to get to the last few of them.

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

//Not sure what this is

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}


//Not sure what this is

var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

//This is the audio that plays when the aliens die, speeds the flock up by 1 and removes them when they die.

Alien.prototype.die = function() {
  GameAudio.play('die');
  this.board.remove(this);
}

//This is when the flock of aliens fire in relation to the width of the frame
Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}

//This is how many times the aliens can fire

Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 30) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y +100, 
                                     { dy: 100 });
      }
}


var Player = function Player(opts) { 
  this.reloading = 0;
}

//This draws the images of the characters in from the sprite page.

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}

//This is where when you die, the game tells you that and plays an explosion.

Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
 deathsong.play();
  music.pause();
  music.currentTime - 0.0;
}

//This is where the right and left keys are configured to move the space ship.

Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;
     
    
//This is how many missiles you can fire before reloading
    
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 10) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 10;
  }
  return true;
}





//

var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

//This allows the laser to be fired and draw the missiles from the sprite sheet.

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

//This is if a missile hits an enemy/alien then it will disappear and die.

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

//This is how the aliens can be killed and the game continue to play and not pause.

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}


