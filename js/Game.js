/*
Game.js:  creates a Game class with methods for starting and ending the game, handling interactions, getting
random phrases, checking for a win, and removing a life counter.

- Create a Game class.  Should include a constructor with
the following properties:
    - missed: used to track the numbers of missed guesses by the player.
    - phrases: an array of phrases to use with the game (you'll use a
    method to create new instances of the Phrase class).  A phrase should only include letters
    and spaces - NO numbers, punctuation or other special characters!
    
- The class should also have the following methods (class only functions):
    X- getRandomPhrase(): this method randomly retrieves one of the phrases stored in the phrases array.
    X- handleInteraction(): this method checks to see if the button clicked
         by the player matches a letter in the phrase.
            - If it does not, then call the removeLife() method..
    X- If the selected letter matches, call the showMatchedLetter() method
        on the phrase and then call the checkForWin() method.
    X- removeLife(): this method removes a life, removes a heart from the board,
         and, if the player is out of lives, ends the game.
    X- checkForWin(): this method checks to see if the player has selected all of the letters.
    X- gameOver(): this method displays a message if the player wins or a different message if they lose.

    X- startGame(): calls the getRandomPhrase() method, and adds that phrase to the board by calling
    the Phrase class' addPhraseToDisplay() method.
*/

class Game {
    constructor(missed, phrases) { // info taken from app.js
        this.missed = missed;
        this.phrases = phrases.map((phrase) => new Phrase(phrase));
    };

    getRandomPhrase() {
        let randomPhraseList = this.phrases; // 
        let randNum = Math.floor(Math.random() * randomPhraseList.length);
        let randChoice = randomPhraseList[randNum];
        //alert(randChoice.phrase + " char# : " + randChoice.phrase.length)
        return randChoice;
    };

    handleInteraction(letterToCheck) {
        event.target.disabled = true;
        let phraseToCheck = this.randomPhrase;
        phraseToCheck.checkLetter(event.target.textContent);
        




        //alert(letterToCheck);
        //alert(phraseToCheck.phrase);
    };
    
    removeLife() {
        alert('life removed! kinda...')
    };
    showMatchedLetter() {
        
    };
    checkForWin() {

    };
    
    startGame() {
        let randomPhrase = this.getRandomPhrase();
        this.randomPhrase = randomPhrase;
        
        randomPhrase.addPhraseToDisplay(randomPhrase.phrase);
    };

    // gameOver() {};
};