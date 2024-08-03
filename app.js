document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('timeDisplay');
    const playPauseButton = document.getElementById('playPauseButton');
    const lapButton = document.getElementById('lapButton');
    const resetButton = document.getElementById('resetButton');
    const clearLapsButton = document.getElementById('clearLapsButton');
    const lapsContainer = document.getElementById('laps');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let running = false;

    function timeToString(time) {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 100;
        let ms = Math.floor(diffInMs);

        let formattedHH = hh.toString().padStart(2, '0');
        let formattedMM = mm.toString().padStart(2, '0');
        let formattedSS = ss.toString().padStart(2, '0');
        let formattedMS = ms.toString().padStart(2, '0');

        return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
    }

    function print(txt) {
        timeDisplay.innerHTML = txt;
    }

    function start() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        playPauseButton.innerHTML = 'Pause';
        running = true;
    }

    function pause() {
        clearInterval(timerInterval);
        playPauseButton.innerHTML = 'Play';
        running = false;
    }

    function reset() {
        clearInterval(timerInterval);
        print('00:00:00.00');
        elapsedTime = 0;
        playPauseButton.innerHTML = 'Play';
        running = false;
        lapsContainer.innerHTML = '';
    }

    function lap() {
        if (running) {
            const lapTime = timeToString(elapsedTime);
            const lapElement = document.createElement('div');
            lapElement.className = 'lap';
            lapElement.innerText = lapTime;
            lapsContainer.appendChild(lapElement);
        }
    }

    function clearLaps() {
        lapsContainer.innerHTML = '';
    }

    playPauseButton.addEventListener('click', () => {
        if (running) {
            pause();
        } else {
            start();
        }
    });

    lapButton.addEventListener('click', lap);
    resetButton.addEventListener('click', reset);
    clearLapsButton.addEventListener('click', clearLaps);
});