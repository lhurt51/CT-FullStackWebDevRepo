//add a list of students and cross them out when they have been choosen
var Person = function (id, firstname, lastname) {
  this.id = id;
  this.firstname = firstname;
  this.lastname = lastname;
  this.initials = firstname.substring(0,1) + lastname.substring(0,1);
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

Game.prototype.start = function () {
  var self = this;

  var scoreNode = document.getElementById('score');
  var displayNode = document.getElementById('instructions');
  var timerNode = document.getElementById('game-time');
  var inputButton = document.getElementById('subBtn');
  var inputNode = document.getElementById('inputField');
  var htmlList = document.querySelectorAll('li');

  var rightAnswer = Math.floor(Math.random() * game.students.length);
  var theif = game.students[rightAnswer];
  var theifInitials = theif.initials;
  console.log(theif.firstname + ' ' + theif.lastname);

  var interval;

  self.gameClock = 20;
  self.currentScore = 10;
  scoreNode.textContent = 10;
  displayNode.textContent = 'Guess the thief before the time runs out!';
  startButton.textContent = 'Dont press!';

  var previousGuesses = [];
  var domReference = [];

  var splitName = function () {
    for (var i = 0; i < htmlList.length; i++) {
      var split = htmlList[i].textContent.split(' ');
      domReference.push(new Person(i, split[0], split[1]));
    }
  }

  var gameTimer = function () {
    var i = 20
    interval = setInterval(function () {
      i--;
      self.gameClock = i;
      timerNode.textContent = i;
      if (i === 0) {
        clearInterval(interval);
        endGame();
      };
    }, 1000)
  };

  var inputInteraction = function () {
    var userInput = inputNode.value;
    if (userInput.toUpperCase() === theifInitials) {
      displayNode.textContent = 'You win with a score of ' + self.currentScore + ' in ' + self.gameClock + ' seconds!';
      startButton.textContent = 'Start a new game';
      clearInterval(interval)
    } else if (userInput === '') {
      displayNode.textContent = 'Must enter initials!';
    } else {
      checkGuess(userInput.toUpperCase());
    }
  }

  var checkGuess = function (userInput) {
    if (previousGuesses.length > 0) {
      for (var i = 0; i < previousGuesses.length; i++) {
        if (previousGuesses[i] === userInput) {
          displayNode.textContent = 'You have already used this name';
          wrongAnswer(userInput);
          break;
        }
      }
    } else {
      wrongAnswer(userInput);
      displayNode.textContent = 'They are not the thief!';
    }
  }

  var crossOut = function (userInput){
    for (var i = 0; i < domReference.length; i++) {
      var domInitials = domReference[i].initials;
      if(domInitials === userInput){
        var userGuess = domReference[i];
        userGuess.classList.add('crossOut');
      }
    }
  }

  var wrongAnswer = function (userInput) {
    self.currentScore --;
    scoreNode.textContent = self.currentScore;
    previousGuesses.push(userInput);
    crossOut(userInput)

    setTimeout(displayReset, 2000);
  }

  var displayReset = function () {
    displayNode.textContent = 'Try a new name!';
  }

  var endGame = function () {
    displayNode.textContent = 'Game Over! Try again next time. It was ' + theif.firstname + ' ' + theif.lastname;
    startButton.textContent = 'Start a new game';
    self.currentScore = 10;
    scoreNode.textContent = self.currentScore;
    self.gameClock = 20;
    domReference.classList.remove('crossOut');
    domReference = [];
  }


  gameTimer();
  splitName();
  inputButton.addEventListener('click', inputInteraction)
  inputNode.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
      inputInteraction();
    }
  });
}

var game = new Game;

var startButton = document.getElementById('btn');
startButton.onclick = game.start
