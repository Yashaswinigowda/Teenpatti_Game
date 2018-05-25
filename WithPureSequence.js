
/* Cards falls from 1-A and only 4 shades in them */
var cards=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var colors =['heart','spade','diamond','club'];

/* function: findCard
    parameter: number
    return: which card it is and which shade.
 */

function findCard(number){
  var cardIndex = number % 13;   // To find which card is selected from user
  var colorsIndex = (number - cardIndex)/ 13 ; // To find which shades is selected from user
  return {
  'color':colors[colorsIndex],
  'card':cards[cardIndex],
  };
}

/* function: compareUserCards
   Description: compareUserCards to know which user is the winner
      parameter: Array
      return: Index of the user who had won [ Checking only for sequence numbers].
 */

function compareUserCards(userCards){
  var hasSameRankCards = userCards.map(checkSameRankCards);   // Maping through the all user cards
    // hasSameRankCards will be an array having [true, flase, ....] values in it.
  var index = hasSameRankCards.indexOf(true);
      /* Checking index>=0 because when any of the user doesn't contains same card
          hasSameRankCards.indexOf(true) will return -1.
       */
  if(index>=0){
    return index;
    // return userCards[index];
  }
}

/* function: checkSameRankCards
    Description: comparing whether all the cards of user are same or not
      parameter: Array
      return: true or false
 */

function checkSameRankCards(cards){
  console.log(cards);
  for(var i = 0; i < cards.length - 1; i++) {
      if(cards[i+1].card !== cards[0].card) {
          return false;
      }
  }
  return true;
};

/* Users selected Cards value an sample input */
var sampleinput = [[1,14,27],[0,32,50]];
var userCards = sampleinput.map((cards)=>{
  var x = cards.map(findCard);
  return x;
});

console.log(" Player 1", compareUserCards(userCards));


var object2={
   b : 10,
   a: ()=>{
    console.log(this.b);
  }

};
object2.a();
