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
        let randomPhraseList = this.phrases; // adds the phrases to the variable
        let randNum = Math.floor(Math.random() * randomPhraseList.length); // makes a random number using the numbers of ites in the array
        let randChoice = randomPhraseList[randNum]; // chooses a random number from the array
        return randChoice;
    };

    handleInteraction(letterToCheck) {
        event.target.disabled = true;  //disables the keyboard button clicked
        let phraseToCheck = this.randomPhrase;  
        let checked = phraseToCheck.checkLetter(event.target.textContent);  // calls the checkLetter method ( in Phrase.js) on the target key 

        if (checked === true) {  // if the letter passes the check... 
            phraseToCheck.showMatchedLetter(letterToCheck);  // calls show the letters in the phrase that match 
            event.target.classList.add('chosen'); // add the class "chosen" to the target key. Turns it green
            this.checkForWin(); // checks to see if the key pressed causes a win condition
        } else {
            event.target.classList.add('wrong'); // if the target key isnt in the phrase, add the class wrong.  makes the key disapear. 
            this.removeLife();  //calls removeLife()
        };
    };
    
    removeLife() {
        let tries = document.querySelectorAll('img');  // collects ALL the <img> elements.
        
        if (this.missed <= 4) { // if the numbers of tries are 4 or less, remove a heart on a try that isnt successful.
            tries[this.missed].setAttribute('src', 'images/lostHeart.png'); // sets a heart to "lost" 
            
            if (this.missed === 4) { //checks if this.missed === 4.  this is the LOSS condition.
                this.gameOver('lose');  // calls gameOver()
            };
        };
        this.missed += 1;  //adds 1 to the missed score.
    };

    checkForWin() {
        let winTest = document.getElementsByClassName('letter');  //collects all the elements with the class "letter".  skipping over the classes with "space"
        let winTestShow = document.getElementsByClassName('letter show'); // collects all the classes with "letter" AND "show"

        for (let i = 0; i < winTest.length; i++) { // loops through ALL the letters
            if (winTestShow.length === winTest.length) { //compares the amount of letters with how many letter have "show" in them
                this.gameOver('win'); // if they are the same (implying that ALL the letters have been chosen), go to the gameOver(win) method.
            };
        };
    };
    
    startGame() {
        document.querySelector('body').style.backgroundColor = 'white';
        let randomPhrase = this.getRandomPhrase(); // initiates the random phrase
        this.randomPhrase = randomPhrase; 
        
        randomPhrase.addPhraseToDisplay(randomPhrase.phrase); // calls the addPhraseToDisplay method from Pharse.js
        
        this.missed = 0; //sets the missed var to 0.
    };

    gameOver(endGameCondition) {
        if (endGameCondition === 'lose') { //gets "lose" and runs the lose method below
            let keyboardBtn = document.getElementsByClassName('key');
            document.querySelector('body').style.backgroundColor = '#D94545';
            for(let i = 0; i < keyboardBtn.length; i++) { //loops through the keyboard "keys" and removes classes (resets them)
                keyboardBtn[i].disabled = true;
            };
            window.setTimeout(this.loseEffect, 1000);
            let playAgain = document.getElementById('btn__reset').textContent = "Play Again?"; //changes button to say "Play Again?"
        } else if (endGameCondition === 'win') { // gets "win" and runs the win method below.
            let keyboardBtn = document.getElementsByClassName('key');
            document.querySelector('body').style.backgroundColor = '#78CF82';
            for(let i = 0; i < keyboardBtn.length; i++) { //loops through the keyboard "keys" and removes classes (resets them)
            keyboardBtn[i].disabled = true;
        };
            window.setTimeout(this.winEffect, 1000);
            let playAgain = document.getElementById('btn__reset').textContent = "Play Again?"; //sets the start button text to "try again?"
        };
    };

    loseEffect() {
        let overlay =  document.getElementById('overlay'); // overlay selector
        overlay.style.visibility = ''; // resets the overlay visability.
        overlay.style.backgroundColor = '#D94545'; // Changes the overlay BG-color to a red
        let Msg = document.getElementById('game-over-message').innerText = "Sorry, you ran out of lives!";  //adds loss text.
        let tries = document.querySelectorAll('img');  //tries selector
        for (let i = 0; i < tries.length; i++) {  // resets the hearts
            tries[i].setAttribute('src', 'images/liveHeart.png');  // changes the hearts PNG from lostHearts to liveHeart
        };
        document.getElementById('phrase').innerHTML = `<ul></ul>`; // resets the phrase <ul>
        
        let keyboardBtn = document.getElementsByClassName('key');  //key selector
        for(let i = 0; i < keyboardBtn.length; i++) { //loops through the keyboard "keys" and removes classes (resets them)
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
        document.getElementById('phrase').innerHTML = `<ul></ul>`;  //resets the phrase<ul>

        let keyboardBtn = document.getElementsByClassName('key');// key selector
        for(let i = 0; i < keyboardBtn.length; i++) { // loops through the keyboard "keys" and removes classes (resets them)
            keyboardBtn[i].classList.remove('wrong');
            keyboardBtn[i].classList.remove('chosen');
            keyboardBtn[i].disabled = false;
        };
    };
};