class Player {
  constructor() {
    this.start = [];
    this.rank = null;
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.path = [];
    this.peg1 = new mySprite(0, 0, 20, 20, "grey");
    this.peg2 = new mySprite(0, 0, 20, 20, "grey");
    this.peg3 = new mySprite(0, 0, 20, 20, "grey");
    this.peg4 = new mySprite(0, 0, 20, 20, "grey");
    this.pegs = [this.peg1, this.peg2, this.peg3, this.peg4];
    this.color = "";
    this.diceSum = [];
    this.score = 0;
  }

  createPath() {
    var path1 = [
      [75, 325],
      [125, 325],
      [175, 325],
      [225, 325],
      [275, 325],
    ];
    var path2 = [
      [325, 275],
      [325, 225],
      [325, 175],
      [325, 125],
      [325, 75],
      [325, 25],
      [375, 25],
    ];
    var path3 = [[425, 25]];
    var path4 = [
      [425, 75],
      [425, 125],
      [425, 175],
      [425, 225],
      [425, 275],
    ];
    var path5 = [
      [475, 325],
      [525, 325],
      [575, 325],
      [625, 325],
      [675, 325],
      [725, 325],
      [725, 375],
    ];
    var path6 = [[725, 425]];
    var path7 = [
      [675, 425],
      [625, 425],
      [575, 425],
      [525, 425],
      [475, 425],
    ];
    var path8 = [
      [425, 475],
      [425, 525],
      [425, 575],
      [425, 625],
      [425, 675],
      [425, 725],
      [375, 725],
    ];
    var path9 = [[325, 725]];
    var path10 = [
      [325, 675],
      [325, 625],
      [325, 575],
      [325, 525],
      [325, 475],
    ];
    var path11 = [
      [275, 425],
      [225, 425],
      [175, 425],
      [125, 425],
      [75, 425],
      [25, 425],
      [25, 375],
    ];
    var path12 = [
      [75, 375],
      [125, 375],
      [175, 375],
      [225, 375],
      [275, 375],
    ];
    var home = [[375, 375]];
    var path13 = [[25, 325]];
    var path14 = [
      [375, 75],
      [375, 125],
      [375, 175],
      [375, 225],
      [375, 275],
    ];
    var path15 = [
      [675, 375],
      [625, 375],
      [575, 375],
      [525, 375],
      [475, 375],
    ];
    var path16 = [
      [375, 675],
      [375, 625],
      [375, 575],
      [375, 525],
      [375, 475],
    ];

    if (this.index === 1) {
      this.path = this.path.concat(path1);

      this.path = this.path.concat(path2);
      this.path = this.path.concat(path3);
      this.path = this.path.concat(path4);
      this.path = this.path.concat(path5);

      this.path = this.path.concat(path6);

      this.path = this.path.concat(path7);

      this.path = this.path.concat(path8);

      this.path = this.path.concat(path9);
      this.path = this.path.concat(path10);
      this.path = this.path.concat(path11);
      this.path = this.path.concat(path12);
      this.path = this.path.concat(home);

      this.start = [[150, 150]];
    }
    if (this.index === 2) {
      this.path = this.path.concat(path4);
      this.path = this.path.concat(path5);

      this.path = this.path.concat(path6);

      this.path = this.path.concat(path7);

      this.path = this.path.concat(path8);

      this.path = this.path.concat(path9);
      this.path = this.path.concat(path10);
      this.path = this.path.concat(path11);
      this.path = this.path.concat(path13);
      this.path = this.path.concat(path1);

      this.path = this.path.concat(path2);
      this.path = this.path.concat(path14);

      this.path = this.path.concat(home);

      this.start = [[600, 150]];
    }
    if (this.index === 3) {
      this.path = this.path.concat(path7);

      this.path = this.path.concat(path8);

      this.path = this.path.concat(path9);
      this.path = this.path.concat(path10);
      this.path = this.path.concat(path11);
      this.path = this.path.concat(path13);

      this.path = this.path.concat(path1);

      this.path = this.path.concat(path2);
      this.path = this.path.concat(path3);
      this.path = this.path.concat(path4);
      this.path = this.path.concat(path5);
      this.path = this.path.concat(path15);
      this.path = this.path.concat(home);

      this.start = [[600, 600]];
    }
    if (this.index === 4) {
      this.path = this.path.concat(path10);
      this.path = this.path.concat(path11);

      this.path = this.path.concat(path13);
      this.path = this.path.concat(path1);

      this.path = this.path.concat(path2);
      this.path = this.path.concat(path3);
      this.path = this.path.concat(path4);
      this.path = this.path.concat(path5);

      this.path = this.path.concat(path6);

      this.path = this.path.concat(path7);

      this.path = this.path.concat(path8);
      this.path = this.path.concat(path16);
      this.path = this.path.concat(home);

      this.start = [[150, 600]];
    }
  }
  playerScore(peg) {
    var length = this.path.length;
    for (var i = 0; i < 4; i++) {
      if (
        peg.x === this.path[length - 1][0] &&
        peg.y === this.path[length - 1][1]
      ) {
        this.score++;
      }
    }
  }
  isMovePossible(arr) {
    var bool = true;
    var boolfinal = true;
    var any1, any2, any3, any4;
    var num1,
      num2 = true,
      num3 = true;
    for (var i = arr.length - 1; i >= 0; i--) {
      //1 &0
      for (var j = 0; j < 4; j++) {
        //0,1,2,3
        if (
          this.pegs[j].x === this.start[0][0] &&
          this.pegs[j].y === this.start[0][1]
        ) {
          //all pegs at start
          if (arr[i] === 6) {
            bool = true; //true
            console.log(bool);
          } else if (arr.length > 1) {
            bool = true;
            console.log(bool);
          } else {
            bool = false;
            console.log(bool);
          }
        } else {
          for (var k = 0; k < this.path.length; k++) {
            if (
              this.path[k][0] === this.pegs[j].x &&
              this.path[k][1] === this.pegs[j].y
            ) {
              if (i + arr[i] < this.path.length) {
                bool = true;
                console.log(bool);
              } else {
                bool = false;
                console.log(bool);
              }
            }
          }
        }
        if (j === 0) {
          any1 = bool;
        }
        if (j === 1) {
          any2 = bool;
        }
        if (j === 2) {
          any3 = bool;
        }
        if (j === 3) {
          any4 = bool;
        }
        if (any1 === true || any2 === true || any3 === true || any4 === true) {
          boolfinal = true;
        } else {
          boolfinal = false;
        }
        //this.pegs[j].active = false;
      }
      if (i === 0) {
        num1 = boolfinal;
        console.log(boolfinal);
      }
      if (i === 1) {
        num2 = boolfinal;
        console.log(boolfinal);
      }
      if (i === 2) {
        num3 = boolfinal;
        console.log(boolfinal);
      }
    }
    if ((num3 === true) & (num2 === true) && num1 === true) {
      boolfinal = true;
    } else {
      boolfinal = false;
    }

    console.log(boolfinal);

    return boolfinal;
    // return bool;
  }
  movePeg(num, peg) {
    if (peg.x === this.start[0][0] && peg.y === this.start[0][1]) {
      if (num === 6) {
        peg.x = this.path[0][0];
        peg.y = this.path[0][1];
        peg.active = true;
        console.log(peg.x + "," + peg.y);
        //peg.display();
        return true;
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        if (this.path[i][0] === peg.x && this.path[i][1] === peg.y) {
          if (i + num <= this.path.length - 1) {
            peg.x = this.path[i + num][0];
            peg.y = this.path[i + num][1];
            console.log(peg.x + "," + peg.y);
            return true;
          } else {
            text("Select a Different Peg", 100, 450);
            return false;
          }
        }
      }
    }
    player.update();
  }
  diceRoll() {}
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count,
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance,
      rank: this.rank,
      color: this.color,
      score: this.score,
      peg1: {
        x: this.peg1.x,
        y: this.peg1.y,
      },
      peg2: {
        x: this.peg2.x,
        y: this.peg2.y,
      },
      peg3: {
        x: this.peg3.x,
        y: this.peg3.y,
      },
      peg4: {
        x: this.peg4.x,
        y: this.peg4.y,
      },
      diceRoll: this.diceSum,
      path: this.path,
    });
  }

  static getPlayerInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
      // console.log(allPlayers);
    });
  }
  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", (data) => {
      this.rank = data.val();
    });
  }
  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank,
    });
  }
}
