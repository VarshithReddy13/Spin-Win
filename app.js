const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 2,
};

const SYMBOL_VALUE = {
    A: 1,
    B: 1,
    C: 2,
    D: 1,
    E: 3,
};

let balance = 0;

const deposit = () => {
    const depositAmount = parseFloat(prompt("Enter a deposit amount: "));
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Invalid deposit amount, try again.");
        return;
    }
    balance += depositAmount;
    document.getElementById('balance').innerText = balance;
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
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
            reels[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const ans = [];
    for (let i = 0; i < ROWS; i++) {
        ans.push([]);
        for (let j = 0; j < COLS; j++) {
            ans[i].push(reels[j][i]);
        }
    }
    return ans;
};

const printReels = (rows) => {
        for (let j = 0; j < rows[0].length; j++) {
            document.getElementById(`reel${j+1}`).innerText = rows[0][j];
        }
};

const gameWinnings = (rows) => {
    let winnings = 0;
    for (let i = 0; i < ROWS; i++) {
        const row = rows[i];
        if (row.every(symbol => symbol === row[0])) {
            winnings += SYMBOL_VALUE[row[0]];
        }
    }
    return winnings;
};

const play = () => {
    if (balance <= 0) {
        alert("You need to deposit money first!");
        return;
    }

    const bet = parseFloat(prompt("Enter the amount to bet: "));
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert("Invalid bet amount, try again.");
        return;
    }

    balance -= bet;
    document.getElementById('balance').innerText = balance;

    const reels = spin();
    const transposedReels = transpose(reels);
    printReels(transposedReels);

    const winnings = gameWinnings(transposedReels) * bet;
    balance += winnings;
    document.getElementById('balance').innerText = balance;

    document.getElementById('message').innerText = `You won $${winnings}`;
};

document.getElementById('depositButton').addEventListener('click', deposit);
document.getElementById('playButton').addEventListener('click', play);
document.getElementById('resetButton').addEventListener('click', () => {
    balance = 0;
    document.getElementById('balance').innerText = balance;
    document.getElementById('message').innerText = '';
    document.getElementById('reel1').innerText = '';
    document.getElementById('reel2').innerText = '';
    document.getElementById('reel3').innerText = '';
});
