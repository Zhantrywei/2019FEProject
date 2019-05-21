var header = document.createElement("header"),
    mouseState = "up",
    eventHandlers = {
        onClick: function() {
            console.log("this -> ",this);
            this.onMouseDown();
            this.onMouseUp();
        },
        onMouseDown: function() {
            mouseState = "down";
        },
        onMouseUp: function() {
            mouseState = "up";
        }
    };
header.style =
    "position:fixed;width:100%;height: 200px;z-index:1000;background:lightblue;top:0;left:0";
header.addEventListener("click", eventHandlers.onClick, false);

document.body.appendChild(header);
