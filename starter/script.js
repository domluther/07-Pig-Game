"use strict";

const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtnEle = document.querySelector(".btn--roll");
const holdBtnEle = document.querySelector(".btn--hold");
const diceEle = document.querySelector(".dice");

const totalScore0Ele = document.getElementById("score--0");
const totalScore1Ele = document.getElementById("score--1");
const currentScore0Ele = document.getElementById("current--0");
const currentScore1Ele = document.getElementById("current--1");
const player1Section = document.querySelector(".player--0");
const player2Section = document.querySelector(".player--1");

// put into arrays so can access with currentPlayer as index
const totalScoreEles = [totalScore0Ele, totalScore1Ele];
const playerSections = [player1Section, player2Section];
const currentScoreEles = [currentScore0Ele, currentScore1Ele];
const totalScores = [0, 0];

const targetScore = 100;
let currentPlayer = 0;
let maxPlayers = playerSections.length;
let currentScore = 0; // only need one as it's for the current round
let gameActive = true; // while no winner

const startNewGame = function () {
  // hide the dice, reset variables to initial state
  diceEle.classList.add("hidden");
  currentScore = 0;
  currentPlayer = 0;
  gameActive = true;
  for (let player = 0; player < maxPlayers; player++) {
    totalScoreEles[player].textContent = "0";
    currentScoreEles[player].textContent = "0";
    totalScores[player] = 0;
    playerSections[currentPlayer].classList.remove("player--winner");
  }
  // make section 1 active and section 2 not active
  playerSections[1].classList.remove("player--active");
  playerSections[0].classList.add("player--active");
};

const generateNumber = (sides) => Math.trunc(Math.random() * sides) + 1;

const rollDice = function () {
  // roll dice - generate a number from 1-6, show appropriate image
  if (!gameActive) {
    // don't run if not active
    return;
  }

  // first roll - unhide dice
  diceEle.classList.remove("hidden");

  // roll the number - set the image
  const roll = generateNumber(6);
  diceEle.src = `dice-${roll}.png`;
  if (roll === 1) {
    // if it's a one then  you lose your current points and 'hold'
    currentScore = 0;
    currentScoreEles[currentPlayer].textContent = currentScore;
    // this could be better - separate function and implement a active check but this works
    hold();
  } else {
    currentScore += roll;
    currentScoreEles[currentPlayer].textContent = currentScore;
  }
};

const hold = function () {
  if (!gameActive) {
    // don't run if not active
    return;
  }
  // bank points - both in variable + label then reset the current to 0
  playerSections[currentPlayer].classList.remove("player--active");
  if (currentScore > 0) {
    totalScores[currentPlayer] += currentScore;
    totalScoreEles[currentPlayer].textContent = totalScores[currentPlayer];
  }
  if (totalScores[currentPlayer] >= targetScore) {
    playerSections[currentPlayer].classList.add("player--winner");
    diceEle.classList.add("hidden");
    gameActive = false;

    return;
  }
  currentScore = 0;
  currentScoreEles[currentPlayer].textContent = currentScore;

  // swap active player - visualise by toggling player--active
  currentPlayer = (currentPlayer + 1) % 2; // will toggle between 0 and 1
  playerSections[currentPlayer].classList.add("player--active");
  console.log(`Now player ${currentPlayer} is active`);
};

newGameBtn.addEventListener("click", startNewGame);
rollDiceBtnEle.addEventListener("click", rollDice);
holdBtnEle.addEventListener("click", hold);
