//Game Variables
let suits = [
    "Hearts", "Clubs", "Diamonds", "Spades"
    ],
    values = [
        "Ace", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten",
        "Jack", "Queen", "King"
    ],
    modelDeck = createDeck(),
    playerCards = [],
    playerScore = 0,
    dealerScore = 0,
    dealerCards = [];
    gotCards = false,
    gameOn = false;
    firstDealerCard = false,
    PlayerAceCount = 0,
    dealerHasAce = false,
    money = 100,
    bet=0;
    boardClean = true;


//Dom Variables
let startButton = document.getElementById('startButt'),
    dealButton =document.getElementById('dealButt'),
    hitButton =document.getElementById('hitButt'),
    stayButton = document.getElementById('stayButt'),
    doubleButton = document.getElementById('doubleButt'),
    playerText = document.getElementById('playerScore'),
    dealerText = document.getElementById('dealerScore');
    playerCardsArea = document.getElementById('playerCardsArae');
    dealerCardsArea = document.getElementById('dealerCardsArea');
    paragraph = document.getElementById('para');
    ex = document.getElementById('ex');

startButton.addEventListener("click", setup);
dealButton.addEventListener("click", firstDeal);
hitButton.addEventListener("click", dealACard);
stayButton.addEventListener("click", openCards);
doubleButton.addEventListener("click", function(){console.log('working')});

deck = suffleDeck(modelDeck);

/** Setup */

function setup(){
    gameOn = true;
    let gameObject = document.getElementsByClassName("gameStart");
    paragraph.innerText = "Your cash is " + money+ "\n";
    input = document.createElement('input');
    input.setAttribute("type", "number");
    paragraph.appendChild(input);
    for (let i=0; i < gameObject.length; i++) {
        gameObject[i].style.display = "inline";
    }
    startButton.style.display = "none";
}

function firstDeal(){
    if (!boardClean){
        cleanBoard()
    }
    boardClean = false;
    bet = input.value;
    if (!gotCards){
        playerNextCard();
        dealerNextCard();
        firstDealerCard = true;
        playerNextCard();
        dealerNextCard();
        gotCards = true;
    }
}

function createDeck (){
    let deck= [];
    for (let vl=0; vl<values.length; vl++){
        for (let i=0; i<suits.length; i++){
            let card = {
                suit: suits[i],
                value: values[vl],
                numValue: vl+1
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

/** Gameplay */

function dealACard() {
    playerNextCard();
    showPlayerCards();
}

function dealerNextCard (pass21=false){
    let crd = getNextCard();
        dealerCards.push(crd);
        if(crd.numValue==1){
            dealerHasAce = true;
        }
        dealerScore += calculateScore(crd.numValue, pass21);
        if (firstDealerCard){
            dealerCardsArea.appendChild(getImage(checkImgSrc(crd)))
        }
}

function playerNextCard(){
    let crd = getNextCard()
        playerCards.push(crd);
        playerScore += calculateScore(crd.numValue);
        if (crd.numValue == 1){
            PlayerAceCount = 1;
        }
        playerCardsArea.appendChild(getImage(checkImgSrc(crd)));
        while (playerScore > 22) {
            if (PlayerAceCount>0){
                playerScore -= 10;
            }
            else {
                gameOn = false;
                showPlayerCards();
                openCards();
            }
        }
    }

function getNextCard(){
    if(deck.length==0){
        deck = suffleDeck(modelDeck);
    }
    return deck.shift();
}

function cardToString(card){
    return card.value + " of " + card.suit;
}

function calculateScore (value, pass21=false) {
    if (value > 9){
        return 10
    }
    else if(value ==1 && pass21){
        return 1
    }
    else if (value==1){
        return 11
    }
    else {
        return value
    }
}

function showPlayerCards() {
    let text = "";
    text += "Your Score is: " + playerScore + "\n";
    if (!gameOn){
        text += "You eliminated";

        playerText.innerText = "You lost " + bet;
        money -= bet;
        gameOver();
        return
    }
    playerText.innerText = text;
}

function checkImgSrc(card){
    let imgSrc = "assests/pictures/";
    let sui = "";
    switch (card.suit){
        case "Hearts":
            sui = "H";
            break;
        case "Clubs":
                sui = "C";
                break;
        case "Spades":
                sui = "S";
                break;
        case "Diamonds":
                sui = "D";
                break;
    }
    imgSrc += card.numValue+sui+".png";
    return imgSrc;
}

function getImage (src){
    var img = document.createElement("img");
    img.className = "cardImage";
    img.src = src;
    return img
}

function showDelearCards (){
    ex.src= checkImgSrc(dealerCards[0]);
    while (dealerScore<16){
        dealerNextCard();
        while (dealerScore > 21){
            if (dealerHasAce > 0){
                dealerScore -= 10;
            }
            else {
                let text = "Dealer Score is: " + dealerScore + "\n";
                dealerText.innerText = text;
                break;
            }
        }
    }



}

function openCards (){
    showDelearCards();
    if (gameOn && dealerScore <= 21){
        if (dealerScore>=playerScore){
            playerText.innerText = "You lost " + bet;
            money -= bet;
            gameOver();
        }
        else {
            playerText.innerText = "You win"
            money += bet*2;
            gameOver();
        }
    }
}

function gameOver (){
    paragraph.innerText = "Your cash is " + money+ "\n";
    playerCards = [],
    playerScore = 0,
    dealerScore = 0,
    dealerCards = [];
    gotCards = false;
    gameOn = false;
    firstDealerCard = false;
    PlayerAceCount = 0;
    dealerHasAce = false;
    bet = 0;
}

function cleanBoard () {
    while (playerCardsArea.firstChild) {
        playerCardsArea.removeChild(playerCardsArea.firstChild);
    }
    while (dealerCardsArea.childNodes.length > 1) {
        dealerCardsArea.removeChild(dealerCardsArea.lastChild);
    }
    dealerCardsArea.firstChild.src = "assests/pictures/gray_back.png";
}




