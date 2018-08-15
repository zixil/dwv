dwv.gui.getElement = dwv.gui.base.getElement();
var addDataLine = (id, fileroot) => {
    var mainDiv = document.getElementById("data-lines");

    // dwv container
    var dwvDiv = document.createElement("div");
    dwvDiv.id = id;
    var layConDiv = document.createElement("div");
    layConDiv.className = "layerContainer";
    var imgCanvas = document.createElement("canvas");
    imgCanvas.className = "imageLayer";
    layConDiv.appendChild(imgCanvas);
    dwvDiv.appendChild(layConDiv);
    mainDiv.appendChild(dwvDiv);

    // dwv application
    var config = {
        "containerDivId": id,
        "skipLoadUrl": true
    };
    var url = "data/" + fileroot + ".dcm";
    var app = new dwv.App();
    app.init(config);
    // display loading time
    var listener = function (event) {
        if (event.type === "load-start") {
            console.time("load-data::" + fileroot);
        }
        else {
            console.timeEnd("load-data::" + fileroot);
        }
    };
    app.addEventListener("load-start", listener);
    app.addEventListener("load-end", listener);
    // load data
    app.loadURLs([url]);
}
document.addEventListener("DOMContentLoaded", addDataLine("dmv0", "bbmri-53323131"));
