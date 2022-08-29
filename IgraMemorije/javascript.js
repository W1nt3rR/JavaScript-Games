const board = document.getElementById("game");
const info = document.getElementById("info");
const time = document.getElementById("time");

const array = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];


let flippedCards = [];
let disableFlip = false;
let numberFound = 0;
let timer = 0;

const flipCard = (e) => {
    if(disableFlip)
        return;

    // console.log(e);
    
    if(flippedCards.length < 2) {
        flippedCards.push(e);
        e.target.classList.remove("hiddenText");
    }

    // console.log(flippedCards)

    if(flippedCards.length == 2)
    {
        disableFlip = true;
        
        if(flippedCards[0].target.innerText == flippedCards[1].target.innerText) {
            flippedCards[0].target.removeEventListener("click", flipCard);
            flippedCards[1].target.removeEventListener("click", flipCard);
            disableFlip = false;
            flippedCards = [];

            numberFound += 2;
            if(numberFound == 16)
                endGame();

            return;
        }
            
        setTimeout(() => {
            flippedCards[0].target.classList.add("hiddenText");
            flippedCards[1].target.classList.add("hiddenText");
            flippedCards = [];
            disableFlip = false;
        }, 1000)
    }
}

const timerFn = () => {
    timer++;
    time.innerText = `Time: ${timer}s`;
}

let Interval;

const Start = () => {
    const randomized = array.sort(() => Math.random() - 0.5);

    board.innerHTML = "";
    info.innerText = "";
    flippedCards = [];
    numberFound = 0;
    timer = 0;
    disableFlip = false;

    clearInterval(Interval);
    Interval = setInterval(timerFn, 1000)

    randomized.map((letter) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("hiddenText");
        card.innerText = letter;
        card.addEventListener("click", flipCard);

        board.appendChild(card);
    })
}

const endGame = () => {
    info.innerText = "Congratulations! You are now Smarter.";
    numberFound = 0;
    timer = 0;
    flippedCards = [];
    clearInterval(Interval);
}



