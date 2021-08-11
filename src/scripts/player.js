;
(function() {
    const player = $(".player__content");
    const durationControl = document.querySelector(".player__playback-duration");
    const controlProgress = document.querySelector(".player__playback-progress")
    const soundProgress = document.querySelector(".player__sound-progress");
    const soundControl = document.querySelector(".player__sound-volume-level");
    const MAX_SOUND_VALUE = 10;
    const updateRange = 1000;
    const playButtonOnScreen = document.querySelector(".player__on-screen-start");
    const playerButton = document.querySelector(".player__start");
    const playerContainer = document.querySelector(".player__container");
    const playerWrapper = document.querySelector(".player__wrapper");
    const soundButton = document.querySelector(".player__sound-img");
    let intervalId;
    let soundLevel;

    document.addEventListener("DOMContentLoaded", function() {
        player[0].addEventListener("canplaythrough", () => {
            durationControl.max = player[0].duration;
        });
        durationControl.min = 0;
        durationControl.value = 0;
        durationControl.max = player[0].duration;
        soundControl.min = 0;
        soundControl.max = MAX_SOUND_VALUE;
        volumeProgress();
        initPlayButton();
        addListener();
    });

    function initPlayButton() {
        const playButtons = document.querySelectorAll(".play-button");
        playButtons.forEach(button => {
            button.addEventListener("click", playStop)
            progressPlayback();
        });
    };

    function addListener() {
        playerWrapper.addEventListener("click", playStop);
        durationControl.addEventListener("click", setVideoDuration);
        durationControl.addEventListener("mousedown", stopInterval);
        soundControl.addEventListener("click", changeSoundVolume);

        soundButton.addEventListener("click", e => {
            e.preventDefault();
            if (player[0].volume == 0) {
                player[0].volume = soundLevel;
                soundControl.value = soundLevel * MAX_SOUND_VALUE;
                soundButton.classList.remove("player__sound-img--mute");
                volumeProgress();

            } else {
                soundLevel = player[0].volume;
                player[0].volume = 0;
                soundControl.value = 0;
                soundButton.classList.add("player__sound-img--mute");
                volumeProgress();
            }
        });
    }

    function playStop() {
        if (player[0].paused) {
            intervalId = setInterval(updateDuration, updateRange);
            player[0].play();
            playButtonOnScreen.classList.add("player__on-screen-start--hidden");
            playerContainer.classList.add("player__container--paused");


        } else {
            stopInterval();
            playButtonOnScreen.classList.remove("player__on-screen-start--hidden");
            playerContainer.classList.remove("player__container--paused");
        }
    }

    function updateDuration() {
        durationControl.value = player[0].currentTime;
        progressPlayback();
    }

    function setVideoDuration() {
        intervalId = setInterval(updateDuration, updateRange);
        player[0].currentTime = durationControl.value;
        progressPlayback();
        if (player[0].paused) {
            player[0].play();
            playButtonOnScreen.classList.add("player__on-screen-start--hidden");
            console.log(player[0].volume);
        }

    }

    function stopInterval() {
        player[0].pause();
        clearInterval(intervalId);
    };

    function changeSoundVolume() {
        player[0].volume = soundControl.value / MAX_SOUND_VALUE;
        volumeProgress();
    }

    function progressPlayback() {
        const completePlaybackPersent = (player[0].currentTime / player[0].duration) * 100;
        controlProgress.style.width = completePlaybackPersent + "%";
    }

    function volumeProgress() {
        completeVolumePersent = (player[0].volume / MAX_SOUND_VALUE) * 1000;
        soundProgress.style.width = completeVolumePersent + "%";
    }
})()