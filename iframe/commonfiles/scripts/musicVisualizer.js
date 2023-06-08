window.onload = function() {
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

  // Check if there is a saved state in the local storage
  var savedState = localStorage.getItem("audioState");
  if (savedState) {
    var state = JSON.parse(savedState);
    audio.src = state.src;
    audio.currentTime = state.currentTime;
    if (state.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  } else {
    // No saved state, load the startup audio
    var startupAudio = new Audio("music/.music.mp3"); // Replace "music/music.mp3" with the actual path to your startup audio file

    startupAudio.addEventListener("canplaythrough", function() {
      audio.src = startupAudio.src; // Set the startup audio as the source for the player
      audio.load();
      audio.play();
    });

    startupAudio.addEventListener("error", function(e) {
      console.error("Failed to load startup audio:", e);
    });
  }

  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();

    audio.onloadedmetadata = function() {
      audio.play();
    };

    // Save the new state in the local storage
    var newState = {
      src: audio.src,
      currentTime: audio.currentTime,
      paused: false
    };
    localStorage.setItem("audioState", JSON.stringify(newState));
  };

  // Handle the pause event
  audio.addEventListener("pause", function() {
    // Save the pause state in the local storage
    var newState = {
      src: audio.src,
      currentTime: audio.currentTime,
      paused: true
    };
    localStorage.setItem("audioState", JSON.stringify(newState));
  });

  // Handle the play event
  audio.addEventListener("play", function() {
    // Save the play state in the local storage
    var newState = {
      src: audio.src,
      currentTime: audio.currentTime,
      paused: false
    };
    localStorage.setItem("audioState", JSON.stringify(newState));
  });

  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 2;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    var alphaArray = []; // Array to store random alpha values

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 0.5;

      var r = barHeight + (25 * (i / bufferLength));
      var g = 250 * (i / bufferLength);
      var b = 50;

      // Generate random alpha value for each bar

      ctx.fillStyle = "rgba(0, 255, 255, 0.3)";

      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  renderFrame();
};

function musicBox() {
  document.getElementById('music-box').style.display = "flex";
}

function closeButton() {
  document.getElementById('music-box').style.display = "none";
}