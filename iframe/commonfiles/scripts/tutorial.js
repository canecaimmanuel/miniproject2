document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the logged-in user's username from the query parameter
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var username = urlParams.get('username');
  
    // Retrieve the user's data from local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userIndex = users.findIndex(function(user) {
      return user.username === username;
    });
    var user = users[userIndex];
    var status = user.status || {};
    var level = status["100"]?.level || 1;
  
    // Check if the user is at level 1 to activate tutorial mode
    if (level === 1) {
      // Create a tutorial message element
      var tutorialMessage = document.createElement("div");
      tutorialMessage.classList.add("tutorial-message");
  
      // Add the initial tutorial message to the page after a delay
      setTimeout(function() {
        tutorialMessage.textContent = "Hi, I'm Java! I'm here to teach you how to play this game.";
        document.body.appendChild(tutorialMessage);
  
        // Change the tutorial message after 5 seconds
        setTimeout(function() {
          tutorialMessage.textContent = "First, let's change your profile picture by clicking it at the top left corner.";
  
          // Create a div with black background and 50% opacity
          var overlayDiv = document.createElement("div");
          overlayDiv.classList.add("overlay-div");
          document.body.appendChild(overlayDiv);
        }, 5000); // Duration of 5000 milliseconds (5 seconds)
      }, 4000); // Delay of 2000 milliseconds (2 seconds)
    }
  });
  