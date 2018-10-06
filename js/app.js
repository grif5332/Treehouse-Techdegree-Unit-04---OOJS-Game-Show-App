// app.js

/* creates the new instance of the game class, adds event
listeners for the onscreen keyboard, and a function to display the game.
Performs basic DOM selection, add event handlers, and resets the game when it ends.

resetDisplay(); This function should hide the start screen overlay.

markButton(); This function is called when a player selects a letter.
it disables the button on the onscreen keyboard and calls the 
handleInteraction(); method of the Game class.
*/

const phraseList = ["i love javascript", "world wide web", "internet of things",
                    "hypertext markup language", "teh interwebz", "laughs out loud", 
                    'asynchronous', 'event handler', 'roll on the floor laughing', 
                    'cappuccino cowboy', 'script kiddie', 'hack the gibson', 'i dont play well with others', 
                    'hack the planet', 'the blue nowhere', 'black hat', 'white hat', 'grey hat', 'internet protocol', 
                    'social enginerring', 'event bubbling', 'teh interwebz of catz', 'crash override', 'acid burn',
                    'da vinci virus', 'zero cool', 'the keyboard cowboys', 'boot up or shut up', 'beauty of the baud',
                    'razor and blade', 'never fear i is here', 'shall we play a game', 'a case of the mondays', 'tps report',
                    'tastes like chicken', 'hello dave', 'ghost in the machine', 'bleep bloop'];

// this starts the Game class from Game.js. Puts the phrase list AND 0 misses into the constructor.  For use IN the Game class.
let game = new Game(0, phraseList); // 0 = 0 missed attempts, phraseList = the array of phrases.

const resetDisplay = () => {
    const btn_reset = document.getElementById('btn__reset');
    const overlay = document.getElementById('overlay');

    btn_reset.addEventListener('click', () => {
        document.querySelector('body').style.backgroundColor = 'white';
        overlay.style.visibility = 'hidden'; //hides the overlay
        game.startGame(); // starts the game
    });
};
resetDisplay();

const markButton = () => {  
    let btnClick = document.getElementsByClassName('key');  // selcts the keys of the keyboard
    for (let i = 0; i < btnClick.length; i++) { 
        btnClick[i].addEventListener('click', (event) => {
            game.handleInteraction(event.target.textContent);  // calls the handleInteractioin method from Game.js.
        });
    };
};
markButton();