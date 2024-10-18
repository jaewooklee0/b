let playerBalance = parseFloat(localStorage.getItem('balance')) || 0; // Get balance from localStorage
let dealerHand = [];
let playerHand = [];

// Update balance display
function updateBlackjackBalance() {
  document.getElementById('blackjack-balance').innerText = `$${playerBalance.toFixed(2)}`;
}

// Function to generate a random card value between 1 and 11
function getRandomCard() {
  return Math.floor(Math.random() * 11) + 1;
}

// Start a new game
function startGame() {
  dealerHand = [getRandomCard(), getRandomCard()];
  playerHand = [getRandomCard(), getRandomCard()];
  document.getElementById('dealer-hand').innerText = `Dealer's Hand: ${dealerHand[0]} ?`;
  document.getElementById('player-hand').innerText = `Your Hand: ${playerHand.join(' ')}`;
  document.getElementById('result').innerText = ''; // Clear result
}

// Player hits
function hit() {
  playerHand.push(getRandomCard());
  document.getElementById('player-hand').innerText = `Your Hand: ${playerHand.join(' ')}`;
  checkGameStatus();
}

// Player stands
function stand() {
  document.getElementById('dealer-hand').innerText = `Dealer's Hand: ${dealerHand.join(' ')}`;
  checkGameStatus(true);
}

// Check if player or dealer has won
function checkGameStatus(isStand = false) {
  let playerSum = playerHand.reduce((a, b) => a + b, 0);
  let dealerSum = dealerHand.reduce((a, b) => a + b, 0);

  if (playerSum > 21) {
    document.getElementById('result').innerText = 'You Bust! Dealer Wins.';
    playerBalance -= 10; // Lose $10
  } else if (isStand) {
    if (dealerSum > 21 || playerSum > dealerSum) {
      document.getElementById('result').innerText = 'You Win!';
      playerBalance += 10; // Win $10
    } else {
      document.getElementById('result').innerText = 'Dealer Wins.';
      playerBalance -= 10; // Lose $10
    }
  }

  localStorage.setItem('balance', playerBalance); // Save updated balance
  updateBlackjackBalance();
}

// Go back to the main casino page
function goBack() {
  window.location.href = 'index.html';
}

// Initial call to display the correct balance
updateBlackjackBalance();
