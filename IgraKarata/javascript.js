const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const info = document.getElementById("info");
const cardsPlayer1 = document.getElementById("pickedCards1");
const cardsPlayer2 = document.getElementById("pickedCards2");
let playing = false;
let player1 = [];
let player2 = [];
let cards;

btn1.disabled = true;
btn2.disabled = true;

const generateCards = () => {
    let cards = [];
    for (let i = 1; i <= 13; i++)
    {
        cards.push({
            type: "karo",
            number: i,
            color: "red"
        })
        cards.push({
            type: "herc",
            number: i,
            color: "red"
        })
        cards.push({
            type: "pik",
            number: i,
            color: "black"
        })
        cards.push({
            type: "tref",
            number: i,
            color: "black"
        })
    }

    return cards;
}

const pickRandomCard = (player) => {
    const random = Math.floor(Math.random() * cards.length);
    // console.log(cards[random]);

    if((player1.length < 5 || player2.length < 5) && playing){
        if(player == 1) {
            player1.push(cards[random]);
            btn1.disabled = true;
            btn2.disabled = false;
        } else if (player == 2) {
            player2.push(cards[random]);
            btn1.disabled = false;
            btn2.disabled = true;
        }
    }

    if(player1.length == 5 && player2.length == 5){
        endGame();
    }

    cards.splice(random, 1);

    printCards();

    // console.log(player1, player2);
}

const translateNumberToLetter = (num) => {
    switch(num)
    {
        case 11:
            return "J";
        case 12:
            return "Q";
        case 13:
            return "K";
        default:
            return num;
    }
}

const printCards = () => {
    const cards1 = player1.map((card) => {
        return `<div class="card ${card.color == "red" ? "cardRed" : "cardBlack"}">
            <p>${card.type}</p>
            <div class="filler"></div>
            <p>${translateNumberToLetter(card.number)}</p>
        </div>`
    })

    const cards2 = player2.map((card) => {
        return `<div class="card ${card.color == "red" ? "cardRed" : "cardBlack"}">
            <p>${card.type}</p>
            <div class="filler"></div>
            <p>${translateNumberToLetter(card.number)}</p>
        </div>`
    })

    cardsPlayer1.innerHTML = cards1.toString().replaceAll(",", "");
    cardsPlayer2.innerHTML = cards2.toString().replaceAll(",", "");
}

const startGame = () => {
    cards = generateCards();
    player1 = [];
    player2 = [];
    printCards();
    playing = true;
    btn1.disabled = false;
    info.innerText = "Game Started";
}

const endGame = () => {
    playing = false;
    btn1.disabled = true;
    btn2.disabled = true;
    info.innerText = "Game Ended.";
    checkWinner();
}

const checkWinner = () => {
    const winner = check1();
    console.log("Winner is", winner);
    
    if(winner == 0)
        info.innerText = "Draw!";

    info.innerText += ` Player ${winner} won!`;
}

const check1 = () => {
    const cards1 = player1.map((card) => card.number);
    const cards2 = player2.map((card) => card.number);

    const freq1 = getFrequency(cards1);
    const freq2 = getFrequency(cards2);

    let max1 = false;
    let max2 = false;

    freq1.forEach(element => element[1] == 4 ? max1 = true : "");
    freq2.forEach(element => element[1] == 4 ? max2 = true : "");

    console.log("check1", max1, max2);

    if(max1 && max2) {
        const player = checkSum();
        if(player != 0)
            return player;

        return check2();
    }

    if(max1 && !max2)
        return 1;
    
    if(max2 && !max1)
        return 2;

    return check2();
}

const check2 = () => {
    const cards1 = player1.map((card) => card.type);
    const cards2 = player2.map((card) => card.type);

    const freq1 = getFrequency(cards1);
    const freq2 = getFrequency(cards2);

    console.log("check2", freq1.length, freq2.length);

    if(freq1.length == freq2.length) {
        const player = checkSum();
        if(player != 0)
            return player;

        return check3();
    }

    if(freq1.length == 1)
        return 1;

    if(freq2.length == 1)
        return 2;

    return check3();
}

const check3 = () => {
    const cards1 = player1.map((card) => card.type);
    const cards2 = player2.map((card) => card.type);

    const freq1 = getFrequency(cards1);
    const freq2 = getFrequency(cards2);

    let max1 = false;
    let max2 = false;

    freq1.forEach(element => element[1] == 4 ? max1 = true : "");
    freq2.forEach(element => element[1] == 4 ? max2 = true : "");

    console.log("check3", max1, max2);

    if(max1 && max2) {
        const player = checkSum();
        if(player != 0)
            return player;

        return check4();
    }

    if(max1 && !max2)
        return 1;
    
    if(max2 && !max1)
        return 2;

    return check4();
}

const check4 = () => {
    const cards1 = player1.map((card) => card.number).sort((a, b) => a - b);
    const cards2 = player2.map((card) => card.number).sort((a, b) => a - b);

    condition1 = true;
    condition2 = true;

    for (let i = cards1[0]; i < cards1.length + cards1[0]; i++) {
        if(cards[i] != i)
            condition1 = false;
    }

    for (let i = cards2[0]; i < cards2.length + cards2[0]; i++) {
        if(cards[i] != i)
            condition2 = false;
    }

    console.log("check4", condition1, condition2);

    if(condition1 && condition2)
        return checkSum();

    if(condition1 && !condition2)
        return 1;
    
    if(condition2 && !condition1)
        return 2;

    return checkSum();
}

const sum = (arr) => {
    let s = 0;
    arr.forEach(element => {
        s += element.number;
    });
    
    return s;
}

const checkSum = () => {
    const sum1 = sum(player1);
    const sum2 = sum(player2);

    console.log("checksum", sum1, sum2);

    if(sum1 > sum2) 
        return 1;

    if(sum2 > sum1)
        return 2;

    return 0;
}

const getFrequency = (array) => {
    const map = {};
    array.forEach((item) => {
       if(map[item]){
          map[item]++;
       }else{
          map[item] = 1;
       }
    });
    return Object.entries(map);
};