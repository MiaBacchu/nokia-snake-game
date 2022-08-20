let stopRightMove;
let stopLeftMove;
let stopUpMove;
let stopDownMove;
let stopChecker;
let snake = [0,1,2];
let next = 2;
let checker = true;
let rightRunning = true;
let leftRunning = false;
let upRunning = false;
let downRunning = true;
let point;
let lastIndex;
let line;
let fruitPos;
let rewardPos;
let rewardTime;
let level = 300;
let rewardDuration = 9000;

const container = document.getElementById('container');
// create the line
(function (){
  for (let i = 0; i < 625; i++) {
    const div = document.createElement('div');
    container.appendChild(div);
    };
    line = container.querySelectorAll('div');
    snake.forEach(el=>line[el].classList.add('snake'));
    line[2].innerHTML = "[:]";
    snake.forEach(()=>line[2].setAttribute('style','background-color:blue; border-radius: 0 5px 5px 0;font-size:14px; font-weight: bold; color: lime;'));
})();
// //right move
function rightMove(){
    if(!leftRunning){
        rightRunning = true;
        downRunning = false;
        upRunning = false;
        if (checker) {
            clearInterval(stopChecker);
             eatChecker();
            }
            checker = false;
            clearInterval(stopRightMove);
            clearInterval(stopUpMove);
            clearInterval(stopDownMove);
            clearInterval(stopLeftMove);
            stopRightMove = setInterval(function(){
            if (next>=0 && next<=624 && (next+1) % 25!==0) {
            next += 1;
            snake.push(next);
            let previous = snake[0];
            let headPrevious = snake[snake.length-2];
            snake.shift(snake[previous]);
            line[previous].classList.remove('snake');
            snake.forEach(el=>line[el].classList.add('snake'));
            let snakeHead = snake[snake.length-1];
            line[snakeHead].innerHTML = "[:]";
            line[snakeHead].setAttribute('style','background-color:blue; border-radius: 0 5px 5px 0;font-size:14px;font-weight: bold; color: lime;');
            line[headPrevious].removeAttribute('style');          
            line[headPrevious].innerHTML = "";
            }
            else {
                stopGame();
                container.innerHTML="Game Over. Please Restart Game for Play Again";
            }
            },level);
    }
}
// left move
function leftMove(){
    if (!rightRunning) {
        leftRunning = true;
        upRunning = false;
        downRunning = false;
        if (checker) {
            clearInterval(stopChecker);
            eatChecker();
           }
           checker = false;
           clearInterval(stopRightMove);
           clearInterval(stopUpMove);
           clearInterval(stopDownMove);
           clearInterval(stopLeftMove);
        stopLeftMove = setInterval(function(){
            if (next>=0 && next<=624 && next % 25 !== 0) {
                next += -1;
                snake.push(next);
                let previous = snake[0];
                let headprevious = snake[snake.length-2];
                snake.shift(snake[previous]);
                line[previous].classList.remove('snake');
                snake.forEach(el=>line[el].classList.add('snake')); 
                let snakeHead = snake[snake.length-1];
                line[snakeHead].innerHTML = "[:]";
                line[snakeHead].setAttribute('style','background-color:blue; border-radius: 5px 0 0 5px; font-weight: bold; color: lime;');
                line[headprevious].removeAttribute('style');
                line[headprevious].innerHTML = "";
            }
            else{
                stopGame();
                container.innerHTML="Game Over. Please Restart Game for Play Again";
            }
        },level);  
    }
}
//up Move
function upMove(){
    if (!downRunning) {
        upRunning = true;
        leftRunning = false;
        rightRunning = false;
        if (checker) {
            clearInterval(stopChecker);
            eatChecker();
           }
           checker = false;
        clearInterval(stopRightMove);
        clearInterval(stopUpMove);
        clearInterval(stopDownMove);
        clearInterval(stopLeftMove);
        stopUpMove = setInterval(function(){
            if (next>=0 && next<=624) {
                next += -25;
                snake.push(next);
                let previous = snake[0];
                let headPrevious = snake[snake.length-2];
                snake.shift(snake[previous]);
                line[previous].classList.remove('snake');
                snake.forEach(el=>line[el].classList.add('snake'));
                line[next].innerHTML= "[..]]";  
                line[next].setAttribute('style','background-color:blue; border-radius: 5px 5px 0 0; font-size: 14px;font-weight: bold; color: lime;');  
                line[headPrevious].innerHTML= "";
                line[headPrevious].removeAttribute('style');
            }
            else {
                stopGame();
                container.innerHTML="Game Over. Please Restart Game for Play Again";
            }
        },level);
    }
}
//down Move
function downMove(){
    if (!upRunning) {
        downRunning = true;
        leftRunning = false;
        rightRunning = false;
        if (checker) {
            clearInterval(stopChecker);
            eatChecker();
           }
           checker = false;
           clearInterval(stopRightMove);
           clearInterval(stopUpMove);
           clearInterval(stopDownMove);
           clearInterval(stopLeftMove);
        stopDownMove = setInterval(function(){
            if (next>=0 && next<=624) {
                next += 25;
                snake.push(next);
                let previous = snake[0];
                let headPrevious = snake[snake.length-2];
                snake.shift(snake[previous]);
                line[previous].classList.remove('snake');
                snake.forEach(el=>line[el].classList.add('snake'));
                line[next].innerHTML = '[..]';
                line[next].setAttribute('style','background-color:blue; border-radius:0 0 5px 5px;font-size:14px;font-weight: bold; color: lime;');
                line[headPrevious].removeAttribute('style');
                line[headPrevious].innerHTML = "";
            }
            else{
                stopGame();
                container.innerHTML="Game Over. Please Restart Game for Play Again";
    
            }
        },level);
    }
}
// fruit generator
function fruitGenerator () {
    fruitPos = parseInt(Math.random()*624);
    line = container.querySelectorAll('div');
    line[fruitPos].classList.add('fruit');
    if ((lastIndex % 5 === 0) || (fruitPos>=120 && fruitPos<=150) || (fruitPos>=420 && fruitPos<=450)) {
        if (!checker) {
         line[rewardPos]?.classList.remove('reward');
         clearTimeout(rewardTime);
         reward();  
        }
    }
}
fruitGenerator();
// check the eating fruit
function eatChecker(){
    let score = document.getElementById('score');
    lastIndex = snake.length-1;
    point = 0;
    stopChecker = setInterval(() => {
    if (snake[lastIndex] === fruitPos || snake[lastIndex] === rewardPos) {
// checking the reward 
        if (snake[lastIndex] === rewardPos) {
            point += 25;
            line[rewardPos].classList.remove('reward'); 
            clearTimeout(rewardTime);
        }
// checking the fruit
        else {
            point += 5;
            line[fruitPos].classList.remove('fruit');
            fruitGenerator();
        }
        lastIndex+= 1;
        score.innerHTML = `Your Score: ${point}`;
        snake.unshift(snake[0]);
    }
    for (let i = 0; i < lastIndex; i++) {
        if( snake[i] === snake[lastIndex]){
            stopGame();
            container.innerHTML="Game Over. Please Restart Game for Play Again";
        }
    };
}, level);
}
//reward part
function reward () {
    rewardPos = parseInt(Math.random()*624);
    line[rewardPos].classList.add('reward');
// set time out for 3 seconds
    rewardTime = setTimeout(function(){
        line[rewardPos].classList.remove('reward');
        console.log('timer stop');
        clearTimeout(rewardTime);
    },rewardDuration);
}
// stop the game
function stopGame(){
    checker=true;
    clearInterval(stopRightMove);
    clearInterval(stopLeftMove);
    clearInterval(stopUpMove);
    clearInterval(stopDownMove);
    clearInterval(stopChecker);
    clearTimeout(rewardTime);
}
// restart game
function restartGame () {
    location.reload();
}
// set easy level
function easy() {
    level = 300;
    rewardDuration = 9000;
    checker = true;
    alert('Level Easy Set');
}
//set normal level
function normal() {
    level = 200;
    rewardDuration = 7000; 
    checker = true;
    alert('Level Normal Set');
}
// set hard level
function hard() {
    level = 100;
    rewardDuration= 5000;
    checker = true;
    alert('Level Hard Set');
}