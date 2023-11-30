// 1. Despot some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again


// 1. Despot some money | starts here----->
const prompt = require("prompt-sync")();
const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
    
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again!");
        } else{
            return numberDepositAmount;
        }
    }
}
// 1. Despot some money | ends here----->


// 2. Determine number of lines to bet on | starts here--->
const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberofLines = parseFloat(lines);
    
        if(isNaN(numberofLines) || numberofLines <= 0 || numberofLines > 3){
            console.log("Invalid number of lines, try again!");
        } else{
            return numberofLines;
        }
    }
}
// 2. Determine number of lines to bet on | ends here--->

// 3. Collect a bet amount | starts here----->
const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){
            console.log("Invalid bet, try again!");
        } else{
            return numberBet;
        }
    }
}
// 3. Collect a bet amount | ends here----->

let balance = deposit();
const numberofLines = getNumberOfLines();
const bet = getBet(balance, numberofLines);