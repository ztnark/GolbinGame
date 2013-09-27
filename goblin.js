var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//BG Image

var bgReady = false;
var bgImage = new Image();
bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

//Hero Image

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster.png";


var hero = {speed: 256, x:0, y:0};
var monster = {x:0, y:0};
var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
},false);


// Reset the game when the player catches a monster
var reset = function() {
  hero.x = canvas.width /2;
  hero.y = canvas.height /2;

  // throw the moster randomly
  monster.x = 64 + (Math.random() * (canvas.width - 128));
  monster.y = 64 + (Math.random() * (canvas.width - 128));

  start = +new Date();
};
  //update game objects

  var update = function (modifier) {
    if (38 in keysDown) { //Player holding up key
      hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { //Play holding down key
       hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { //Play holding left key
       hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { //Play holding right key
       hero.x += hero.speed * modifier;
    }
    timeLeft = (1750 - (+new Date() - start))/1000
    if (+new Date() - start >1750){
      reset();
    }
    if (
      hero.x <= (monster.x + 32)
      && monster.x <= (hero.x + 32)
      && hero.y <= (monster.y + 32)
      && monster.y <= (hero.y + 32)
  ) {
      ++monstersCaught;
      reset();
    }
  };

  $(document).swipe({
    swipe:function(event, direction){
      console.log(direction);
      board.movePieces(direction);
      switch(direction){
        case 'left': board.keystrokes += "0"; break;
        case 'up': board.keystrokes += "1"; break;
        case 'right': board.keystrokes += "2"; break;
        case 'down': board.keystrokes += "3"; break;
      }
      board.screenUtil.colorGrid(board.packageLevel());
      board.isGameFinished();
    }
  })



  //Draw everything
  var render = function () {
    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
      ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
      ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
    ctx.fillText("Seconds left: " + timeLeft, 32, 64);
  };

  //The main game loop
  var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
  };

  //DRIVER

  reset();
  var then = Date.now();
  setInterval(main, 1); // Execute as fast


