const board = document.getElementById("game");
const info = document.getElementById("info");
const time = document.getElementById("time");

const array = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];

let flippedCards = [];
let disableFlip = false;
let numberFound = 0;
let timer = 0;
let Interval;

const flipCard = (e) => {
    if(disableFlip)
        return;
    
    if(flippedCards.length < 2) {
        if(flippedCards.includes(e.target))
            return;

        flippedCards.push(e.target);
        e.target.classList.remove("hiddenText");
    }

    if(flippedCards.length == 2)
    {
        disableFlip = true;
        
        if(flippedCards[0].innerText == flippedCards[1].innerText) {
            flippedCards.forEach(element => {
                element.removeEventListener("click", flipCard);
            });

            flippedCards = [];
            disableFlip = false;

            numberFound += 2;
            if(numberFound == 16)
                endGame();

            return;
        }
            
        setTimeout(() => {
            flippedCards.forEach(element => {
                element.classList.add("hiddenText");
            });

            flippedCards = [];
            disableFlip = false;
        }, 750)
    }
}

const timerFn = () => {
    timer++;
    time.innerText = `Time: ${timer}s`;
}

const Start = () => {
    const randomized = array.sort(() => Math.random() - 0.5);

    board.innerHTML = "";
    info.innerText = "";
    flippedCards = [];
    numberFound = 0;
    timer = 0;
    disableFlip = false;

    clearInterval(Interval);
    time.innerText = `Time: 0s`;
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
    clearInterval(Interval);
}