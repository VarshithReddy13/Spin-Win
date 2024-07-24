const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 1,
    B : 1,
    C : 1,
    D : 1,
    E : 2,
};

const SYMBOL_VALUE = {
    A : 1,
    B : 1,
    C : 2,
    D : 1,
    E : 3,
};

const deposit = () => {
    while(true)
    {
        const numberDepositAmount = parseFloat(prompt("Enter a deposit amount: ")); // converts the string into floating point numb.

        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log("Invalid deposit amount, try again.");
        }
        else{
            return numberDepositAmount;
        }
    }
};

const linesPrompt = () => {
    while(true)
    {
        const lines = prompt("Enter the number of lines to place bet on (1-3): ");
        const numbLines = parseInt(lines);

        if(isNaN(numbLines) || numbLines<=0 || numbLines>3)
        {
            console.log("Invalid number of lines, try again.");
        }
        else{
            return numbLines;
        }
    }
};

const collectBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the amount to bet on each line: ");
        const intBet = parseFloat(bet);

        if(isNaN(intBet) || intBet <= 0 || intBet*lines > balance){
            console.log("Invalid bet, try again.");
        }
        else{
            return intBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i<count ; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i<COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*(reelSymbols.length-1));
            reels[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

function transpose(reels){
    const ans = [];
    for(let i = 0; i<ROWS; i++){
        ans.push([]);
        for(let j = 0; j<COLS; j++){
            ans[i].push(reels[j][i]);
        }
    }
    return ans;
}

const print = (rows) =>{
    for(const row of rows){
        let rowString = '';
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != COLS-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const gameWinnings = (rows,lines,bet) => {
    let winnings = 0;
    for(let i = 0; i<lines; i++){
        const row = rows[i];
        if(row.every(symbol => symbol === row[0])){
            winnings += bet * SYMBOL_VALUE[symbol];
        }
    }
    return winnings;
};

const play = () =>{
    let balance = deposit();
    while(true){
        console.log("Your current balance is, $" + balance)
        const lines = linesPrompt();
        const bet = collectBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const transposedReels = transpose(reels);
        print(transposedReels);
        const winnings = gameWinnings(transposedReels,lines,bet);
        console.log("Your won, $" + winnings);
        balance += winnings;
        if(balance <= 0 ){
            console.log("You ran out of money!");
            break;
        }
        console.log("Your current balance is, $" + balance);
        const playAgain = prompt("Do you wanna play again (y/n): ");

        if(playAgain != 'y') break;
    }
};

play();