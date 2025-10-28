const prompt = require("prompt-sync")();

// Configuration
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Ask user for deposit
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

// Ask for number of lines (1–3)
const getNumberOfLines = () => {
  while (true) {
    const line = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseInt(line, 10);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again.");
    } else {
      return numberOfLines;
    }
  }
};

// Ask for bet per line
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet amount, try again.");
    } else {
      return numberBet;
    }
  }
};

// Spin the slot reels (randomly select symbols)
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

// Convert columns → rows (for easier display)
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

// Display the result nicely
const printRows = (rows) => {
  for (const row of rows) {
    console.log(row.join(" | "));
  }
};

// Check winnings
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    const allSame = symbols.every((symbol) => symbol === symbols[0]);

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

// Main game loop
const game = () => {
  let balance = deposit();

  while (true) {
    console.log("\nYour current balance: $" + balance);

    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    const totalBet = bet * numberOfLines;

    balance -= totalBet;

    const reels = spin();
    const rows = transpose(reels);

    console.log("\n--- SPINNING 🎰 ---");
    printRows(rows);

    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;

    console.log(`You won: $${winnings}`);
    console.log(`New balance: $${balance}`);

    if (balance <= 0) {
      console.log("💀 You're out of money. Game over!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");
    if (playAgain.toLowerCase() !== "y") {
      console.log("👋 Thanks for playing!");
      break;
    }
  }
};

// Start the game
game();

