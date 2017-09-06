// initialize globals
//TODO replaced some 'let' with 'const' because it's possible
let cards;
let deck;
let openedCard;
let found;
let score;
let move;
let moves;
let shuffledCards;
let mins;
let secs;
let startTimer;
let span;
let youWin = document.getElementsByClassName("youWin")[0];
let timer = document.getElementsByClassName("timer")[0];
let starsInfo = document.getElementsByClassName("stars-info")[0];
let starList = document.getElementsByClassName("stars")[0];
const modal = document.getElementById('myModal');

//add restart functions to buttons
//TODO reduce lines of code by using loops
document.getElementsByClassName("restart")[0].onclick = function() {
    createGlobals();
    createCards();
    for (let i = 0, thr = document.getElementsByClassName("thrown"); i < thr.length; i++) {
        thr[i].classList.toggle("fa-star");
    }
    for (let i = 0, thr = document.getElementsByClassName("fa-star"); i < thr.length; i++) {
        if (thr[i].classList.contains('thrown')) {
            thr[i].classList.toggle('thrown');
        }
    }
    modal.style.display = "none";
};
document.getElementsByClassName("restart")[1].onclick = function() {
    createGlobals();
    createCards();
    for (let i = 0, thr = document.getElementsByClassName("thrown"); i < thr.length; i++) {
        thr[i].classList.toggle("fa-star");
    }
    for (let i = 0, thr = document.getElementsByClassName("fa-star"); i < thr.length; i++) {
        if (thr[i].classList.contains('thrown')) {
            thr[i].classList.toggle('thrown');
        }
    }
};

// assign values to globals
const createGlobals = function() {
    cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
    deck = document.getElementsByClassName("deck");
    deck[0].innerHTML = "";
    openedCard = null;
    found = null;
    score = 0;
    move = 0;
    moves = document.getElementsByClassName("moves");
    moves[0].innerHTML = move;
    secs = 0;
    mins = 0;
    timer.innerHTML = mins + ": " + secs;
    span = document.getElementsByClassName("close")[0];
    startTimer = setInterval(function() {
        secs += 1;
        if (secs === 60) {
            mins += 1;
            secs = 0;
        }
        timer.innerHTML = mins + ": " + secs;
    }, 1000);
    shuffledCards = shuffle(cards);
};
createGlobals();

//animate the cards on tap
const animate = function() {
    move += 1;
    if (move === 30 || move === 40 || move === 50) {
        document.getElementsByClassName("fa-star")[0].classList.toggle("thrown");
        document.getElementsByClassName("fa-star")[0].classList.toggle("fa-star");
    }
    moves[0].innerHTML = move;
    if (found === false) {
        openedCard = null;
        found = null;
    }
    this.classList.toggle("open");
    this.classList.toggle("show");
    if (openedCard === null) {
        openedCard = this;
        openedCard.onclick = null;
    } else {
        if (openedCard.firstElementChild.className === this.firstElementChild.className) {
            this.onclick = null;
            openedCard = null;
            score += 2;
            if (score === 16) {
                modal.style.display = "block";
                youWin.innerHTML = "You took " + mins + " minutes and " + secs + " seconds";
                starsInfo.innerHTML = "You recieved a " + document.getElementsByClassName("fa-star").length.toString() + " star rating";
                console.log(document.getElementsByClassName("fa-star").length.toString(), starsInfo);
                span.onclick = function() {
                    modal.style.display = "none";
                };
                clearInterval(startTimer);
            }
        } else {
            openedCard.onclick = animate;
            found = false;
        }
    }
};

//toggle classes on mismatch
//TODO change inaccurate class name
const checkActivity = function() {
    if (found === false) {
        openedCard.classList.toggle("open");
        openedCard.classList.toggle("show");
        this.classList.toggle("open");
        this.classList.toggle("show");
    }
};

//create Cards on screen
const createCards = function() {
    let elem, subelem;
    for (let i = 0; i < 16; i++) {
        elem = document.createElement("li");
        elem.classList.toggle("card");
        subelem = document.createElement("i");
        subelem.classList.toggle("fa");
        subelem.classList.toggle("fa-" + shuffledCards[i]);
        elem.onclick = animate;
        elem.addEventListener("transitionend", checkActivity, true);
        elem.appendChild(subelem);
        deck[0].appendChild(elem);
    }
};
createCards();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
