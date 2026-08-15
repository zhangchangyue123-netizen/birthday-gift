/* =========================================================
   MEMORY ALBUM
   Main JavaScript
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTS
        ====================================================== */

        const loader =
            document.getElementById(
                "pageLoader"
            );


        const loaderProgress =
            document.getElementById(
                "loaderProgress"
            );


        const filmTrack =
            document.getElementById(
                "filmTrack"
            );


        const scenes =
            Array.from(
                document.querySelectorAll(
                    ".memory-scene"
                )
            );


        const navItems =
            Array.from(
                document.querySelectorAll(
                    ".memory-nav-item"
                )
            );


        const sceneCounter =
            document.getElementById(
                "sceneCounter"
            );


        const music =
            document.getElementById(
                "bgMusic"
            );


        const musicButton =
            document.getElementById(
                "musicButton"
            );


        const scrollHint =
            document.getElementById(
                "scrollHint"
            );


        /* =====================================================
           STATE
        ====================================================== */

        let currentScene = 0;

        let isChanging = false;

        let touchStartY = 0;

        let touchStartX = 0;

        let wheelLocked = false;


        const TOTAL_SCENES =
            scenes.length;


        /* =====================================================
           IMAGE PRELOAD
        ====================================================== */

        const imageList =
            Array.from(
                document.querySelectorAll(
                    "img"
                )
            );


        let loadedImages = 0;


        function updateLoader() {

            if (
                imageList.length === 0
            ) {

                loaderProgress.style.width =
                    "100%";

                return;

            }


            const percent =
                Math.round(
                    (
                        loadedImages /
                        imageList.length
                    ) * 100
                );


            loaderProgress.style.width =
                `${percent}%`;

        }


        imageList.forEach(
            (image) => {

                if (
                    image.complete
                ) {

                    loadedImages++;

                    updateLoader();

                } else {

                    image.addEventListener(
                        "load",
                        () => {

                            loadedImages++;

                            updateLoader();

                        },
                        {
                            once: true
                        }
                    );


                    image.addEventListener(
                        "error",
                        () => {

                            loadedImages++;

                            image.classList.add(
                                "image-error"
                            );

                            console.warn(
                                "图片加载失败：",
                                image.src
                            );

                            updateLoader();

                        },
                        {
                            once: true
                        }
                    );

                }

            }
        );


        /* =====================================================
           LOADER
        ====================================================== */

        let loaderPercent = 0;


        const loaderTimer =
            setInterval(
                () => {

                    loaderPercent += 5;


                    if (
                        loaderPercent > 95
                    ) {

                        loaderPercent = 95;

                    }


                    if (
                        loadedImages ===
                        imageList.length
                    ) {

                        loaderPercent = 100;

                    }


                    loaderProgress.style.width =
                        `${loaderPercent}%`;


                    if (
                        loaderPercent >= 100
                    ) {

                        clearInterval(
                            loaderTimer
                        );

                    }

                },
                80
            );


        window.addEventListener(
            "load",
            () => {

                loaderProgress.style.width =
                    "100%";


                setTimeout(
                    () => {

                        loader.classList.add(
                            "loaded"
                        );

                    },
                    500
                );

            }
        );


        /* =====================================================
           UPDATE SCENE
        ====================================================== */

        function updateScene(
            newIndex,
            instant = false
        ) {


            /* 防止越界 */

            if (
                newIndex < 0
            ) {

                newIndex = 0;

            }


            if (
                newIndex >= TOTAL_SCENES
            ) {

                newIndex =
                    TOTAL_SCENES - 1;

            }


            /* 已经在这个页面 */

            if (
                newIndex === currentScene &&
                !instant
            ) {

                return;

            }


            if (
                isChanging &&
                !instant
            ) {

                return;

            }


            isChanging = true;


            currentScene =
                newIndex;


            /* =============================================
               胶卷移动
            ============================================== */

            filmTrack.style.transform =
                `translateY(-${newIndex * 100}vh)`;


            /* =============================================
               Scene active
            ============================================== */

            scenes.forEach(
                (scene, index) => {

                    scene.classList.toggle(
                        "active",
                        index === newIndex
                    );

                }
            );


            /* =============================================
               Navigation
            ============================================== */

            navItems.forEach(
                (item, index) => {

                    item.classList.toggle(
                        "active",
                        index === newIndex
                    );

                }
            );


            /* =============================================
               Counter
            ============================================== */

            const displayNumber =
                String(
                    newIndex + 1
                ).padStart(
                    2,
                    "0"
                );


            sceneCounter.textContent =
                `${displayNumber} / 08`;


            /* =============================================
               Hide scroll hint
            ============================================== */

            if (
                scrollHint
            ) {

                if (
                    newIndex >=
                    TOTAL_SCENES - 1
                ) {

                    scrollHint.style.opacity =
                        "0";

                } else {

                    scrollHint.style.opacity =
                        "1";

                }

            }


            /* =============================================
               Unlock
            ============================================== */

            setTimeout(
                () => {

                    isChanging = false;

                },
                instant ? 0 : 1150
            );


            /* =============================================
               Music
            ============================================== */

            tryStartMusic();

        }


        /* =====================================================
           INITIAL SCENE
        ====================================================== */

        updateScene(
            0,
            true
        );


        /* =====================================================
           NAVIGATION CLICK
        ====================================================== */

        navItems.forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                item.dataset.scene
                            );


                        updateScene(
                            index
                        );

                    }
                );

            }
        );


        /* =====================================================
           WHEEL
        ====================================================== */

        window.addEventListener(
            "wheel",
            (event) => {

                event.preventDefault();


                if (
                    wheelLocked ||
                    isChanging
                ) {

                    return;

                }


                wheelLocked = true;


                if (
                    event.deltaY > 0
                ) {

                    updateScene(
                        currentScene + 1
                    );

                } else {

                    updateScene(
                        currentScene - 1
                    );

                }


                setTimeout(
                    () => {

                        wheelLocked = false;

                    },
                    900
                );

            },
            {
                passive: false
            }
        );


        /* =====================================================
           KEYBOARD
        ====================================================== */

        window.addEventListener(
            "keydown",
            (event) => {


                if (
                    event.key ===
                    "ArrowDown"
                ) {

                    event.preventDefault();

                    updateScene(
                        currentScene + 1
                    );

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    event.preventDefault();

                    updateScene(
                        currentScene + 1
                    );

                }


                if (
                    event.key ===
                    "ArrowUp"
                ) {

                    event.preventDefault();

                    updateScene(
                        currentScene - 1
                    );

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    event.preventDefault();

                    updateScene(
                        currentScene - 1
                    );

                }

            }
        );


        /* =====================================================
           TOUCH START
        ====================================================== */

        window.addEventListener(
            "touchstart",
            (event) => {

                const touch =
                    event.changedTouches[0];


                touchStartY =
                    touch.clientY;


                touchStartX =
                    touch.clientX;

            },
            {
                passive: true
            }
        );


        /* =====================================================
           TOUCH END
        ====================================================== */

        window.addEventListener(
            "touchend",
            (event) => {

                const touch =
                    event.changedTouches[0];


                const endY =
                    touch.clientY;


                const endX =
                    touch.clientX;


                const distanceY =
                    touchStartY - endY;


                const distanceX =
                    touchStartX - endX;


                /* 主要判断上下 */

                if (
                    Math.abs(distanceY) <
                    45
                ) {

                    return;

                }


                if (
                    Math.abs(distanceY) <
                    Math.abs(distanceX)
                ) {

                    return;

                }


                if (
                    distanceY > 0
                ) {

                    updateScene(
                        currentScene + 1
                    );

                } else {

                    updateScene(
                        currentScene - 1
                    );

                }

            },
            {
                passive: true
            }
        );


        /* =====================================================
           MUSIC
        ====================================================== */

        let musicStarted =
            false;


        function updateMusicUI() {

            if (
                music.paused
            ) {

                musicButton.classList.remove(
                    "playing"
                );


                musicButton.querySelector(
                    ".music-icon"
                ).textContent =
                    "♪";

            } else {

                musicButton.classList.add(
                    "playing"
                );


                musicButton.querySelector(
                    ".music-icon"
                ).textContent =
                    "♫";

            }

        }


        async function tryStartMusic() {

            if (
                musicStarted
            ) {

                return;

            }


            try {

                music.volume =
                    0.55;


                await music.play();


                musicStarted =
                    true;


                updateMusicUI();


            } catch (error) {

                /*
                    浏览器阻止自动播放时，
                    不报错，不影响网页。
                    等用户点击音乐按钮。
                */

                console.log(
                    "浏览器暂时阻止自动播放，等待用户操作。"
                );

            }

        }


        /* =====================================================
           MUSIC BUTTON
        ====================================================== */

        musicButton.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        music.paused
                    ) {

                        music.volume =
                            0.55;


                        await music.play();


                        musicStarted =
                            true;

                    } else {

                        music.pause();

                    }


                    updateMusicUI();

                } catch (error) {

                    console.error(
                        "音乐播放失败：",
                        error
                    );

                    alert(
                        "音乐播放失败，请确认 love-memory.mp3 是正常的 MP3 文件。"
                    );

                }

            }
        );


        /* =====================================================
           FIRST USER INTERACTION
           用来绕过浏览器自动播放限制
        ====================================================== */

        const startMusicFromUser =
            async () => {

                if (
                    musicStarted
                ) {

                    return;

                }


                try {

                    music.volume =
                        0.55;


                    await music.play();


                    musicStarted =
                        true;


                    updateMusicUI();


                } catch (error) {

                    console.log(
                        "音乐仍无法播放：",
                        error
                    );

                }

            };


        document.addEventListener(
            "click",
            startMusicFromUser,
            {
                once: true
            }
        );


        document.addEventListener(
            "touchstart",
            startMusicFromUser,
            {
                once: true,
                passive: true
            }
        );


        document.addEventListener(
            "keydown",
            startMusicFromUser,
            {
                once: true
            }
        );


        /* =====================================================
           MUSIC EVENTS
        ====================================================== */

        music.addEventListener(
            "play",
            () => {

                updateMusicUI();

            }
        );


        music.addEventListener(
            "pause",
            () => {

                updateMusicUI();

            }
        );


        music.addEventListener(
            "ended",
            () => {

                music.currentTime =
                    0;

            }
        );


        music.addEventListener(
            "error",
            () => {

                console.error(
                    "================================"
                );

                console.error(
                    "音乐加载失败"
                );

                console.error(
                    "路径：./assets/music/love-memory.mp3"
                );

                console.error(
                    music.error
                );

                console.error(
                    "================================"
                );

            }
        );


        /* =====================================================
           CAKE
        ====================================================== */

        const cakeImage =
            document.getElementById(
                "cakeImage"
            );


        if (
            cakeImage
        ) {

            cakeImage.addEventListener(
                "click",
                () => {

                    const birthdayScene =
                        document.querySelector(
                            ".birthday-scene"
                        );


                    birthdayScene.classList.toggle(
                        "cake-clicked"
                    );

                }
            );

        }


        /* =====================================================
           DOUBLE CLICK
        ====================================================== */

        document.addEventListener(
            "dblclick",
            () => {

                if (
                    currentScene === 6
                ) {

                    const birthdayScene =
                        document.querySelector(
                            ".birthday-scene"
                        );


                    birthdayScene.classList.toggle(
                        "cake-clicked"
                    );

                }

            }
        );


        /* =====================================================
           PREVENT IMAGE DRAG
        ====================================================== */

        document
            .querySelectorAll("img")
            .forEach(
                (image) => {

                    image.addEventListener(
                        "dragstart",
                        (event) => {

                            event.preventDefault();

                        }
                    );

                }
            );


        /* =====================================================
           DEBUG INFORMATION
        ====================================================== */

        console.log(
            "======================================"
        );

        console.log(
            "MEMORY ALBUM 已启动"
        );

        console.log(
            `照片数量：${imageList.length}`
        );

        console.log(
            `场景数量：${TOTAL_SCENES}`
        );

        console.log(
            "音乐：./assets/music/love-memory.mp3"
        );

        console.log(
            "======================================"
        );

    }
);
