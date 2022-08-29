const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
let playing = false;
let player1 = [];
let player2 = [];
let cards;

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

cards = generateCards();

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
    } else {
        checkWinner();
    }

    cards.splice(random, 1);

    printCards();

    // console.log(player1, player2);
}


const printCards = () => {
    const cardsPlayer1 = document.getElementById("pickedCards1");
    const cardsPlayer2 = document.getElementById("pickedCards2");

    const cards1 = player1.map((card) => {
        return `<div class="card ${card.color == "red" ? "cardRed" : "cardBlack"}">
            <p>${card.type}</p>
            <div class="filler"></div>
            <p>${card.number}</p>
        </div>`
    })

    const cards2 = player2.map((card) => {
        return `<div class="card ${card.color == "red" ? "cardRed" : "cardBlack"}">
            <p>${card.type}</p>
            <div class="filler"></div>
            <p>${card.number}</p>
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
}

const checkWinner = () => {
    const cards1 = player1.map((card) => {
        return card.number;
    })

    const cards2 = player2.map((card) => {
        return card.number;
    })

    const freq1 = getFrequency(cards1);
    console.log(freq1);

    const freq2 = getFrequency(cards2);
    console.log(freq2);

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
    return map;
 };