//Game Variables
let suits = [
    "Hearts", "Clubs", "Diamonds", "Spades"
    ],
    values = [
    "King", "Queen", "Jack", "Ten", "Nine",
    "Eight", "Seven", "Six", "Five", "Four",
    "Three", "Two", "Ace"
    ],
    deck = createDeck(),
    playerCards = [],
    playerScore = 0,
    dealerScore = 0,
    dealerCards = [];


//Dom Variables
let startButton = document.getElementById('startButt'),
    hitButton =document.getElementById('hitButt'),
    stayButton = document.getElementById('stayButt'),
    doubleButton = document.getElementById('doubleButt'),
    playerText = document.getElementById('player'),
    dealerText = document.getElementById('delear');

startButton.addEventListener("click", setup);
hitButton.addEventListener("click", dealCards);
stayButton.addEventListener("click", function(){console.log('working')});
doubleButton.addEventListener("click", function(){console.log('working')});




function setup(){
    console.log("setup");
    let gameObject = document.getElementsByClassName("gameStart");
    let paragraph = document.getElementById('para');
    paragraph.innerText = "start..";
    for (let i=0; i < gameObject.length; i++) {
        gameObject[i].style.display = "inline";
    }
    startButton.style.display = "none";
}

function createDeck (){
    let deck= [];
    for (let vl=0; vl<values.length; vl++){
        for (let i=0; i<suits.length; i++){
            let card = {
                suit: suits[i],
                value: values[vl]
            };
            deck.push(card);
        }
    }
    return deck;
}

function suffleDeck(deck){
    let newDeck = [];
    for (i=51; deck.length>0; i--){
        randomNumber = Math.random() * i;
        randomNumber = Math.trunc(randomNumber);
        newDeck.push(deck.splice(randomNumber,1)[0]);
    }
    return newDeck
}

function getNextCard(){
    return deck.shift();
}

function cardToString(card){
    return card.value + " of " +card.suit
}

function checkNumericValue(card){
    for (let i=0; i<values.length; i++){
        if (card.value==values[i]) {
            return 13-i
        }
}}

function dealCards() {
    getDealerCards();
    playerCards = [
        getNextCard(),
        getNextCard(),
    ]
    showPlayerCards(playerText);
}

function showPlayerCards(textArea) {
    text = ;
    playerCards.forEach(function(crd){
        text += cardToString(crd) + "\n";
        playerScore += checkNumericValue(crd);
    })
    
    textArea.innerText = text;
}

function getDealerCards(){
    while (dealerScore<16){
        let crd = getNextCard();
        cardValue = checkNumericValue(crd);
        dealerScore += cardValue;
        console.log(dealerScore);
    }
}

function getPlayerCards(){

}

deck = suffleDeck(deck);


