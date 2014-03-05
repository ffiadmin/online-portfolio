(function () {
    window.onload = function () {
    //Configuration
        var blur               = 10;
        var color              = '#555555';
        var maxRadius          = 50;
        var targetID           = 'interesting';
        var targetPaddingLeft  = 47;
        var targetPaddingRight = 47;

    //Location management
        var mousePos;
        var target = document.getElementById(targetID);
        var pos = target.getBoundingClientRect();

        var center = {
            x : (pos.width + targetPaddingLeft + targetPaddingRight) / 2,
            y : pos.top + (pos.height / 2)
        };

    //Update the coordinate system when the window resizes
        window.onresize = function() {
            pos = target.getBoundingClientRect();

            center = {
                x : (pos.width + targetPaddingLeft + targetPaddingRight) / 2,
                y : pos.top + (pos.height / 2)
            };
        };

    //Update the shadow position on each mouse move
        window.onmousemove = function(event) {
            event = event || window.event;
            mousePos = {
                x : event.clientX - center.x,
                y : event.clientY - center.y
            };

        //Calculate the legs of the triangle in order to achieve "radius" length or less
            var theta = Math.atan2(mousePos.y, mousePos.x);
            var radius = Math.sqrt((mousePos.x * mousePos.x) + (mousePos.y * mousePos.y));
            radius = radius > maxRadius ? maxRadius : radius;
            var A = radius * Math.cos(theta) * -1; // -1, since the shadow evades the pointer
            var B = radius * Math.sin(theta) * -1;

        //Apply the style
            target.style.textShadow = A + 'px ' + B + 'px ' + blur + 'px ' + color;
        };
    }
})();