//Text to Speech Area
// Check if the browser supports the SpeechRecognition API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Create a new instance of SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    // Configure the SpeechRecognition instance
    recognition.continuous = true; // Enable continuous recognition
    recognition.interimResults = true; // Enable interim results
  
    // Event handler for when the speech recognition starts
    recognition.onstart = () => {
      console.log('Speech recognition started');
    };
  
    // Event handler for when the speech recognition result is available
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('Speech recognition result:', transcript);
  
      // Process the transcript or pass it to the AI robot for further interaction
      if (transcript.toLowerCase().includes('what is your name')) {
        displayMessage('My name is JAVA, your AI Assistant');
      }
    };
  
    // Function to display a message in the AI message box
    function displayMessage(message) {
      const messageBox = document.getElementById('ai-message');
      messageBox.textContent = message;
      messageBox.style.display = message ? 'block' : 'none';
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      // Add an event listener to the "AI Robot" button
      document.getElementById('aiRobotButton').addEventListener('click', function() {
        // Display the AI robot character
        document.getElementById('aiRobotContainer').style.display = 'block';
  
        // Start the speech recognition process
        recognition.start();
      });
    });
  }
  