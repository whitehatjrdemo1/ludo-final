class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.greeting = createElement("h2");
    this.title = createElement("h2");
    this.reset = createButton("Reset");
    //this.radio = createRadio();

    // this.ele = createElement("h3");
  }
  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display() {
    this.title.html("Ludo Game");
    this.title.position(width / 2 - 50, 0);

    this.input.position(width / 2 - 40, height / 2 - 80);
    this.button.position(width / 2 + 30, (height * 2) / 3);
    this.reset.position(width - 100, 20);
    // this.radio.option("red");
    // this.radio.option("blue");
    // this.radio.option("yellow");
    // this.radio.option("green");
    // this.radio.position(width / 2 + 30, height / 2);
    // // this.radio.style("width", "60px");
    // var label = createElement("h4", "Choose Your Colour");
    // label.position(width / 2 - 150, height / 2 - 20);
    // this.ele.position(width / 2 - 50, (height * 3) / 4);
    // let val = this.radio.selected();
    // this.ele.html("the color chosen is: " + val);
    // this.ele.style("background-color", val);
    var colourArray = ["red", "blue", "yellow", "green"];
    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.color = colourArray[playerCount - 1];
      player.createPath();
      console.log(player.path);

      player.peg1.x = player.start[0][0];
      player.peg1.y = player.start[0][1];
      player.peg2.x = player.start[0][0];
      player.peg2.y = player.start[0][1];
      player.peg3.x = player.start[0][0];
      player.peg3.y = player.start[0][1];
      player.peg4.x = player.start[0][0];
      player.peg4.y = player.start[0][1];
      player.peg1.color = player.color;
      player.peg2.color = player.color;
      player.peg3.color = player.color;
      player.peg4.color = player.color;

      player.update();
      player.updateCount(playerCount);
      background(player.color);

      this.greeting.html("Hello " + player.name);
      this.greeting.position(width / 2 - 70, height / 4);
    });

    this.reset.mousePressed(() => {
      player.updateCount(0);
      //gameState = 2;
      game.update(0);
      game.updateTurn(1);
      game.updateLastRoll(0);
    });
  }
}
