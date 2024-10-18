let playerBalance = parseFloat(localStorage.getItem('balance')) || 0; // Retrieve balance from localStorage or start at 0

// Function to update balance display
function updateBalanceDisplay() {
  document.getElementById('balance-display').innerText = `$${playerBalance.toFixed(2)}`;
}

// Open the Add Funds Modal
function openAddFundsModal() {
  document.getElementById('add-funds-modal').style.display = 'block';
}

// Close the Add Funds Modal
function closeAddFundsModal() {
  document.getElementById('add-funds-modal').style.display = 'none';
}

// Add funds to balance
function addFunds() {
  const fundsInput = document.getElementById('funds-amount');
  const amount = parseFloat(fundsInput.value);
  
  if (!isNaN(amount) && amount > 0) {
    playerBalance += amount;
    localStorage.setItem('balance', playerBalance); // Save balance to localStorage
    updateBalanceDisplay(); // Update balance on the page
    closeAddFundsModal(); // Close the modal after adding funds
    fundsInput.value = ''; // Clear input field
  } else {
    alert('Please enter a valid amount.');
  }
}

// Redirect to Blackjack page when the Blackjack card is clicked
document.getElementById('blackjack-card').addEventListener('click', () => {
  window.location.href = 'blackjack.html';
});

// Initial call to display the correct balance when the page loads
updateBalanceDisplay();
