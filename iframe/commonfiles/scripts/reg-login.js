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
        document.getElementById("message").textContent = "Username already taken!";
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
        document.getElementById("message").textContent = "Registration successful!";

        // Redirect to the game page with the registered username
        window.location.href = "game.html?username=" + username;
      }
    });
  }
});

// Function to generate a unique ID for the new user
function generateUniqueId(users) {
  var lastUserId = users.length > 0 ? users[users.length - 1].id : 99;
  return lastUserId + 1;
}




function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

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