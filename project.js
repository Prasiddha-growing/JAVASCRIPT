// Deposit money from the user
// function deposit(){
//     return 1 
// }

const prompt = require ("prompt-sync")();

const deposit = () => {
while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again. ");
        }else{
            return numberDepositAmount;
        }
    }
};

// Numbers of line for the spins and bets
const getnumberOfLines = () =>{
while (true) {
    const line = prompt("Enter the number of lines you want to bet on: ");
        const numberOfLines = parseFloat(line);
        
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines >3){
            console.log("Invalid number of lines, try again. ");
        }else{
            return numberOfLines;
        }
    }
}

const getbet = (balance, lines) => {
    while (true) {
    const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);
        
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet, try again. ");
        }else{
            return numberBet;
        }
    }
}


let balance = deposit();
const numberOfLines = getnumberOfLines();
const numberBet = getbet(balance, numberOfLines);


