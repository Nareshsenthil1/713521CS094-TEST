let canvas, ctx;
let scale = 20;
let rows, columns;
let snake;
let fruit;
let score = 0;
let gameOver = false;

function setup() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    
    rows = canvas.height / scale;
    columns = canvas.width / scale;

    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    
    document.addEventListener('keydown', keyPressed);

    window.setInterval(() => {
        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fruit.draw();
            snake.update();
            snake.draw();

            if (snake.eat(fruit)) {
                fruit.pickLocation();
                score++;
            }
            document.querySelector('.score').innerText = score;

            if (snake.checkCollision()) {
                gameOver = true;
                showGameOver();
            }
        }
    }, 100);
}

function keyPressed(evt) {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function () {
        ctx.fillStyle = "#000";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.total > 0) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width - scale;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    };

    this.changeDirection = function (direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed !== scale * 1) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed !== -scale * 1) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed !== scale * 1) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed !== -scale * 1) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    this.eat = function (fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    };

    this.checkCollision = function () {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                return true;
            }
        }
        return false;
    };
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function () {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    };

    this.draw = function () {
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

function showGameOver() {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'flex';
}

function startGame() {
    gameOver = false;
    score = 0;
    snake = new Snake();
    fruit.pickLocation();
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

setup();
