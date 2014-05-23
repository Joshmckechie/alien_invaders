
//This is where you can change the number of aliens in the different levels by using 1 and 2 intergers which correlate to the different alien images.

  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,2,2,2,2,0,0,0],
          [0,0,0,0,2,2,2,2,0,0,0],
          [0,0,0,0,1,1,1,1,0,0,0],
          [0,0,0,0,1,1,1,1,0,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0]], 
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,0,0]] };   
    
     
		  
		  //This is the co-ordinates of the images the game uses from the sprite page.

  var spriteData = {
    'alien1': { sx: 514,  sy: 162,  w: 30, h: 34, cls: Alien, frames: 2 },
    'alien2': { sx: 256,  sy: 192, w: 34, h: 32, cls: Alien, frames: 2 },
    'player': { sx: 128,  sy: 0, w: 34, h: 34, cls: Player },
    'missile': { sx: 172,  sy: 68, w: 10,  h: 21, cls: Missile }
  }

 		//This is the start page for the game itself.
		
  function startGame() {
    var screen = new GameScreen("Space Wars","(Press space to start)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }
  
  //This is the screen that tells you you have been killed and to press space to start again from level 1.

  function endGame() {
    var screen = new GameScreen("Game Over","(Press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }
		//This is the screen that tells you you have won and to press space to start the game from level 1.

  function winGame() {
    var screen = new GameScreen("You Win!","(Press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }
  
  			//This is where the sounds are located to play when you fire a missile or hit something.

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/explosion.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



