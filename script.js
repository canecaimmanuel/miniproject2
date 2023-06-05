document.addEventListener("DOMContentLoaded", function (){
    let canvas = document.querySelector("canvas");

    let ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let str = "001 1100 1111 0001 01010 010 101 001 01010 11111 00 11100 01010 1100";
    let matrix = str.split("");
    let font = 20;
    let col = width / font;
    let arr = [];

    for(let i = 0; i < col; i++) {
        arr[i] = 1;
    }

    const draw = () => {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#0068AE";
        ctx.font = `${font}px system-ui`;

        for(let i = 0; i < arr.length; i++) {
            let txt = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(txt, i * font, arr[i] * font);

            if(arr[i] * font > height && Math.random() > 0.975) {
                arr[i] = 0;
            }
            arr[i]++;
        }
    }

    setInterval(draw, 30);

    window.addEventListener("resize", () => location.reload());



    var logowrap = document.querySelector('.logo-wrap svg');
      
    function animateLoop() {
      // Add the 'active' class
      logowrap.classList.add('active');
    
      // Wait for 0.5 seconds
      setTimeout(function() {
        // Remove the 'active' class
        logowrap.classList.remove('active');
    
        // Call the function again after 0.5 seconds
        setTimeout(animateLoop, 2100);
      }, 3000);
    }
    
    // Call the function to start the animation loop
    animateLoop();
});


