var foodSound = new Audio ("Resources/food.mp3");
var musicSound = new Audio ("Resources/music.mp3");
var gameOverSound = new Audio ("Resources/gameover.mp3");
var moveSound = new Audio ("Resources/move.mp3");
var inputDir = { x: 0, y: 0 };
var speed = 5;
var lastPaintTime = 0;
var snakeArr = [
    { x: 13, y: 15 }
];
var food = { x: 6, y: 7 };
var score = 0;
var currentScore = document.getElementById("currentScore");
var highscore = document.getElementById('hiscore')
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 24 || snake[0].x <= 0 || snake[0].y >= 24 || snake[0].y <= 0) {
        return true;
    }
    // musicSound.play()
}
function gameEngine() {
    //What wiil happen if the snake collide with the edge of the board
    if (isCollide(snakeArr)) {
        gameOverSound.play()
        alert("Game is over!")
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 13, y: 15 }
        ];
        score = 0;
        currentScore.innerHTML = "Score:" + score;
    }
    //What wiil happen if the snake have eaten the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score += 1;
        currentScore.innerHTML = "Score:" + score;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            highscore.innerHTML = "High score:" + hiscoreval;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 22;
        let reGen = Math.round(a + (b - a) * Math.random());
        food = { x: reGen, y: reGen };
    }
    //Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    };

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
//Main logics
var hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscore.innerHTML = "High score:" + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play();
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.play();
            break;
        case "ArrowLeft":
            moveSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            moveSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})