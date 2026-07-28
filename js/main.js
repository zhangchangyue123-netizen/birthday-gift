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
const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.5
});

document.querySelectorAll(".film-photo").forEach(item=>{

    observer.observe(item);

});
/* Scene03 呼吸动画 */

document
.querySelectorAll("#scene03 .film-photo img")
.forEach(img=>{

    let scale = 1;
    let dir = 1;

    function animate(){

        scale += dir * 0.00015;

        if(scale > 1.03){

            dir = -1;

        }

        if(scale < 1){

            dir = 1;

        }

        img.style.transform =
        `scale(${scale})`;

        requestAnimationFrame(animate);

    }

    animate();

});
/* Scene04 */

const coffee = document.querySelector("#scene04 .film-photo");

const coffeeObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            coffee.classList.add("show");

        }

    });

},{
    threshold:0.4
});

coffeeObserver.observe(coffee);
const gallery =
document.querySelector(".gallery-card");

const galleryObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            gallery.animate([

                {

                    opacity:0,

                    transform:
                    "translateY(80px) scale(.92)"

                },

                {

                    opacity:1,

                    transform:
                    "translateY(0) scale(1)"

                }

            ],{

                duration:1400,

                easing:"ease"

            });

        }

    });

});

galleryObserver.observe(gallery);
