let bgImage;

let bookImg;
let books;

let playerImg;

var audio = new Audio('loop.mp3');
audio.play();

const WL = 800;

var score = 0;
var scoreV = 1;

function setup() {
    var myCanvas = createCanvas(WL, WL);
    myCanvas.parent("canvas");

    bgImage = loadImage("background.png")
    bookImg = loadImage("book.png");
    playerImg = loadImage("player.png");

    books = [new Book()];
    player = new Player();

    textSize(50);
}

function draw() {
    image(bgImage, 0, 0);
    for (let i = 0; i < books.length; i++) {
        books[i].draw();
    }
    player.draw();
    text(score, 10, 50);

    if (scoreV == 0) { text("YOU LOST, REFRESH!", 10, 100) }

    for (let i = 0; i < books.length; i++) {
        books[i].update();
    }
    player.update();
    score+=scoreV;

    if (AABB(player.x, player.y, 76, 96, books[0].x, books[0].y, 76, 96)) {
        scoreV = 0;
    }
}

class Book {
    constructor() {
        this.x = 500
        this.y = 100
        this.vx = -0.5;
        this.sin = 0;
        this.sinSpeed = 0.05;
    }
    draw() {
        image(bookImg, this.x, this.y);
    }
    update() {
        this.x += this.vx;
        this.y = (Math.sin(this.sin) + 1) * WL / 2 -50;
        this.sin += Math.sin(this.sinSpeed)

        if (this.x < -100) {
            this.x = WL + 50;
            this.vx *= 1.4;
            this.sinSpeed *= 1.1;
        }
    }
}

class Player {
    constructor() {
        this.x = 50;
        this.y = 400;
        this.xv = 6;
    }
    draw() {
        image(playerImg, this.x, this.y);
    }
    update() {
        this.x += keyIsDown(RIGHT_ARROW) ? this.xv : (keyIsDown(LEFT_ARROW) ? -this.xv : 0);
        this.x = this.x < 0 ? 0 : (this.x > WL - 76 ? WL - 76 : this.x)
    }
}

function AABB(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 + w1 > x2 && x1 < x2 + w2 
           && y1 + h1 > y2 && y1 < y2 + h2
}