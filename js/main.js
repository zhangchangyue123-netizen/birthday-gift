const polaroid = document.querySelector(".polaroid");

let scale = 1;
let direction = 1;

function breathe(){

    scale += direction * 0.00025;

    if(scale > 1.02){

        direction = -1;

    }

    if(scale < 1){

        direction = 1;

    }

    polaroid.style.transform =
    `rotate(-3deg) scale(${scale})`;

    requestAnimationFrame(breathe);

}

breathe();
