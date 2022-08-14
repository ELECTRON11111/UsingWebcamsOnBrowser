const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

getVideo();

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error('You Probably denied access to your web cam');
        })
};

// Take a frame from the video and paint it on the actual canvas

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // In every 16ms, take an image to the canvas
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    },16)
}

// Take Photo
function takePhoto(){
    // play snap sound
    snap.currentTime = 0;
    snap.play();

    // Take the data out of the canvas // Download Image.
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.innerHTML = `<img src="${data}" alt="Handome Man">`;
    strip.insertBefore(link, strip.firstChid);
}

// When the video starts to play, run the paintToCanvas function
video.addEventListener('canplay', paintToCanvas);