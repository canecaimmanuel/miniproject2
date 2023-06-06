document.addEventListener("DOMContentLoaded", function() {
  var imageUploadButton = document.getElementById("imageUploadButton");
  var imageInput = document.getElementById("imageInput");
  var previewImage = document.getElementById("previewImage");
  var cropButton = document.getElementById("cropButton");
  var cropper;
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var username = urlParams.get('username');
  var userIndex = users.findIndex(function(user) {
    return user.username === username;
  });

  if (userIndex === -1 || !localStorage.getItem("loggedInUsername")) {
    window.location.href = "login.html";
    return;
  }

  var user = users[userIndex];

  // Display user profile information
  var profilePicture = user.profilePicture || "placeholder.jpg";
  document.getElementById("profilePicture").src = profilePicture;
  document.getElementById("profilePictureLarge").src = profilePicture;

  imageUploadButton.addEventListener("click", function() {
    imageInput.click();
  });

  imageInput.addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function() {
        previewImage.src = reader.result;
        cropper = new Cropper(previewImage, {
          aspectRatio: 1,
          viewMode: 1,
          guides: false,
          crop: function(event) {
            // Update the crop data if needed
          }
        });
      };
      reader.readAsDataURL(file);
    }
  });

  cropButton.addEventListener("click", function() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(function(blob) {
        var reader = new FileReader();
        reader.onloadend = function() {
          var croppedImageUrl = reader.result;

          // Update the profile picture with the cropped image
          document.getElementById("profilePicture").src = croppedImageUrl;
          document.getElementById("profilePictureLarge").src = croppedImageUrl;

          // Update the user object with the new profile picture
          user.profilePicture = croppedImageUrl;
          users[userIndex] = user;

          // Save the updated user object to local storage
          localStorage.setItem("users", JSON.stringify(users));

          // Hide the profile box
          document.getElementById("profileBox").style.display = "none";
        };
        reader.readAsDataURL(blob);
      });
    }
  });
});
