var canvas, backgroundImage;
//diceroll everytime num is 6 roll again if total num is 18 then num is =6
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var playerColor = "";
var turn = 1;
var form, player, game;
var path = [];
var dice1, dice2, dice3, dice4, dice5, dice6;
var p11,
  p12,
  p13,
  p14,
  p21,
  p22,
  p23,
  p24,
  p31,
  p32,
  p33,
  p34,
  p41,
  p42,
  p43,
  p44,
  players;
var homeSprite;
var track, car1_img, car2_img, car3_img, car4_img;
var playState = "wait";
var lastRoll = 0;
var selectedpeg = "";
function preload() {
  dice1 = loadImage("./images/1.jpg");
  dice2 = loadImage("./images/2.jpg");
  dice3 = loadImage("./images/3.jpg");
  dice4 = loadImage("./images/4.jpg");
  dice5 = loadImage("./images/5.jpg");
  dice6 = loadImage("./images/6.jpg");
}

function setup() {
  canvas = createCanvas(1100, 750);
  database = firebase.database();
  game = new Game();

  game.getState();
  game.start();
  //green
}

function draw() {
  background(126);

  if (playerCount === 4) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
}

function mouseClicked() {
  if (
    homeSprite.isClicked() &&
    (playState === "roll" ||
      playState === "rollagain" ||
      playState === "pegtaken")
  ) {
    var num = Math.round(random(1, 6));
    player.diceSum.push(num);
    if (num === 1) {
      homeSprite.image = dice1;
    }
    if (num === 2) {
      homeSprite.image = dice2;
    }
    if (num === 3) {
      homeSprite.image = dice3;
    }
    if (num === 4) {
      homeSprite.image = dice4;
    }
    if (num === 5) {
      homeSprite.image = dice5;
    }
    if (num === 6) {
      homeSprite.image = dice6;
    }
    game.updateLastRoll(player.diceSum);

    playState = "rolled";
    game.play();
  }

  for (var i = 0; i < 4; i++) {
    if (player.pegs[i].isClicked() && playState === "selectpeg") {
      selectedpeg = player.pegs[i];
      playState = "move";
      console.log(selectedpeg + ", " + i);
      game.play();
    }
  }

  console.log(playState);
}
