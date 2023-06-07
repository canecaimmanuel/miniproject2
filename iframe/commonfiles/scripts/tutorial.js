document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the logged-in user's username from the query parameter
  // ... existing code ...

  // Function to start the tutorial
  function startTutorial() {
    // Create a tutorial message element
    var tutorialMessage = document.createElement("div");
    tutorialMessage.classList.add("tutorial-message");

    // Add the robot character image element
    var robotContainer = document.querySelector('.robot-container');
    var robotImage = document.createElement("img");
    robotImage.src = "images/robot/java-robot.svg"; // Replace with the actual robot character image source
    robotImage.classList.add("robot-image");
    robotContainer.appendChild(robotImage);

    setTimeout(function() {
    // Add the "robot-container-animate" class to start the new animation
    document.querySelector('.robot-container').classList.add('robot-container-animate');
    }, 4500);

    // Add the initial tutorial message to the page after a delay
    setTimeout(function() {
      tutorialMessage.textContent = "Hi, I'm Java! I'm your AI Assistant. I'm here to teach you how to play this game.";
      document.body.appendChild(tutorialMessage);
      speakMessage(tutorialMessage.textContent); // Speak the initial message

      // Change the tutorial message after 5 seconds
      setTimeout(function() {
        tutorialMessage.textContent = "First, let's change your profile picture by clicking it at the top left corner.";
        speakMessage(tutorialMessage.textContent); // Speak the updated message

        // Create a div with black background and 50% opacity
        var overlayDiv = document.createElement("div");
        overlayDiv.classList.add("overlay-div");
        document.body.appendChild(overlayDiv);

        // Update tutorial message when profile button is clicked
        var profileButton = document.getElementById("profileButton");
        profileButton.addEventListener("click", function() {
          overlayDiv.remove();
          tutorialMessage.textContent = "Then click the pencil icon beside the Profile picture.";
          speakMessage(tutorialMessage.textContent); // Speak the updated message

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
            speakMessage(tutorialMessage.textContent); // Speak the updated message

            // Change the tutorial message after 3 seconds
            setTimeout(function() {
              tutorialMessage.textContent = "Then, you can also change your name inside the profile box too.";
              speakMessage(tutorialMessage.textContent); // Speak the updated message

              // Create an image element for the additional image
              var additionalImage = document.createElement("img");
              additionalImage.src = "images/vector_designs/screenshoot.svg"; // Replace with the actual image source
              additionalImage.classList.add("screenshoot");
              document.body.appendChild(additionalImage);

              // Create a button element for "Okay"
              var okayButton = document.createElement("button");
              okayButton.textContent = "Okay";
              okayButton.classList.add("okay-button");
              document.body.appendChild(okayButton);

              // Update tutorial message and remove additional image when okay button is clicked
              okayButton.addEventListener("click", function() {
                additionalImage.remove();
                okayButton.remove();
                tutorialMessage.textContent = "Next, you will see your current level on the top left corner.";
                speakMessage(tutorialMessage.textContent); // Speak the updated message

                // Create a div with black background and 50% opacity
                var overlayDiv = document.createElement("div");
                overlayDiv.classList.add("overlay-div");
                document.body.appendChild(overlayDiv);

                // Update z-index property of .level-exp
                var levelExpElement = document.querySelector(".level-exp");
                levelExpElement.style.zIndex = "30";

                var profileCOn = document.querySelector("#profileContainer");
                profileCOn.style.zIndex = "15";

                // Change the tutorial message after 5 seconds
                setTimeout(function() {
                  tutorialMessage.textContent = "Now, let's proceed to the Solo-mode, click it to proceed.";
                  speakMessage(tutorialMessage.textContent); // Speak the updated message

                  var levelExpElement = document.querySelector(".level-exp");
                  levelExpElement.style.zIndex = "15";

                  var gameMenu = document.querySelector(".game-menu");
                  gameMenu.style.zIndex = "30";
                }, 5000); // Duration of 5000 milliseconds (5 seconds)
              });
            }, 3000); // Duration of 3000 milliseconds (3 seconds)
          });
        });
      }, 6000); // Duration of 5000 milliseconds (5 seconds)
    }, 4000); // Delay of 4000 milliseconds (4 seconds)
  }
  var tutorialButton = document.getElementById("tutorialButton");
  tutorialButton.addEventListener("click", function() {
    startTutorial();
  });
});

// Function to speak the given message using the Web Speech API
function speakMessage(message) {
  var speech = new SpeechSynthesisUtterance(message);
  speech.lang = 'en-US';
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  // Get available voices
  var voices = window.speechSynthesis.getVoices();

  // Find the voice named "Microsoft David Desktop - English (United States)"
  var selectedVoice = voices.find(function(voice) {
    return voice.name === 'Microsoft Mark - English (United States)';
  });

  // Set the selected voice
  speech.voice = selectedVoice;

  window.speechSynthesis.speak(speech);
}

