//Game Variables
let suits = [
    "Hearts", "Clubs", "Diamonds", "Spades"
    ],
    values = [
        "Ace", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten",
        "Jack", "Queen", "King"


    ],
    deck = createDeck(),
    playerCards = [],
    playerScore = 0,
    dealerScore = 0,
    dealerCards = [];
    gotCards = false;


//Dom Variables
let startButton = document.getElementById('startButt'),
    hitButton =document.getElementById('hitButt'),
    stayButton = document.getElementById('stayButt'),
    doubleButton = document.getElementById('doubleButt'),
    playerText = document.getElementById('player'),
    dealerText = document.getElementById('dealer');

startButton.addEventListener("click", setup);
hitButton.addEventListener("click", dealCards);
stayButton.addEventListener("click", openCards);
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
    return card.value + " of " + card.suit;
}

function checkNumericValue(card){
    for (let i=0; i<values.length; i++){
        if (i<10){
            if (card.value==values[i]) {
                console.log("checking vlaue " + values[i])
                return i+1
            }
        }
        else if (i>=10 && card.value==values[i]){
            return 10
        }
}
}

function dealCards() {
    getDealerCards();
    if (!gotCards){
        playerCards = [
            getNextCard(),
            getNextCard(),
        ];
        playerCards.forEach(function(crd){
            playerScore += checkNumericValue(crd);
        })
        gotCards = true;
    }
    else {
        playerCards.push(getNextCard());
        playerScore += checkNumericValue(playerCards[playerCards.length - 1])
    }

    showPlayerCards(playerText);
}

function showPlayerCards(textArea) {
    text = "Your cards: \n";
    playerCards.forEach(function(crd){
        text += cardToString(crd) + "\n";
    })
    text += "Your Score is: " + playerScore;
    textArea.innerText = text;
}

function showDelearCards (textArea){
    text = "Dealer cards: \n";
    console.log(dealerCards);
    dealerCards.forEach(function(crd){
        text += cardToString(crd) + "\n";
    })
    text += "Dealer Score is: " + dealerScore;
    textArea.innerText = text;
}

function getDealerCards(){
    while (dealerScore<16){
        let crd = getNextCard();
        dealerCards.push(crd);
        cardValue = checkNumericValue(crd);
        dealerScore += cardValue;
    }
}

function openCards (){
    dealerText.style.cssFloat = 'left';
    dealerText.style.marginRight = "20px";
    showDelearCards(dealerText);
}

deck = suffleDeck(deck);


