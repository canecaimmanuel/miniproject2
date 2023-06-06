document.addEventListener('DOMContentLoaded', function() {
let data;
let completedQuests = 0; // Track the number of completed quests

// Update the quest tracker UI based on the completed quests
const updateQuestTracker = () => {
  const questCircles = document.querySelectorAll('.quest-circle');
  const questLines = document.querySelectorAll('.quest-line');

  for (let i = 0; i < questCircles.length; i++) {
    if (i === completedQuests) {
      questCircles[i].style.backgroundColor = 'red'; // Update the current quest circle color to red
    } else if (i < completedQuests) {
      questCircles[i].style.backgroundColor = 'rgb(78, 180, 214)'; // Update the completed quest circle color to green
      questCircles[i].innerHTML = '<i class="fa-solid fa-check" style="color: #ffffff;"></i>'; // Add check icon
    } else {
      questCircles[i].style.backgroundColor = 'white'; // Reset the remaining quest circle color 
      questCircles[i].innerHTML = ''; // Remove check icon
    }
  }

  for (let i = 0; i < questLines.length; i++) {
    if (i < completedQuests) {
      questLines[i].classList.add('completed');
    } else {
      questLines[i].classList.remove('completed');
    }
  }
  };
  

// Update the question box with the fetched data
const updateQuestion = (question) => {
  document.getElementById('question-title').textContent = question.title;
  document.getElementById('question-description').textContent = question.description;
  expectedCode = question.code.trim().toLowerCase();
};

// Fetch the data and initialize the game
fetch('https://joelolab.com/gwapings/na-cute/api.php')
  .then(response => response.json())
  .then(responseData => {
    data = responseData;
    const getRandomQuestionByLevel = (activities, level) => {
      const filteredActivities = activities.filter(activity => activity.level === level);
      const randomIndex = Math.floor(Math.random() * filteredActivities.length);
      return filteredActivities[randomIndex];
    };

    let currentQuestion = getRandomQuestionByLevel(data.activities, 'easy'); // Store the current question

    updateQuestion(currentQuestion); // Display the initial question

// Code checker using JSHint
document.getElementById('checkButton').addEventListener('click', function() {
  const code = document.getElementById('code').value.trim().toLowerCase();

  // JSHint code checker
  const options = {
    esversion: 6,
    undef: true,
    globals: {
      console: true,
      document: true,
      JSHINT: true,
      json: true,
      set: true,
      math: true,
      date: true 
    }
  };

  const result = JSHINT(code, options);

      if (!result) {
        const errors = JSHINT.data().errors;
        for (let i = 0; i < errors.length; i++) {
          const error = errors[i];
          const message = `Error at line ${error.line}: ${error.reason}`;
          const errorElement = document.createElement("div");
          errorElement.textContent = message;
          errorOutput.appendChild(errorElement);
        }
      } else {
        showSuccessMessage();
      }
    });

// Difficulty level selection
const levelRadios = document.querySelectorAll('input[name="level"]');
levelRadios.forEach(radio => {
  radio.addEventListener('change', function() {
    const selectedLevel = this.value;

    // Update local storage with the selected difficulty level
    const gameSettings = JSON.parse(localStorage.getItem('yourGameSettings')) || {};
    gameSettings.level = selectedLevel;
    localStorage.setItem('yourGameSettings', JSON.stringify(gameSettings));

    currentQuestion = getRandomQuestionByLevel(data.activities, selectedLevel); // Update the current question
    updateQuestion(currentQuestion);

    console.log('Level:', currentQuestion.level);
    console.log(currentQuestion.code);
  });

  // Display the saved level as the value in radio boxes
  const gameSettings = JSON.parse(localStorage.getItem('yourGameSettings'));
  if (gameSettings && gameSettings.level === radio.value) {
    radio.checked = true;

    currentQuestion = getRandomQuestionByLevel(data.activities, gameSettings.level); // Update the current question
    updateQuestion(currentQuestion);

    console.log('Level:', currentQuestion.level);
    console.log(currentQuestion.code);
  }
});


    console.log('Level:', currentQuestion.level);
    console.log(currentQuestion.code);
    updateQuestTracker(); // Update the quest tracker UI initially
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Rest of the code...

// Function to show success message and update the quest tracker
function showSuccessMessage() {
  alert('Congratulations! Your code is correct.');
  document.getElementById('errorOutput').innerText = '';
  completedQuests++; // Increment the completed quests
  updateQuestTracker(); // Update the quest tracker UI

  // Update the question after displaying the success message
  const levelRadios = document.querySelectorAll('input[name="level"]');
  const selectedLevel = [...levelRadios].find(radio => radio.checked).value;

  const currentQuestion = getRandomQuestionByLevel(data.activities, selectedLevel); // Use the data variable here
  updateQuestion(currentQuestion);

  console.log('Level:', currentQuestion.level);
  console.log(currentQuestion.code);

  // Check if the player has completed all 5 quests
  if (completedQuests === 5) {
    alert("Congratulations! You won! You successfully exploited an enemy hacker.");
  }
}


// Function to show error message
function showErrorMessage() {
  alert('Oops! Your code is incorrect.');
}

// Get a random question by difficulty level
function getRandomQuestionByLevel(activities, level) {
  const filteredActivities = activities.filter(activity => activity.level === level);
  const randomIndex = Math.floor(Math.random() * filteredActivities.length);
  return filteredActivities[randomIndex];
}

//To get character in local storage

var users = JSON.parse(localStorage.getItem("users")) || [];

// Retrieve the currently logged-in username from local storage
var loggedInUsername = localStorage.getItem("loggedInUsername");

// Find the user object based on the logged-in username
var user = users.find(function(user) {
  return user.username === loggedInUsername;
});

// Check if the user object is found
if (user) {
  var selectedCharacter = user.selectedCharacter;
  // Use the selectedCharacter value as needed
} else {
  console.log("user was not found");
}

console.log(selectedCharacter);

document.getElementById("characterImage").src = "../practice/images/characters/" + selectedCharacter + ".svg";

const radioButtons = document.querySelectorAll('.radio-button');

radioButtons.forEach(button => {
  button.addEventListener('click', () => {
    radioButtons.forEach(btn => {
      btn.classList.remove('checked');
    });
    button.classList.add('checked');
  });
});

let divElement = document.getElementById('difficulty-container');
let proceedButton = document.getElementById('proceed');
let card = document.querySelector('.card');
let table = document.getElementById('table');
let monitor = document.getElementById('monitor');
let character = document.getElementById('characterImageContainer');

function proceed() {
  divElement.classList.add('fade-out');
  card.classList.add('move-animation');
  table.classList.add('table-animation');
  monitor.classList.add('monitor-animation');
  character.classList.add('character-animation');
}

proceedButton.addEventListener('click', proceed);

//- - - -- - - - - - - - - - - - - - -- - - - - - - - - -

  var wrap = document.querySelector('.wrap svg');
      
  function animateLoop() {
    // Add the 'active' class
    wrap.classList.add('active');
  
    // Wait for 0.5 seconds
    setTimeout(function() {
      // Remove the 'active' class
      wrap.classList.remove('active');
  
      // Call the function again after 0.5 seconds
      setTimeout(animateLoop, 700);
    }, 700);
  }
  
  // Call the function to start the animation loop
  animateLoop();

});