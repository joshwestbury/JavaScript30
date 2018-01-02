// Get our Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build our Functions


function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    if (this.paused) {
        toggle.textContent = '►'
    } else { 
        toggle.textContent = '❚ ❚'
    }
}

function skip() {
        //use parseFloat to convert from string to number
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;  
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }


// Hook up the event listeners 

    //click on video viewer for to play / pause
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

    //progress bar
video.addEventListener('timeupdate', handleProgress);


    //click play button to play / pause
toggle.addEventListener('click', togglePlay);


    //click skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

    //player slider
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


  //scrub functionality
let mousedown = false;
progress.addEventListener('click', scrub);
//progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousemove', (e) => {
    if(mousedown) {
        scrub(e);
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);





