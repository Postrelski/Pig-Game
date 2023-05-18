'use strict';

let currScore = 0;
let p1HighScore = 0;
let p2HighScore = 0;
let p1TempScore = 0;
let p2TempScore = 0;


const players = document.querySelectorAll('.player')


const endEvents = function () {
    document.querySelector('.btn--roll').removeEventListener('click', roll);
    document.querySelector('.btn--hold').removeEventListener('click', hold);
    document.querySelector('.btn--new').removeEventListener('click', newGame);
}

const winner = function () {
    if(p1HighScore > 49) {
        console.log("p1 is winner!");
        document.querySelector('.player--0').classList.add("player--winner");
        endEvents();
    } else if (p2HighScore > 49){
        console.log("p2 is winner!");
        document.querySelector('.player--1').classList.add("player--winner");
        endEvents();
    }
}

const dice = function (num) {
    const image = document.querySelector('.dice');
    image.src = `dice-${num}.png`;
}

  // when using classlist dont include the "."
const changePlayers = function () {
    if (players[0].classList.contains("player--active")) {
        players[0].classList.remove("player--active");
        players[1].classList.add("player--active");
    } else {
        players[1].classList.remove("player--active");
        players[0].classList.add("player--active");
    }
}

const resetCurr =  function () {
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    currScore = 0;
    
}


const hold = function () {
  
    if (players[0].classList.contains("player--active")) {
        p1HighScore = p1TempScore + p1HighScore;
        document.querySelector('#score--0').textContent = p1HighScore;
        p1TempScore = 0;
    } else {
        p2HighScore =  p2TempScore + p2HighScore;
        document.querySelector('#score--1').textContent = p2HighScore;
        p2TempScore = 0;
    }

    changePlayers();
    resetCurr();
    winner();
}


const roll = function () {

    const randomNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    // console.log("random numer: " + randomNum);

    if (players[0].classList.contains("player--active")) {
        if (randomNum == 1 ) {
            resetCurr();
            currScore = 0;
            p1TempScore = 0;
            changePlayers();
        } else {
            currScore = currScore + randomNum;
            p1TempScore = p1TempScore + randomNum;
            document.querySelector('#current--0').textContent = currScore;
        }
        // console.log("p1 temp score: " + p1TempScore);

    } else  {

        if (randomNum == 1 ) {
            resetCurr();
            currScore = 0;
            p2TempScore = 0;
            changePlayers();
        } else {
            currScore = currScore + randomNum;
            p2TempScore = p2TempScore + randomNum;
            document.querySelector('#current--1').textContent = currScore;
        }
        // console.log("p2 temp score: " + p2TempScore);

    }
    dice(randomNum);
}


const newGame = function () {
    resetCurr();
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;
    dice(1);
    document.querySelector('.player--0').classList.remove("player--winner")
    document.querySelector('.player--1').classList.remove("player--winner")
    p1HighScore = 0;
    p2HighScore = 0;
    
}




document.querySelector('.btn--roll').addEventListener('click', roll);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', newGame);
