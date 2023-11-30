// 1. Despot some money
// 2. Determine number of lines to bet on (1-3)
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
 };

// 1. Despot some money | starts here----->
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
};
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
};
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

// 4. Spin the slot machine | starts here----->
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
       for (let i = 0; i < count; i++){
           symbols.push(symbol);
       }
    }

    const reels =[]
    for (let i = 0; i < COLS; i++){
        reels.push([]);
       const reelSymbols = [...symbols];
       for (let j =0; j < ROWS; j++){
           const randomIndex = Math.floor(Math.random() * reelSymbols.length);
           const selectedSymbol = reelSymbols[randomIndex];
           reels[i].push(selectedSymbol);
           reelSymbols.splice(randomIndex, 1);
       }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
// 4. Spin the slot machine | ends here----->

// 5. Check if the user won | starts here----->
const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};
// 5. Check if the user won | end here----->

// 6. Give the user their winnings | starts here----->
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};
// 6. Give the user their winnings | ends here----->


// 7. Play again | starts here----->

const game = () => {
    let balance = deposit();
    while(true){
        console.log("You have a balance of $" + balance);
        const numberofLines = getNumberOfLines();
        const bet = getBet(balance, numberofLines);
        balance -= bet * numberofLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberofLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if(playAgain != "y") break;
    }
};

game();
// 7. Play again | ends here----->
