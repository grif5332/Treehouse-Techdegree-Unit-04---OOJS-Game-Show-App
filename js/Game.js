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
        return randChoice;
    };

    handleInteraction(letterToCheck) {
        event.target.disabled = true;
        let phraseToCheck = this.randomPhrase;
        let checked = phraseToCheck.checkLetter(event.target.textContent);

        if (checked === true) {
            phraseToCheck.showMatchedLetter(letterToCheck);
            event.target.classList.add('chosen');
            this.checkForWin();
        } else {
            event.target.classList.add('wrong');
            this.removeLife();  //calls removeLife()
        };
    };
    
    removeLife() {
        let tries = document.querySelectorAll('img');
        
        if (this.missed <= 4) {
            tries[this.missed].setAttribute('src', 'images/lostHeart.png');
            
            if (this.missed === 4) { //checks if this.missed === 4.  this is the LOSS condition.
                this.gameOver('lose');  // calls gameOver()
            };
        };
        this.missed += 1;
    };

    checkForWin() {
        let winTest = document.getElementsByClassName('letter');
        let winTestShow = document.getElementsByClassName('letter show');

        for (let i = 0; i < winTest.length; i++) {
            if (winTestShow.length === winTest.length) {
                this.gameOver('win');
            };
        };
    };
    
    startGame() {
        let randomPhrase = this.getRandomPhrase();
        this.randomPhrase = randomPhrase;
        
        randomPhrase.addPhraseToDisplay(randomPhrase.phrase);
        
        this.missed = 0;
    };

    gameOver(endGameCondition) {
        if (endGameCondition === 'lose') {
            this.loseEffect();
        
            let playAgain = document.getElementById('btn__reset').textContent = "Play Again?";
            playAgain.addEventListener('click', () => {
                game.startGame();
            });
        } else if (endGameCondition === 'win') {
            this.winEffect();

            let playAgain = document.getElementById('btn__reset').textContent = "Play Again?"; //sets the start button text to "try again?"
            playAgain.addEventListener('click', () => {
                game.startGame();
            });
        };
    };

    loseEffect() {
        let overlay =  document.getElementById('overlay'); // resets the overlay visability.; // // overlay selector
        overlay.style.visibility = ''; // resets the overlay visability.
        overlay.style.backgroundColor = '#D94545'; // Changes the overlay BG-color to a red
        let Msg = document.getElementById('game-over-message').innerText = "Sorry, you ran out of lives!";  //adds loss text.
        let tries = document.querySelectorAll('img');  //tries selector
        for (let i = 0; i < tries.length; i++) {  // resets the hearts
            tries[i].setAttribute('src', 'images/liveHeart.png');  // changes the hearts PNG from lostHearts to liveHeart
        };
        document.getElementById('phrase').innerHTML = `<ul></ul>`; // resets the phrase <ul>
        
        let keyboardBtn = document.getElementsByClassName('key');
        for(let i = 0; i < keyboardBtn.length; i++) {
            keyboardBtn[i].classList.remove('wrong');
            keyboardBtn[i].classList.remove('chosen');
            keyboardBtn[i].disabled = false;
        };
    };

    winEffect() {
        let overlay =  document.getElementById('overlay');
        overlay.style.visibility = ''; // resets the overlay visability.
        overlay.style.backgroundColor = '#78CF82'; // Changes the overlay BG-color to a green
        let winMsg = document.getElementById('game-over-message').innerText = "You guessed the phrase, Good Job!";  //adds win text.
        let tries = document.querySelectorAll('img');  //tries selector
        for (let i = 0; i < tries.length; i++) {  // resets the hearts
            tries[i].setAttribute('src', 'images/liveHeart.png');  // changes the hearts PNG from lostHearts to liveHeart
        };
        document.getElementById('phrase').innerHTML = `<ul></ul>`;

        let keyboardBtn = document.getElementsByClassName('key');
        for(let i = 0; i < keyboardBtn.length; i++) {
            keyboardBtn[i].classList.remove('wrong');
            keyboardBtn[i].classList.remove('chosen');
            keyboardBtn[i].disabled = false;
        };
    };
};