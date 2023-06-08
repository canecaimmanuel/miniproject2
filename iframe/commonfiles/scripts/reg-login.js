document.addEventListener("DOMContentLoaded", function() {
  // Retrieve logged-in username from local storage
  var loggedInUsername = localStorage.getItem("loggedInUsername");

  // Redirect to game page if user is already logged in
  if (loggedInUsername) {
    window.location.href = "game.html?username=" + loggedInUsername;
  }

  var registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();

      var fullName = document.getElementById("fullName").value;
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Retrieve existing users from local storage or create an empty array
      var users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the username is already taken
      var isUsernameTaken = users.some(function(user) {
        return user.username === username;
      });

      if (isUsernameTaken) {
        document.getElementById("registrationMessage").textContent = "Username already taken!";
      } else {
        // Generate a unique ID for the new user
        var id = generateUniqueId(users);

        // Create a new user object with ID, level 1, and starting coins 25,000
        var newUser = {
          id: id,
          fullName: fullName,
          username: username,
          password: password,
          level: 1,
          coins: 25000,
          selectedCharacter: "character1" // Set default character here
        };

        // Add the new user to the array
        users.push(newUser);

        // Save the updated array back to local storage
        localStorage.setItem("users", JSON.stringify(users));

        // Display success message
        document.getElementById("registrationMessage").textContent = "Registration successful!";

        // Set the logged-in user's username in local storage
        localStorage.setItem("loggedInUsername", username);

        // Redirect to the game page with the registered username
        window.location.href = "game.html?username=" + username;
      }
    });
  }

  //  -- - - - - --  robot - - - -- - - - 

  const messageContainer = document.getElementById('message-container');
  const messages = [
    "I'm the registration Assistant",
    "Are you new here?",
  ];
  let buttonsContainer = document.getElementById('buttons-container');
  let yesButton = document.createElement('button');
  let noButton = document.createElement('button');
  let loginArea = document.querySelector('.login-area');
  let registrationArea = document.querySelector('.registration-area');
  let fullNameInput = document.getElementById('fullName');
  let usernameInput = document.getElementById('username');
  let passwordInput = document.getElementById('password');
  let currentIndex = 0;
  let delayCounter = 0;
  
  function changeMessage() {
    if (delayCounter === 1) {
      if (currentIndex < messages.length) {
        messageContainer.textContent = messages[currentIndex];
        currentIndex++;
      } else {
        clearInterval(messageInterval);
        displayButtons();
      }
    } else {
      delayCounter++;
    }
  }
  
  function displayButtons() {
    yesButton.textContent = 'YES';
    noButton.textContent = 'NO';
  
    buttonsContainer.appendChild(yesButton);
    buttonsContainer.appendChild(noButton);
  
    yesButton.addEventListener('click', showNewMessages);
    noButton.addEventListener('click', showNewMessages);
  }
  
  function showNewMessages(event) {
    const buttonClicked = event.target.textContent;
  
    if (buttonClicked === 'YES') {
      messageContainer.textContent = "I see that you are New Here";
      setTimeout(() => {
        messageContainer.textContent = "Then you must need to register";
        registrationArea.classList.add('registration-animation');
      }, 2000);
    } else if (buttonClicked === 'NO') {
      messageContainer.textContent = "Oh, it seems like you're not new here";
      setTimeout(() => {
        messageContainer.textContent = "So you just need to Login";
        loginArea.classList.add('login-animation');
      }, 2000);
    }
  
    // Remove event listeners
    yesButton.removeEventListener('click', showNewMessages);
    noButton.removeEventListener('click', showNewMessages);
  
    // Remove buttons from container
    buttonsContainer.removeChild(yesButton);
    buttonsContainer.removeChild(noButton);
  }
  
  function handleFullNameBlur() {
    const fullName = fullNameInput.value.trim();
    if (fullName.length > 0) {
      messageContainer.textContent = "Wow, your name looks awesome!";
    }
  }
  
  function handleUsernameClick() {
    setTimeout(() => {
      messageContainer.textContent = "In the username, I suggest that it must contain letters and numbers";
    }, 1000);
  }
  function handlePasswordClick() {
    setTimeout(() => {
      messageContainer.textContent = "In the password, I suggest that the password will be more than 6 characters long";
    }, 1000);
  }
  
  // ...
  
  usernameInput.addEventListener('click', handleUsernameClick);
  passwordInput.addEventListener('click', handlePasswordClick);
  fullNameInput.addEventListener('blur', handleFullNameBlur);

  
  const messageInterval = setInterval(changeMessage, 2500);
  

});



// Function to generate a unique ID for the new user
function generateUniqueId(users) {
  var lastUserId = users.length > 0 ? users[users.length - 1].id : 99;
  return lastUserId + 1;
}




function login() {
  var username = document.getElementById("l_username").value;
  var password = document.getElementById("l_password").value;

  // Retrieve users from local storage or create an empty array
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user with matching credentials
  var matchedUser = users.find(function(user) {
    return user.username === username && user.password === password;
  });

  if (matchedUser) {
    // Set the logged-in user's username and retrieve level and coins from the user object
    var loggedInUsername = matchedUser.username;
    var level = matchedUser.level || 1;
    var coins = matchedUser.coins || 25000;

    // Save the level and coins in local storage
    localStorage.setItem("level", level);
    localStorage.setItem("coins", coins);

    // Set the logged-in user's username in local storage
    localStorage.setItem("loggedInUsername", loggedInUsername);

    // Set the logged-in user's username in the query parameter
    var queryParams = new URLSearchParams();
    queryParams.set('username', loggedInUsername);

    // Redirect to the game.html page with the username in the query parameter
    window.location.href = "game.html?" + queryParams.toString();
  } else {
    // Invalid login credentials
    document.getElementById("message").textContent = "Invalid username or password!";
  }
}


