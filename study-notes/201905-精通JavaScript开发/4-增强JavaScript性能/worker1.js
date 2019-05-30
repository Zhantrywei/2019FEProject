var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    img = document.getElementById("bgimg");
function processImage() {
    var imgWidth = img.width,
        imgHeight = img.height,
        workerThread = new Worker("worker2.js");
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    context.drawImage(img, 0, 0, imgWidth, imgHeight);
    console.log(workerThread)
    workerThread.addEventListener("message", function (e) {
        var imageData = e.data;
        context.putImageData(imageData, 0, 0);
        document.body.appendChild(canvas);
    }, false)
    workerThread.postMessage(context.getImageData(0, 0, imgWidth, imgHeight));
}
img.addEventListener("load",processImage,false);