'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const diceEL = document.querySelector('.dice');
const rolldice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newgame = document.querySelector('.btn--new');

let totalScore, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();
//initials vars
// const totalScore = [0, 0]; // array to store and update score of p0 and p1
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true; // state of game
// score0EL.textContent = 0;
// score1EL.textContent = 0;
// diceEL.classList.add('hidden');
// const initialStates = function () {
//   diceEL.classList.add('hidden');
//   //current score 0
//   currentScore = 0;
//   current0EL.textContent = 0;
//   current1EL.textContent = 0;
//   //total score 0
//   totalScore = [0, 0];
//   score0EL.textContent = 0;
//   score1EL.textContent = 0;
//   //active player 1
//   player0EL.classList.remove('player--winner');
//   player1EL.classList.remove('player--winner');
//   player0EL.classList.add('player--active');
//   player1EL.classList.remove('player--active');
//   activePlayer = 0;
// };
// initialStates();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//Dice roll
rolldice.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //change player
      switchPlayer();
    }
  }
});
hold.addEventListener('click', function () {
  if (playing) {
    //add current score to active players score
    totalScore[activePlayer] += currentScore;
    // UI display
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    //check if score>50, winner
    if (totalScore[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
newgame.addEventListener('click', init);
