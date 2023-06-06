document.addEventListener("DOMContentLoaded", function() {
  // Retrieve user data from local storage
  var users = JSON.parse(localStorage.getItem("users")) || [];

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

  // Display user profile information
  var profileName = user.fullName;
  var profileUsername = user.username;
  var profilePicture = user.profilePicture || "images/blank-profile.png";

  // Update profile picture and information
  document.getElementById("profilePicture").src = profilePicture;
  document.getElementById("profilePictureLarge").src = profilePicture;
  document.getElementById("profileName").textContent = profileName;
  document.getElementById("profileUsername").textContent = "Username: " + profileUsername;

  // Profile button event handler
  document.getElementById("profileButton").addEventListener("click", function() {
    // Show the profile box
    document.getElementById("profileBox").style.display = "block";
  });

  // Close profile button event handler
  document.getElementById("closeProfileButton").addEventListener("click", function() {
    // Hide the profile box
    document.getElementById("profileBox").style.display = "none";
  });

});

/** - - - - - Changing Profile name - - - - - - -- -  - - */

document.addEventListener("DOMContentLoaded", function() {
  var profileBox = document.getElementById("profileBox");
  var profileName = document.getElementById("profileName");
  var editProfileButton = document.getElementById("editProfileButton");
  var editProfileNameBox = document.getElementById("editProfileNameBox");
  var editProfileNameInput = document.getElementById("editProfileNameInput");
  var saveProfileNameButton = document.getElementById("saveProfileNameButton");
  var closeEditProfileButton = document.getElementById("closeEditProfileButton");

  editProfileButton.addEventListener("click", function() {
    // Show the profile name edit pop-up box
    editProfileNameBox.style.display = "block";
    editProfileNameInput.value = profileName.innerText;
  });

  saveProfileNameButton.addEventListener("click", function() {
    var newName = editProfileNameInput.value;
    if (newName.trim() !== "") {
      // Update the profile name
      profileName.innerText = newName;

      // Save the updated profile name to local storage
      var username = localStorage.getItem("loggedInUsername");
      var users = JSON.parse(localStorage.getItem("users")) || [];
      var userIndex = users.findIndex(function(user) {
        return user.username === username;
      });
      if (userIndex !== -1) {
        users[userIndex].fullName = newName; // Update user.fullName
        localStorage.setItem("users", JSON.stringify(users));
        
      }
    }
    document.getElementById("fullName").textContent = newName;

    // Hide the profile name edit pop-up box
    editProfileNameBox.style.display = "none";
  });

  closeEditProfileButton.addEventListener("click", function() {
    // Hide the profile name edit pop-up box without saving changes
    editProfileNameBox.style.display = "none";
  });

  // Rest of the code...
});
