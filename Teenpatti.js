/* Cards falls from 1-A and only 4 shades in them */
var cards=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var colors =['heart','spade','diamond','club'];

var CardValues =[14,2,3,4,5,6,7,8,9,10,11,12,13]; // values associated for each card


/* function: findCard
    parameter: number
    return: which card it is and which shade.
 */

function findCard(number){
  var cardIndex = number % 13; // To find which card is selected from user
  var colorsIndex = (number - cardIndex)/ 13 ; // To find which shades is selected from user
  return {
  'color':colors[colorsIndex],
  'card':cards[cardIndex],
  };
}

/* function: getUserRanks
   Description: getUserRanks to know score points of each user.
      parameter: Array
      return: the score points of the users[based on which we can later decide who is winner].
 */

function getUserRanks(userCards){
  var hasSameRankCards = userCards.map(cardsComparision);
  return hasSameRankCards;
}

/* function: cardsComparision
   Description: cardsComparision to know score point of the given user.
      parameter: Array
      return: the score point of the user.
 */

function cardsComparision(cards){
  var cardPoints;
  var sameSequence = isTrailOrSet(cards);
      if(sameSequence){
        cardPoints = gettrialCardPoints(cards);
        return 6+(cardPoints/100);
      }

  sameSequence = isPureSequence(cards);
        if(sameSequence)
         return 5;

  sameSequence = isRunSequence(cards);
       if(sameSequence)
         return 4;

  sameSequence = hasSameColors(cards);
       if(sameSequence){
         cardPoints = getCardPoints(cards);
          return 3+(cardPoints/100);
       }


  sameSequence = isPairCards(cards);
      if(sameSequence){
        cardPoints = getCardPoints(cards);
        return 2+(cardPoints/100);
      }

  sameSequence = getHighestCard(cards);
  return Number((1+Number(sameSequence/100)).toFixed(2));   // To round of the value of 1.1400000000000001 to 1.14

//   var numb = 1.5;
// numb = +numb.toFixed(2);
// // Note the plus sign that drops any "extra" zeroes at the end.
// // It changes the result (which is a string) into a number again (think "0 + foo"),
// // which means that it uses only as many digits as necessary.
}

/* function: gettrialCardPoints
   Description: gettrialCardPoints is used to know which cards does the user contains in
                the Trail card.
                This scores helps in detremining the difference between two users falling under same points.
        Example: User 1 - has [K,K,K]
                          score point would be [6.13]

                  User 2 - has [Q,Q,Q]
                           score point would be [6.12]
      parameter: Array
      return: cardValue.
 */

function gettrialCardPoints(card){
  let cardValue = card[0].card;
  cardValue = cards.indexOf(cardValue);
  cardValue = CardValues[cardValue];
  return cardValue;
}

/* function: getCardPoints
   Description: getCardPoints is used to sum all value of the given cards
                This scores helps in detremining the difference between two users falling under same points.
        Example: User 1 - has [A,K,9] with same colors
                          score point would be [3.36]

                User 2 - has [10,7,2] with same colors
                          score point would be [3.19]

                User 3 - has [10,7,2] which  falls under high cards
                          score point would be [1.19]
      parameter: Array
      return: the sum of all cards.
 */

function getCardPoints(card){
  let cardValue;
  let sum = 0;
  for(let i=0; i< card.length; i++){
      cardValue = cards.indexOf(card[i].card);
      cardValue = CardValues[cardValue];
      sum = sum + cardValue;
  }
  return sum;
}

/* function: getHighestCard
   Description: getHighestCard is used to calculate which card has highest value
                in the given cards.
      parameter: Array
      return: the highestCard value in the given cards .
 */

function getHighestCard(card){
  let cardValue;
  let highestCard = 0;
  for(let i=0; i < card.length; i++){
    cardValue = cards.indexOf(card[i].card);
    cardValue = CardValues[cardValue];
    if(cardValue > highestCard){
      highestCard = cardValue;
    }
  }
  return highestCard;
}

/* function: hasSameColors
   Description: checks whether the given cards fall under same color/type [heart, diamond, spade, club]
                in the given cards.
      parameter: Array
      return: if given cards fall under same type returns true else false.
 */

function hasSameColors(cards){
  for(let i = 0; i < cards.length - 1; i++) {
      if(cards[i+1].color !== cards[0].color) {
          return false;
      }
  }
  return true;
}

/* function: isPureSequence
   Description: checks whether the given cards fall under same PureSequence [ex: A23, Akq with same color]
      parameter: Array
      return: if given cards fall under PureSequence type returns true else false.

   To achieve this we concatinate all the value.
   Check against cardSerials and reverseCard to know whether the card is series [ ex: AKQ, 10-9-8, QJ10 with same color].
*/

var cardSerials = 'A2345678910JQKA';
var reverseCard = 'AKQJ1098765432A'

function isPureSequence(cards){
  var cardsVal = '';

  if(hasSameColors(cards)){
    for(var i = 0; i < cards.length ; i++) {
      cardsVal = cardsVal + cards[i].card;
    }
    if(cardSerials.includes(cardsVal) || reverseCard.includes(cardsVal)){
      return true;
    }
    return false;
  }
  return false;
}

/* function: isRunSequence
   Description: checks whether the given cards fall under same RunSequence [ex: A23, Akq]
      parameter: Array
      return: if given cards fall under RunSequence type returns true else false.

   To achieve this we concatinate all the value.
   Check against cardSerials and reverseCard to know whether the card is series [ ex: AKQ, 10-9-8, QJ10].
*/

function isRunSequence(cards){
  var cardsVal = '';
    for(var i = 0; i < cards.length ; i++) {
      cardsVal = cardsVal + cards[i].card;
    }

    if(cardSerials.includes(cardsVal) || reverseCard.includes(cardsVal)){
      return true;
    }

  return false;
}


/* function: isTrailOrSet
   Description: checks whether the given cards value is same [ex: AAA, KKK, 222, 444]
      parameter: Array
      return: if given cards value are same it returns true else false.
*/

function isTrailOrSet(cards){
  for(var i = 0; i < cards.length - 1; i++) {
      if(cards[i+1].card !== cards[0].card) {
          return false;
      }
  }
  return true;
};


/* function: isPairCards
   Description: checks whether in the given cards does it have a PairCards [ex: AA9, KjK, 262, 744]
      parameter: Array
      return: if given cards if any two cards value are same it returns true else false.
*/

function isPairCards(cards){
      if(cards[0].card == cards[1].card || cards[0].card == cards[2].card || cards[1].card == cards[2].card)
          return true;
  return false;
};

/* Users selected Cards value an sample input
 * Program starts from here.
*/
var sampleinput = [[0,13,26],[3,16,29],[13,27,41],[2,8,9],[40,14,13],[34,56,7],[2,0,51]];
var userCards = sampleinput.map((cards)=>{
  var x = cards.map(findCard);
  return x;
});

var getUserScores = getUserRanks(userCards);
console.log(" Player",getUserScores);

/*
OutPut:
  Ranks of the User: [6.14, 6.04, 4, 3.22, 2.18, 1.09, 1.14]
*/
