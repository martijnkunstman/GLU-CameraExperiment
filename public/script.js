const constraints = { video: true, };
const captureVideoButton = document.querySelector("#cssfilters .capture-button");
const cssFiltersButton = document.querySelector("#cssfilters-apply");
const saveImage = document.querySelector("#saveImage");
const loadImage = document.querySelector("#loadImage");
const video = document.querySelector("#cssfilters video");
const dataurl_container = document.querySelector("#dataurl-container");
const loadedImage = document.querySelector("#loadedImage");

/*
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
});
*/

let filterIndex = 0;
const filters = [
    "grayscale",
    "sepia",
    "blur",
    "brightness",
    "contrast",
    "hue-rotate",
    "hue-rotate2",
    "hue-rotate3",
    "saturate",
    "invert",
    "",
];

captureVideoButton.onclick = function () {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
};

cssFiltersButton.onclick = video.onclick = function () {
    video.className = filters[filterIndex++ % filters.length];
};

function handleSuccess(stream) {
    video.srcObject = stream;
}

function handleError(error) {
    console.error("Error: ", error);
}

saveImage.onclick = function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    dataurl.value = image_data_url;
    dataurl_container.style.display = 'block';
    //
    fetch('/postdata', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postData: image_data_url })
    }).then(res => res.json()).then(res => { console.log(res.status); });
}
loadImage.onclick = function () {
    fetch('/data')
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            let array = res.data.split("<br>");
            console.log(array);
            loadedImage.src = array[array.length - 2];
        });
}