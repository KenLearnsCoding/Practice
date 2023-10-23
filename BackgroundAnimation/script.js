// Tutorial link:  https://www.youtube.com/watch?v=C3tbDU8-j6E&list=PL9uxHAkvBwk3nj7IZVVmxMuskRSIXNJ-B&index=11
// set up some variables for the animation. 
let canvas, ctx, w, h, units;
let unitCount = 100;
let hue = 0;

// This function is typically used to create a "new Object()". 
// Like the init() function in jQuery returns a new jQuery object. 
function init() {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    resizeReset();
    createUnits();
    animationLoop();
}

// The lines will be resized in animation inside canvas. 
function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, w, h);
}

// create unit to push the number in array for drawing randomly. 
function createUnits() {
    // Collect number as array. 
    units = [];
    for (let i = 0; i < unitCount; i++) {
        setTimeout(() => {
            units.push(new Unit());
        }, i * 200);
    }
}

// This function will run again and again permanently for animation.
// inside it also contains the drawScene function and the requestAnimation method to call  the animationLoop over again.   
function animationLoop() {
    ctx.fillStyle = "rgba(0, 0, 0, .05)";
    ctx.fillRect(0, 0, w, h);

    drawScene(); 
    requestAnimationFrame(animationLoop);
}

// This drawScene function is for drawing the line and moving then update the animation. 
function drawScene() {
    for (let i = 0; i < units.length; i++) {
        // array units will be updated whenever the digits inside it still called.
        units[i].update();
        units[i].draw();
    }
}

// This getRamdonInt function will calculate the min and max methods 
function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}


class Unit {
    // As you explained to me in week 12, constructor is advanced to use, because it will enables me to provide any custom initialization 
    // that must be done before any other methods can be called on an instantiated object.
    constructor() {
        this.reset();
        this.constructed = true;
    }
    // This reset method will reset all values to draw a new object in canvas. 
    reset() {
        // "this" is the Unit function. 
        // Make the number round after receive the value from variable "x" within the update() method. 
        this.x = Math.round(w / 2);
        this.y = Math.round(h / 2);
        this.sx = this.x;
        this.sy = this.y;
        this.angle = 60 * getRandomInt(0, 5);
        this.size = 1;
        this.radian = (Math.PI / 180) * (this.angle + 90);
        this.speed = 2;
        this.maxDistance = 30;
        this.time = 0;
        this.ttl = getRandomInt(180, 300);
        this.hue = hue;
        hue += 0.5;
    }
    // Draw method will draw the object in canvas. 
    draw() {
        ctx.save();
        ctx.beginPath();  //where to begin with random points in the canvas. 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Choose random colours for the objects. "hue" variable is set up at the top and assigned new value withing the reset() method. 
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update() {
        let dx = this.sx - this.x;
        let dy = this.sy - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= this.maxDistance) {
            if (getRandomInt(0, 1)) {
                this.angle += 60;
            } else {
                this.angle -= 60;
            }

            this.radian = (Math.PI / 180) * (this.angle + 90);
            this.sx = this.x;
            this.sy = this.y; 
        }
        // These 2 lines of code will make the path of x, y move fast with different directions. 
        this.x += this.speed * Math.sin(this.radian);
        this.y += this.speed * Math.cos(this.radian);
        // Create an if to reset the object like deleting the current object after finish to execute and then create new objects.
        if (this.time >= this.ttl || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            this.reset();
        }

        this.time++;
    }
} 

// create the window and generate the event for animation in canvas. 
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);