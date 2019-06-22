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
    gotCards = false,
    gameOn = false;
    text = "";


//Dom Variables
let startButton = document.getElementById('startButt'),
    hitButton =document.getElementById('hitButt'),
    stayButton = document.getElementById('stayButt'),
    doubleButton = document.getElementById('doubleButt'),
    playerText = document.getElementById('player'),
    dealerText = document.getElementById('dealer');
    playerCardsArea = document.getElementById('playerCardsArae');
    dealerCardsArea = document.getElementById('dealerCardsArea');
    ex = document.getElementById('ex');

startButton.addEventListener("click", setup);
hitButton.addEventListener("click", dealACard);
stayButton.addEventListener("click", openCards);
doubleButton.addEventListener("click", function(){console.log('working')});

/** Setup */

function setup(){
    gameOn = true;
    let gameObject = document.getElementsByClassName("gameStart");
    let paragraph = document.getElementById('para');
    paragraph.innerText = "start..";
    for (let i=0; i < gameObject.length; i++) {
        gameObject[i].style.display = "inline";
    }
    startButton.style.display = "none";
    getDealerCards();
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

/** Gameplay */

function dealACard() {
    if (!gotCards){
        playerCards = [
            getNextCard(),
            getNextCard(),
        ];
        playerCards.forEach(function(crd){
            let val = checkNumericValue(crd);
            playerCardsArea.appendChild(getImage(checkImgSrc(val, crd)));
            playerScore += addToScore(val);
        })
        gotCards = true;
    }
    else {
        let crd = getNextCard()
        playerCards.push();
        let val = checkNumericValue(crd);
        playerScore += val;
        playerCardsArea.appendChild(getImage(checkImgSrc(val, crd)));
        if (playerScore > 21) {
            gameOn = false;
            showPlayerCards();
            openCards();
        }
    }
    showPlayerCards();
}

function getDealerCards(){
    while (dealerScore<16){
        let crd = getNextCard();
        dealerCards.push(crd);
        cardValue = checkNumericValue(crd);
        dealerScore += addToScore(cardValue);
        //dealerScore += cardValue;
    }
}

function getNextCard(){
    return deck.shift();
}

function cardToString(card){
    return card.value + " of " + card.suit;
}

function addToScore(value){
    if (value==1){
        return 11;
       // console.log("val is 1 and sc is "+ sc);
    }
    else if (value>=10){
        return 10;
        //console.log("val above 10 and sc is "+ sc);
    }
    else {
        return value;
        //console.log("val is num and sc is "+ sc);
    }
}

function checkNumericValue(c) {
    let value = 0;
    let crdValue = c.value;
    //console.log("checkign card" + card.value);
    for (let i=0; i<values.length; i++)
        {
            if (crdValue==values[i]) {
                value = i+1;
                console.log("checkign card" + value);
                return value;
            }
        }
}

function showPlayerCards() {
    text = "Your cards: \n";
    playerCards.forEach(function(crd){
        text += cardToString(crd) + "\n";
    })
    text += "Your Score is: " + playerScore + "\n";
    if (!gameOn){
        text += "You eliminated";
    }
    playerText.innerText = text;
}


function checkImgSrc(val, card){
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
    imgSrc += val+sui+".png";
    console.log("image src" + imgSrc);
    return imgSrc;
}

function getImage (src){
    var img = document.createElement("img");
    img.className = "cardImage";
    img.src = src;
    return img
}

function showDelearCards (){
    let text = "Dealer cards: \n";
    dealerCards.forEach(function(crd){
        text += cardToString(crd) + "\n";
    })
    text += "Dealer Score is: " + dealerScore;
    dealerText.innerText = text;
    ex.style.display = "none";
    dealerCards.forEach(function(crd){
        let val = checkNumericValue(crd);
        dealerCardsArea.appendChild(getImage(checkImgSrc(val, crd)));
    })
}



function openCards (){
    dealerText.style.cssFloat = 'left';
    dealerText.style.marginRight = "20px";
    showDelearCards();
}

function gameOver (){
    gotCards = false,
    gameOn = false;
    text = "";
}


deck = suffleDeck(deck);


