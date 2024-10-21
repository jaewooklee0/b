let deck = [];
let playerHand = [];
let dealerHand = [];
let splitHand1 = [];
let splitHand2 = [];
let currentBet = 0;
let playerBalance = parseFloat(localStorage.getItem('balance')) || 1000;
let splitActive = false;
let currentHand = 'playerHand'; // Track which hand is currently active in case of split

// Update balance on load
document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;

// Function to add funds in increments of 1000
function addFunds() {
  playerBalance += 1000;
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance); // Store balance in localStorage
}

// Function to place a bet
function placeBet() {
  const betAmount = parseInt(document.getElementById('bet-amount').value);
  
  if (betAmount > playerBalance || betAmount <= 0) {
    alert("Invalid bet amount.");
    return;
  }
  
  currentBet = betAmount;
  playerBalance -= currentBet;
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance); // Update balance
  
  startGame();
}

// Function to start a new Blackjack game
function startGame() {
  deck = createDeck();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];

  updateHands();
  checkForBlackjack();
}

// Function to update hands
function updateHands() {
  const dealerHandEl = document.getElementById('dealer-hand');
  const playerHandEl = document.getElementById('player-hand');
  const hiddenCardEl = document.getElementById('dealer-hidden-card');

  // Show dealer's first card and hide the second card
  dealerHandEl.innerText = `${dealerHand[0].value}${dealerHand[0].suit}`;
  hiddenCardEl.style.display = 'block'; // Display hidden card placeholder

  playerHandEl.innerText = playerHand.map(card => `${card.value}${card.suit}`).join(' ');
}

// Reveal the hidden dealer card
function revealDealerCard() {
  const hiddenCardEl = document.getElementById('dealer-hidden-card');
  hiddenCardEl.style.display = 'none'; // Hide hidden card placeholder

  const dealerHandEl = document.getElementById('dealer-hand');
  dealerHandEl.innerText = dealerHand.map(card => `${card.value}${card.suit}`).join(' ');
}

// Function for Double Down
function doubleDown() {
  if (currentBet * 2 > playerBalance) {
    alert("Not enough balance to double down.");
    return;
  }

  playerBalance -= currentBet;
  currentBet *= 2;
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance);

  playerHand.push(drawCard());
  updateHands();
  stand(); // Force player to stand after drawing one card
}

// Function for Split
function splitHand() {
  if (playerHand[0].value !== playerHand[1].value) {
    alert("You can only split with two cards of the same value.");
    return;
  }

  splitHand1 = [playerHand[0]];
  splitHand2 = [playerHand[1]];
  splitActive = true;
  currentHand = 'splitHand1';
  
  splitHand1.push(drawCard());
  splitHand2.push(drawCard());

  updateHands();
}

// Function to handle hitting (drawing a card)
function hit() {
  if (splitActive) {
    if (currentHand === 'splitHand1') {
      splitHand1.push(drawCard());
      updateHands();
      if (calculateHandValue(splitHand1) > 21) {
        currentHand = 'splitHand2'; // Move to the next hand
      }
    } else {
      splitHand2.push(drawCard());
      updateHands();
    }
  } else {
    playerHand.push(drawCard());
    updateHands();
  }

  const playerValue = calculateHandValue(playerHand);
  if (playerValue > 21) {
    endGame('Bust! You lose.');
  }
}

// Function to end the game
function endGame(result) {
  revealDealerCard();
  document.getElementById('result').innerText = result;

  if (result.includes('win')) {
    playerBalance += currentBet * 2;
  }

  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance); // Save updated balance
}

// Remaining game logic stays the same...
