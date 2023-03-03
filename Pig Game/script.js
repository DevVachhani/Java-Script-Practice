'use strict';

// selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');

const newgame = document.querySelector('.btn--new');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activeplayer, playing;
// starting conditions

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEl.classList.add('hidden');

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

const swichPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//roling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    //Genrating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for the roll : if true , switch to next player
    if (dice !== 1) {
      //Add dice to current score

      currentScore = currentScore + dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      swichPlayer(); //switch to next player
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log(score[activeplayer]);
    // 1 add current score to active player
    score[activeplayer] = score[activeplayer] + currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];
    // 2 check the score is >=100

    if (score[activeplayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      swichPlayer();
    }
  }
  // 4 swich the game
});

btnNew.addEventListener('click', init);
