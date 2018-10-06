/*
Phrase.js

to create a Phrase class to handle the creation
of phrases.

- create the Phrase class
- The class should include a constructor that accepts a phrase as an argument.
the class should include the following:

 - addPhraseToDisplay(): this adds letter placeholders to the display when the game starts. Each letter is
    presented by an empty box, one list item for each letter. See the example_phrase_html.txt file for an
    example of what the render HTML for a phrase should look like when the game starts. When the player correctly
    guesses a letter, the empty box is replaced with a the matched letter (see the showMatchedLetter() method below.

    Make sure the phrase displayed on the screen doesn't include spaces.
 - checkLetter(): checks to see if letter selected by player matches a letter in the phrase.
 - showMatchedLetter(): reveals the letter(s) on the board that matches player's selection.
*/


class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    };

    addPhraseToDisplay() {
        let phraseChars = this.phrase.split(''); // splits the phrase passed from game.getRandomPhrase()
        let phraseDisplayList = document.querySelector('#phrase ul'); //selects the <ul> of the <div> #phrase

        for(let i = 0; i < phraseChars.length; i++) { //loops through the split() phrase. appends children to the <ul>
            if (phraseChars[i] === ' ') {  // for spaces, replace with blank space.
                phraseDisplayList.innerHTML += `<li class="hide space"></li>`;
            } else { // for letters, hide the letter and place a box.
                phraseDisplayList.innerHTML += `<li class="hide letter ${phraseChars[i]}">${phraseChars[i]}</li>`;
            };
        };
    };

    checkLetter(targetLetter) {
        let phraseToCheck = this.phrase;  // inserts the current random phrase
        return phraseToCheck.includes(targetLetter); // checks the target key and checks if the phrase includes it.
    };

    showMatchedLetter(letterToCheck) {
        let checkedLetter = letterToCheck; //if the letter is in the phrase insert it into the checkedLetter var. 
        let phrase = this.phrase; 
        let selectPhraseLI = document.querySelectorAll('li'); //selects all the <li>s of the phrase
        for (let i = 0; i < phrase.length; i++) { 
            if(phrase[i] === checkedLetter) { //checks all the letters of the phrase for the target letter
                selectPhraseLI[i].classList.remove('hide'); // reveals the letter
                selectPhraseLI[i].classList.add('show');  // shows the letter (makes it blue.)
            }
        };
    };  
};