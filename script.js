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

    anime({
        targets: '.fil0',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
      });
});

