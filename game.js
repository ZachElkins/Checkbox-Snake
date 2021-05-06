let snake, dir, food, score
let timer = null;
let looping = true;
let FPS = 15;

/* GAME LOOP LOGIC */

function reset() {
    snake = [[0, 2], [0, 1], [0, 0]];
    dir = [0, 1];
    score = 0;
    $("#score").html(score);
    generateFood();
}

function startGame() {
    FPS = $('input[name="difficulty-radio"]:checked').val();
    console.log(FPS);
    if (!isPaused()) return;
    timer = setInterval(function() {
        if(document.hasFocus()){ loop(); }
    }, 1000/FPS);
}

function stopGame() {
    alert('Score: '+ score);
    reset();
    pauseGame();
    reset();
}

function loop() {
    move();
    clearGrid();
    renderSnake();
    renderFood();
}

function pauseGame() {
    if (isPaused()) {
        startGame();
    } else {
        clearInterval(timer);
        timer = null;
    }
}

function isPaused() {
    return timer == null;
}

function clearGrid() {
    $('div').find('input[type="checkbox"]').prop('checked', false);
}

/* SNAKE LOGIC */

function renderSnake() {

    for (let pos of snake) {
        // let i = $(`input[row="${pos[0]}"][col="${pos[1]}"]`);
        let i = $(`#${[pos[0]]}-${[pos[1]]}`)
        i.prop('checked', true);
    }
}

function setDir(newDir) {
    if (!(dir[0] == -1*newDir[0] || dir[1] == -1*newDir[1]) && !isPaused()) {
        dir = newDir;
    }
}

function move() {
    // console.log(dir);
    let newHead = [snake[0][0]+dir[0], snake[0][1]+dir[1]];

    if (looping) {
        if (newHead[0] >= ROWS) {
            newHead[0] = 0;
        } else if (newHead[0] < 0) {
            newHead[0] = ROWS;
        } else if (newHead[1] >= COLS) {
            newHead[1] = 0;
        } else if (newHead[1] < 0) {
            newHead[1] = COLS;
        }
    }

    if (arrayEquals(newHead, food)) {
        score++;
        console.log(score);
        $("#score").html(score);
        generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    for (let i = 1; i < snake.length; i++) {
        if (arrayEquals(newHead, snake[i])) {
            stopGame();
        }
    }
}

/* FOOD LOGIC */

function generateFood() {
    food = [Math.floor(Math.random()*ROWS),Math.floor(Math.random()*COLS)];
}

function renderFood() {
    $(`#${food[0]}-${food[1]}`).prop('checked', true);
}