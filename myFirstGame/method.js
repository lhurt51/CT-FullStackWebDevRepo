/*
We are going to create a very simple game.
Things you will have to Google:
1.  Generating a random number(hint: Math.random())
2.  Running a timer (hint: setInterval, clearInterval, etc)
The rules of the game are as follows:
Someone ate Rush's chicken pot pie!  We know it was someone in class, but we don't know who.  Luckily, Tim knows, but he's going to make you guess.
Goals of the game:
*/

// 1.  Use the following array to represent all students:
var Person = function(id, firstname, lastname) {
  this.id = id,
  this.firstname = firstname,
  this.lastname = lastname
}

Person.prototype.getInitials = function() {
  return this.firstname.charAt(0) + this.lastname.charAt(0);
}

Person.prototype.getFullName = function() {
  return this.firstname + ' ' + this.lastname;
}

var Game = function() {
  this.students = [
    new Person(1, "Markham", "Gross"),
    new Person(2, "Ari", "Zamudio"),
    new Person(3, "Liam", "Hurt"),
    new Person(4, "Mike", "McDermott"),
    new Person(5, "Dylan", "Eckert"),
    new Person(6, "Aaron", "Martin"),
    new Person(7, "Markus", "Brun"),
    new Person(8, "Blaze", "Halderman"),
    new Person(9, "Jayson", "Smith"),
    new Person(10, "Svyatoslav", "Safonov")
  ];
};

// 2.  Start the game:
Game.prototype.start = function () {

  console.log('Starting game...');

  //  2.a Find a random number that represents the id of *one* of the students and store it as a global variable called "rightAnswer"
  this.rightAnswer = Math.floor(Math.random() * 10) + 1;

  //  2.b Give the user a starting score of 10 and store it in a global variable called "currentScore"
  this.currentScore = 10;
  this.scoreNode = document.querySelector('.score');
  this.scoreNode.innerHTML = this.currentScore;
  this.displayNode = document.querySelector('.instructions');
  this.displayNode.innerHTML = 'Guess the thief before the time runs out!';

  //  2.c Create an empty array to save previous guesses, and store it in a global variable called "previousGuesses"
  this.previousGuesses = [];
  this.inputButton = document.querySelector('.subBtn');
  this.inputButton.onclick = userInput;

  //  2.d Start a timer using javascript, store & update the result as seconds in a global variable called "gameClock"
  this.gameClock = 20;
  this.gameRef = setInterval(gameTimer, 1000);
  this.timerNode = document.querySelector('.game-time')
  this.timerNode.innerHTML = this.gameClock;

}

var gameTimer = function() {
  game.timerNode.innerHTML = game.gameClock;
  game.gameClock--;
  if (game.gameClock === -1) {
    clearInterval(game.gameRef);
    gameOver();
  };
};

// 3.  Display a prompt:  "Guess who ate the pie?  Enter initials only."
var userInput = function() {
  game.displayNode.innerHTML = 'Guess who ate the pie?  Enter initials only.';
  game.guess = document.querySelector('.inputField').value;
  if (guess === '') {
    userInput();
  } else if (guess) {
    checkGuess(guess.toUpperCase());
  }
};

var checkGuess = function (guess) {
  //  3.a  If the value matches a previous guess, display an alert: "You already guessed that!"
  if (game.previousGuesses.indexOf(guess) !== -1) {
    wrongAnswer('You already guessed that!');
    return;
  }
  //  3.b  If the value matches no initials, display an alert: "No matching student found."
  for (i = 0; i < game.students.length; i++) {
    if (guess === game.students[i].getInitials()) {
      //  3.c If a matching student is found who has not already been guessed, compare their ID to "rightAnswer"
      if (game.students[i].id === game.rightAnswer ) {
        //    3.c.1  If the ID is equal to "rightAnswer", display an alert "You win with a score of [currentScore] in [gameClock] seconds!"
        game.displayNode.innerHTML = 'You win with a score of ' + game.currentScore + ' in ' + game.gameClock + ' seconds!';
        return;
      } else {
        game.previousGuesses.push(guess);
        wrongAnswer('Wrong!  Find the pie!');
        return;
      }
    }
  }
  wrongAnswer('No matching student found.');
};

var wrongAnswer = function(message) {
  game.displayNode.innerHTML = message
  game.currentScore--;
  game.scoreNode = game.currentScore
};

// 5.  Allow the game to be restarted at any time by typing "restart()" in the console.
var gameOver = function() {
  game.displayNode.innerHTML = 'Game Over! The time ran out!'
  startButton.innerHTML = 'Start a new game'
  inputButton.innerHTML = 'Not allowed to submit'
  startButton.onclick = game.start;
};

var game = new Game();

var startButton = document.querySelector('.btn');
startButton.onclick = game.start;
