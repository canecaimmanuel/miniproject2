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

        // Update tutorial message when profile button is clicked
        var profileButton = document.getElementById("profileButton");
        profileButton.addEventListener("click", function() {
          overlayDiv.remove();
          tutorialMessage.textContent = "Then click the pencil icon beside the Profile picture.";

          // Create an image element for the arrow
          var arrowImage = document.createElement("img");
          arrowImage.src = "images/vector_designs/clickthis.svg"; // Replace with the actual arrow image source
          arrowImage.classList.add("arrow-image");
          document.body.appendChild(arrowImage);

          // Update tutorial message and remove arrow image when crop button is clicked
          var cropButton = document.getElementById("cropButton");
          cropButton.addEventListener("click", function() {
            arrowImage.remove();
            tutorialMessage.textContent = "That's great! You're doing good!";

            // Change the tutorial message after 3 seconds
            setTimeout(function() {
              tutorialMessage.textContent = "Then, you can also change your name inside the profile box too.";

              // Create an image element for the additional image
              var additionalImage = document.createElement("img");
              additionalImage.src = "images/vector_designs/screenshoot.svg"; // Replace with the actual image source
              additionalImage.classList.add("screenshoot");
              document.body.appendChild(additionalImage);
            }, 3000); // Duration of 3000 milliseconds (3 seconds)
          });
        });
      }, 5000); // Duration of 5000 milliseconds (5 seconds)
    }, 4000); // Delay of 4000 milliseconds (4 seconds)
  }
});
