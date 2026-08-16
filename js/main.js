/* =====================================
   MEMORY ALBUM
   Film Roll Interaction
   ===================================== */


/* ==========================
   页面加载
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


console.log(
"Memory Album Loaded"
);



/* ==========================
   滚动出现动画
========================== */


const frames =
document.querySelectorAll(
".memory-frame"
);



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}


});


},

{


threshold:0.25


}

);



frames.forEach(
(frame)=>{


observer.observe(frame);


});






/* ==========================
   左侧导航跳转
========================== */


const navItems =
document.querySelectorAll(
".memory-sidebar nav a"
);



navItems.forEach(
(item,index)=>{


item.addEventListener(
"click",
()=>{


const target =
frames[index];


if(target){


target.scrollIntoView({

behavior:"smooth",

block:"center"

});


}


});


});






/* ==========================
   图片点击放大
========================== */


const photos =
document.querySelectorAll(
".photo-box img"
);



photos.forEach(
(photo)=>{


photo.addEventListener(
"click",
()=>{


createViewer(photo.src);



});


});






});







/* ==========================
   图片查看器
========================== */


function createViewer(src){



const viewer =
document.createElement(
"div"
);



viewer.className =
"photo-viewer";



viewer.innerHTML = `

<div class="viewer-bg">

<img src="${src}">

</div>

`;



document.body.appendChild(
viewer
);




setTimeout(()=>{

viewer.classList.add(
"active"
);


},50);





viewer.addEventListener(
"click",
()=>{


viewer.classList.remove(
"active"
);



setTimeout(()=>{


viewer.remove();


},500);



});


}





/* ==========================
   当前阅读位置
========================== */


window.addEventListener(
"scroll",
()=>{


const frames =
document.querySelectorAll(
".memory-frame"
);



let current=0;



frames.forEach(
(frame,index)=>{


const rect =
frame.getBoundingClientRect();



if(
rect.top <
window.innerHeight/2
){


current=index;


}


});



const nav =
document.querySelectorAll(
".memory-sidebar nav a"
);



nav.forEach(
(item,index)=>{


if(index===current){


item.style.color="#fff";


item.style.transform=
"translateX(8px)";


}

else{


item.style.color="#777";


item.style.transform=
"translateX(0)";


}



});



});








/* ==========================
   胶卷缓慢移动效果
========================== */


window.addEventListener(
"scroll",
()=>{


const frames =
document.querySelectorAll(
".memory-frame"
);



frames.forEach(
(frame)=>{


const img =
frame.querySelector(
".photo-box"
);



if(!img)return;



const distance =
window.innerHeight/2 -
frame.getBoundingClientRect().top;



img.style.transform =

`
rotate(-2deg)
translateY(${distance*0.03}px)
`;



});



});







/* ==========================
   生日蛋糕特殊效果
========================== */


const cake =
document.querySelector(
".memory-frame:nth-child(7)"
);



if(cake){


cake.addEventListener(
"mouseenter",
()=>{


cake.style.filter =
"brightness(1.08)";



});


cake.addEventListener(
"mouseleave",
()=>{


cake.style.filter =
"brightness(1)";



});


}







/* ==========================
   添加查看器CSS
========================== */


const viewerStyle =
document.createElement(
"style"
);



viewerStyle.innerHTML = `


.photo-viewer{

position:fixed;

inset:0;

background:
rgba(0,0,0,.9);

display:flex;

justify-content:center;

align-items:center;

opacity:0;

transition:.5s;

z-index:999;


}



.photo-viewer.active{

opacity:1;

}



.photo-viewer img{

max-width:90vw;

max-height:85vh;

box-shadow:
0 40px 100px rgba(0,0,0,.8);

transform:
scale(.8);

transition:.5s;


}



.photo-viewer.active img{

transform:
scale(1);

}



.viewer-bg{

display:flex;

justify-content:center;

align-items:center;

width:100%;

height:100%;


}


`;



document.head.appendChild(
viewerStyle
);
document.addEventListener("DOMContentLoaded", function () {

    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");

    if (!music) {
        console.error("没有找到 bgMusic");
        return;
    }

    if (!musicButton) {
        console.error("没有找到 musicButton");
        return;
    }


    /* =========================
       音量
    ========================= */

    music.volume = 0.55;


    /* =========================
       播放音乐
    ========================= */

    async function playMusic() {

        try {

            await music.play();

            musicButton.classList.add("playing");

            musicButton.innerHTML = "♫ MUSIC";

            console.log("音乐播放成功");

        } catch (error) {

            console.log(
                "浏览器阻止了自动播放，等待用户点击。"
            );

        }

    }


    /* =========================
       用户点击页面
       自动开始音乐
    ========================= */

    document.addEventListener(
        "click",
        function startMusic() {

            playMusic();

            document.removeEventListener(
                "click",
                startMusic
            );

        },
        {
            once: true
        }
    );


    /* =========================
       音乐按钮
    ========================= */

    musicButton.addEventListener(
        "click",
        async function (event) {

            /*
              防止按钮点击事件
              同时触发页面点击
            */

            event.stopPropagation();


            if (music.paused) {

                try {

                    await music.play();

                    musicButton.classList.add(
                        "playing"
                    );

                    musicButton.innerHTML =
                        "♫ MUSIC";

                } catch (error) {

                    console.error(
                        "音乐播放失败：",
                        error
                    );

                }

            } else {

                music.pause();

                musicButton.classList.remove(
                    "playing"
                );

                musicButton.innerHTML =
                    "♪ MUSIC";

            }

        }
    );


    /* =========================
       音乐加载错误
    ========================= */

    music.addEventListener(
        "error",
        function () {

            console.error(
                "音乐加载失败！"
            );

            console.error(
                "当前音乐路径：",
                "./assets/music/love-memory.mp3"
            );

        }
    );

});
