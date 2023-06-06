var expToLevelUp = 1000; // The amount of experience required to level up

document.addEventListener("DOMContentLoaded", function() {
  // Display the loading overlay
  var loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.opacity = 1;

  // Retrieve user data from local storage
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // ...

  // Add a load event listener to fade out the loading overlay once the page is fully loaded
  window.addEventListener("load", function() {
    setTimeout(function() {
      loadingOverlay.style.opacity = 0;
      setTimeout(function() {
        loadingOverlay.style.display = "none";
      }, 500); // Adjust the duration of the fade out transition (in milliseconds) as needed
    }, 3000); // Delay of 3000 milliseconds (3 seconds) before fading out the loading overlay
  });
  
  // Retrieve the logged-in user's username from the query parameter
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var username = urlParams.get('username');

  // Find the user object based on the username
  var userIndex = users.findIndex(function(user) {
    return user.username === username;
  });

  // Redirect to login page if user is not found or user is logged out
  if (userIndex === -1 || !localStorage.getItem("loggedInUsername")) {
    window.location.href = "login.html";
    return;
  }

  // Get the user object
  var user = users[userIndex];

  // Initialize experience if it is missing
  if (user.exp === undefined) {
    user.exp = 0;
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Retrieve the level from the local storage or calculate it based on experience
  var level = user.level || Math.floor(user.exp / expToLevelUp) + 1;

  // Check if the level has changed
  if (user.level !== level) {
    // Check if the level has reached a milestone
    if (level > user.level) {
      // Reset experience to 0
      user.exp = 0;
  
      // Show a congratulatory alert
      alert("Congratulations! You have reached level " + level + "!");
  
      // Call the unlockCharacters function with the new level
      if (level === 4) {
        unlockCharacters(4);
      } else if (level === 8) {
        unlockCharacters(8);
      }
    }
  
    // Update user's level
    user.level = level;
  
    // Update user data in the users array and local storage
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Display user information
  var fullName = user.fullName;
  var exp = user.exp || 0;
  var coins = user.coins || 25000;

  document.getElementById("fullName").textContent = fullName;
  document.getElementById("username").textContent = "@" + username;
  document.getElementById("level").textContent = level;
  document.getElementById("exp").textContent =  exp;
  document.getElementById("coins").textContent = coins;
  document.getElementById("currentlevel").textContent = level;

  // Update experience bar
  var experienceBarFill = document.getElementById("experienceBarFill");
  var maxExperience = expToLevelUp;
  var experiencePercentage = (exp / maxExperience) * 100;

  // Reset the experience bar if the level has reached a milestone
  if (level > user.level) {
    experiencePercentage = 0;
  }

  //change the fontsize of full name when the user's fullname is more than 9
var fullNameElement = document.getElementById("fullName");
if (fullName.length > 9) {
  fullNameElement.style.fontSize = "0.9vw";
} else {
  fullNameElement.style.fontSize = "1.2vw";
} 

//change the size of the level(text) depends on the current
  var element = document.getElementById("level");
  if (user.level >= 10) {
    element.style.left = "4.1vw";
    element.style.top = "-1.6vw";
    element.style.fontSize = "1.3vw";
  } else if (user.level >= 2) {
    element.style.left = "4.18vw";
    element.style.top = "-1.8vw";
    element.style.fontSize = "1.4vw";
  }


  experienceBarFill.style.width = experiencePercentage + "%";

  // Log out button event handler
  document.getElementById("logoutButton").addEventListener("click", function() {
    // Remove the logged-in username from local storage
    localStorage.removeItem("loggedInUsername");

    // Redirect to login page
    window.location.href = "login.html";
  });


  // Add experience button event handler
  document.getElementById("addExperienceButton").addEventListener("click", function() {
    // Increase experience by 300
    user.exp += 300;

    // Check if the user's experience exceeds the level-up milestone
    if (user.exp >= expToLevelUp) {
      // Increase the level by 1
      user.level++;
      // Reset experience to 0
      user.exp = 0;

      // Show a congratulatory alert
      alert("Congratulations! You have reached level " + user.level + "!");

      if (level === 4) {
        unlockCharacters(4);
      } else if (level === 8) {
        unlockCharacters(8);
      }
    }

    // Update user data in the users array and local storage
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));

    // Update user interface
    document.getElementById("exp").textContent = user.exp;
    document.getElementById("level").textContent = user.level;
    document.getElementById("currentlevel").textContent = user.level;

    // Update experience bar
    var newExperiencePercentage = (user.exp / maxExperience) * 100;
    experienceBarFill.style.width = newExperiencePercentage + "%";
  });
});
