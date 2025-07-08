let player;
let items = [];
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(600, 400);
  player = createVector(width / 2, height - 50);
  for (let i = 0; i < 5; i++) {
    items.push(new FallingItem(true)); // recicláveis
    obstacles.push(new FallingItem(false)); // não recicláveis
  }
}

function draw() {
  background(220);
  fill(0);
  textSize(16);
  text("Pontuação: " + score, 10, 20);

  // Player
  fill(0, 200, 0);
  rect(player.x, player.y, 40, 40);

  // Movimento do player
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  player.x = constrain(player.x, 0, width - 40);

  // Itens recicláveis
  for (let i of items) {
    i.update();
    i.display();
    if (i.hits(player)) {
      score += 10;
      i.reset();
    }
  }

  // Obstáculos
  for (let o of obstacles) {
    o.update();
    o.display();
    if (o.hits(player)) {
      score -= 5;
      o.reset();
    }
  }
}

class FallingItem {
  constructor(isRecyclable) {
    this.reset();
    this.isRecyclable = isRecyclable;
  }

  reset() {
    this.pos = createVector(random(width), random(-200, -20));
    this.speed = random(2, 5);
  }

  update() {
    this.pos.y += this.speed;
    if (this.pos.y > height) this.reset();
  }

  display() {
    if (this.isRecyclable) {
      fill(0, 150, 255); // azul: reciclável
    } else {
      fill(200, 50, 50); // vermelho: obstáculo
    }
    ellipse(this.pos.x, this.pos.y, 30, 30);
  }

  hits(player) {
    return (this.pos.x > player.x && this.pos.x < player.x + 40 &&
            this.pos.y > player.y && this.pos.y < player.y + 40);
  }
}
