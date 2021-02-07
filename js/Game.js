class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }
  getLastRoll() {
    var lastRollRef = database.ref("lastRoll");
    lastRollRef.on("value", function (data) {
      lastRoll = data.val();
    });
  }

  updateLastRoll(roll) {
    database.ref("/").update({
      lastRoll: roll,
    });
  }
  getTurn() {
    var turnRef = database.ref("turn");
    turnRef.on("value", function (data) {
      turn = data.val();
    });
  }

  updateTurn(turn) {
    database.ref("/").update({
      turn: turn,
    });
  }
  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    p11 = new mySprite(375, 375, 20, 20);
    p12 = new mySprite(375, 375, 20, 20);
    p13 = new mySprite(375, 375, 20, 20);
    p14 = new mySprite(375, 375, 20, 20);
    p21 = new mySprite(375, 375, 20, 20);
    p22 = new mySprite(375, 375, 20, 20);
    p23 = new mySprite(375, 375, 20, 20);
    p24 = new mySprite(375, 375, 20, 20);
    p31 = new mySprite(375, 375, 20, 20);
    p32 = new mySprite(375, 375, 20, 20);
    p33 = new mySprite(375, 375, 20, 20);
    p34 = new mySprite(375, 375, 20, 20);
    p41 = new mySprite(375, 375, 20, 20);
    p42 = new mySprite(375, 375, 20, 20);
    p43 = new mySprite(375, 375, 20, 20);
    p44 = new mySprite(375, 375, 20, 20);

    //players = [p1, p2, p3, p4];
    players = [
      [p11, p12, p13, p14],
      [p21, p22, p23, p24],
      [p31, p32, p33, p34],
      [p41, p42, p43, p44],
    ];
    console.log(players);
    homeSprite = new mySprite(375, 375, 50, 50, "white");

    // homeSprite = createSprite(375, 375, 100, 100);
    this.getTurn();
  }

  play() {
    form.hide();
    background(player.color);
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    this.getLastRoll();
    this.squares();
    for (var i = 0; i < player.path.length; i++) {
      fill(player.color);
      ellipse(player.path[i][0], player.path[i][1], 5, 5);
    }
    textSize(15);
    text(
      "You are playing Player" + player.index + ", " + player.color,
      800,
      300
    );
    var y = 400;
    if (allPlayers !== undefined) {
      var index = 0;

      for (var plr in allPlayers) {
        index = index + 1;
        y = y + 40;
        var plyrIndx = "player" + turn;

        for (var i = 1; i < 5; i++) {
          var pegindex = "peg" + i;
          players[index - 1][i - 1].x = allPlayers[plr][pegindex].x;
          players[index - 1][i - 1].y = allPlayers[plr][pegindex].y;

          players[index - 1][i - 1].color = allPlayers[plr].color;
          players[index - 1][i - 1].active = allPlayers[plr][pegindex].active;
        }
        text(
          allPlayers[plyrIndx].name + ", " + plyrIndx + " is the active player",
          800,
          100
        );
        text("Last player rolled " + lastRoll, 800, 260);
        if (player.index === index) {
          fill(255);
          stroke(255);
        } else {
          fill(0);
          stroke(0);
        }
        text(
          allPlayers[plr].name +
            " has finished " +
            allPlayers[plr].score +
            " pegs",
          800,
          y
        );
        if (playState === "wait") {
          fill(0);
          stroke(0);
          text(
            "Waiting for " +
              allPlayers[plyrIndx].name +
              ", " +
              plyrIndx +
              " to finish",
            800,
            140
          );
        } else if (playState === "selectpeg") {
          text("Please Select the Peg", 800, 220);
        } else if (playState === "roll") {
          text("Please Click the Dice to Roll it", 800, 220);
        } else if (playState === "rollagain") {
          text("Please Click the Dice to Roll it again", 800, 220);
        } else if (playState === "pegtaken") {
          text("Peg Taken. Please Click the Dice to Roll it again", 800, 220);
        }
      }
    }
    for (var i = 0; i < 4; i++) {
      if (player.pegs[i].active === false) {
        player.pegs[i].x = player.start[0][0];
        player.pegs[i].y = player.start[0][1];
      }
    }

    this.playerTurn();
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        players[i][j].display();
      }
    }
    homeSprite.display();

    fill("black");
    text(mouseX + "," + mouseY, mouseX, mouseY);
  }

  checkPosition(peg) {
    var index = 0;
    for (var plr in allPlayers) {
      index++;
      if (player.index != index) {
        for (var i = 1; i < 5; i++) {
          //  var playerIndex = "player" + i;
          var pegindex = "peg" + i;
          var plyrIndex = "player" + index;
          if (
            !(
              allPlayers[plyrIndex][pegindex].x ===
                allPlayers[plyrIndex].path[0][0] &&
              allPlayers[plyrIndex][pegindex].y ===
                allPlayers[plyrIndex].path[0][1]
            )
          ) {
            if (
              peg.x === allPlayers[plyrIndex][pegindex].x &&
              peg.y === allPlayers[plyrIndex][pegindex].y
            ) {
              //allPlayers[plr][pegindex].active=false
              database.ref("players/" + plr + "/" + pegIndex).update({
                active: false,
              });
              playState = "pegtaken";
            }
          }
        }
      }
    }
  }

  playerTurn() {
    var count = 0;

    if (turn === player.index) {
      if (playState === "wait") {
        playState = "roll";
      }

      if (playState === "rolled") {
        if (lastRoll[lastRoll.length - 1] === 6) {
          playState = "roll";
          count++;
          if (count >= 3) {
            player.diceSum = [];
          }
        } else if (player.isMovePossible(player.diceSum) === true) {
          playState = "selectpeg";
          // } else {
          //   playState = "wait";
          //   player.diceSum = [];
          // }
        } else if (player.diceSum.length > 1) {
          console.log("6+something");
          var arrSum = [];
          for (var i = 0; i < player.diceSum.length - 1; i++) {
            arrSum.push(player.diceSum[i] + player.diceSum[i + 1]);
          }
          arrSum.push(player.diceSum[0] + player.diceSum.length - 1);
          console.log(arrSum);

          if (player.isMovePossible(arrSum)) {
            playState = "selectpeg";
          } else if (player.diceSum.length === 3) {
            arrSum = [];
            arrSum.push(
              player.diceSum[0] + player.diceSum[1] + player.diceSum[2]
            );
            if (player.isMovePossible(arrSum)) {
              playState = "selectpeg";
            } else {
              playState = "wait";
              player.diceSum = [];
            }
          }
        } else {
          playState = "wait";
          player.diceSum = [];
        }
      }

      if (playState === "move") {
        if (player.movePeg(player.diceSum[0], selectedpeg)) {
          player.diceSum.splice(0, 1);

          console.log("peg moved");
          this.checkPosition(selectedpeg);
          player.update();

          if (player.diceSum.length === 0) {
            playState = "wait";
            player.diceSum = [];
          } else {
            playState = "selectpeg";
          }

          player.playerScore(selectedpeg);
          if (player.score === 4) {
            gameState = 2;
            player.update();
            this.update(2);
          }
        } else {
          playState = "selectpeg";
        }
      }
      if (playState === "wait") {
        if (turn === 4) {
          turn = 1;
        } else {
          turn++;
        }
        this.updateTurn(turn);
      }
    }
  }

  end() {
    console.log("Game Ended");
    console.log(player.score);
    if (allPlayers !== undefined) {
      var index = 0;

      for (var plr in allPlayers) {
        index = index + 1;

        var plyrIndx = "player" + turn;
        text(
          allPlayers[plyrIndx].name +
            ", " +
            plyrIndx +
            " has finished the game",
          800,
          400
        );
        var newButton =createButton("New Game")
        newButton.position(displayWidth/2,200)
        newButton.mousePressed(()=>{
          player.updateCount(0);
          game.update(0);
          location.reload();
        });
        
        for (var i = 1; i < 5; i++) {
          var pegindex = "peg" + i;
          players[index - 1].x = allPlayers[plr][pegindex].x;
          players[index - 1].y = allPlayers[plr][pegindex].y;
        }
      }
    }

    //this.playerTurn();
  }
  squares() {
    stroke(0);
    rectMode(CENTER);
    fill(200, 0, 0);
    rect(150, 150, 300, 300);
    fill(0, 200, 0);
    rect(150, 600, 300, 300);
    fill(200, 200, 0);
    rect(600, 600, 300, 300);
    fill(0, 0, 200);
    rect(600, 150, 300, 300);
    fill(0);
    for (var i = 25; i < 300; i += 50) {
      fill("grey");

      var block2 = rect(375, i, 50, 50);
      fill("brown");
      // block2.shapeColor="brown";
      var block3 = rect(425, i, 50, 50);
      var block1 = rect(325, i, 50, 50);
    }
    //yelow
    for (var i = 725; i > 450; i -= 50) {
      fill("grey");

      var block2 = rect(375, i, 50, 50);
      fill("brown");
      //block2.shapeColor="brown";
      var block3 = rect(425, i, 50, 50);
      var block1 = rect(325, i, 50, 50);
    }
    //blue
    for (var i = 725; i > 450; i -= 50) {
      fill("grey");

      var block2 = rect(i, 375, 50, 50);
      fill("brown");
      //block2.shapeColor="brown";
      var block3 = rect(i, 425, 50, 50);
      var block1 = rect(i, 325, 50, 50);
    }
    //red
    for (var i = 25; i < 300; i += 50) {
      fill("grey");

      var block2 = rect(i, 375, 50, 50);
      fill("brown");
      var block1 = rect(i, 325, 50, 50);
      //lock2.shapeColor="brown";
      var block3 = rect(i, 425, 50, 50);
    }
  }
}
