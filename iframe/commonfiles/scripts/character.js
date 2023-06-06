document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the logged-in user's username from the query parameter
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var username = urlParams.get('username');

  // Retrieve the user's level and data from local storage
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var userIndex = users.findIndex(function(user) {
    return user.username === username;
  });
  var user = users[userIndex];
  var level = user.level || 1;
  var selectedCharacter = user.selectedCharacter || "character1";

  // Set the selected character in the UI
  document.getElementById(selectedCharacter).classList.add("selected");
  document.getElementById(selectedCharacter).innerHTML += "<div class='selected-overlay'>Selected</div>";
  document.getElementById("characterDisplay").textContent = selectedCharacter;

  // Unlock characters based on the user's level
  if (level >= 4) {
    var character2 = document.getElementById("character2");
    character2.classList.remove("locked");
    character2.querySelector(".character-status").innerHTML = "<i class='fas fa-lock-open'></i>";
  }

  if (level >= 8) {
    var character3 = document.getElementById("character3");
    character3.classList.remove("locked");
    character3.querySelector(".character-status").innerHTML = "<i class='fas fa-lock-open'></i>";
  }

  if (level >= 12) {
    var character4 = document.getElementById("character4");
    character4.classList.remove("locked");
    character4.querySelector(".character-status").innerHTML = "<i class='fas fa-lock-open'></i>";
  }

  // Character selection event handler
  function selectCharacter(characterId) {
    // Check if the character is locked
    if (document.getElementById(characterId).classList.contains("locked")) {
      alert("Character locked! Reach the required level to unlock.");
      return;
    }

    // Set the selected character in the user's data
    user.selectedCharacter = characterId;
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));

    // Update the UI to reflect the selected character
    document.querySelectorAll(".character").forEach(function(character) {
      character.classList.remove("selected");
      character.querySelector(".selected-overlay")?.remove();
    });
    document.getElementById(characterId).classList.add("selected");
    document.getElementById(characterId).innerHTML += "<div class='selected-overlay'>Selected</div>";


    // Set the character image in the game page
    document.getElementById("characterImage").src = "images/characters/" + characterId + ".svg";
  }

  document.querySelectorAll(".character").forEach(function(character) {
    character.addEventListener("click", function() {
      var characterId = this.id;
      selectCharacter(characterId);
    });
  });

  // Character selection box event handler
  var charactersButton = document.getElementById("charactersButton");
  var characterSelectionBox = document.getElementById("characterSelectionBox");
  var closeButton = document.getElementById("closeButton");

  charactersButton.addEventListener("click", function() {
    characterSelectionBox.style.display = "block";
  });

  closeButton.addEventListener("click", function() {
    characterSelectionBox.style.display = "none";
  });

  selectCharacter(selectedCharacter);
});