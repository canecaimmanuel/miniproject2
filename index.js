// login start
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
var overlay = document.getElementById("overlay");

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
    overlay.style.display = "block";
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    overlay.style.display = "none";
});
const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');
    togglePassword.addEventListener('click', function (e) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

    const togglePassword1 = document.querySelector('#togglePassword1');
    const password1 = document.querySelector('#id_password1');
    togglePassword1.addEventListener('click', function (e) {
        const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
        password1.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });
// login end

window.addEventListener('scroll', function () {
    var element = document.querySelector('.bounce');
    var position = element.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (position < windowHeight) {
        element.classList.add('active');
    }
});

// Feedback start
    // JavaScript for sticky behavior
    window.onscroll = function() {
        stickyFeedback();
      };
  
      var feedbackContainer = document.getElementById("feedbackContainer");
      var sticky = feedbackContainer.offsetTop;
  
      function stickyFeedback() {
        if (window.pageYOffset >= sticky) {
          feedbackContainer.classList.add("sticky");
        } else {
          feedbackContainer.classList.remove("sticky");
        }
      }
  
      var openPopupButton = document.getElementById("openPopupButton");
      var popupContainer = document.getElementById("popupContainer");
      var overlay = document.getElementById("overlay");
      var feedbackForm = document.getElementById("feedbackForm");
  
      openPopupButton.addEventListener("click", function() {
        popupContainer.style.display = "block";
        overlay.style.display = "block";
        popupContainer.classList.add("active-popup");
      });
  
      function closePopup() {
        popupContainer.classList.remove("active-popup");
        setTimeout(function() {
          popupContainer.style.display = "none";
          overlay.style.display = "none";
        }, 500);
      }
      
      feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();
      
        closePopup();
        if (document.getElementById("feedbackInput").value.trim() !== "") {
          alert("Thank you for your feedback!");
          document.getElementById("feedbackInput").value = "";
        }
      });

      // learn  more in home page
      function toggleParagraph() {
        var additionalText = document.getElementById("additional-text");
        if (additionalText.style.display === "none") {
          additionalText.style.display = "block";
        } else {
          additionalText.style.display = "none";
        }
      }

      function toggleParagraph1() {
        var additionalText = document.getElementById("additional-text1");
        if (additionalText.style.display === "none") {
          additionalText.style.display = "block";
        } else {
          additionalText.style.display = "none";
        }
      }

      function toggleParagraph2() {
        var additionalText = document.getElementById("additional-text2");
        if (additionalText.style.display === "none") {
          additionalText.style.display = "block";
        } else {
          additionalText.style.display = "none";
        }
      }



