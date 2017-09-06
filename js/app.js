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
let span;
let timer=document.getElementsByClassName("timer")[0];
document.getElementsByClassName("restart")[0].onclick=function(){
    createGlobals();
    createCards();
};
// Get the modal
var modal = document.getElementById('myModal');


const startTimer=setInterval(function(){
    secs+=1;
    if(secs===60){
        mins+=1;
        secs=0;
    }
    timer.innerHTML=mins+": " + secs;
},1000);

/*
* Create a list that holds all of your cards
*/
const createGlobals= function(){
    cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle","bomb","diamond","paper-plane-o","anchor","bolt","cube","leaf","bicycle","bomb"];
    deck = document.getElementsByClassName("deck");
    deck[0].innerHTML="";
    openedCard = null;
    found = null;
    score=0;
    move=0;
    moves=document.getElementsByClassName("moves");
    moves[0].innerHTML=move;
    secs=0;
    mins=0;
    timer.innerHTML=mins+": " + secs;
    span = document.getElementsByClassName("close")[0];
    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided "shuffle" method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */
    shuffledCards = shuffle(cards);
};
createGlobals();
const animate= function(){
    move+=1;
    if(move===30){
        document.getElementsByClassName("fa-star")[0].classList.toggle("fa-star");
    }
    if(move===40){
        document.getElementsByClassName("fa-star")[0].classList.toggle("fa-star");
    }
    if(move===50){
        document.getElementsByClassName("fa-star")[0].classList.toggle("fa-star");
    }
    moves[0].innerHTML=move;
    if(found===false){
        openedCard=null;
        found=null;
    }
    this.classList.toggle("open");
    this.classList.toggle("show");
    if(openedCard===null){
        openedCard=this;
        openedCard.onclick=null;
    }
    else{
        if(openedCard.firstElementChild.className===this.firstElementChild.className){
            this.onclick=null;
            openedCard=null;
            score+=2;
            if(score===2){
                modal.style.display="block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
            }
        }else{
            openedCard.onclick=animate;
            found=false;
        }
    }
};

const checkActivity= function(){
    if(found===false){
        openedCard.classList.toggle("open");
        openedCard.classList.toggle("show");
        this.classList.toggle("open");
        this.classList.toggle("show");
    }
};

const createCards = function(){
    let elem,subelem;
    for (let i= 0; i<16; i++){
        elem=document.createElement("li");
        elem.classList.toggle("card");
        subelem=document.createElement("i");
        subelem.classList.toggle("fa");
        subelem.classList.toggle("fa-"+shuffledCards[i]);
        elem.onclick= animate;
        elem.addEventListener("transitionend", checkActivity, true);
        elem.appendChild(subelem);
        deck[0].appendChild(elem);
    }
};
createCards();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
