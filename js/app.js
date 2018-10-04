// app.js

/* creates the new instance of the game class, adds event
listeners for the onscreen keyboard, and a function to display the game.
Performs basic DOM selection, add event handlers, and resets the game when it ends.

resetDisplay(); This function should hide the start screen overlay.

markButton(); This function is called when a player selects a letter.
it disables the button on the onscreen keyboard and calls the 
handleInteraction(); method of the Game class.
*/

const phraseList = ["i love javascript", "world wide web", "internet of things", "hypertext markup language", "teh interwebz","laugh out loud"];

// this starts the Game class from Game.js. Puts the phrase list AND 0 misses into the constructor.  For use IN the Game class.
let game = new Game(0, phraseList); // 0 = 0 missed attempts, phraseList = the array of phrases.

const resetDisplay = () => {
    const btn_reset = document.getElementById('btn__reset');
    const overlay = document.getElementById('overlay');

    btn_reset.addEventListener('click', () => {
        overlay.style.visibility = 'hidden';
        //game.getRandomPhrase();
        game.startGame();
    });
};
resetDisplay();

const markButton = () => {
    let btnClick = document.getElementsByClassName('key');
    for (let i = 0; i < btnClick.length; i++) {
        btnClick[i].addEventListener('click', (event) => {
            // alert(event.target.textContent);
            game.handleInteraction(event.target.textContent);
        });
    };
    //calls the handleIneraction() method of the Game class.
};
markButton();