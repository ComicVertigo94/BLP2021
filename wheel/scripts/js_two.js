/* Code adapted from https://github.com/jengleberg/project-1-wheel-of-fortune */

// Selector Elements from HTML.
var solvePuzzle = document.getElementById("solve");
var guessButton = document.getElementById("guessButton");
var treasureMap = document.getElementById("treasuremap");

/* Puzzle solution pool. */
var puzzles = ["Chesterwood"];

/* Entered content from user."
var puzzle = "";

/* Filled out answer so far.*/
var answers = [];

/* Whether or not to reveal the map.*/
var revealMap = false;

/* Whether or not user has done full solve.*/
var fullSolve = false;

// Function that initializes the game by randomly choosing a puzzle from the puzzles array.
function init()
{
    // Randomly select a puzzle from the pool.
    puzzle = puzzles[Math.floor(Math.random() * puzzles.length)]; 

    // Creates the blank fields for the letter guesses
    answers = [];
    for (var i = 0; i < puzzle.length; i++)
    {
        answers[i] = "_";

        // For multiple words, clear spaces.
        if(puzzle[i] == " ")
        {
            answers[i] = "&nbsp;";
            // Don't need to track as win check looks for underscores.
        }
    }

    // Joins the answer with the random puzzle and displays the message let's play.
    document.getElementById("answer").innerHTML = answers.join(" ");
    document.getElementById("message").innerHTML = "LET'S PLAY!";
}

// Initializes the puzzle.
init();

// Function that allows player to guess the letter or full solution.
guessButton.addEventListener("click", function()
{
    var guess = document.getElementById("guess").value;
    var showThisMessage = "";

    // Guess submitted with no content.
    if (guess.length === 0) 
    {
		// HTML blocks this path :)
        showThisMessage = "Please enter a guess!";
    }
    // Guess submitted for a solve.
    else if (guess.length !== 1) 
    {
        if (puzzle.toLowerCase() === guess.toLowerCase()) 
        {
            // Set answer field equal to puzzle to maintain desired casing
            for (var i = 0; i < puzzle.length; i++) 
             {
                 answers[i] = puzzle[i];
             }

            showThisMessage= "YES! You guessed it!!";
        }
        else
        {
             showThisMessage = "Nope, that isn't the correct answer!";

             // Refresh guess board.
             document.getElementById("guesses").innerHTML = document.getElementById("guesses").textContent 
               + "&nbsp;&nbsp;" + guess;
        }

        // To count remaining letters.
        var remainingLetters = 0;
        for (i = 0; i < puzzle.length; i++) 
        {
            if (answers[i] === '_')
            {
                remainingLetters += 1;
            }
        }
        // if remaining letters in answer is zero the puzzle is solved        
        if (remainingLetters == 0)
        {
            showThisMessage = "YES! You Solved the Puzzle!";
            revealMap = true;
        } 

        // Update parent HTML elements.
        document.getElementById("answer").innerHTML = answers.join(" ");
        document.getElementById("guess").innerHTML = showThisMessage;

        // Reveal the treasure!!
        if(revealMap)
        {
            toggleVisibility();
        }
    }
    else // Guess submitted for a single character.
    {
        // If the guess is correct add it to the answer field(s) and display message
        for (var i = 0; i < puzzle.length; i++) 
        {
            if (puzzle[i].toLowerCase() === guess.toLowerCase()) 
            {
                // Set answer field equal to puzzle to maintain desired casing
                answers[i] = puzzle[i];
                showThisMessage= "YES! Show us " + guess + ".";

                // Refresh guess board.
                document.getElementById("guesses").innerHTML = document.getElementById("guesses").textContent 
                   + "&nbsp;&nbsp;" + guess;
            }
        }

        // To count remaining letters.
        var remainingLetters = 0;
        for (i = 0; i < puzzle.length; i++) 
        {
            if (answers[i] === '_')
            {
                remainingLetters += 1;
            }
        }
        // if remaining letters in answer is zero the puzzle is solved        
        if (remainingLetters == 0)
        {
            showThisMessage = "YES! You Solved the Puzzle!";
            revealMap = true;
        } 
         // If incorrect guess display message and run next player function
        if (showThisMessage === "")
        {
            showThisMessage = "Sorry, try again!";

             // Refresh guess board.
             document.getElementById("guesses").innerHTML = document.getElementById("guesses").textContent 
                + "&nbsp;&nbsp;" + guess;
        }

        // Update parent HTML elements.
        document.getElementById("answer").innerHTML = answers.join(" ");
        document.getElementById("guess").innerHTML = showThisMessage;

        // Reveal the treasure!!
        if(revealMap)
        {
            toggleVisibility();
        }
    }
    
    // Refresh parent page.
    document.getElementById("message").innerHTML = showThisMessage;

    /* https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp */
    function toggleVisibility() {
      var x = document.getElementById("treasureMap");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    } 
});
